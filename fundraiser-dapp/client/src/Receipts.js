import React, { useState, useEffect } from "react";

const Receipts = (props) => {

    const [donation, setDonation] = useState(null);
    const [fundName, setFundName] = useState(null);
    const [date, setDate] = useState(null);

    useEffect(() => {
        console.log(props.location.state);
        const {fund, date, donation} = props.location.state;

        const formattedDate = new Date(parseInt(date * 1000));

        setDonation(donation);
        setFundName(formattedDate.toString());
        setDate(date);
    }, []);
    return(
        <div>
            <div>
                <h3>Thank you for your donation to {fundName}</h3>
            </div>
            <div>
                <div>Date of Donation: {date}</div>
                <div>Donation Value: ${donation}</div>
            </div>
        </div>
    )
};

export default Receipts;