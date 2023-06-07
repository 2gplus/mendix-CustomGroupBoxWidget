import { ReactElement, createElement } from "react";

import { CustomGroupBox, CustomGroupBoxProps } from "./components/CustomGroupBox";
import { CustomGroupBoxWidgetPreviewProps } from "../typings/CustomGroupBoxWidgetProps";

function transformProps(props: CustomGroupBoxWidgetPreviewProps): CustomGroupBoxProps {
    return {
        executeOnce: false,
        openDelay: 0,
        className: props.className,
        headerContent: (
            <props.headerContent.renderer caption="Place header content here">
                <div />
            </props.headerContent.renderer>
        ),
        bodyContent: (
            <props.bodyContent.renderer caption="Place body content here">
                <div />
            </props.bodyContent.renderer>
        ),
        collapsible: "yesStartExpanded"
    };
}

export function preview(props: CustomGroupBoxWidgetPreviewProps): ReactElement {
    return (
        <div>
            <CustomGroupBox {...transformProps(props)}></CustomGroupBox>
        </div>
    );
}

export function getPreviewCss(): string {
    return require("./ui/CustomGroupBoxWidget.css");
}
