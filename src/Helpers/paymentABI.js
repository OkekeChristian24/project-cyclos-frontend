// const ABI = [
//     {
//         "inputs": [
//             {
//                 "internalType": "address payable",
//                 "name": "wallet",
//                 "type": "address"
//             }
//         ],
//         "stateMutability": "nonpayable",
//         "type": "constructor"
//     },
//     {
//         "anonymous": false,
//         "inputs": [
//             {
//                 "indexed": true,
//                 "internalType": "address",
//                 "name": "tokenAddress",
//                 "type": "address"
//             },
//             {
//                 "indexed": true,
//                 "internalType": "uint256",
//                 "name": "tokenIndex",
//                 "type": "uint256"
//             }
//         ],
//         "name": "NewTokenAdded",
//         "type": "event"
//     },
//     {
//         "anonymous": false,
//         "inputs": [
//             {
//                 "indexed": true,
//                 "internalType": "address",
//                 "name": "walletAddress",
//                 "type": "address"
//             }
//         ],
//         "name": "NewWalletSet",
//         "type": "event"
//     },
//     {
//         "anonymous": false,
//         "inputs": [
//             {
//                 "indexed": true,
//                 "internalType": "address",
//                 "name": "previousOwner",
//                 "type": "address"
//             },
//             {
//                 "indexed": true,
//                 "internalType": "address",
//                 "name": "newOwner",
//                 "type": "address"
//             }
//         ],
//         "name": "OwnershipTransferred",
//         "type": "event"
//     },
//     {
//         "anonymous": false,
//         "inputs": [
//             {
//                 "indexed": true,
//                 "internalType": "string",
//                 "name": "orderID",
//                 "type": "string"
//             },
//             {
//                 "indexed": true,
//                 "internalType": "string",
//                 "name": "paymentID",
//                 "type": "string"
//             },
//             {
//                 "indexed": true,
//                 "internalType": "address",
//                 "name": "buyer",
//                 "type": "address"
//             }
//         ],
//         "name": "TransactionMade",
//         "type": "event"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "address",
//                 "name": "newTokenAddress",
//                 "type": "address"
//             }
//         ],
//         "name": "addPaymentToken",
//         "outputs": [],
//         "stateMutability": "nonpayable",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "address",
//                 "name": "tokenAddress",
//                 "type": "address"
//             }
//         ],
//         "name": "getTokenIndex",
//         "outputs": [
//             {
//                 "internalType": "uint256",
//                 "name": "",
//                 "type": "uint256"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "address",
//                 "name": "buyer",
//                 "type": "address"
//             },
//             {
//                 "internalType": "string",
//                 "name": "orderId",
//                 "type": "string"
//             }
//         ],
//         "name": "getTransactionDetails",
//         "outputs": [
//             {
//                 "components": [
//                     {
//                         "internalType": "string",
//                         "name": "orderID",
//                         "type": "string"
//                     },
//                     {
//                         "internalType": "string",
//                         "name": "paymentID",
//                         "type": "string"
//                     },
//                     {
//                         "internalType": "address",
//                         "name": "tokenAddress",
//                         "type": "address"
//                     },
//                     {
//                         "internalType": "uint256",
//                         "name": "tokenIndex",
//                         "type": "uint256"
//                     },
//                     {
//                         "internalType": "uint256",
//                         "name": "totalPrice",
//                         "type": "uint256"
//                     },
//                     {
//                         "internalType": "uint256",
//                         "name": "totalQty",
//                         "type": "uint256"
//                     },
//                     {
//                         "internalType": "uint256",
//                         "name": "numOfProducts",
//                         "type": "uint256"
//                     }
//                 ],
//                 "internalType": "struct Payment.OrderDetail",
//                 "name": "",
//                 "type": "tuple"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "string",
//                 "name": "orderId",
//                 "type": "string"
//             },
//             {
//                 "internalType": "uint256",
//                 "name": "tokenIndex",
//                 "type": "uint256"
//             },
//             {
//                 "internalType": "uint256",
//                 "name": "totalPrice",
//                 "type": "uint256"
//             },
//             {
//                 "internalType": "uint256",
//                 "name": "totalQty",
//                 "type": "uint256"
//             },
//             {
//                 "components": [
//                     {
//                         "internalType": "string",
//                         "name": "asin",
//                         "type": "string"
//                     },
//                     {
//                         "internalType": "uint256",
//                         "name": "price",
//                         "type": "uint256"
//                     },
//                     {
//                         "internalType": "uint256",
//                         "name": "quantity",
//                         "type": "uint256"
//                     }
//                 ],
//                 "internalType": "struct Payment.Product[]",
//                 "name": "products",
//                 "type": "tuple[]"
//             }
//         ],
//         "name": "makePayment",
//         "outputs": [],
//         "stateMutability": "nonpayable",
//         "type": "function"
//     },
//     {
//         "inputs": [],
//         "name": "owner",
//         "outputs": [
//             {
//                 "internalType": "address",
//                 "name": "",
//                 "type": "address"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "address",
//                 "name": "",
//                 "type": "address"
//             }
//         ],
//         "name": "paymentTokensIndex",
//         "outputs": [
//             {
//                 "internalType": "uint256",
//                 "name": "",
//                 "type": "uint256"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "inputs": [],
//         "name": "renounceOwnership",
//         "outputs": [],
//         "stateMutability": "nonpayable",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "address payable",
//                 "name": "newWallet",
//                 "type": "address"
//             }
//         ],
//         "name": "setWallet",
//         "outputs": [],
//         "stateMutability": "nonpayable",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "uint256",
//                 "name": "",
//                 "type": "uint256"
//             }
//         ],
//         "name": "supportedTokens",
//         "outputs": [
//             {
//                 "internalType": "address",
//                 "name": "",
//                 "type": "address"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "address",
//                 "name": "newOwner",
//                 "type": "address"
//             }
//         ],
//         "name": "transferOwnership",
//         "outputs": [],
//         "stateMutability": "nonpayable",
//         "type": "function"
//     }
// ];

