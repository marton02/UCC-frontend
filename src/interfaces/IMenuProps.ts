import {IMenuItem} from "@/interfaces/IMenuItem";

export interface IMenuProps {
    items: IMenuItem[];
    className?: string;
    ariaLabel?: string;
}