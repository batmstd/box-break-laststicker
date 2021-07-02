import React from 'react';
import {activeDrafts, addUserToDraft, draft} from "../api";
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import arrayMove from 'array-move';

export const UserForm = () => {
    const [breaks, setBreaks] = React.useState([]);
    const [selectedBreak, selectBreak] = React.useState(undefined);
    const [name, setName] = React.useState('-');

    React.useEffect(() => {
        activeDrafts().then(res => setBreaks(res.data))
    }, []);

    const handleSelect = ({target}) => {
        draft(target.value).then(res => {
            selectBreak(res.data);
        })
    }

    const handleChangeName = ({target: {value}}) => setName(value);

    const save = () => {
        if (name === '-') {
            return alert("выберите ваш ник")
        }
        addUserToDraft(name, selectedBreak.id, selectedBreak.teams).then(() => window.location.reload())
    }

    const onSortEnd = ({oldIndex, newIndex}) => {
        selectBreak(b => ({...b, teams: arrayMove(b.teams, oldIndex, newIndex)}))
    };

    return (<div className={'drafts'}>
        <label>Выберите Брейк:</label>
        <select onChange={handleSelect}>
            <option value={-1}>-</option>
            {breaks.map(b => (
                <option key={b.id} value={b.id}>{b.author} - {b.name}</option>
            ))}
        </select>
        <br/>
        {selectedBreak && (<div>
            <div>
                <button onClick={save}>Сохранить</button>
            </div>
            <div>
                <label>Ваш ник на laststicker:</label>
                <select onChange={handleChangeName}>
                    <option value={'-'}>-</option>
                    {selectedBreak.usersWithTeams.filter(u => u.teams.length === 0).map(b => (
                        <option key={b.name} value={b.name}>{b.name}</option>
                    ))}
                </select>
            </div>
            <br/>
            <label>Выберите команды по приоритету</label>
            <SortableList items={selectedBreak.teams} onSortEnd={onSortEnd} />
        </div>)}
    </div>)
}

const styleC = {
    border: '1px dashed gray',
    padding: '0.5rem 1rem',
    marginBottom: '.5rem',
    backgroundColor: 'white',
    cursor: 'move',
};

const SortableItem = SortableElement(({value}) => <div style={styleC}>{value}</div>);

const SortableList = SortableContainer(({items}) => {
    return (
        <div>
            {items.map((value, index) => (
                <SortableItem key={`item-${value}`} index={index} value={value} />
            ))}
        </div>
    );
});