import React from 'react';
import {useHistory} from "react-router-dom";
import {activeDrafts} from "../api";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";

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
            {breaks.map((b, i) => <Breaks key={i} group={b} url={"/draft/"}/>)}
        </div>
    )
}

export const Breaks = ({group, url}) => {
    const history = useHistory();
    return <Card sx={{maxWidth: 650, marginBottom: 2}}>
        <CardContent>
            <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                {group.type}
            </Typography>
            <TableContainer>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Автор</TableCell>
                            <TableCell align="right">Название</TableCell>
                            <TableCell/>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {group.boxBreaks.map((bb, i) => (
                            <TableRow key={i}>
                                <TableCell>{bb.author}</TableCell>
                                <TableCell align="right">{bb.name}</TableCell>
                                <TableCell align="right">
                                    <Button onClick={() => history.push(url + bb.id)}>Перейти</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </CardContent>
    </Card>
}