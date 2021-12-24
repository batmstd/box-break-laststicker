import React from 'react';
import {activeDrafts, addUserToDraft, draft} from "../api";
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import arrayMove from 'array-move';
import {NavLink} from "react-router-dom";
import * as NBAIcons from 'react-nba-logos';
import {Breaks} from "./Drafts";
import {useParams} from "react-router";

export const UserForm = () => {
    const [selectedBreak, selectBreak] = React.useState(undefined);
    const [name, setName] = React.useState('-');
    const params = useParams();

    React.useEffect(() => {
        draft(params.id).then(res => {
            selectBreak(res.data);
        })
    }, [params.id]);

    const handleChangeName = ({target: {value}}) => setName(value);

    const save = () => {
        if (name === '-') {
            return alert("выберите ваш ник")
        }
        addUserToDraft(name, selectedBreak.id, selectedBreak.teams).then(() => window.location.reload())
    }

    const onSortEnd = ({oldIndex, newIndex}) => {
        selectBreak(b => ({...b, teams: arrayMove(b.teams, oldIndex, newIndex)}))
    };

    return (<div className={'drafts'}>
        {selectedBreak && (<div>
            <div>
                <NavLink to={"/info/" + selectedBreak.id}>Посмотреть текущее состояние драфта</NavLink>
            </div>
            <div>
                <button onClick={save}>Сохранить</button>
            </div>
            <div>
                <label>Ваш ник на laststicker:</label>
                <select onChange={handleChangeName}>
                    <option value={'-'}>-</option>
                    {selectedBreak.usersWithTeams.filter(u => u.teams.length === 0).map(b => (
                        <option key={b.name} value={b.name}>{b.name}</option>
                    ))}
                </select>
            </div>
            <br/>
            <label>Выберите команды по приоритету</label>
            <SortableList items={selectedBreak.teams} onSortEnd={onSortEnd} />
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

const SortableItem = SortableElement(({value, i}) => <div className={"wrapped-team"}>
    <div>{i}.</div>
    <div className={"team"}>
        <Logo team={value}/>
        <div>{value}</div>
    </div>
</div>);

const Logo = ({team}) => {
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

const SortableList = SortableContainer(({items}) => {
    return (
        <div>
            {items.map((value, index) => (
                <SortableItem key={`item-${value}`} index={index} value={value} i={index + 1} />))}
        </div>
    );
});