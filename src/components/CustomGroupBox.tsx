import { ReactElement, ReactNode, useCallback, useState ,createElement, useMemo} from "react";
import { CollapsibleEnum } from "typings/CustomGroupBoxWidgetProps";
import { ActionValue } from "mendix";

export interface CustomGroupBoxProps {
    className?: string;
    headerContent?: ReactNode;
    bodyContent?: ReactNode;
    collapsible: CollapsibleEnum;
    openAction?: ActionValue;
    executeOnce: boolean;
    openDelay: number;
    headerClick?: ActionValue;
    headerCtrlClick?: ActionValue;
}

type boxStatusType = "expanded" | "collapsed" | "notRendered";
interface IBoxStatus
{
    boxStatusType: boxStatusType;
    pageLocation: { x: number, y: number };
}
export function CustomGroupBox(props: CustomGroupBoxProps): ReactElement {
    const { collapsible } = props;

    const [boxStatus, setBoxStatus] = useState<IBoxStatus>(() =>
    {
        return {
            boxStatusType: collapsible === "yesStartCollapsed" || "yesStartCollapsedOpenOnHover" ? "collapsed" : "expanded",
            pageLocation: { y: 0, x: 0 }
        };
    });
    const [executed, setExecuted] = useState<boolean>(false);

    const getIcon = useMemo((): ReactNode => {
        if (props.collapsible === "no") {
            return null;
        }

        const iconName = boxStatus.boxStatusType === "expanded" ? "minus" : "plus";
        const iconClassName = "glyphicon mx-groupbox-collapse-icon glyphicon-" + iconName;
        return <i style={{top:"1px",marginTop: "0.1em"}} className={iconClassName} />;
    }, [boxStatus, props.collapsible]);

    const onDblClickHandler = (e: React.MouseEvent<HTMLDivElement>) =>
    {
        if(props.headerClick && !e.ctrlKey)
        {
            props.headerClick.execute();
        }
        else if(props.headerCtrlClick && e.ctrlKey)
        {
            props.headerCtrlClick.execute();
        }
    }

    const onClickHandler = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (collapsible === "no" || collapsible === "yesStartCollapsedOpenOnHover")
        {
            return;
        }
        setBoxStatus((currentStatus): IBoxStatus =>
        {
            if (currentStatus.boxStatusType === "collapsed")
            {
                return { boxStatusType: "expanded", pageLocation: { x: e.pageX, y: e.pageY } }
            }
            else
            {
                return { boxStatusType: "collapsed", pageLocation: { x: 0, y: 0 } };
            }
        });
    }, [collapsible]);

    let containerClassName = "mx-groupbox " + props.className;
    if (collapsible !== "no") {
        containerClassName += " mx-groupbox-collapsible";
    }
    // If the widget starts collapsed, the content will not be rendered yet. Use collapsed class in that case.
    // After the body was shown at least once, the body will be hidden rather than removed from the dom.
    if (boxStatus.boxStatusType !== "notRendered") {
        containerClassName += " " + boxStatus;
    } else {
        containerClassName += " collapsed";
    }
    const { headerContent, bodyContent } = props;

    let timeoutAction: NodeJS.Timeout;
    let timeoutHide: NodeJS.Timeout
    const onOpenAction = (pageLocation:{ x: number, y: number }) =>
    {
        if (!props.executeOnce || props.executeOnce && !executed)
        {
            if (props.openAction?.canExecute)
            {
                props.openAction.execute();
                setExecuted(true);
            }
        }
        setBoxStatus({pageLocation, boxStatusType: "expanded"  });
    }

    let headerMouseEnterHandler, headerMouseLeaveHandler,bodyMouseEnterHandler, bodyMouseLeaveHandler;

    if(props.collapsible === "yesStartCollapsedOpenOnHover")
    {
        headerMouseEnterHandler =  (e: React.MouseEvent<HTMLDivElement>) =>
        {
            clearTimeout(timeoutHide)
            const [x,y] = [e.pageX, e.pageY];
            if (props.openDelay > 0)
            {
                timeoutAction = setTimeout(() => onOpenAction({x,y}), props.openDelay);
            }
            else
            {
                onOpenAction({x,y});
            }
        }
        headerMouseLeaveHandler = () =>
        {
            if (props.openDelay > 0)
            {
                clearTimeout(timeoutAction);
            }
            timeoutHide = setTimeout(() =>setBoxStatus({pageLocation:{x:0,y:0}, boxStatusType: "collapsed"  }), 25);
        }
        bodyMouseEnterHandler = () =>
        {
            clearTimeout(timeoutHide);
        }
        bodyMouseLeaveHandler = () =>
        {
            if (props.openDelay > 0)
            {
                clearTimeout(timeoutAction);
            }
            timeoutHide = setTimeout(() =>setBoxStatus({pageLocation:{x:0,y:0}, boxStatusType: "collapsed"  }), 25);
        }
    }

    return (
        <div className={containerClassName}>
            <div className="mx-groupbox-header" onMouseOver={headerMouseEnterHandler}
                 onMouseOut={headerMouseLeaveHandler} onClick={onClickHandler} onDoubleClick={onDblClickHandler}>
                <div className="customGroupBoxHeaderContainer">
                    <div className="customGroupBoxHeaderContent">{headerContent}</div>
                    {getIcon}
                </div>
            </div>
            <div className="mx-groupbox-body" style={props.collapsible === "yesStartCollapsedOpenOnHover" ? { top: boxStatus.pageLocation.y, left: boxStatus.pageLocation.x, display:boxStatus.boxStatusType === "expanded" ? "block" : "none" } : {display:boxStatus.boxStatusType === "expanded" ? "block" : "none" }}
                 onMouseOver={bodyMouseEnterHandler}
                 onMouseOut={bodyMouseLeaveHandler}>{boxStatus.boxStatusType !== "notRendered" ? bodyContent : null}</div>
        </div>
    );
}
