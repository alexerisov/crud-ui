import React, { useState } from 'react'
import { Button, ButtonGroup } from '@material-ui/core'


const SaveEditButtons = ({params, update, remove}) => {
    const [isEditing, setIsEditing] = useState(false)
    const thisRow = params.api.getRow(params.id)

    const handleMouseDown = (event) => {
        // Keep the focus in the cell
        event.preventDefault();
    };

    const setRowMode = (mode) => {
        const editableCells = ['name','phone','date','email','age', 'postText']
        editableCells.reverse().forEach(el => {
            params.api.setCellMode(params.id, el, mode)
        })
        setIsEditing(mode === 'edit')
    }

    if (isEditing)
        return (
            <ButtonGroup color="primary" size="small">
                 <Button onMouseDown={handleMouseDown}
                         onClick= {() => {
                             update(params)
                                setRowMode('view')
                         }}
                >
                    Save
                </Button>
                <Button onMouseDown={handleMouseDown}
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
                <Button onMouseDown={handleMouseDown}
                        onClick= {() => {
                          setRowMode('edit')
                         }}
                >
                    Edit
                </Button>
                <Button onMouseDown={handleMouseDown}
                        onClick= {() => {
                            remove(params)
                        }}
                >
                    Delete
                </Button>
            </ButtonGroup>
    )
}

export default SaveEditButtons