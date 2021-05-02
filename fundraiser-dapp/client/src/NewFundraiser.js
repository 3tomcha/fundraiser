import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    TextField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    }
}));

const NewFundraiser = () => {
    const [ name, setFundraiserName ] = useState(null);
    const [ url, setFundraiserWebsite ] = useState(null);
    const [ description, setFundraiserDescription ] = useState(null);
    const [ imageURL, setImage ] = useState(null);
    const [ beneficiary, setAddress ] = useState(null);
    const [ custodian, setCustodian ] = useState(null);
    const [ contract, setContract ] = useState(null);
    const [ accounts, setAccounts ] = useState(null);

    const classes = useStyles();

    useEffect(()=> {
    }, []);

    return (
        <div className="create-fundraiser-container">
            <h2>Create A New Fundraiser</h2>
            <label>Name</label>
            <TextField id="outlined-bare"
                        className={classes.TextField}
                        placeholder="Fundraiser Name"
                        margin="normal"
                        onChange={(e) => setFundraiserName(e.target.value)}
                        valiant="outlined"
                        inputProps={{ 'aria-label': 'bare'}} />

            <label>Website</label>
            <TextField id="outlined-bare"
                        className={classes.TextField}
                        placeholder="Fundraiser Website"
                        margin="normal"
                        onChange={(e) => setFundraiserWebsite(e.target.value)}
                        valiant="outlined"
                        inputProps={{ 'aria-label': 'bare'}} />

            <label>Description</label>
            <TextField id="outlined-bare"
                        className={classes.TextField}
                        placeholder="Fundraiser Description"
                        margin="normal"
                        onChange={(e) => setFundraiserDescription(e.target.value)}
                        valiant="outlined"
                        inputProps={{ 'aria-label': 'bare'}} />
            
            <label>Image</label>
            <TextField id="outlined-bare"
                        className={classes.TextField}
                        placeholder="Fundraiser Image"
                        margin="normal"
                        onChange={(e) => setImage(e.target.value)}
                        valiant="outlined"
                        inputProps={{ 'aria-label': 'bare'}} />

            <label>Address</label>
            <TextField id="outlined-bare"
                        className={classes.TextField}
                        placeholder="Fundraiser Address"
                        margin="normal"
                        onChange={(e) => setAddress(e.target.value)}
                        valiant="outlined"
                        inputProps={{ 'aria-label': 'bare'}} />

            <label>Custodian</label>
            <TextField id="outlined-bare"
                        className={classes.TextField}
                        placeholder="Fundraiser Custodian"
                        margin="normal"
                        onChange={(e) => setCustodian(e.target.value)}
                        valiant="outlined"
                        inputProps={{ 'aria-label': 'bare'}} />

        </div>
    );
}

export default NewFundraiser;