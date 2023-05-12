import { FC, ReactNode, useReducer } from "react";
import { UiContext, UiReducer } from "./";

interface ProviderProps {
    children: ReactNode | ReactNode
}

export interface UIState {
    sideMenuOpen: boolean;
}

const UI_INITIAL_STATE: UIState = {
    sideMenuOpen: false,
}

export const UiProvider: FC<ProviderProps> = ({ children }) => {

    const [state, dispatch] = useReducer(UiReducer, UI_INITIAL_STATE);

    const openSideBar = () => {
        dispatch({ type: "UI - Open Sidebar" });
    }

    const closeSideBar = () => {
        dispatch({ type: "UI - Close Sidebar" })
    }

    return (
        <UiContext.Provider value={{
            ...state,
            openSideBar,
            closeSideBar
        }}>
            {children}
        </UiContext.Provider>
    )
}
