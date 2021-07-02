import React from 'react';

export const OrderedList = ({list, selectedIndex}) => {
    return (<div className={"insert-draft"}>
        <label>Очередь драфта:</label>
        <div>
            {list.map((r, i) => (
                <div style={{color: selectedIndex >= i ? 'green' : 'black'}} key={i}>{i + 1}. {r}</div>
            ))}
        </div>
    </div>)
}