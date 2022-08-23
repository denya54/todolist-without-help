import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemComponentPropsType = {
    addItem: (itemTitle: string) => void
}

export const AddItemComponent = (props: AddItemComponentPropsType) => {

    let [error, setError] = useState<null | string>(null)

    let [inputValue, setInputValue] = useState('')

    const changeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
        setError(null)
    }

    const addNewItem = () => {
        if (inputValue.trim() !== '') {
            props.addItem(inputValue.trim())
            setInputValue('')
        } else {
            setError('This field should contain symbol')
        }
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addNewItem()
        }
    }

    return (
        <div>
            <input value={inputValue}
                   onChange={changeInputValue}
                   onKeyPress={onKeyPressHandler}
                   className={error ? 'error' : ''}/>
            <button onClick={addNewItem}>+</button>
            {error ? <div className={'error-message'}>{error}</div> : null}
        </div>
    )
}