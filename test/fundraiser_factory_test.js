const FundraiserFactoryContract = artifacts.require("FundraiserFactory");
const FundraiserContract = artifacts.require("Fundraiser");

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

    describe("varing limits", () => {
        let factory;
        beforeEach(async() => {
            factory = await createFundraisersFactory(30, accounts);
        });

        it("returns 10 results when limit requested is 10", async() => {
            const fundraisers = await factory.fundraisers(10, 0);
            assert.equal(
                10,
                fundraisers.length,
                "results size should be 10"
            );
        });

        it("returns 20 results when limit requested is 20", async() => {
            const fundraisers = await factory.fundraisers(20, 0);
            assert.equal(
                20,
                fundraisers.length,
                "results size should be 20"
            );
        });

        it("returns 20 results when limit requested is 30", async() => {
            const fundraisers = await factory.fundraisers(30, 0);
            assert.equal(
                20,
                fundraisers.length,
                "results size should be 30"
            );
        });
    });

    describe("varying offset", () => {
        let factory;
        beforeEach(async() => {
            factory = await createFundraisersFactory(10, accounts);
        });

        it("containes the fundraiser with the appropritate offset", async() => {
            const fundraisers = await factory.fundraisers(1, 0);
            const fundraiser = await FundraiserContract.at(fundraisers[0]);
            const name = await fundraiser.name();
            assert.ok(await name.includes(0), `${name} did not include the offset`);
        });

        it("containes the fundraiser with the appropritate offset", async() => {
            const fundraisers = await factory.fundraisers(1, 7);
            const fundraiser = await FundraiserContract.at(fundraisers[0]);
            const name = await fundraiser.name();
            assert.ok(await name.includes(7), `${name} did not include the offset`);
        });
    });

    describe("boundary conditions", () => {
        let factory;
        beforeEach(async() => {
            factory = await createFundraisersFactory(10, accounts);
        });

        it("raisers out of bound error", async() => {
            try {
                const fundraisers = await factory.fundraisers(1, 11);
                assert.fail("error was not raised");
            } catch (error) {
                const expected = "offset out of bounds";
                assert.ok(error.message.includes(expected), `${error.message}`);
            }
        });

        it("adjusts return size to prevent out of bounds error", async() => {
            try {
                const fundraisers = await factory.fundraisers(10, 5);
                assert.equal(
                    fundraisers.length,
                    5,
                    "collection adjusted"
                );
            } catch (error) {
                assert.fail("limit and offset exceeds bounds");
            }
        });
        
    });
});
