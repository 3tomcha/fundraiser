const FundraiserFactoryContract = artifacts.require("FundraiserFactory");

contract("FundraiserFactory: deployment", () => {
    it("has been deployed", async() => {
        const FundraiserFactory = FundraiserFactoryContract.deployed();
        assert(FundraiserFactory, "fundraiser factory was not deployed");
    });
});

contract("FundraiserFactory: createFundraiser", (accounts) => {
    let fundraiserFactory;
    // let fundraisersCount;

    const name = "Beneficiary Name";
    const url = "beneficiaryname.org";
    const imageURL = "https://placekitten.com/600/350";
    const description = "Beneficiary Description";

    let beneficiary = accounts[1];

    it("increment thhe fundraisersCount", async() => {
        fundraiserFactory = await FundraiserFactoryContract.deployed();
        const currentFundraisersCount = await fundraiserFactory.fundraisersCount();

        await fundraiserFactory.createFundraisers(
            name,
            url,
            imageURL,
            description,
            beneficiary
        );

        const newFundraisersCount = await fundraiserFactory.fundraisersCount();

        assert.equal(1, newFundraisersCount - currentFundraisersCount, "fundraisersCount is increment by 1");
    });

    it("event", async() => {

        const tx = await fundraiserFactory.createFundraisers(
            name,
            url,
            imageURL,
            description,
            beneficiary
        );

        const expected = "FundraiserCreated";

        assert.equal(tx.logs[0].event, expected, "events should match");
    });
});