//const chainID = 250;
// const tokenAddress = supportedTokens[chainID][tokenIndex].address;
// Fantom => USDT: 0x049d68029688eabf473097a2fc38ef61633a3c7a
// BSC => USDT: 0x55d398326f99059ff775485246999027b3197955, BUSD: 0xe9e7cea3dedca5984780bafc599bd69add087d56

// Created TestUSD on Fantom net = 0x7d0dFC3A87243B11B831721fC5285b698D9c9ee4

// 0xfa represents 250(decimal) in hexdecimal
// 0x38 represents 56(decimal) in hexdecimal
// Funds-receiving wallet => 0xA62d2fD3A96363976188b011eBF47d2e1232959A
const fantomHex = "0xfa";
const bscHex = "0x38";


export const supportedTokens = {
    250: [
        {
            index: 1,
            name: "USDT",
            image: "",
            address: "0x7d0dFC3A87243B11B831721fC5285b698D9c9ee4",
            decimals: 18
        }
    ],
    "0xfa": [
        {
            index: 1,
            name: "USDT",
            image: "",
            address: "0x7d0dFC3A87243B11B831721fC5285b698D9c9ee4",
            decimals: 18
        }
    ],
    56: [
        {
            index: 1,
            name: "USDT",
            image: "",
            address: "0x771E49134e4b12132bA0bFE259E465b4307D5D7C",
            decimals: 18
        },
        {
            index: 2,
            name: "BUSD",
            image: "",
            address: "0x04a467b62B79864c244252092A691d282a003b86",
            decimals: 18
        }
    ],
    "0x38": [
        {
            index: 1,
            name: "USDT",
            image: "",
            address: "0x771E49134e4b12132bA0bFE259E465b4307D5D7C",
            decimals: 18
        },
        {
            index: 2,
            name: "BUSD",
            image: "",
            address: "0x04a467b62B79864c244252092A691d282a003b86",
            decimals: 18
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
    250: "0xb18B3e3967C8dF8c989594a73FE6C29AEBa214d8",
    "0xfa": "0xb18B3e3967C8dF8c989594a73FE6C29AEBa214d8",
    56: "0x2268222c31775AE38e1F168b5aB7EE5d133CF737",
    "0x38": "0x2268222c31775AE38e1F168b5aB7EE5d133CF737"
};