import React from 'react';
import '../style.css'
import TextField from "@mui/material/TextField";

export const InsertTeams = ({callback}) => {
    const [value, setValue] = React.useState('Atlanta\nBoston\nBrooklyn\nCharlotte\nChicago\nCleveland\nDallas\nDenver\nDetroit\nGolden State\nHouston\nIndiana\nLA Clippers\nLA Lakers\nMemphis\nMiami\nMilwaukee\nMinnesota\nNew Orleans\nNew York\nOklahoma City\nOrlando\nPhiladelphia\nPhoenix\nPortland\nSacramento\nSan Antonio\nToronto\nUtah\nWashington');

    React.useEffect(() => {
        const list = value.split("\n")
        callback(list);
    }, [])
    const handleChange = ({target: {value}}) => {
        setValue(value);
        const list = value.split("\n")
        callback(list);
    }
    return (<div>
        <TextField
            id="draft-teams"
            label="Список команд"
            multiline
            maxRows={30}
            value={value}
            onChange={handleChange}
        />
    </div>)
}