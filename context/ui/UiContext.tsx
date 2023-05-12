import { createContext } from "react";

interface ContextProps {
    sideMenuOpen: boolean;

    // Methods
    openSideBar: () => void;
    closeSideBar: () => void;
}

export const UiContext = createContext({} as ContextProps)