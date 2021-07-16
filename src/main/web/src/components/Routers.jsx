import {Route, Switch} from "react-router";
import React from 'react';
import {Drafts} from "./Drafts";
import {AddDraft} from "./AddDraft";
import {UserForm} from "./UserForm";
import {DraftInfo} from "./DraftInfo";
import {DraftOrderInfo} from "./DraftOrderInfo";

export const Routers = () => {
    return (
        <Switch>
            <Route exact path={"/"} component={UserForm}/>
            <Route path={"/info/:id"} component={DraftOrderInfo}/>
            <Route path={"/draft/new"} component={AddDraft}/>
            <Route path={"/draft/:id"} component={DraftInfo}/>
            <Route path={"/draft"} component={Drafts}/>
        </Switch>
    )
}