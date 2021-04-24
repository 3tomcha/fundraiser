const FundraiserContract = artifacts.require("Fundraiser");

contract("Fundraiser", accounts => {
    let fundraiser;
    const name = "Beneficiary Name";
    const url = "http://google.co.jp";
    const imageUrl = "http://images.jpg";
    const description = "test test";
    const beneficiary = accounts[1];
    const owner = accounts[0];

    beforeEach( async() => {
        fundraiser = await FundraiserContract.new(
            name,
            url,
            imageUrl,
            description,
            beneficiary,
            owner
            );
    });

    describe("initialization", () => {        

        it("gets the beneficiary name", async() => {
            const actual = await fundraiser.name();
            assert.equal(actual, name, "namaes should match");
        });

        it("gets the beneficiary url", async() => {
            const actual = await fundraiser.url();
            assert.equal(actual, url, "url should match");
        });

        it("gets the beneficiary imageUrl", async() => {
            const actual = await fundraiser.imageUrl();
            assert.equal(actual, imageUrl, "imageUrl should match");
        });

        it("gets the beneficiary description", async() => {
            const actual = await fundraiser.description();
            assert.equal(actual, description, "description should match");
        });
        
        it("gets the beneficiary beneficiary", async() => {
            const actual = await fundraiser.beneficiary();
            assert.equal(actual, beneficiary, "beneficiary should match");
        });

        it("gets the beneficiary owner", async() => {
            const actual = await fundraiser.owner();
            assert.equal(actual, owner, "owner should match");
        });
    });

    describe("setBeneficiary", () => {
        const newBeneficiary = accounts[2];
        
        it("updated beneficiary when called by owner account", async() => {
            await fundraiser.setBeneficiary (newBeneficiary, {from: owner});
            const actualBeneficiary = await fundraiser.beneficiary();
            assert.equal(actualBeneficiary, newBeneficiary, "beneficiaries should match");
        });

        it("throw a erroe when called by non-owner account", async() => {
            try {
                await fundraiser.setBeneficiary(newBeneficiary, {from: accounts[3]});
                assert.fail("withdraw was not restricted to owner");
            } catch(error) {
                const expectedError = "Ownable: caller is not the owner";
                const actualError = error.reason;
                assert.equal(actualError, expectedError, "should not permitted");
            }            
        });
    });

    describe("making donations", () => {
        const value = web3.utils.toWei('0.0289');
        const donor = accounts[2];

        it("increases myDonationCount", async () => {
            const currentDonationCount = await fundraiser.myDonationCount({
                from: donor
            });

            fundraiser.donate({from: donor, value});

            const newDonationCount = await fundraiser.myDonationCount({
                from: donor
            });

            assert.equal(1, newDonationCount - currentDonationCount, "myDonationCount should increment by 1");
        });

        it("includes donation in myDonations", async () => {
            await fundraiser.donate({from: donor, value});
            const {values, dates} = await fundraiser.myDonations({from: donor});
            assert.equal(value, values[0], "values should match");
            assert(dates[0], "date should be present");
        });

        it("increases the totalDonations amount", async() => {
            const currentTotalDonations = await fundraiser.totalDonations();
            fundraiser.donate({from: donor, value});
            const newTotalDonations = await fundraiser.totalDonations();
            const diff = newTotalDonations - currentTotalDonations;

            assert.equal(diff, value, "difference should match the donation value");
        });
    });
});