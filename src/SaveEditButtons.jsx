import React, { useState } from 'react'
import { Button, ButtonGroup } from '@material-ui/core'


const SaveEditButtons = ({params}) => {
    const [isEditing, setIsEditing] = useState(false)
    const thisRow = params.api.getRow(params.id)
    console.log(thisRow.isEditing)

    const setRowMode = (mode) => {
        const editableCells = ['firstName', 'lastName']
        editableCells.forEach(el => {
            params.api.setCellMode(params.id, el, mode)
        })
        setIsEditing(mode === 'edit' ? true : false)
    }

    if (isEditing)
        return (
            <ButtonGroup color="primary" size="small">
                 <Button
                    onClick= {() => {
                        setRowMode('view')
                    }}
                >
                    Save
                </Button>
                <Button
                    onClick= {() => {
                        setRowMode('view')
                    }}
                >
                    Cancel
                </Button>
            </ButtonGroup>
        )
    else
        return (
            <ButtonGroup color="primary" size="small">
                <Button
                    onClick= {() => {
                        setRowMode('edit')
                    }}
                >
                    Edit
                </Button>
                <Button
                    onClick= {() => {
                        //delete func
                    }}
                >
                    Delete
                </Button>
            </ButtonGroup>
    )
}

export default SaveEditButtons