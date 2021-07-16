import React from 'react';

export const OrderedList = ({list, selectedIndex, selectedTeams = []}) => {
    const getTeam = (user) => (selectedTeams.find(u => user === u.user) || {team: ''}).team;
    return (<div className={"insert-draft"}>
        <label>Очередь драфта:</label>
        <div>
            {list.map((r, i) => (
                <div style={{color: selectedIndex >= i ? 'green' : 'black'}} key={i}>{i + 1}. {r} {getTeam(r)}</div>
            ))}
        </div>
    </div>)
}