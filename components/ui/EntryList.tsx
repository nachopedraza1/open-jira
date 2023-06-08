import { Paper, List } from '@mui/material'
import { EntryListItem } from './EntryListItem'
import { EntryStatus } from '@/interfaces'
import { FC, useContext, useMemo, DragEvent } from 'react'
import { EntriesContext } from '@/context/entries'
import { UiContext } from '@/context/ui'
import styles from './EntryList.module.css'

interface Props {
    status: EntryStatus
}

export const EntryList: FC<Props> = ({ status }) => {

    const { entries, onUpdateEntry } = useContext(EntriesContext);
    const { isDragging, onDragging } = useContext(UiContext);


    const entriesByStatus = useMemo(() => entries.filter(entry => entry.status === status), [entries])

    const allowDrop = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    }

    const onDropEntry = (event: DragEvent<HTMLDivElement>) => {
        const id = event.dataTransfer.getData('text')
        const entry = entries.find(entry => entry._id === id)!;
        entry.status = status;
        onUpdateEntry(entry)
        onDragging(false)
    }

    return (
        <div
            onDrop={onDropEntry}
            onDragOver={allowDrop}
            className={isDragging ? styles.dragging : ''}
        >
            <Paper sx={{ height: '100vh', backgroundColor: 'transparent', padding: 1 }}>
                <List sx={{ opacity: isDragging ? 0.2 : 1, transition: 'all .3s' }}>
                    {entriesByStatus.map(entry => (
                        <EntryListItem key={entry._id} entry={entry} />
                    ))}
                </List>
            </Paper>
        </div>
    )
}
