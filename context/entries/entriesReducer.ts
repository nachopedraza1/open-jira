import { Entry, EntryStatus } from '@/interfaces';
import { EntriesState } from './';


type EntriesActionType =
    | { type: '[Entries] - New-entry', payload: Entry }
    | { type: '[Entries] - Update-entry', payload: Entry }
    | { type: '[Entries] - Refresh-entry', payload: Entry[] }


export const entriesReducer = (state: EntriesState, action: EntriesActionType): EntriesState => {

    switch (action.type) {
        case '[Entries] - New-entry':
            return {
                ...state,
                entries: [...state.entries, action.payload]
            }

        case '[Entries] - Update-entry':
            return {
                ...state,
                entries: state.entries.map(entry => {
                    if (entry._id === action.payload._id) {
                        entry.description = action.payload.description;
                        entry.status = action.payload.status;
                    }
                    return entry;
                })
            }

        case '[Entries] - Refresh-entry':
            return {
                ...state,
                entries: [...action.payload]
            }
        default:
            return state;
    }

}