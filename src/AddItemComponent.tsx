import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton} from "@mui/material";
import AddCircleOutlineTwoToneIcon from '@mui/icons-material/AddCircleOutlineTwoTone';
import TextField from '@mui/material/TextField';


type AddItemComponentPropsType = {
    addItem: (itemTitle: string) => void
}

export const AddItemComponent = React.memo((props: AddItemComponentPropsType) => {
    console.log('add item')
    let [error, setError] = useState<null | string>(null)

    let [inputValue, setInputValue] = useState('')

    const changeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
        if (error !== null) {
            setError(null)
        }
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
            <TextField
                error={!!error}
                label="Title..."
                color="secondary"
                value={inputValue}
                onChange={changeInputValue}
                onKeyPress={onKeyPressHandler}
            />
            <IconButton onClick={addNewItem} color="secondary" size={'large'}>
                <AddCircleOutlineTwoToneIcon />
            </IconButton>
            {error ? <div className={'error-message'}>{error}</div> : null}
        </div>
    )
})