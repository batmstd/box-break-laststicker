import React from 'react';
import {InsertDraft} from "./InsertDraft";
import {InsertTeams} from "./InsertTeams";
import {withRouter} from "react-router";
import {addDraft} from "../api";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import Stepper from "@mui/material/Stepper";
import StepContent from "@mui/material/StepContent";
import Paper from "@mui/material/Paper";
import Step from "@mui/material/Step";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

export const AddDraft = withRouter(({history}) => {
    const [author, setAuthor] = React.useState('');
    const [name, setName] = React.useState('');
    const [list, setList] = React.useState([]);
    const [league, setLeague] = React.useState("NBA");
    const [teams, setTeams] = React.useState([]);
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const handleChangeAuthor = ({target: {value}}) => setAuthor(value);

    const handleChangeName = ({target: {value}}) => setName(value);

    const orderDraftCallback = (data) => {
        setList(data);
    }

    const handleChangeLeague = (event) => {
        setLeague(event.target.value);
    };

    const save = () => {
        addDraft(name, author, teams, list, league).then(() => history.push("/draft"))
    }
    const steps = [
        {
            label: "Выбор организатора",
            body: <TextField id="outlined-basic" label="Автор" variant="outlined" value={author}
                             onChange={handleChangeAuthor}/>
        },
        {
            label: "Название",
            body: <TextField id="outlined-basic" label="Название" variant="outlined" value={name}
                             onChange={handleChangeName}/>
        },
        {
            label: "Участники",
            body: <InsertDraft callback={orderDraftCallback}/>
        },
        {
            label: "Выбор лиги",
            body: <TextField
                id="select-league"
                select
                label="Выбор лиги"
                value={league}
                onChange={handleChangeLeague}
                helperText="Выберите лигу"
            >
                {["NBA", "NFL", "APL", "La Liga", "Other"].map((option) => (
                    <MenuItem key={option} value={option}>
                        {option}
                    </MenuItem>
                ))}
            </TextField>
        },
        {
            label: "Команды",
            body: <InsertTeams league={league} callback={t => setTeams(t)}/>
        }
    ];

    return (<Box>
        <Button variant="outlined" onClick={() => history.push("/draft/")}>Отмена</Button>
        <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((step, index) => (
                <Step key={step.label}>
                    <StepLabel>
                        {step.label}
                    </StepLabel>
                    <StepContent>
                        {step.body}
                        <Box sx={{mb: 2}}>
                            <div>
                                <Button
                                    variant="contained"
                                    onClick={index === steps.length - 1 ? save : handleNext}
                                    sx={{mt: 1, mr: 1}}
                                >
                                    {index === steps.length - 1 ? 'Создать' : 'Далее'}
                                </Button>
                                <Button
                                    disabled={index === 0}
                                    onClick={handleBack}
                                    sx={{mt: 1, mr: 1}}
                                >
                                    Назад
                                </Button>
                            </div>
                        </Box>
                    </StepContent>
                </Step>
            ))}
        </Stepper>
        {activeStep === steps.length && (
            <Paper square elevation={0} sx={{p: 3}}>
                <Typography>All steps completed - you&apos;re finished</Typography>
                <Button onClick={handleReset} sx={{mt: 1, mr: 1}}>
                    Сбросить
                </Button>
            </Paper>
        )}
    </Box>)
})