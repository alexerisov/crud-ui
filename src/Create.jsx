import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import TextField from '@material-ui/core/TextField';
import {ButtonGroup, FormHelperText} from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';

export default function Create({ create }) {
    const [name, setName] = React.useState();
    const [phone, setPhone] = React.useState();
    const [date, setDate] = React.useState();
    const [age, setAge] = React.useState();
    const [email, setEmail] = React.useState();
    const [postText, setPostText] = React.useState();

    const useStyles = makeStyles((theme) => ({
        root: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            "& > *": {
                margin: "5px 0px"
            }
        },
    
    }));
    

    const classes = useStyles();

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handlePhoneChange = (event) => {
        setPhone(event.target.value);
    };

    const handleDateChange = (event) => {
        setDate(event.target.value);
    };

    const handleAgeChange = (event) => {
        setAge(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePostTextChange = (event) => {
        setPostText(event.target.value);
    };


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
                        <Box
                             p={2}>
                            <form className={classes.root} autoComplete="off">
                                <TextField id="name"
                                           label="name"
                                           variant="outlined"
                                           size="small"
                                           onChange={handleNameChange}
                                />
                                <TextField id="phone"
                                           label="Phone"
                                           variant="outlined"
                                           size="small"
                                           onChange={handlePhoneChange}
                                />
                                <TextField id="date"
                                           label="Date"
                                           variant="outlined"
                                           size="small"
                                           onChange={handleDateChange}
                                />
                                <TextField id="age"
                                           label="Age"
                                           variant="outlined"
                                           size="small"
                                           onChange={handleAgeChange}
                                />
                                <TextField id="email"
                                           label="Email"
                                           variant="outlined"
                                           size="small"
                                           onChange={handleEmailChange}
                                />
                                <TextField id="postText"
                                           label="postText"
                                           variant="outlined"
                                           size="small"
                                           onChange={handlePostTextChange}
                                />
                                <ButtonGroup size="large"
                                             variant="text"
                                >
                                    <Button onClick= {() => {
                                        create({name, phone, age, email, date, postText})
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
