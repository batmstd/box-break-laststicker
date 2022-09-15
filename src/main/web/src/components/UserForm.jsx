import React from 'react';
import {activeDrafts, addUserToDraft, draft} from "../api";
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import arrayMove from 'array-move';
import {useHistory} from "react-router-dom";
import * as NBAIcons from 'react-nba-logos';
import * as NFLIcons from 'react-nfl-logos';
import {Breaks} from "./Drafts";
import {useParams} from "react-router";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import {shuffle} from "../Shuffle";

export const UserForm = () => {
    const [selectedBreak, selectBreak] = React.useState(undefined);
    const [name, setName] = React.useState('-');
    const params = useParams();
    const history = useHistory();
    React.useEffect(() => {
        draft(params.id).then(res => {
            selectBreak(res.data);
        })
    }, [params.id]);

    const handleChangeName = ({target: {value}}) => setName(value);

    const goBreakInfo = () => history.push("/info/" + selectedBreak.id);

    const save = () => {
        if (name === '-') {
            return alert("выберите ваш ник")
        }
        addUserToDraft(name, selectedBreak.id, selectedBreak.teams).then(goBreakInfo)
    }

    const onSortEnd = ({oldIndex, newIndex}) => {
        selectBreak(b => ({...b, teams: arrayMove(b.teams, oldIndex, newIndex)}))
    };

    const handleShuffle = () => {
        selectBreak(b => ({...b, teams: shuffle(b.teams)}));
    }

    return (<div className={'drafts'}>
        {selectedBreak && (<div>
            <div>
                <Button onClick={goBreakInfo}>Посмотреть текущее состояние драфта</Button>
            </div>
            <div>
                <Button variant={"contained"} onClick={save}>Сохранить</Button>
            </div>
            <div style={{marginTop: 10}}>
                <FormControl sx={{m: 1, minWidth: 120}}>
                    <InputLabel id="demo-simple-select-helper-label">Ваш ник на laststicker</InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={name}
                        label="Ваш ник на laststicker"
                        onChange={handleChangeName}
                    >
                        <MenuItem value={'-'}>-</MenuItem>
                        {selectedBreak.usersWithTeams.filter(u => u.teams.length === 0).map(b => (
                            <MenuItem key={b.name} value={b.name}>{b.name}</MenuItem>
                        ))}
                    </Select>
                    <FormHelperText>Ваш ник на laststicker</FormHelperText>
                </FormControl>
            </div>
            <br/>
            <label>Выберите команды по приоритету</label>
            <div>
                <Button variant={'outlined'} onClick={handleShuffle}>Перемешать</Button>
            </div>
            <br/>
            <SortableList items={selectedBreak.teams} type={selectedBreak.type} onSortEnd={onSortEnd}/>
        </div>)}
    </div>)
}

export const ViewUserBreaks = () => {
    const [breaks, setBreaks] = React.useState([]);

    React.useEffect(() => {
        activeDrafts().then(res => setBreaks(res.data))
    }, []);
    return (<div>
        {breaks.map((b, i) => <Breaks key={i} group={b} url={"/draft/view/"}/>)}
    </div>)
}

const SortableItem = SortableElement(({value, type, i}) => <div className={"wrapped-team"}>
    <div>{i}.</div>
    <div className={"team"}>
        <Logo team={value} type={type}/>
        <div>{value}</div>
    </div>
</div>);

const Logo = ({team, type}) => {
    switch (type) {
        case 'NBA':
            return <NBALogo team={team}/>
        case 'NFL':
            return <NFLLogo team={team}/>
        case 'APL':
            return <APLLogo team={team}/>
        default:
            return <div/>
    }
}

const NFLLogo = ({team}) => {
    switch (team) {
        case "Jacksonville":
            return <NFLIcons.JAX size={40}/>
        case "San Francisco":
            return <NFLIcons.SF size={40}/>
        case "NY Giants":
            return <NFLIcons.NYG size={40}/>
        case "Seattle":
            return <NFLIcons.SEA size={40}/>
        case "New Orleans":
            return <NFLIcons.NO size={40}/>
        case "Houston":
            return <NFLIcons.HOU size={40}/>
        case "Kansas City":
            return <NFLIcons.KC size={40}/>
        case "Chicago":
            return <NFLIcons.CHI size={40}/>
        case "Minnesota":
            return <NFLIcons.MIN size={40}/>
        case "Miami":
            return <NFLIcons.MIA size={40}/>
        case "Cleveland":
            return <NFLIcons.CLE size={40}/>
        case "Atlanta":
            return <NFLIcons.ATL size={40}/>
        case "LA Chargers":
            return <NFLIcons.LAC size={40}/>
        case "Arizona":
            return <NFLIcons.ARI size={40}/>
        case "Cincinnati":
            return <NFLIcons.CIN size={40}/>
        case "Dallas":
            return <NFLIcons.DAL size={40}/>
        case "Detroit":
            return <NFLIcons.DET size={40}/>
        case "Buffalo":
            return <NFLIcons.BUF size={40}/>
        case "Pittsburgh":
            return <NFLIcons.PIT size={40}/>
        case "Philadelphia":
            return <NFLIcons.PHI size={40}/>
        case "Baltimore":
            return <NFLIcons.BAL size={40}/>
        case "Washington":
            return <NFLIcons.WAS size={40}/>
        case "Las Vegas":
            return <NFLIcons.LV size={40}/>
        case "Tampa Bay":
            return <NFLIcons.TB size={40}/>
        case "NY Jets":
            return <NFLIcons.NYJ size={40}/>
        case "New England":
            return <NFLIcons.NE size={40}/>
        case "Green Bay":
            return <NFLIcons.GB size={40}/>
        case "Carolina":
            return <NFLIcons.CAR size={40}/>
        case "Tennessee":
            return <NFLIcons.TEN size={40}/>
        case "Indianapolis":
            return <NFLIcons.IND size={40}/>
        case "LA Rams":
            return <NFLIcons.LAR size={40}/>
        case "Denver":
            return <NFLIcons.DEN size={40}/>
        default:
            return <div/>
    }

}

