import { FC, ReactNode, useReducer } from "react";
import { UiContext, UiReducer } from "./";

interface ProviderProps {
    children: ReactNode | ReactNode
}

export interface UIState {
    sideMenuOpen: boolean;
    isAddingEntry: boolean;
    isDragging: boolean;
}

const UI_INITIAL_STATE: UIState = {
    sideMenuOpen: false,
    isAddingEntry: false,
    isDragging: false,
}

export const UiProvider: FC<ProviderProps> = ({ children }) => {

    const [state, dispatch] = useReducer(UiReducer, UI_INITIAL_STATE);

    const openSideBar = () => {
        dispatch({ type: "UI - Open Sidebar" });
    }

    const closeSideBar = () => {
        dispatch({ type: "UI - Close Sidebar" })
    }

    const onAddingEntry = (isAdding: boolean) => {
        dispatch({ type: "UI - isAddingEntry", payload: isAdding })
    }

    const onDragging = (isdragg: boolean) => {
        dispatch({ type: "UI - isDragging", payload: isdragg });
    }

    return (
        <UiContext.Provider value={{
            ...state,
            onDragging,
            onAddingEntry,
            openSideBar,
            closeSideBar
        }}>
            {children}
        </UiContext.Provider>
    )
}
