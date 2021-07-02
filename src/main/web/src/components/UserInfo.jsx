import React from 'react';
import '../style.css';

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
        <div className={"user-info"}>
            <label>{name} <button onClick={handleClick}>random</button></label>
            <textarea value={teams.join("\n")} onChange={handleChange}/>
        </div>
    )
}