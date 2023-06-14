import { FC, ReactNode, useEffect, useReducer } from 'react';
import { EntriesContext, entriesReducer } from './';
import { Entry } from '@/interfaces';
import { entriesApi } from '@/apis';

export interface EntriesState {
    entries: Entry[];
}


const Entries_INITIAL_STATE: EntriesState = {
    entries: [],
}


export const EntriesProvider: FC<{ children: ReactNode }> = ({ children }) => {

    const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);

    const onAddNewEntry = async (description: string) => {

        const { data } = await entriesApi.post<Entry>('/entries', { description })

        dispatch({ type: '[Entries] - New-entry', payload: data });
    }

    const onUpdateEntry = async ({ _id, description, status }: Entry) => {
        try {
            const { data } = await entriesApi.put(`/entries/${_id}`, { description, status })
            dispatch({ type: '[Entries] - Update-entry', payload: data })
        } catch (error) {
            console.log(error);
        }
    }

    const refreshEntries = async () => {
        const { data } = await entriesApi.get<Entry[]>('/entries')
        dispatch({ type: '[Entries] - Refresh-entry', payload: data })
    }

    useEffect(() => {
        refreshEntries();
    }, [])

    return (
        <EntriesContext.Provider value={{
            ...state,
            onAddNewEntry,
            onUpdateEntry
        }}>
            {children}
        </EntriesContext.Provider>
    )
};