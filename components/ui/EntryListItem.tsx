import { UiContext } from '@/context/ui';
import { Entry } from '@/interfaces';
import { dateFunctions } from '@/utils';
import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { FC, DragEvent, useContext } from 'react';


interface Props {
    entry: Entry
}

export const EntryListItem: FC<Props> = ({ entry }) => {

    const { onDragging } = useContext(UiContext);
    const router = useRouter();

    const onDragStart = (event: DragEvent) => {
        onDragging(true)
        event.dataTransfer?.setData('text', entry._id)
    }


    const onHrefCard = () => {
        router.push(`/entries/${entry._id}`)
    }


    return (
        <Card
            onClick={onHrefCard}
            sx={{ marginBottom: 1 }}
            draggable
            onDragStart={onDragStart}
            onDragEnd={() => onDragging(false)}
        >
            <CardActionArea>
                <CardContent>
                    <Typography sx={{ whiteSpace: 'pre-line' }}> {entry.description} </Typography>
                </CardContent>

                <CardActions sx={{ display: "flex", justifyContent: "end", paddingRight: 2 }}>
                    <Typography variant='body2'> {dateFunctions.getFormatDistance(entry.createdAt)} </Typography>
                </CardActions>
            </CardActionArea>
        </Card>
    )
}
