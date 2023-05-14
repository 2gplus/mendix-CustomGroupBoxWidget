/**
 * This file was generated from CustomGroupBoxWidget.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { ComponentType, CSSProperties, ReactNode } from "react";

export type CollapsibleEnum = "no" | "yesStartExpanded" | "yesStartCollapsed";

export interface CustomGroupBoxWidgetContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    headerContent: ReactNode;
    bodyContent: ReactNode;
    collapsible: CollapsibleEnum;
}

export interface CustomGroupBoxWidgetPreviewProps {
    /**
     * @deprecated Deprecated since version 9.18.0. Please use class property instead.
     */
    className: string;
    class: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    headerContent: { widgetCount: number; renderer: ComponentType<{ children: ReactNode; caption?: string }> };
    bodyContent: { widgetCount: number; renderer: ComponentType<{ children: ReactNode; caption?: string }> };
    collapsible: CollapsibleEnum;
}
