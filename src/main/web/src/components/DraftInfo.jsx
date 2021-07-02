import React from 'react';
import {deactivate, draft, updateUserDraft} from "../api";
import {OrderedList} from "./OrderedList";
import {UserInfo} from "./UserInfo";

export const DraftInfo = ({match: {params: {id}}}) => {
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

    const enterTeamsCallback = (name, teams) => {
        setDraftInfo(prev => ({
            ...prev, usersWithTeams: prev.usersWithTeams.map(user => user.name === name ? {
                ...user, teams
            } : user)
        }));
        updateUserDraft(name, draftInfo.id, teams);
    }

    const handleDeactivate = () => deactivate(draftInfo.id).then(() => alert("Брейк завершен"));

    return (<div>
        <div>
            <div>Автор: {draftInfo.author}</div>
            <div>Название: {draftInfo.name}</div>
            <div>
                <button onClick={handleDeactivate}>Завершить</button>
            </div>
        </div>
        <hr/>
        <div className={'main'}>
            <OrderedList list={draftInfo.order} selectedIndex={selectedIndex}/>
            <div className={"insert-draft"}>
                <label>Приоритет команд:</label>
                <div className={"users"}>
                    {draftInfo.usersWithTeams.map((user, i) => (
                        <UserInfo key={i} name={user.name} teams={user.teams} callback={enterTeamsCallback}/>
                    ))}
                </div>
            </div>
            <div className={"insert-draft"}>
                <label>Выбранные команды:</label>
                <div>
                    {resultList.map((result, i) => (
                        <div key={i}>{i + 1}. <b>{result.team}</b> - {result.user}</div>
                    ))}
                </div>
            </div>
        </div>
    </div>)
}