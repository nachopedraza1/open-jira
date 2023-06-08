import { FC, ReactNode, useReducer } from 'react';
import { EntriesContext, entriesReducer } from './';
import { Entry } from '@/interfaces';
import { v4 as uuidv4 } from 'uuid';

export interface EntriesState {
    entries: Entry[];
}


const Entries_INITIAL_STATE: EntriesState = {
    entries: [
        {
            _id: uuidv4(),
            description: 'Pendiente: Lorem ipsum dolor sit amet consectetur adipisicing elit.',
            status: 'pending',
            createdAt: Date.now()
        },
        {
            _id: uuidv4(),
            description: 'En Progreso: Lorem ipsum dolor sit amet consectetur adipisicing elit.',
            status: 'in-progress',
            createdAt: Date.now() - 10000
        },
        {
            _id: uuidv4(),
            description: 'Terminada: Lorem ipsum dolor sit amet consectetur adipisicing elit.',
            status: 'finished',
            createdAt: Date.now() - 40000
        }
    ],
}


export const EntriesProvider: FC<{ children: ReactNode }> = ({ children }) => {

    const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);

    const onAddNewEntry = (description: string) => {
        const newEntry: Entry = {
            _id: uuidv4(),
            description,
            createdAt: Date.now(),
            status: 'pending'
        }

        dispatch({ type: '[Entries] - New-entry', payload: newEntry });
    }

    const onUpdateEntry = (entry: Entry) => {
        dispatch({ type: '[Entries] - Update-entry', payload: entry })
    }

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