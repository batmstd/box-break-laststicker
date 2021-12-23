import React from 'react';
import TextField from "@mui/material/TextField";

export const InsertDraft = ({callback}) => {
    const [value, setValue] = React.useState('');
    const handleChange = ({target: {value}}) => {
        setValue(value);
        const regExp = new RegExp(/^(\d){1,2}(.+)( -)(.)+$/);
        const list = value.split("\n")
            .map(r => r.toString())
            .map(r => regExp.test(r)
                ? regExp.exec(r)[2]
                : r)
        callback(list);
    }
    return (<div>
        <TextField
            id="draft-teams"
            label="Порядок драфта"
            multiline
            maxRows={30}
            value={value}
            onChange={handleChange}
        />
    </div>)
}