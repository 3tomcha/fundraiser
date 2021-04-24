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

        await fundraiserFactory.createFundraiser(
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

        const tx = await fundraiserFactory.createFundraiser(
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

contract("FundraisersFactory: fundraisers", (accounts) => {
    async function createFundraisersFactory(fundraisersCount, accounts) {
        const factory = await FundraiserFactoryContract.new();
        await addFundraisers(factory, fundraisersCount, accounts);
        return factory;
    }

    async function addFundraisers(factory, count, accounts) {
        const name = "Beneficiary";
        const lowerCaseName = name.toLocaleLowerCase();
        const beneficiary = accounts[1];
        
        for (let i = 0; i < count; i++) {
            await factory.createFundraiser(
                `${name} ${i}`,
                `${lowerCaseName}${i}.com`,
                `${lowerCaseName}${i}.png`,
                `Description for ${name} ${i}`,
                beneficiary
            );
        }
    }

    describe("when fundraisers collection is empty", () => {
        it("returns an empty collection", async() => {
            const factory = await createFundraisersFactory(0, accounts);
            const fundraisers = await factory.fundraisers(10, 0);

            assert.equal(
                fundraisers.length,
                0,
                "collection should be empty"
            );
        });
    });
});