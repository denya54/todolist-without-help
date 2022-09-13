import React, {ChangeEvent, useState} from "react";
import TextField from "@mui/material/TextField";

type ChangeSpanPropsType = {
    title: string
    changeFunc: (newTitle: string) => void
}

export const ChangeSpan = (props: ChangeSpanPropsType) => {

    let [changeMod, setChangeMod] = useState(false)
    let [error, setError] = useState<null | string>(null)

    const activateChangeMod = () => {
        setChangeMod(true)
    }

    const deActivateChangeMod = () => {
        if (titleValue.length < 1) {
            setError('title must include more than 0 symbols')
        } else {
            setChangeMod(false)
            props.changeFunc(titleValue)
        }
    }

    let [titleValue, setTitleValue] = useState(props.title)

    let changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitleValue(e.currentTarget.value)
        setError(null)
    }


    return changeMod
        ?  <TextField
                error={!!error}
                label={'new title'}
                color="secondary"
                value={titleValue}
                onChange={changeTitle}
                autoFocus
                onBlur={deActivateChangeMod}
                helperText={error}
            />
        : <span onDoubleClick={activateChangeMod}>{props.title}</span>}