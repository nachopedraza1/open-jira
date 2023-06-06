import { Paper, List } from '@mui/material'
import { EntryListItem } from './EntryListItem'
import { EntryStatus } from '@/interfaces'
import { FC, useContext, useMemo } from 'react'
import { EntriesContext } from '@/context/entries'

interface Props {
    status: EntryStatus
}

export const EntryList: FC<Props> = ({ status }) => {

    const { entries } = useContext(EntriesContext);

    const entriesByStatus = useMemo(() => entries.filter(entry => entry.status === status), [entries])

    return (
        <div>
            <Paper sx={{ height: 'calc(100vh-250px)', backgroundColor: 'transparent', padding: 1 }}>
                <List sx={{ opacity: 1 }}>
                    {entriesByStatus.map(entry => (
                        <EntryListItem key={entry._id} entry={entry} />
                    ))}
                </List>
            </Paper>
        </div>
    )
}
