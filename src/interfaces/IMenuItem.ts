import {ReactNode} from "react";

export interface IMenuItem {
    label: string;
    href: string;
    icon?: ReactNode;
    external?: boolean;
}
