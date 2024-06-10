const assert = require('assert');
const { ethers, waffle } = require("hardhat");


const options = {
  from: '',
  value: ethers.parseUnits("0.02","ether"),
}
let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async () => {
  // Get accounts from Hardhat
  accounts = await ethers.getSigners();

  // Deploy the factory contract
  const Factory = await ethers.getContractFactory("CampaignFactory");
  factory = await Factory.deploy();
  console.log('factory: ', factory.target);
  // await factory.deployed();

  // Create a campaign
  await factory.createCampaign(ethers.parseUnits("0.001","ether"), {
    from: accounts[0].address,
    gasLimit: "1000000",
  });

  // Get the deployed campaign address
  [campaignAddress] = await factory.getDeployedCampaigns();

  // Get the campaign contract instance
  const Campaign = await ethers.getContractFactory("Campaign");
  campaign = await Campaign.attach(campaignAddress);
  console.log('campaign: ', campaign.target);
});

describe('Lottery Contract', () => {
  it('deploys a contract', () => {
    assert.ok(factory.target);
    assert.ok(campaign.target);
  });

  it('marks the caller as the campign manger', async () => {
    const manager = await campaign.manager();
    assert.equal(manager, accounts[0].address);
  });

  it('allows people to contribute money and marks them as approvers', async () => {
    await campaign.contribute({
      from: accounts[0].address,
      value: ethers.parseUnits("0.002", "ether")
    });

    const isContributer = await campaign.approvers(accounts[0].address);
    assert(isContributer);
  });

  it('requires a minimum contribution', async () => {
    try {
      await campaign.contribute({
        from: accounts[0].address,
        value: ethers.parseUnits("0.001", "ether")
      });
      assert(false);
    } catch(error) {
      assert(error);
    }
  });

  it('allows manager to make payment requests', async () => {
    await campaign.createRequest(
      'Buy batteries', 
      ethers.parseUnits("0.005"), 
      accounts[1].address,
      {
        from: accounts[0].address, // address of manager
      });
    const request = await campaign.requests(0);
    assert.equal('Buy batteries', request.description);
  });
});