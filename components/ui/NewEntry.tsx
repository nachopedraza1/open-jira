import { Box, TextField, Button } from "@mui/material"
import { ChangeEvent, FC, useState, useContext } from "react"
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AddIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { EntriesContext } from "@/context/entries";
import { UiContext } from "@/context/ui";

export const NewEntry: FC = () => {

    const { onAddNewEntry } = useContext(EntriesContext);
    const { isAddingEntry, onAddingEntry } = useContext(UiContext);

    const [inputValue, setInputValue] = useState('');

    const OnInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value)
    }

    const [touched, setIsTouched] = useState(false);

    const onSave = () => {
        if (inputValue.length === 0) return
        onAddNewEntry(inputValue);
        onAddingEntry(false);
        setIsTouched(false)
        setInputValue('')
    }

    return (

        <Box sx={{ marginBottom: 2, paddingX: 2 }}>

            {
                isAddingEntry ?
                    (
                        <>
                            <TextField
                                fullWidth
                                sx={{ marginTop: 2, marginBottom: 1 }}
                                placeholder='Nueva entrada'
                                autoFocus
                                multiline
                                label='Nueva entrada'
                                value={inputValue}
                                onChange={OnInputChange}
                                helperText={inputValue.length <= 0 && touched && 'Ingrese un valor'}
                                onBlur={() => setIsTouched(true)}
                                error={inputValue.length <= 0 && touched}
                            />

                            <Box display='flex' justifyContent='space-between'>

                                <Button
                                    variant='text'
                                    onClick={() => onAddingEntry(false)}
                                >
                                    Cancelar
                                </Button>

                                <Button
                                    variant='outlined'
                                    color='secondary'
                                    endIcon={<SaveOutlinedIcon />}
                                    onClick={onSave}
                                >
                                    Guardar
                                </Button>
                            </Box>
                        </>
                    )
                    :
                    (
                        <Button
                            startIcon={<AddIcon />}
                            fullWidth
                            variant='outlined'
                            onClick={() => onAddingEntry(true)}

                        >
                            Agregar Tarea
                        </Button>
                    )
            }
        </Box>
    )
}
