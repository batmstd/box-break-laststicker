import React from 'react';
import '../style.css';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";

export const UserInfo = ({name, teams, callback, allTeams}) => {
    const handleChange = ({target: {value}}) => callback(name, value.split("\n"));
    function shuffle(array) {
        let currentIndex = array.length,  randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
        return array;
    }
    const handleClick = () => callback(name, shuffle([...allTeams]))
    return (
        <div style={{marginBottom: 10}}>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>{name}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div style={{marginBottom: 10}}>
                        <Button variant={"contained"} onClick={handleClick}>Случайные команды</Button>
                    </div>
                    <TextField
                        id="outlined-multiline-static"
                        label="Список команд"
                        multiline
                        value={teams.join("\n")}
                        onChange={handleChange}
                    />
                </AccordionDetails>
            </Accordion>
        </div>
    )
}