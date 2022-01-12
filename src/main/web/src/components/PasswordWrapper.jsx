import React from 'react';
import TextField from "@mui/material/TextField";

export const PasswordWrapper = ({children}) => {
    const [isValid, setValid] = React.useState(false);
    const [password, setPassword] = React.useState("");
    const code = 'qwe123';

    const handleChange = ({target: {value}}) => {
        setPassword(value)
        setValid(value === code);
    }

    if (isValid) {
        return children;
    }

    return (<div className={"center"}>
        <TextField
            type={"password"}
            label="Введите код подтверждения"
            value={password}
            onChange={handleChange}
        />
    </div>)
}