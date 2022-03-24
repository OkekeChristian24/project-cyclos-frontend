const otherChains = [

  {
    name: "Ethereum Mainnet",
    short_name: "eth",
    chain: "ETH",
    network: "mainnet",
    chain_id_hex: "0x1",
    chain_id: 1,
    network_id: 1,
    rpc_url: "https://mainnet.infura.io/v3/%API_KEY%",
    native_currency: {
      symbol: "ETH",
      name: "Ethereum",
      decimals: 18,
      contractAddress: "",
      balance: ""
    },
    logoUrl: ""
  },
  {
    name: "Ethereum Ropsten",
    short_name: "rop",
    chain: "ETH",
    network: "ropsten",
    chain_id_hex: "0x3",
    chain_id: 3,
    network_id: 3,
    rpc_url: "https://ropsten.infura.io/v3/%API_KEY%",
    native_currency: {
      symbol: "ETH",
      name: "Ethereum",
      decimals: 18,
      contractAddress: "",
      balance: ""
    },
    logoUrl: ""

  },
  {
    name: "Ethereum Rinkeby",
    short_name: "rin",
    chain: "ETH",
    network: "rinkeby",
    chain_id_hex: "0x4",
    chain_id: 4,
    network_id: 4,
    rpc_url: "https://rinkeby.infura.io/v3/%API_KEY%",
    native_currency: {
      symbol: "ETH",
      name: "Ethereum",
      decimals: 18,
      contractAddress: "",
      balance: ""
    },
    logoUrl: ""
  },
  {
    name: "Ethereum Görli",
    short_name: "gor",
    chain: "ETH",
    network: "goerli",
    chain_id_hex: "0x5",
    chain_id: 5,
    network_id: 5,
    rpc_url: "https://goerli.infura.io/v3/%API_KEY%",
    native_currency: {
      symbol: "ETH",
      name: "Ethereum",
      decimals: 18,
      contractAddress: "",
      balance: ""
    },
    logoUrl: ""
  },
  {
    name: "RSK Mainnet",
    short_name: "rsk",
    chain: "RSK",
    network: "mainnet",
    chain_id_hex: "0x1e",
    chain_id: 30,
    network_id: 30,
    rpc_url: "https://public-node.rsk.co",
    native_currency: {
      symbol: "RSK",
      name: "RSK",
      decimals: 18,
      contractAddress: "",
      balance: ""
    },
    logoUrl: ""
  },
  {
    name: "Ethereum Kovan",
    short_name: "kov",
    chain: "ETH",
    network: "kovan",
    chain_id_hex: "0x2a",
    chain_id: 42,
    network_id: 42,
    rpc_url: "https://kovan.infura.io/v3/%API_KEY%",
    native_currency: {
      symbol: "ETH",
      name: "Ethereum",
      decimals: 18,
      contractAddress: "",
      balance: ""
    },
    logoUrl: ""
  },
  {
    name: "Ethereum Classic Mainnet",
    short_name: "etc",
    chain: "ETC",
    network: "mainnet",
    chain_id_hex: "0x3d",
    chain_id: 61,
    network_id: 1,
    rpc_url: "https://ethereumclassic.network",
    native_currency: {
      symbol: "ETH",
      name: "Ethereum",
      decimals: 18,
      contractAddress: "",
      balance: ""
    },
    logoUrl: ""
  },
  {
    name: "POA Network Sokol",
    short_name: "poa",
    chain: "POA",
    network: "sokol",
    chain_id_hex: "0x4d",
    chain_id: 77,
    network_id: 77,
    rpc_url: "https://sokol.poa.network",
    native_currency: {
      symbol: "POA",
      name: "POA",
      decimals: 18,
      contractAddress: "",
      balance: ""
    },
    logoUrl: ""
  },
  {
    name: "POA Network Core",
    short_name: "skl",
    chain: "POA",
    network: "core",
    chain_id_hex: "0x63",
    chain_id: 99,
    network_id: 99,
    rpc_url: "https://core.poa.network",
    native_currency: {
      symbol: "POA",
      name: "POA",
      decimals: 18,
      contractAddress: "",
      balance: ""
    },
    logoUrl: ""
  },
  {
    name: "xDAI Chain",
    short_name: "xdai",
    chain: "POA",
    network: "dai",
    chain_id_hex: "0x64",
    chain_id: 100,
    network_id: 100,
    rpc_url: "https://dai.poa.network",
    native_currency: {
      symbol: "xDAI",
      name: "xDAI",
      decimals: 18,
      contractAddress: "",
      balance: ""
    },
    logoUrl: ""
  },
  {
    name: "Callisto Mainnet",
    short_name: "clo",
    chain: "callisto",
    network: "mainnet",
    chain_id_hex: "0x334",
    chain_id: 820,
    network_id: 1,
    rpc_url: "https://clo-geth.0xinfra.com/",
    native_currency: {
      symbol: "CLO",
      name: "CLO",
      decimals: 18,
      contractAddress: "",
      balance: ""
    },
    logoUrl: ""
  }
];

const supportedChains = [
  {
    name: "Binance Smart Chain",
    short_name: "bsc",
    chain: "SmartChain",
    network: "mainnet",
    chain_id_hex: "0x38",
    chain_id: 56,
    network_id: 56,
    rpc_url: "https://bsc-dataseed1.defibit.io/",
    native_currency: {
      symbol: "BNB",
      name: "BNB",
      decimals: 18,
      contractAddress: "",
      balance: ""
    },
    logoUrl: "/images/chains/SmartChain/SmartChain.svg",
    blockExplorerUrl: "https://bscscan.com/"
  },
  {
    name: "Fantom Opera",
    short_name: "FTM",
    chain: "Fantom",
    network: "mainnet",
    chain_id_hex: "0xfa",
    chain_id: 250,
    network_id: 250,
    rpc_url: "https://rpc.ftm.tools/",
    native_currency: {
      symbol: "FTM",
      name: "Fantom",
      decimals: 18,
      contractAddress: "",
      balance: ""
    },
    logoUrl: "/images/chains/Fantom/Fantom.svg",
    blockExplorerUrl: "https://ftmscan.com/"
  }
  
];



  
  export default supportedChains;
  