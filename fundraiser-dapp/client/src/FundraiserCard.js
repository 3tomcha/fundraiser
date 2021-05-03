import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@material-ui/core';


const useStyles = makeStyles(thene => ({
    card: {
        maxWidth: 450,
        height: 400
    },
    media: {
        height: 140
    }
}));

const FundraiserCard = () => {
    const classes = useStyles();

    const { imageURL, setImageURL } = useState(null);
    const { fundName, setFundName } = useState(null);
    const { description, setDescription } = useState(null);


    return (
        <div className="fundraiser-card-content">
            <Card className={classes.card}>
                <CardActionArea>
                    <CardMedia className={classes.media}
                                image={imageURL}
                                title="Fundraiser Image">
                        <CardContent>
                            <Typography>
                                {fundName}
                            </Typography>
                            <Typography>
                                <p>{description}</p>
                            </Typography>
                        </CardContent>
                    </CardMedia>
                </CardActionArea>
            </Card>
        </div>
    );
};

export default FundraiserCard;



