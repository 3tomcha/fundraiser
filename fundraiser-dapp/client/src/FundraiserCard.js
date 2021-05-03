import React, { useState, useEffect } from 'react';
// import getWeb3 from "./getWeb3";
import Web3 from 'web3';
import fundraiserContract from "./contracts/Fundraiser.json";
import { makeStyles } from '@material-ui/core/styles';
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Input, Typography } from '@material-ui/core';
import detectEthereumProvider from '@metamask/detect-provider';


const useStyles = makeStyles(thene => ({
    card: {
        maxWidth: 450,
        height: 400
    },
    media: {
        height: 140
    }
}));



const FundraiserCard = (props) => {
    const { fundraiser } = props;
    const classes = useStyles();
    

    useEffect(() => {
        if (fundraiser) {
            init(fundraiser);
        }
    }, [fundraiser]);

    const init = async(fundraiser) => {
        try {
            const fund = await fundraiser;
            const provider = await detectEthereumProvider();
            const web3 = await new Web3(provider);
            const accounts = await web3.eth.getAccounts();
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = await fundraiserContract.networks[networkId];
            const instance = await new web3.eth.Contract(
                fundraiserContract.abi,
                fund
                );
            setContract(instance);
            setAccounts(accounts);
            setWeb3(web3);

            // ここで各コントラクトに関する情報を取得
            const name = await instance.methods.name().call();
            const imageURL = await instance.methods.imageUrl().call();
            const description = await instance.methods.description().call();
            const totalDonations = await instance.methods.totalDonations().call();
            setFundName(name);
            setImageURL(imageURL);
            setDescription(description);
            setTotalDonations(totalDonations);

        } catch(error) {
        alert(
            `App.js: Failed to load web3, accounts, or contract.
            Check console for details. by Card`
        )
        console.error(error);
        }
    };

    const [ imageURL, setImageURL ] = useState(null);
    const [ fundName, setFundName ] = useState(null);
    const [ description, setDescription ] = useState(null);
    const [ web3, setWeb3 ] = useState(null);
    const [ contract, setContract ] = useState(null);
    const [ accounts, setAccounts ] = useState(null);
    const [ open, setOpen ] = useState(null);
    const [ donationAmount, setDonationAmount ] = useState(null);
    const [ totalDonations, setTotalDonations ] = useState(null);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    }

    const submitFunds = async () => {
        const donation = web3.utils.toWei(donationAmount);

        await contract.methods.donate().send({
            from: accounts[0],
            value: donation,
            gas: 650000
        });
        setOpen(false);
    }

    return (
        <div className="fundraiser-card-content">
            <Dialog open={open}>
                <DialogTitle>
                    Donate to{fundName}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <img src={imageURL} width="200px"/>
                        <p>{description}</p>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>
                        Cancel
                    </Button>
                </DialogActions>
                <FormControl>
                    <Input value={donationAmount}
                            onChange={(e) => setDonationAmount(e.target.value)}
                            placeholder="0.01"/>
                </FormControl>
                <Button onClick={submitFunds}>
                    Donate
                </Button>
            </Dialog>
            <Card className={classes.card}>
                <CardActionArea>
                    <CardMedia className={classes.media}
                                image={imageURL}
                                title="Fundraiser Image">
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {fundName}
                            </Typography>
                            <Typography varant="body2" color="textSecondary" component="p">
                                <p>{description}</p>
                                <p>TotalDonations: {totalDonations}</p>
                            </Typography>
                        </CardContent>
                    </CardMedia>
                </CardActionArea>
                <CardActions>
                    <Button onClick={handleOpen}
                            variant="contained"
                            className={classes.button}>
                    ViewMore
                    </Button>
                </CardActions>
            </Card>
        </div>
    );
};

export default FundraiserCard;



