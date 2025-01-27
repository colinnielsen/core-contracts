/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  GeoWebParcelFacet,
  GeoWebParcelFacetInterface,
} from "../GeoWebParcelFacet";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "x",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "y",
        type: "uint256",
      },
    ],
    name: "availabilityIndex",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "getLandParcel",
    outputs: [
      {
        internalType: "uint64",
        name: "baseCoordinate",
        type: "uint64",
      },
      {
        internalType: "uint256[]",
        name: "path",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b506103c2806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c806331a5ee9c1461003b578063e7feff2e1461006b575b600080fd5b610055600480360381019061005091906101e4565b61009c565b6040516100629190610233565b60405180910390f35b6100856004803603810190610080919061024e565b6100d9565b60405161009392919061035c565b60405180910390f35b6000806100a761017c565b905080600001600085815260200190815260200160002060008481526020019081526020016000205491505092915050565b6000606060006100e761017c565b9050600081600101600086815260200190815260200160002090508060000160009054906101000a900467ffffffffffffffff16816001018080548060200260200160405190810160405280929190818152602001828054801561016a57602002820191906000526020600020905b815481526020019060010190808311610156575b50505050509050935093505050915091565b6000807f1d99a33cbbd99d244d8804dd6e7f77acb60cc0c0934fe2f7b00cabddc4b4b0f890508091505090565b600080fd5b6000819050919050565b6101c1816101ae565b81146101cc57600080fd5b50565b6000813590506101de816101b8565b92915050565b600080604083850312156101fb576101fa6101a9565b5b6000610209858286016101cf565b925050602061021a858286016101cf565b9150509250929050565b61022d816101ae565b82525050565b60006020820190506102486000830184610224565b92915050565b600060208284031215610264576102636101a9565b5b6000610272848285016101cf565b91505092915050565b600067ffffffffffffffff82169050919050565b6102988161027b565b82525050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b6102d3816101ae565b82525050565b60006102e583836102ca565b60208301905092915050565b6000602082019050919050565b60006103098261029e565b61031381856102a9565b935061031e836102ba565b8060005b8381101561034f57815161033688826102d9565b9750610341836102f1565b925050600181019050610322565b5085935050505092915050565b6000604082019050610371600083018561028f565b818103602083015261038381846102fe565b9050939250505056fea26469706673582212207a0643ac14b1979f10b0b20d7026303250f30cd6db59d6d237971e183287b2f664736f6c63430008100033";

type GeoWebParcelFacetConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: GeoWebParcelFacetConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class GeoWebParcelFacet__factory extends ContractFactory {
  constructor(...args: GeoWebParcelFacetConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "GeoWebParcelFacet";
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<GeoWebParcelFacet> {
    return super.deploy(overrides || {}) as Promise<GeoWebParcelFacet>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): GeoWebParcelFacet {
    return super.attach(address) as GeoWebParcelFacet;
  }
  connect(signer: Signer): GeoWebParcelFacet__factory {
    return super.connect(signer) as GeoWebParcelFacet__factory;
  }
  static readonly contractName: "GeoWebParcelFacet";
  public readonly contractName: "GeoWebParcelFacet";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): GeoWebParcelFacetInterface {
    return new utils.Interface(_abi) as GeoWebParcelFacetInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): GeoWebParcelFacet {
    return new Contract(address, _abi, signerOrProvider) as GeoWebParcelFacet;
  }
}
