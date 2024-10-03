/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "../common";

export declare namespace MarsxCommunity {
  export type OwnerStruct = {
    ownerAddress: AddressLike;
    quantity: BigNumberish;
  };

  export type OwnerStructOutput = [ownerAddress: string, quantity: bigint] & {
    ownerAddress: string;
    quantity: bigint;
  };
}

export interface MarsxCommunityInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "available"
      | "balanceOf"
      | "balanceOfBatch"
      | "communityOwners"
      | "getCommunityOwners"
      | "isApprovedForAll"
      | "lastMintedItemId"
      | "mintWithMX"
      | "mintWithUSDT"
      | "mxPrice"
      | "mxToken"
      | "name"
      | "nonces"
      | "owner"
      | "publishCommunties"
      | "renounceOwnership"
      | "safeBatchTransferFrom"
      | "safeTransferFrom"
      | "setApprovalForAll"
      | "setBaseURI"
      | "setMXPrice"
      | "setUsdtPrice"
      | "supportsInterface"
      | "symbol"
      | "toggleUsdtPurchases"
      | "totalPublished"
      | "totalSupply"
      | "transferOwnership"
      | "uri"
      | "usdtEnabled"
      | "usdtPrice"
      | "usdtToken"
      | "withdrawTokens"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "ApprovalForAll"
      | "BaseURISet"
      | "CommunityPublished"
      | "MintedWithMX"
      | "MintedWithUSDT"
      | "OwnershipTransferred"
      | "TokensWithdrawn"
      | "TransferBatch"
      | "TransferSingle"
      | "URI"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "available",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "balanceOf",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "balanceOfBatch",
    values: [AddressLike[], BigNumberish[]]
  ): string;
  encodeFunctionData(
    functionFragment: "communityOwners",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getCommunityOwners",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "isApprovedForAll",
    values: [AddressLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "lastMintedItemId",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "mintWithMX",
    values: [BigNumberish, BigNumberish, BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "mintWithUSDT",
    values: [BigNumberish, BigNumberish, BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(functionFragment: "mxPrice", values?: undefined): string;
  encodeFunctionData(functionFragment: "mxToken", values?: undefined): string;
  encodeFunctionData(functionFragment: "name", values?: undefined): string;
  encodeFunctionData(functionFragment: "nonces", values: [AddressLike]): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "publishCommunties",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "safeBatchTransferFrom",
    values: [
      AddressLike,
      AddressLike,
      BigNumberish[],
      BigNumberish[],
      BytesLike
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "safeTransferFrom",
    values: [AddressLike, AddressLike, BigNumberish, BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "setApprovalForAll",
    values: [AddressLike, boolean]
  ): string;
  encodeFunctionData(functionFragment: "setBaseURI", values: [string]): string;
  encodeFunctionData(
    functionFragment: "setMXPrice",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setUsdtPrice",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "supportsInterface",
    values: [BytesLike]
  ): string;
  encodeFunctionData(functionFragment: "symbol", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "toggleUsdtPurchases",
    values: [boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "totalPublished",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "totalSupply",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [AddressLike]
  ): string;
  encodeFunctionData(functionFragment: "uri", values: [BigNumberish]): string;
  encodeFunctionData(
    functionFragment: "usdtEnabled",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "usdtPrice", values?: undefined): string;
  encodeFunctionData(functionFragment: "usdtToken", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "withdrawTokens",
    values: [AddressLike, BigNumberish, boolean]
  ): string;

  decodeFunctionResult(functionFragment: "available", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "balanceOfBatch",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "communityOwners",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getCommunityOwners",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isApprovedForAll",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "lastMintedItemId",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "mintWithMX", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "mintWithUSDT",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "mxPrice", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "mxToken", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "nonces", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "publishCommunties",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "safeBatchTransferFrom",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "safeTransferFrom",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setApprovalForAll",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setBaseURI", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setMXPrice", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setUsdtPrice",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "supportsInterface",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "symbol", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "toggleUsdtPurchases",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "totalPublished",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "totalSupply",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "uri", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "usdtEnabled",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "usdtPrice", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "usdtToken", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "withdrawTokens",
    data: BytesLike
  ): Result;
}

export namespace ApprovalForAllEvent {
  export type InputTuple = [
    account: AddressLike,
    operator: AddressLike,
    approved: boolean
  ];
  export type OutputTuple = [
    account: string,
    operator: string,
    approved: boolean
  ];
  export interface OutputObject {
    account: string;
    operator: string;
    approved: boolean;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace BaseURISetEvent {
  export type InputTuple = [newBaseURI: string];
  export type OutputTuple = [newBaseURI: string];
  export interface OutputObject {
    newBaseURI: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace CommunityPublishedEvent {
  export type InputTuple = [communityId: BigNumberish, isPublished: boolean];
  export type OutputTuple = [communityId: bigint, isPublished: boolean];
  export interface OutputObject {
    communityId: bigint;
    isPublished: boolean;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace MintedWithMXEvent {
  export type InputTuple = [
    buyer: AddressLike,
    communityId: BigNumberish,
    quantity: BigNumberish
  ];
  export type OutputTuple = [
    buyer: string,
    communityId: bigint,
    quantity: bigint
  ];
  export interface OutputObject {
    buyer: string;
    communityId: bigint;
    quantity: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace MintedWithUSDTEvent {
  export type InputTuple = [
    buyer: AddressLike,
    communityId: BigNumberish,
    quantity: BigNumberish
  ];
  export type OutputTuple = [
    buyer: string,
    communityId: bigint,
    quantity: bigint
  ];
  export interface OutputObject {
    buyer: string;
    communityId: bigint;
    quantity: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace OwnershipTransferredEvent {
  export type InputTuple = [previousOwner: AddressLike, newOwner: AddressLike];
  export type OutputTuple = [previousOwner: string, newOwner: string];
  export interface OutputObject {
    previousOwner: string;
    newOwner: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace TokensWithdrawnEvent {
  export type InputTuple = [
    to: AddressLike,
    amount: BigNumberish,
    isUSDT: boolean
  ];
  export type OutputTuple = [to: string, amount: bigint, isUSDT: boolean];
  export interface OutputObject {
    to: string;
    amount: bigint;
    isUSDT: boolean;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace TransferBatchEvent {
  export type InputTuple = [
    operator: AddressLike,
    from: AddressLike,
    to: AddressLike,
    ids: BigNumberish[],
    values: BigNumberish[]
  ];
  export type OutputTuple = [
    operator: string,
    from: string,
    to: string,
    ids: bigint[],
    values: bigint[]
  ];
  export interface OutputObject {
    operator: string;
    from: string;
    to: string;
    ids: bigint[];
    values: bigint[];
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace TransferSingleEvent {
  export type InputTuple = [
    operator: AddressLike,
    from: AddressLike,
    to: AddressLike,
    id: BigNumberish,
    value: BigNumberish
  ];
  export type OutputTuple = [
    operator: string,
    from: string,
    to: string,
    id: bigint,
    value: bigint
  ];
  export interface OutputObject {
    operator: string;
    from: string;
    to: string;
    id: bigint;
    value: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace URIEvent {
  export type InputTuple = [value: string, id: BigNumberish];
  export type OutputTuple = [value: string, id: bigint];
  export interface OutputObject {
    value: string;
    id: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface MarsxCommunity extends BaseContract {
  connect(runner?: ContractRunner | null): MarsxCommunity;
  waitForDeployment(): Promise<this>;

  interface: MarsxCommunityInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  available: TypedContractMethod<[arg0: BigNumberish], [boolean], "view">;

  balanceOf: TypedContractMethod<
    [account: AddressLike, id: BigNumberish],
    [bigint],
    "view"
  >;

  balanceOfBatch: TypedContractMethod<
    [accounts: AddressLike[], ids: BigNumberish[]],
    [bigint[]],
    "view"
  >;

  communityOwners: TypedContractMethod<
    [arg0: BigNumberish, arg1: BigNumberish],
    [[string, bigint] & { ownerAddress: string; quantity: bigint }],
    "view"
  >;

  getCommunityOwners: TypedContractMethod<
    [communityId: BigNumberish],
    [MarsxCommunity.OwnerStructOutput[]],
    "view"
  >;

  isApprovedForAll: TypedContractMethod<
    [account: AddressLike, operator: AddressLike],
    [boolean],
    "view"
  >;

  lastMintedItemId: TypedContractMethod<[arg0: BigNumberish], [bigint], "view">;

  mintWithMX: TypedContractMethod<
    [
      communityId: BigNumberish,
      quantity: BigNumberish,
      nonce: BigNumberish,
      signature: BytesLike
    ],
    [void],
    "nonpayable"
  >;

  mintWithUSDT: TypedContractMethod<
    [
      communityId: BigNumberish,
      quantity: BigNumberish,
      nonce: BigNumberish,
      signature: BytesLike
    ],
    [void],
    "nonpayable"
  >;

  mxPrice: TypedContractMethod<[], [bigint], "view">;

  mxToken: TypedContractMethod<[], [string], "view">;

  name: TypedContractMethod<[], [string], "view">;

  nonces: TypedContractMethod<[arg0: AddressLike], [bigint], "view">;

  owner: TypedContractMethod<[], [string], "view">;

  publishCommunties: TypedContractMethod<
    [_toBePublished: BigNumberish],
    [void],
    "nonpayable"
  >;

  renounceOwnership: TypedContractMethod<[], [void], "nonpayable">;

  safeBatchTransferFrom: TypedContractMethod<
    [
      from: AddressLike,
      to: AddressLike,
      ids: BigNumberish[],
      values: BigNumberish[],
      data: BytesLike
    ],
    [void],
    "nonpayable"
  >;

  safeTransferFrom: TypedContractMethod<
    [
      from: AddressLike,
      to: AddressLike,
      id: BigNumberish,
      amount: BigNumberish,
      data: BytesLike
    ],
    [void],
    "nonpayable"
  >;

  setApprovalForAll: TypedContractMethod<
    [operator: AddressLike, approved: boolean],
    [void],
    "nonpayable"
  >;

  setBaseURI: TypedContractMethod<[newBaseURI: string], [void], "nonpayable">;

  setMXPrice: TypedContractMethod<
    [newPrice: BigNumberish],
    [void],
    "nonpayable"
  >;

  setUsdtPrice: TypedContractMethod<
    [newPrice: BigNumberish],
    [void],
    "nonpayable"
  >;

  supportsInterface: TypedContractMethod<
    [interfaceId: BytesLike],
    [boolean],
    "view"
  >;

  symbol: TypedContractMethod<[], [string], "view">;

  toggleUsdtPurchases: TypedContractMethod<
    [enabled: boolean],
    [void],
    "nonpayable"
  >;

  totalPublished: TypedContractMethod<[], [bigint], "view">;

  totalSupply: TypedContractMethod<[], [bigint], "view">;

  transferOwnership: TypedContractMethod<
    [newOwner: AddressLike],
    [void],
    "nonpayable"
  >;

  uri: TypedContractMethod<[tokenId: BigNumberish], [string], "view">;

  usdtEnabled: TypedContractMethod<[], [boolean], "view">;

  usdtPrice: TypedContractMethod<[], [bigint], "view">;

  usdtToken: TypedContractMethod<[], [string], "view">;

  withdrawTokens: TypedContractMethod<
    [to: AddressLike, amount: BigNumberish, isUSDT: boolean],
    [void],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "available"
  ): TypedContractMethod<[arg0: BigNumberish], [boolean], "view">;
  getFunction(
    nameOrSignature: "balanceOf"
  ): TypedContractMethod<
    [account: AddressLike, id: BigNumberish],
    [bigint],
    "view"
  >;
  getFunction(
    nameOrSignature: "balanceOfBatch"
  ): TypedContractMethod<
    [accounts: AddressLike[], ids: BigNumberish[]],
    [bigint[]],
    "view"
  >;
  getFunction(
    nameOrSignature: "communityOwners"
  ): TypedContractMethod<
    [arg0: BigNumberish, arg1: BigNumberish],
    [[string, bigint] & { ownerAddress: string; quantity: bigint }],
    "view"
  >;
  getFunction(
    nameOrSignature: "getCommunityOwners"
  ): TypedContractMethod<
    [communityId: BigNumberish],
    [MarsxCommunity.OwnerStructOutput[]],
    "view"
  >;
  getFunction(
    nameOrSignature: "isApprovedForAll"
  ): TypedContractMethod<
    [account: AddressLike, operator: AddressLike],
    [boolean],
    "view"
  >;
  getFunction(
    nameOrSignature: "lastMintedItemId"
  ): TypedContractMethod<[arg0: BigNumberish], [bigint], "view">;
  getFunction(
    nameOrSignature: "mintWithMX"
  ): TypedContractMethod<
    [
      communityId: BigNumberish,
      quantity: BigNumberish,
      nonce: BigNumberish,
      signature: BytesLike
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "mintWithUSDT"
  ): TypedContractMethod<
    [
      communityId: BigNumberish,
      quantity: BigNumberish,
      nonce: BigNumberish,
      signature: BytesLike
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "mxPrice"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "mxToken"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "name"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "nonces"
  ): TypedContractMethod<[arg0: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "owner"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "publishCommunties"
  ): TypedContractMethod<[_toBePublished: BigNumberish], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "renounceOwnership"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "safeBatchTransferFrom"
  ): TypedContractMethod<
    [
      from: AddressLike,
      to: AddressLike,
      ids: BigNumberish[],
      values: BigNumberish[],
      data: BytesLike
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "safeTransferFrom"
  ): TypedContractMethod<
    [
      from: AddressLike,
      to: AddressLike,
      id: BigNumberish,
      amount: BigNumberish,
      data: BytesLike
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "setApprovalForAll"
  ): TypedContractMethod<
    [operator: AddressLike, approved: boolean],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "setBaseURI"
  ): TypedContractMethod<[newBaseURI: string], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "setMXPrice"
  ): TypedContractMethod<[newPrice: BigNumberish], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "setUsdtPrice"
  ): TypedContractMethod<[newPrice: BigNumberish], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "supportsInterface"
  ): TypedContractMethod<[interfaceId: BytesLike], [boolean], "view">;
  getFunction(
    nameOrSignature: "symbol"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "toggleUsdtPurchases"
  ): TypedContractMethod<[enabled: boolean], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "totalPublished"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "totalSupply"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "transferOwnership"
  ): TypedContractMethod<[newOwner: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "uri"
  ): TypedContractMethod<[tokenId: BigNumberish], [string], "view">;
  getFunction(
    nameOrSignature: "usdtEnabled"
  ): TypedContractMethod<[], [boolean], "view">;
  getFunction(
    nameOrSignature: "usdtPrice"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "usdtToken"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "withdrawTokens"
  ): TypedContractMethod<
    [to: AddressLike, amount: BigNumberish, isUSDT: boolean],
    [void],
    "nonpayable"
  >;

  getEvent(
    key: "ApprovalForAll"
  ): TypedContractEvent<
    ApprovalForAllEvent.InputTuple,
    ApprovalForAllEvent.OutputTuple,
    ApprovalForAllEvent.OutputObject
  >;
  getEvent(
    key: "BaseURISet"
  ): TypedContractEvent<
    BaseURISetEvent.InputTuple,
    BaseURISetEvent.OutputTuple,
    BaseURISetEvent.OutputObject
  >;
  getEvent(
    key: "CommunityPublished"
  ): TypedContractEvent<
    CommunityPublishedEvent.InputTuple,
    CommunityPublishedEvent.OutputTuple,
    CommunityPublishedEvent.OutputObject
  >;
  getEvent(
    key: "MintedWithMX"
  ): TypedContractEvent<
    MintedWithMXEvent.InputTuple,
    MintedWithMXEvent.OutputTuple,
    MintedWithMXEvent.OutputObject
  >;
  getEvent(
    key: "MintedWithUSDT"
  ): TypedContractEvent<
    MintedWithUSDTEvent.InputTuple,
    MintedWithUSDTEvent.OutputTuple,
    MintedWithUSDTEvent.OutputObject
  >;
  getEvent(
    key: "OwnershipTransferred"
  ): TypedContractEvent<
    OwnershipTransferredEvent.InputTuple,
    OwnershipTransferredEvent.OutputTuple,
    OwnershipTransferredEvent.OutputObject
  >;
  getEvent(
    key: "TokensWithdrawn"
  ): TypedContractEvent<
    TokensWithdrawnEvent.InputTuple,
    TokensWithdrawnEvent.OutputTuple,
    TokensWithdrawnEvent.OutputObject
  >;
  getEvent(
    key: "TransferBatch"
  ): TypedContractEvent<
    TransferBatchEvent.InputTuple,
    TransferBatchEvent.OutputTuple,
    TransferBatchEvent.OutputObject
  >;
  getEvent(
    key: "TransferSingle"
  ): TypedContractEvent<
    TransferSingleEvent.InputTuple,
    TransferSingleEvent.OutputTuple,
    TransferSingleEvent.OutputObject
  >;
  getEvent(
    key: "URI"
  ): TypedContractEvent<
    URIEvent.InputTuple,
    URIEvent.OutputTuple,
    URIEvent.OutputObject
  >;

  filters: {
    "ApprovalForAll(address,address,bool)": TypedContractEvent<
      ApprovalForAllEvent.InputTuple,
      ApprovalForAllEvent.OutputTuple,
      ApprovalForAllEvent.OutputObject
    >;
    ApprovalForAll: TypedContractEvent<
      ApprovalForAllEvent.InputTuple,
      ApprovalForAllEvent.OutputTuple,
      ApprovalForAllEvent.OutputObject
    >;

    "BaseURISet(string)": TypedContractEvent<
      BaseURISetEvent.InputTuple,
      BaseURISetEvent.OutputTuple,
      BaseURISetEvent.OutputObject
    >;
    BaseURISet: TypedContractEvent<
      BaseURISetEvent.InputTuple,
      BaseURISetEvent.OutputTuple,
      BaseURISetEvent.OutputObject
    >;

    "CommunityPublished(uint256,bool)": TypedContractEvent<
      CommunityPublishedEvent.InputTuple,
      CommunityPublishedEvent.OutputTuple,
      CommunityPublishedEvent.OutputObject
    >;
    CommunityPublished: TypedContractEvent<
      CommunityPublishedEvent.InputTuple,
      CommunityPublishedEvent.OutputTuple,
      CommunityPublishedEvent.OutputObject
    >;

    "MintedWithMX(address,uint256,uint256)": TypedContractEvent<
      MintedWithMXEvent.InputTuple,
      MintedWithMXEvent.OutputTuple,
      MintedWithMXEvent.OutputObject
    >;
    MintedWithMX: TypedContractEvent<
      MintedWithMXEvent.InputTuple,
      MintedWithMXEvent.OutputTuple,
      MintedWithMXEvent.OutputObject
    >;

    "MintedWithUSDT(address,uint256,uint256)": TypedContractEvent<
      MintedWithUSDTEvent.InputTuple,
      MintedWithUSDTEvent.OutputTuple,
      MintedWithUSDTEvent.OutputObject
    >;
    MintedWithUSDT: TypedContractEvent<
      MintedWithUSDTEvent.InputTuple,
      MintedWithUSDTEvent.OutputTuple,
      MintedWithUSDTEvent.OutputObject
    >;

    "OwnershipTransferred(address,address)": TypedContractEvent<
      OwnershipTransferredEvent.InputTuple,
      OwnershipTransferredEvent.OutputTuple,
      OwnershipTransferredEvent.OutputObject
    >;
    OwnershipTransferred: TypedContractEvent<
      OwnershipTransferredEvent.InputTuple,
      OwnershipTransferredEvent.OutputTuple,
      OwnershipTransferredEvent.OutputObject
    >;

    "TokensWithdrawn(address,uint256,bool)": TypedContractEvent<
      TokensWithdrawnEvent.InputTuple,
      TokensWithdrawnEvent.OutputTuple,
      TokensWithdrawnEvent.OutputObject
    >;
    TokensWithdrawn: TypedContractEvent<
      TokensWithdrawnEvent.InputTuple,
      TokensWithdrawnEvent.OutputTuple,
      TokensWithdrawnEvent.OutputObject
    >;

    "TransferBatch(address,address,address,uint256[],uint256[])": TypedContractEvent<
      TransferBatchEvent.InputTuple,
      TransferBatchEvent.OutputTuple,
      TransferBatchEvent.OutputObject
    >;
    TransferBatch: TypedContractEvent<
      TransferBatchEvent.InputTuple,
      TransferBatchEvent.OutputTuple,
      TransferBatchEvent.OutputObject
    >;

    "TransferSingle(address,address,address,uint256,uint256)": TypedContractEvent<
      TransferSingleEvent.InputTuple,
      TransferSingleEvent.OutputTuple,
      TransferSingleEvent.OutputObject
    >;
    TransferSingle: TypedContractEvent<
      TransferSingleEvent.InputTuple,
      TransferSingleEvent.OutputTuple,
      TransferSingleEvent.OutputObject
    >;

    "URI(string,uint256)": TypedContractEvent<
      URIEvent.InputTuple,
      URIEvent.OutputTuple,
      URIEvent.OutputObject
    >;
    URI: TypedContractEvent<
      URIEvent.InputTuple,
      URIEvent.OutputTuple,
      URIEvent.OutputObject
    >;
  };
}
