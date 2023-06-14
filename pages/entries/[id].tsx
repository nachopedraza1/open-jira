import { Layout } from "@/components/layouts";
import { NextPage } from "next"
import { Grid, Card, CardHeader, CardContent, TextField, CardActions, Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, capitalize, IconButton } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import Delete from '@mui/icons-material/Delete';
import { EntryStatus } from "@/interfaces";
import { ChangeEvent, useMemo, useState } from "react";

const validSatus: EntryStatus[] = ['pending', 'in-progress', 'finished'];

export const EntryPage: NextPage = () => {

    const [inputValue, setInputValue] = useState('');
    const [status, setStatus] = useState<EntryStatus>('pending');
    const [touched, setTouched] = useState(false);

    const isNotValid = useMemo(() => inputValue.length <= 0 && touched, [inputValue, touched]);

    const onInputValueChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    }

    const onStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
        setStatus(event.target.value as EntryStatus)
    }

    return (
        <Layout title=".. .. .. .. ..">
            <Grid container justifyContent="center" marginTop={2}>
                <Grid item xs={12} sm={8} md={6}>
                    <Card>
                        <CardHeader
                            title={`Entrada: ${inputValue}`}
                            subheader={`Creada hace x minutos`}
                        />

                        <CardContent>
                            <TextField
                                sx={{ marginTop: 2, marginBottom: 1 }}
                                fullWidth
                                placeholder="Nueva entrada"
                                autoFocus
                                multiline
                                label="Nueva entrada"
                                value={inputValue}
                                onChange={onInputValueChange}
                                onBlur={() => setTouched(true)}
                                helperText={inputValue.length <= 0 && touched && 'Ingrese un valor'}
                                error={inputValue.length <= 0 && touched}
                            />

                            <FormControl>
                                <FormLabel> Estado: </FormLabel>
                                <RadioGroup
                                    row
                                    onChange={onStatusChange}
                                    value={status}
                                >
                                    {
                                        validSatus.map(option => (
                                            <FormControlLabel key={option} value={option} control={<Radio />} label={capitalize(option)} />
                                        ))
                                    }
                                </RadioGroup>
                            </FormControl>
                        </CardContent>

                        <CardActions>
                            <Button
                                startIcon={<SaveOutlinedIcon />}
                                fullWidth
                                variant="contained"
                                disabled={inputValue.length <= 0}
                            >
                                Save
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>

            <IconButton
                sx={{
                    position: "fixed",
                    bottom: 30,
                    right: 30,
                    backgroundColor: 'error.dark'
                }}
            >
                <Delete />
            </IconButton>

        </Layout>
    )
}

export default EntryPage;
