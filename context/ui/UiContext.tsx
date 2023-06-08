import { createContext } from "react";

interface ContextProps {
    sideMenuOpen: boolean;
    isAddingEntry: boolean;
    isDragging: boolean;

    // Methods
    openSideBar: () => void;
    closeSideBar: () => void;
    onAddingEntry: (isAdding: boolean) => void;
    onDragging: (isdragg: boolean) => void;
}

export const UiContext = createContext({} as ContextProps)