import React from 'react';
import {InsertDraft} from "./InsertDraft";
import {InsertTeams} from "./InsertTeams";
import {withRouter} from "react-router";
import {addDraft} from "../api";

export const AddDraft = withRouter(({history}) => {
    const [step, setStep] = React.useState(0);
    const [author, setAuthor] = React.useState('');
    const [name, setName] = React.useState('');
    const [list, setList] = React.useState([]);

    const incrementStep = () => setStep(prev => prev + 1);

    const handleChangeAuthor = ({target: {value}}) => setAuthor(value);

    const handleChangeName = ({target: {value}}) => setName(value);

    const orderDraftCallback = (data) => {
        setList(data);
        incrementStep();
    }

    const save = (teams) => {
        addDraft(name, author, teams, list).then(() => history.push("/draft"))
    }

    return (<div>

            <Step current={step} need={0}>
                <div className={"fields"}>
                    <label>Автор:</label>
                    <input value={author} onChange={handleChangeAuthor}/>
                    <button onClick={incrementStep}>Далее</button>
                </div>
            </Step>

            <Step current={step} need={1}>
                <div className={"fields"}>
                    <label>Название:</label>
                    <input value={name} onChange={handleChangeName}/>
                    <button onClick={incrementStep}>Далее</button>
                </div>
            </Step>

            <Step current={step} need={2}>
                <InsertDraft callback={orderDraftCallback}/>
            </Step>

            <Step current={step} need={3}>
                <InsertTeams callback={t => save(t)}/>
            </Step>
        </div>
    )
})

const Step = ({current, need, children}) => {
    if (current !== need) {
        return <></>;
    }

    return children;
}