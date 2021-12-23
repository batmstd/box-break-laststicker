import React from 'react';
import {NavLink, useHistory} from "react-router-dom";
import {activeDrafts} from "../api";
import Button from "@mui/material/Button";

export const Drafts = () => {
    const history = useHistory();
    const [breaks, setBreaks] = React.useState([]);
    React.useEffect(() => {
        activeDrafts().then(res => setBreaks(res.data))
    }, [])
    return (
        <div className={'drafts'}>
            <Button variant="contained" onClick={() => history.push("/draft/new")}>Создать новый</Button>
            <br/>
            <br/>
            {breaks.length > 0 && <table border={1}>
                <thead>
                <tr>
                    <th>Автор</th>
                    <th>Название</th>
                    <th/>
                </tr>
                </thead>
                <tbody>
                {breaks.map(b => (<tr key={b.id}>
                    <td>{b.author}</td>
                    <td>{b.name}</td>
                    <td><NavLink to={"/draft/" + b.id}>Перейти</NavLink></td>
                </tr>))}
                </tbody>
            </table>}
        </div>
    )
}