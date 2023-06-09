import { Entry } from '@/interfaces';
import { createContext } from 'react';


interface ContextProps {
    entries: Entry[];

    onAddNewEntry: (description: string) => void;
    onUpdateEntry: (entryUp: Entry, showSnackBar?: boolean) => void;
}


export const EntriesContext = createContext({} as ContextProps);