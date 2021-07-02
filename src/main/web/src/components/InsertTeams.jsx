import React from 'react';
import '../style.css'

export const InsertTeams = ({callback}) => {
    const [value, setValue] = React.useState('Atlanta\nBoston\nBrooklyn\nCharlotte\nChicago\nCleveland\nDallas\nDenver\nDetroit\nGolden State\nHouston\nIndiana\nLA Clippers\nLA Lakers\nMemphis\nMiami\nMilwaukee\nMinnesota\nNew Orleans\nNew York\nOklahoma City\nOrlando\nPhiladelphia\nPhoenix\nPortland\nSacramento\nSan Antonio\nToronto\nUtah\nWashington');
    const handleChange = ({target: {value}}) => {
        setValue(value);
    }
    const handleClick = () => {
        const list = value.split("\n")
        callback(list);
    }
    return (<div className={"insert-draft"}>
        <label>Список команд:</label>
        <textarea onChange={handleChange} value={value}/>
        <button onClick={handleClick}>Создать</button>
    </div>)
}