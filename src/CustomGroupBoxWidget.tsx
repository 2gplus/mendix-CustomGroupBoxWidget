import { ReactElement, createElement } from "react";

import { CustomGroupBoxWidgetContainerProps } from "../typings/CustomGroupBoxWidgetProps";
import { CustomGroupBox } from "./components/CustomGroupBox";
import "./ui/CustomGroupBoxWidget.css";

export function CustomGroupBoxWidget(props: CustomGroupBoxWidgetContainerProps): ReactElement {
    return (
        <CustomGroupBox
            className={props.class}
            headerContent={props.headerContent}
            bodyContent={props.bodyContent}
            collapsible={props.collapsible}
            executeOnce={props.executeOpenActionOnce}
            openDelay={props.hoverTimeout}
            openAction={props.onOpenAction}
            headerClick={props.clickAction}
            headerCtrlClick={props.ctrlClickAction}
        />
    );
}
