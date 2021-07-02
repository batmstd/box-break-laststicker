import React from 'react';
import {activeDrafts, addUserToDraft, draft} from "../api";
import {DndProvider, useDrag, useDrop} from "react-dnd";
import {HTML5Backend} from 'react-dnd-html5-backend'
import update from 'immutability-helper';

export const UserForm = () => {
    const [breaks, setBreaks] = React.useState([]);
    const [selectedBreak, selectBreak] = React.useState(undefined);
    const [name, setName] = React.useState('-');
    const [cards, setCards] = React.useState([]);

    React.useEffect(() => {
        activeDrafts().then(res => setBreaks(res.data))
    }, []);

    const handleSelect = ({target}) => {
        draft(target.value).then(res => {
            selectBreak(res.data);
            setCards(res.data.teams.map((team, i) => ({id: i, text: team})));
        })
    }

    const handleChangeName = ({target: {value}}) => setName(value);

    const save = () => {
        if (name === '-') {
            return alert("выберите ваш ник")
        }
        addUserToDraft(name, selectedBreak.id, cards.map(card => card.text)).then(() => window.location.reload())
    }

    const moveCard = React.useCallback((dragIndex, hoverIndex) => {
        const dragCard = cards[dragIndex];
        const newCards = update(cards, {
            $splice: [
                [dragIndex, 1],
                [hoverIndex, 0, dragCard],
            ],
        });
        setCards(newCards);

    }, [cards]);

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
            <DndProvider backend={HTML5Backend}>
                <div style={style}>{cards.map((card, index) => (
                    <Card key={card.id} index={index} id={card.id} text={card.text} moveCard={moveCard}/>))}
                </div>
            </DndProvider>
        </div>)}
    </div>)
}
const style = {
    width: 400,
};

const styleC = {
    border: '1px dashed gray',
    padding: '0.5rem 1rem',
    marginBottom: '.5rem',
    backgroundColor: 'white',
    cursor: 'move',
};
export const Card = ({id, text, index, moveCard}) => {
    const ref = React.useRef(null);
    const [{handlerId}, drop] = useDrop({
        accept: 'CARD',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return;
            }
            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            // Get vertical middle
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            // Determine mouse position
            const clientOffset = monitor.getClientOffset();
            // Get pixels to the top
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%
            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            // Time to actually perform the action
            moveCard(dragIndex, hoverIndex);
            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex;
        },
    });
    const [{isDragging}, drag] = useDrag({
        type: 'CARD',
        item: () => {
            return {id, index};
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    const opacity = isDragging ? 0 : 1;
    drag(drop(ref));
    return (<div ref={ref} style={{...styleC, opacity}} data-handler-id={handlerId}>
        {text}
    </div>);
};