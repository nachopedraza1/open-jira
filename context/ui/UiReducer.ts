import { UIState } from "./UiProvider";

type actionTypes =
    | { type: 'UI - Open Sidebar' }
    | { type: 'UI - Close Sidebar' }

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
        default:
            return state;
    }
}
