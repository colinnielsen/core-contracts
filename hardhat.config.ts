/**
 * @type import('hardhat/config').HardhatUserConfig
 */

//  require("@matterlabs/hardhat-zksync-deploy");
//  require("@matterlabs/hardhat-zksync-solc");
import { task, types } from "hardhat/config";
import "@nomiclabs/hardhat-ethers";
import { ethers } from "ethers";
import "@nomiclabs/hardhat-web3";
require("@openzeppelin/hardhat-upgrades");
require("@eth-optimism/hardhat-ovm");
require("solidity-coverage");
require("./tasks/Accountant");
require("./tasks/GeoWebParcel");
require("./tasks/ERC721License");
require("./tasks/CollectorSuperApp");
require("./tasks/ETHPurchaser");
require("./tasks/SimpleETHClaimer");
require("./tasks/estimate_minting_gas");

task(
  "deploy",
  "Deploy the set of contracts with default configuration"
).setAction(async (args, hre) => {
  console.log("Deploying all contracts...");
  const parcel = await hre.run("deploy:parcel");
  const accountant = await hre.run("deploy:accountant");
  const license = await hre.run("deploy:license");

  const accounts = await hre.ethers.getSigners();

  // CollectorSuperApp default config
  const collector = await hre.run("deploy:collector", {
    host: "0xeD5B5b32110c3Ded02a07c8b8e97513FAfb883B6",
    cfa: "0xF4C5310E51F6079F601a5fb7120bC72a70b96e2A",
    acceptedToken: "0xa623b2DD931C5162b7a0B25852f4024Db48bb1A0",
    receiver: accounts[0].address,
  });

  console.log("Contracts deployed.");

  console.log("\nSetting default configuration...");

  // Accountant default config
  await hre.run("config:accountant", {
    contract: accountant,
    annualFeeRate: 0.1,
    validator: collector,
  });

  console.log("Default configuration set.");

  console.log("\nSetting roles...");
  // Set roles
  await hre.run("roles:set-default", {
    license: license,
    parcel: parcel,
    accountant: accountant,
    collector: collector,
  });
  console.log("Default roles set.");
});

task("deploy:contracts-only", "Deploy the set of bare contracts").setAction(
  async (args, hre) => {
    await hre.run("deploy:parcel");
    await hre.run("deploy:accountant");
    await hre.run("deploy:license");
    await hre.run("deploy:collector");
  }
);

task("roles:set-default", "Set default roles on all deployed contracts")
  .addOptionalParam("license", "ERC721 License used to find owners", undefined, types.json)
  .addOptionalParam("accountant", "Accountant", undefined, types.json)
  .addOptionalParam("collector", "ETHExpirationCollector", undefined, types.json)
  .addOptionalParam("parcel", "GeoWebParcel", undefined, types.json)
  .addOptionalParam("purchaser", "ETHPurchaser", undefined, types.json)
  .addOptionalParam("claimer", "SimpleETHClaimer", undefined, types.json)
  .addOptionalParam("licenseAddress", "Address of ERC721 License used to find owners", undefined, types.string)
  .addOptionalParam("accountantAddress", "Address of Accountant", undefined, types.string)
  .addOptionalParam("collectorAddress", "Address of ETHExpirationCollector", undefined, types.string)
  .addOptionalParam("parcelAddress", "Address of GeoWebParcel", undefined, types.string)
  .addOptionalParam("purchaserAddress", "Address of ETHPurchaser", undefined, types.string)
  .addOptionalParam("claimerAddress", "Address of SimpleETHClaimer", undefined, types.string)
  .setAction(
    async ({ license, accountant, collector, parcel, purchaser, claimer, licenseAddress, accountantAddress, collectorAddress, parcelAddress, purchaserAddress, claimerAddress }: { license?: ethers.Contract, accountant?: ethers.Contract, collector?: ethers.Contract, parcel?: ethers.Contract, purchaser?: ethers.Contract, claimer?: ethers.Contract, licenseAddress?: string, accountantAddress?: string, collectorAddress?: string, parcelAddress?: string, purchaserAddress?: string, claimerAddress?: string }, hre) => {
      const licenseContract = licenseAddress ? await hre.ethers.getContractAt(
        "ERC721License",
        licenseAddress
      ): license!;
      const collectorContract = collectorAddress ? await hre.ethers.getContractAt(
        "ETHExpirationCollector",
        collectorAddress
      ): collector!;
      const parcelContract = parcelAddress ? await hre.ethers.getContractAt("GeoWebParcel", parcelAddress) : parcel!;

      await hre.run("roles:accountant", {
        accountant: accountant,
        collectorAddress: collectorAddress ?? collector!.address,
      });

      // // ERC721License roles
      // const res2 = await licenseContract.grantRole(
      //   await licenseContract.MINT_ROLE(),
      //   claimerAddress ?? claimer!.address
      // );
      // await res2.wait();

      // const res3 = await licenseContract.grantRole(
      //   await licenseContract.OPERATOR_ROLE(),
      //   purchaserAddress ?? purchaser!.address
      // );
      // await res3.wait();

      // // GeoWebParcel roles
      // const res6 = await parcelContract.grantRole(
      //   await parcelContract.BUILD_ROLE(),
      //   claimerAddress ?? claimer!.address
      // );
      // await res6.wait();
    }
  );

module.exports = {
  networks: {
    hardhat: {
      gasPrice: 0,
      initialBaseFeePerGas: 0
    },
    local: {
      gasPrice: 1000000000,
      url: `http://localhost:8545`,
    },
    kovan: {
      url: `https://kovan.infura.io/v3/${process.env.INFURA_KEY}`,
      chainId: 0x2a,
      gas: 4700000,
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${process.env.INFURA_KEY}`,
      chainId: 4,
      accounts: [process.env.DEV_PRIVATE_KEY],
    },
    sokul: {
      url: "https://sokol.poa.network",
      chainId: 77,
      gasPrice: 1000000000,
    },
    xdai: {
      url: "https://xdai.poanetwork.dev",
      network_id: 100,
      gasPrice: 1000000000,
    },
    arbitrumRinkeby: {
      url: "https://rinkeby.arbitrum.io/rpc",
      chainId: 421611,
      gasPrice: 0,
    },
    optimisticKovan: {
      url: "https://kovan.optimism.io",
      gasPrice: 15000000,
      ovm: true, // This sets the network as using the ovm and ensure contract will be compiled against that.
    },
  },
  zksolc: {
    version: "0.1.0",
    compilerSource: "docker",
    settings: {
      optimizer: {
        enabled: true,
      },
      experimental: {
        dockerImage: "zksyncrobot/test-build",
      },
    },
  },
  zkSyncDeploy: {
    zkSyncNetwork: process.env.ZKSYNC_NETWORK,
    ethNetwork: "rinkeby",
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  ovm: {
    solcVersion: "0.6.12",
  },
};