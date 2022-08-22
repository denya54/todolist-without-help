import React, {ChangeEvent,KeyboardEvent, useState} from "react";

type AddItemComponentPropsType = {
    addItem: (itemTitle: string) => void
}

export const AddItemComponent = (props: AddItemComponentPropsType) => {

    let [inputValue, setInputValue] = useState('')

    const changeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
    }

    const addNewItem = () => {
        props.addItem(inputValue)
        setInputValue('')
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') {
            addNewItem()
        }
    }

    return (
        <div>
            <input value={inputValue} onChange={changeInputValue} onKeyPress={onKeyPressHandler}/>
            <button onClick={addNewItem}>+</button>
        </div>
    )
}