const ABI = [
	{
		"inputs": [
			{
				"internalType": "address payable",
				"name": "_wallet",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "tokenAddress",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenIndex",
				"type": "uint256"
			}
		],
		"name": "NewTokenAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "walletAddress",
				"type": "address"
			}
		],
		"name": "NewWalletSet",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "string",
				"name": "orderID",
				"type": "string"
			},
			{
				"indexed": true,
				"internalType": "string",
				"name": "paymentID",
				"type": "string"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "buyer",
				"type": "address"
			}
		],
		"name": "TransactionMade",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newTokenAddress",
				"type": "address"
			}
		],
		"name": "addPaymentToken",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "tokenAddress",
				"type": "address"
			}
		],
		"name": "getTokenIndex",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "buyer",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "orderId",
				"type": "string"
			}
		],
		"name": "getTransactionDetails",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "orderID",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "paymentID",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "tokenAddress",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "tokenIndex",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "totalPrice",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "totalQty",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "numOfProducts",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "buyer",
						"type": "address"
					}
				],
				"internalType": "struct Payment.OrderDetail",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "orderId",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "tokenIndex",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "totalPrice",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "totalQty",
				"type": "uint256"
			},
			{
				"components": [
					{
						"internalType": "string",
						"name": "asin",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "price",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "quantity",
						"type": "uint256"
					}
				],
				"internalType": "struct Payment.Product[]",
				"name": "products",
				"type": "tuple[]"
			}
		],
		"name": "makePayment",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "paymentTokensIndex",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address payable",
				"name": "newWallet",
				"type": "address"
			}
		],
		"name": "setWallet",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "supportedTokens",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "wallet",
		"outputs": [
			{
				"internalType": "address payable",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

export default ABI;