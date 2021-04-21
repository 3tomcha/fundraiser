const FundraiserContract = artifacts.require("Fundraiser");

contract("Fundraiser", accounts => {
    let fundraiser;
    const name = "Beneficiary Name";
    const url = "http://google.co.jp";
    const imageUrl = "http://images.jpg";
    const description = "test test";
    const beneficiary = accounts[1];
    const custodian = accounts[0];


    describe("initialization", () => {
        beforeEach( async() => {
            fundraiser = await FundraiserContract.new(
                name,
                url,
                imageUrl,
                description,
                beneficiary,
                custodian
                );
        });

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

        it("gets the beneficiary custodian", async() => {
            const actual = await fundraiser.custodian();
            assert.equal(actual, custodian, "custodian should match");
        });
    });
});