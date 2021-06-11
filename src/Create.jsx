import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import TextField from '@material-ui/core/TextField';
import {ButtonGroup} from '@material-ui/core';

export default function Create() {
    return (
        <PopupState variant="popover" popupId="demo-popup-popover">
            {(popupState) => (
                <div>
                    <Button color="primary" {...bindTrigger(popupState)}>
                            <AddRoundedIcon />
                    </Button>
                    <Popover
                        {...bindPopover(popupState)}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                    >
                        <Box display="flex"
                             p={2}>
                            <form autoComplete="off">
                                <TextField id="firstName"
                                           label="First name"
                                           variant="outlined"
                                           size="small"
                                />
                                <TextField id="lastName"
                                           label="Last name"
                                           variant="outlined"
                                           size="small"
                                />
                                <ButtonGroup size="large"
                                             variant="text"
                                >
                                    <Button onClick= {() => {
                                        //save func
                                        popupState.close()
                                    }}>
                                        Save
                                    </Button>
                                    <Button onClick= {() => {
                                        popupState.close()
                                    }}>
                                        Cancel
                                    </Button>
                                </ButtonGroup>
                            </form>
                        </Box>
                    </Popover>
                </div>
            )}
        </PopupState>
    );
}
