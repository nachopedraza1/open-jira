import { Layout } from "@/components/layouts";
import { GetServerSideProps, NextPage } from "next"
import { Grid, Card, CardHeader, CardContent, TextField, CardActions, Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, capitalize, IconButton } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import Delete from '@mui/icons-material/Delete';
import { Entry, EntryStatus } from "@/interfaces";
import { ChangeEvent, useContext, useMemo, useState } from "react";
import { dbEntries } from "@/database";
import { EntriesContext } from "@/context/entries";
import { dateFunctions } from "@/utils";

const validSatus: EntryStatus[] = ['pending', 'in-progress', 'finished'];

interface Props {
    entry: Entry
}

export const EntryPage: NextPage<Props> = ({ entry }) => {

    const { onUpdateEntry } = useContext(EntriesContext);

    const [inputValue, setInputValue] = useState(entry.description);
    const [status, setStatus] = useState<EntryStatus>(entry.status);
    const [touched, setTouched] = useState(false);

    const isNotValid = useMemo(() => inputValue.length <= 0 && touched, [inputValue, touched]);

    const onInputValueChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    }

    const onStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
        setStatus(event.target.value as EntryStatus)
    }

    const onSave = () => {

        const updatedEntry: Entry = {
            ...entry,
            status: status,
            description: inputValue,
        }

        onUpdateEntry(updatedEntry, true);
    }

    return (
        <Layout title=".. .. .. .. ..">
            <Grid container justifyContent="center" marginTop={2}>
                <Grid item xs={12} sm={8} md={6}>
                    <Card>
                        <CardHeader
                            title={`Entrada: ${inputValue}`}
                            subheader={`Creada hace ${dateFunctions.getFormatDistance(entry.createdAt)}`}
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
                                helperText={isNotValid && 'Ingrese un valor'}
                                error={isNotValid}
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
                                onClick={onSave}
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {

    const { id } = ctx.params as { id: string };

    const entry = await dbEntries.getEntriesById(id);

    if (!entry) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {
        props: {
            entry
        }
    }
}

export default EntryPage;
