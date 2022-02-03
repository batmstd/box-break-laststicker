import React from 'react';
import TextField from "@mui/material/TextField";
import {CODE, useLocalStorage, VALID_CODE} from "../Hooks";

export const PasswordWrapper = ({children}) => {
    const {get, set} = useLocalStorage();
    const [isValid, setValid] = React.useState(false);
    const [password, setPassword] = React.useState("");
    const code = 'qwe123';

    React.useEffect(() => {
        const codeFromLocalStorage = get(CODE);
        if (!codeFromLocalStorage) {
            return;
        }
        changePassword(codeFromLocalStorage);
    }, [get]);

    const handleChange = ({target: {value}}) => {
        changePassword(value);
        set(CODE, value);
        set(VALID_CODE, value === code);
    }

    const changePassword = (value) => {
        setPassword(value);
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