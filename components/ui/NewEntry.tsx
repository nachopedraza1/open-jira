import { Box, TextField, Button } from "@mui/material"
import { ChangeEvent, FC, useState } from "react"
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AddIcon from '@mui/icons-material/AddCircleOutlineOutlined';

export const NewEntry: FC = () => {

    const [inputValue, setInputValue] = useState('');

    const OnInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value)
    }

    const [isAdding, setIsAdding] = useState(false);
    const [touched, setIsTouched] = useState(false);

    const onSave = () => {
        if (inputValue.length === 0) return
        console.log(inputValue);
    }

    return (

        <Box sx={{ marginBottom: 2, paddingX: 2 }}>

            {
                isAdding ?
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
                                    onClick={() => setIsAdding(false)}
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
                            onClick={() => setIsAdding(true)}

                        >
                            Agregar Tarea
                        </Button>
                    )
            }
        </Box>
    )
}
