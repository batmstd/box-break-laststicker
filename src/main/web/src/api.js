import axios from "axios";

export const addDraft = (name, author, teams, order) => {
    return axios.post('/v1/box-breaks/add', {name, author, teams, order})
}

export const activeDrafts = () => {
    return axios.get('/v1/box-breaks/actives');
}

export const draft = (id) => {
    return axios.get('/v1/box-breaks/' + id);
}

export const deactivate = (id) => {
    return axios.post('/v1/box-breaks/deactivate/' + id);
}

export const addUserToDraft = (name, boxBreakId, teams) => {
    return axios.post('/v1/user-box-breaks/add', {name, boxBreakId, teams})
}

export const updateUserDraft = (name, boxBreakId, teams) => {
    return axios.post('/v1/user-box-breaks/update', {name, boxBreakId, teams})
}