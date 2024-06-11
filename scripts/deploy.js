// const hre = require("hardhat");
const { deployments, ethers } = require("hardhat");

async function main() {
  // Deploy Campaign contract
//   const Campaign = await hre.ethers.getContractFactory("Campaign");
//   const campaign = await Campaign.deploy();
// //   await campaign.deployed();
//   console.log("Campaign deployed to:", campaign.address);

  // Deploy CampaignFactory contract
  // const CampaignFactory = await hre.ethers.getContractFactory("CampaignFactory");
  // const campaignFactory = await CampaignFactory.deploy();
  // console.log("CampaignFactory deployed to:", campaignFactory.address);
  const { deploy } = deployments;
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const CampaignFactory = await deploy("CampaignFactory", {
    from: deployer.address,
    args: [],
    log: true,
  });

  console.log("CampaignFactory deployed to:", CampaignFactory.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('ERROR: ', error);
    process.exit(1);
  });


// const { deployments, ethers } = require("hardhat");

// module.exports = async function () {
//   const { deploy } = deployments;
//   const [deployer] = await ethers.getSigners();

//   console.log("Deploying contracts with the account:", deployer.address);

//   const CampaignFactory = await deploy("CampaignFactory", {
//     from: deployer.address,
//     args: [],
//     log: true,
//   });

//   console.log("CampaignFactory deployed to:", CampaignFactory.address);
// };

// module.exports.tags = ["all"];
