//const chainID = 250;
// const tokenAddress = supportedTokens[chainID][tokenIndex].address;
// Fantom => USDT: 0x049d68029688eabf473097a2fc38ef61633a3c7a
// BSC => USDT: 0x55d398326f99059ff775485246999027b3197955, BUSD: 0xe9e7cea3dedca5984780bafc599bd69add087d56

// Created TestUSD on Fantom net = 0x7d0dFC3A87243B11B831721fC5285b698D9c9ee4

const fantomHex = 0xfa;
const bscHex = 0x38;

export const supportedTokens = {
    250: [
        {
            index: 1,
            name: "USDT",
            image: "",
            address: "0x7d0dFC3A87243B11B831721fC5285b698D9c9ee4"
        }
    ],
    fantomHex: [
        {
            index: 1,
            name: "USDT",
            image: "",
            address: "0x049d68029688eabf473097a2fc38ef61633a3c7a"
        }
    ],
    56: [
        {
            index: 1,
            name: "USDT",
            image: "",
            address: "0x55d398326f99059ff775485246999027b3197955"
        },
        {
            index: 2,
            name: "BUSD",
            image: "",
            address: "0xe9e7cea3dedca5984780bafc599bd69add087d56"
        }
    ],
    bscHex: [
        {
            index: 1,
            name: "USDT",
            image: "",
            address: "0x55d398326f99059ff775485246999027b3197955"
        },
        {
            index: 2,
            name: "BUSD",
            image: "",
            address: "0xe9e7cea3dedca5984780bafc599bd69add087d56"
        }
    ]
};

// export const supportedTokens = {
//     250: {
//         1: {
//             address: "",
//             name: "USDT"
//         }
//     },

//     56: {
//         1: {
//             address: "",
//             name: "USDT"
//         },
//         2: {
//             address: "",
//             name: "BUSD"
//         }
//     }

// };

export const paymentAddresses = {
    250: "0xf7FD0dBA3410A28cB3de622d37Ee066C5cBACc6B",
    56: "not-yet-deployed"
};