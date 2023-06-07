/**
 * This file was generated from CustomGroupBoxWidget.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { ComponentType, CSSProperties, ReactNode } from "react";
import { ActionValue } from "mendix";

export type CollapsibleEnum = "no" | "yesStartExpanded" | "yesStartCollapsed" | "yesStartCollapsedOpenOnHover";

export type ShowBodyEnum = "Default" | "Hover";

export interface CustomGroupBoxWidgetContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    headerContent: ReactNode;
    bodyContent: ReactNode;
    collapsible: CollapsibleEnum;
    showBody: ShowBodyEnum;
    onOpenAction?: ActionValue;
    executeOpenActionOnce: boolean;
    hoverTimeout: number;
    clickAction?: ActionValue;
    ctrlClickAction?: ActionValue;
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
    showBody: ShowBodyEnum;
    onOpenAction: {} | null;
    executeOpenActionOnce: boolean;
    hoverTimeout: number | null;
    clickAction: {} | null;
    ctrlClickAction: {} | null;
}