const NBALogo = ({team}) => {
    switch (team) {
        case "Atlanta":
            return <NBAIcons.ATL size={40}/>
        case "Boston":
            return <NBAIcons.BOS size={40}/>
        case "Brooklyn":
            return <NBAIcons.BKN size={40}/>
        case "Charlotte":
            return <NBAIcons.CHA size={40}/>
        case "Chicago":
            return <NBAIcons.CHI size={40}/>
        case "Cleveland":
            return <NBAIcons.CLE size={40}/>
        case "Dallas":
            return <NBAIcons.DAL size={40}/>
        case "Denver":
            return <NBAIcons.DEN size={40}/>
        case "Detroit":
            return <NBAIcons.DET size={40}/>
        case "Golden State":
            return <NBAIcons.GSW size={40}/>
        case "Houston":
            return <NBAIcons.HOU size={40}/>
        case "Indiana":
            return <NBAIcons.IND size={40}/>
        case "LA Clippers":
            return <NBAIcons.LAC size={40}/>
        case "LA Lakers":
            return <NBAIcons.LAL size={40}/>
        case "Memphis":
            return <NBAIcons.MEM size={40}/>
        case "Miami":
            return <NBAIcons.MIA size={40}/>
        case "Milwaukee":
            return <NBAIcons.MIL size={40}/>
        case "Minnesota":
            return <NBAIcons.MIN size={40}/>
        case "New Orleans":
            return <NBAIcons.NOP size={40}/>
        case "New York":
            return <NBAIcons.NYK size={40}/>
        case "Oklahoma City":
            return <NBAIcons.OKC size={40}/>
        case "Orlando":
            return <NBAIcons.ORL size={40}/>
        case "Philadelphia":
            return <NBAIcons.PHI size={40}/>
        case "Phoenix":
            return <NBAIcons.PHX size={40}/>
        case "Portland":
            return <NBAIcons.POR size={40}/>
        case "Sacramento":
            return <NBAIcons.SAC size={40}/>
        case "San Antonio":
            return <NBAIcons.SAS size={40}/>
        case "Toronto":
            return <NBAIcons.TOR size={40}/>
        case "Utah":
            return <NBAIcons.UTA size={40}/>
        case "Washington":
            return <NBAIcons.WAS size={40}/>
        default:
            return <div/>
    }
}

const APLLogo = ({team}) => {
    switch (team) {
        case "Arsenal London":
            return <div className={"arsenal logo"}/>
        case "Aston Villa":
            return <div className={"aston logo"}/>
        case "Brentford":
            return <div className={"brentford logo"}/>
        case "Brighton & Hove Albion":
            return <div className={"brighton logo"}/>
        case "Burnley":
            return <div className={"burnley logo"}/>
        case "Chelsea":
            return <div className={"chelsea logo"}/>
        case "Crystal Palace":
            return <div className={"crystal logo"}/>
        case "Everton":
            return <div className={"everton logo"}/>
        case "Leeds United":
            return <div className={"leeds logo"}/>
        case "Leicester City":
            return <div className={"leicester logo"}/>
        case "Liverpool":
            return <div className={"liverpool logo"}/>
        case "Manchester City":
            return <div className={"mcity logo"}/>
        case "Manchester United":
            return <div className={"united logo"}/>
        case "Newcastle United":
            return <div className={"newcastle logo"}/>
        case "Norwich City":
            return <div className={"norwich logo"}/>
        case "Southampton":
            return <div className={"southampton logo"}/>
        case "Tottenham Hotspur":
            return <div className={"tottenham logo"}/>
        case "Watford":
            return <div className={"watford logo"}/>
        case "West Ham United":
            return <div className={"westham logo"}/>
        case "Wolverhampton Wanderers":
            return <div className={"wolverhampton logo"}/>
        default:
            return <div/>

    }
}

const SortableList = SortableContainer(({items, type}) => {
    return (
        <div>
            {items.map((value, index) => (
                <SortableItem key={`item-${value}`} index={index} value={value} i={index + 1} type={type}/>))}
        </div>
    );
});