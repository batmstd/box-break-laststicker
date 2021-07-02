import React from 'react';

export const InsertDraft = ({callback}) => {
    const [value, setValue] = React.useState('');
    const handleChange = ({target: {value}}) => {
        setValue(value);
    }
    const handleClick = () => {
        const regExp = new RegExp(/^(\d){1,2}(.+)( -)(.)+$/);
        const list = value.split("\n")
            .map(r => r.toString())
            .map(r => regExp.test(r)
                ? regExp.exec(r)[2]
                : r)
        callback(list);
    }
    return (<div className={"insert-draft"}>
        <label>Порядок драфта:</label>
        <textarea onChange={handleChange} value={value}/>
        <button onClick={handleClick}>Далее</button>
    </div>)
}