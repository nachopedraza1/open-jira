import { UIState } from "./UiProvider";

type actionTypes =
    | { type: 'UI - Open Sidebar' }
    | { type: 'UI - Close Sidebar' }
    | { type: 'UI - isAddingEntry', payload: boolean }
    | { type: 'UI - isDragging', payload: boolean }

export const UiReducer = (state: UIState, action: actionTypes): UIState => {
    switch (action.type) {
        case 'UI - Close Sidebar':
            return {
                ...state,
                sideMenuOpen: false
            }

        case 'UI - Open Sidebar':
            return {
                ...state,
                sideMenuOpen: true
            }

        case "UI - isAddingEntry":
            return {
                ...state,
                isAddingEntry: action.payload
            }

        case "UI - isDragging":
            return {
                ...state,
                isDragging: action.payload
            }

        default:
            return state;
    }
}
