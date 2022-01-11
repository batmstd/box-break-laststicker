import React from 'react';
import {withRouter} from "react-router";
import {draft} from "../api";
import {OrderedList} from "./OrderedList";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";

export const DraftOrderInfo = withRouter(({match: {params: {id}}, history: {goBack}}) => {
    const [draftInfo, setDraftInfo] = React.useState({order: [], usersWithTeams: [], teams: []});
    const [resultList, setResultList] = React.useState([]);
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    React.useEffect(() => {
        draft(id).then(res => setDraftInfo(res.data));
    }, [id]);

    React.useEffect(() => {
        const list = draftInfo.order;
        let res = [], selected = [], lastIndex = list.length;
        const teamsToUpperCase = draftInfo.teams.map(t => t.toUpperCase());
        for (let i = 0; i < list.length; i++) {
            let user = list[i];
            const team = (draftInfo.usersWithTeams.find(u => u.name === user) || {user, teams: []}).teams
                .filter(t => selected.indexOf(t.toUpperCase()) < 0)[0];
            if (!team || teamsToUpperCase.indexOf(team.toUpperCase()) < 0) {
                lastIndex = i - 1;
                break;
            }
            if (selected.indexOf(team.toUpperCase()) < 0 && teamsToUpperCase.indexOf(team.toUpperCase()) >= 0) {
                res.push({user, team})
                selected.push(team.toUpperCase())
            }
        }
        setSelectedIndex(lastIndex)
        const r = draftInfo.teams.map(team => {
            const ut = res.find(r => r.team.toUpperCase() === team.toUpperCase());
            return ut ? {team, user: ut.user} : {team, user: null}
        })
        setResultList(r);
    }, [draftInfo]);


    return (<div className={"drafts"}>
        <div>
            <a href={"/#"} onClick={goBack}>Назад</a>
            <hr/>
            <div>
                <div>Автор: {draftInfo.author}</div>
                <div>Название: {draftInfo.name}</div>
            </div>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Очередь драфта</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <OrderedList list={draftInfo.order} selectedIndex={selectedIndex}/>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Выбранные команды:</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {resultList.map((result, i) => (
                        <div key={i}>{i + 1}. <b>{result.team}</b> - {result.user}</div>
                    ))}
                </AccordionDetails>
            </Accordion>
        </div>
    </div>)
});