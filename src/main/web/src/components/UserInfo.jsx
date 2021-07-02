import React from 'react';
import '../style.css';

export const UserInfo = ({name, teams, callback}) => {
    const handleChange = ({target: {value}}) => callback(name, value.split("\n"));

    return (
        <div className={"user-info"}>
            <label>{name}</label>
            <textarea value={teams.join("\n")} onChange={handleChange}/>
        </div>
    )
}