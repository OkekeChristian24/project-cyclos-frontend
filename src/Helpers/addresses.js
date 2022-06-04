//const chainID = 250;
// const tokenAddress = supportedTokens[chainID][tokenIndex].address;
// Fantom => USDT: 0x049d68029688eabf473097a2fc38ef61633a3c7a
// BSC => USDT: 0x55d398326f99059ff775485246999027b3197955, BUSD: 0xe9e7cea3dedca5984780bafc599bd69add087d56

// Created TestUSD on Fantom net = 0x7d0dFC3A87243B11B831721fC5285b698D9c9ee4

// 0xfa represents 250(decimal) in hexdecimal
// 0x38 represents 56(decimal) in hexdecimal
// Funds-receiving wallet => 0xA62d2fD3A96363976188b011eBF47d2e1232959A


export const supportedTokens = {
    // 250: [
    //     {
    //         index: 1,
    //         name: "USDT",
    //         image: "/images/payment-tokens/usdt.svg",
    //         address: "0x7d0dFC3A87243B11B831721fC5285b698D9c9ee4",
    //         decimals: 18
    //     }
    // ],
    // "0xfa": [
    //     {
    //         index: 1,
    //         name: "USDT",
    //         image: "/images/payment-tokens/usdt.svg",
    //         address: "0x7d0dFC3A87243B11B831721fC5285b698D9c9ee4",
    //         decimals: 18
    //     }
    // ],
    //

    //Test on BSC = 0x771E49134e4b12132bA0bFE259E465b4307D5D7C
    //Main on BSC = 0x55d398326f99059fF775485246999027B3197955
    56: [

        {
            index: 1,
            name: "USDT",
            image: "/images/payment-tokens/usdt.svg",
            address: "0x55d398326f99059fF775485246999027B3197955",
            decimals: 18
        },
        {
            index: 2,
            name: "BUSD",
            image: "/images/payment-tokens/busd.svg",
            address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
            decimals: 18
        },
        {
            index: 3,
            name: "USDC",
            image: "/images/payment-tokens/usdc.svg",
            address: "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d",
            decimals: 18
        }
    ],
    "0x38": [
        {
            index: 1,
            name: "USDT",
            image: "/images/payment-tokens/usdt.svg",
            address: "0x55d398326f99059fF775485246999027B3197955",
            decimals: 18
        },
        {
            index: 2,
            name: "BUSD",
            image: "/images/payment-tokens/busd.svg",
            address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
            decimals: 18
        },
        {
            index: 3,
            name: "USDC",
            image: "/images/payment-tokens/usdc.svg",
            address: "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d",
            decimals: 18
        }
    ],
    // 137: [
    //     {
    //         index: 1,
    //         name: "USDT",
    //         image: "/images/payment-tokens/usdt.svg",
    //         address: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
    //         decimals: 6
    //     },
    //     {
    //         index: 2,
    //         name: "BUSD",
    //         image: "/images/payment-tokens/busd.svg",
    //         address: "0xdAb529f40E671A1D4bF91361c21bf9f0C9712ab7",
    //         decimals: 18
    //     },
    //     {
    //         index: 3,
    //         name: "USDC",
    //         image: "/images/payment-tokens/usdc.svg",
    //         address: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
    //         decimals: 6
    //     }
        

    // ],
    // "0x89": [
    //     {
    //         index: 1,
    //         name: "USDT",
    //         image: "/images/payment-tokens/usdt.svg",
    //         address: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
    //         decimals: 6
    //     },
    //     {
    //         index: 2,
    //         name: "BUSD",
    //         image: "/images/payment-tokens/busd.svg",
    //         address: "0xdAb529f40E671A1D4bF91361c21bf9f0C9712ab7",
    //         decimals: 18
    //     },
    //     {
    //         index: 3,
    //         name: "USDC",
    //         image: "/images/payment-tokens/usdc.svg",
    //         address: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
    //         decimals: 6
    //     }
    // ]
};

/**
 * Test on BSC = 0x4A1162c4dF3dDCA06818C2bbc622EBFb870d2673
 * Main on BSC = 0x2683D33da0B1c182bd8c2D46C9C9B7F51051a54D
 */
export const paymentAddresses = {
    // 250: "0xb18B3e3967C8dF8c989594a73FE6C29AEBa214d8",
    // "0xfa": "0xb18B3e3967C8dF8c989594a73FE6C29AEBa214d8",
    // 137: "0xb18B3e3967C8dF8c989594a73FE6C29AEBa214d8",
    // "0x89": "0xb18B3e3967C8dF8c989594a73FE6C29AEBa214d8",
    
    56: "0x2683D33da0B1c182bd8c2D46C9C9B7F51051a54D",
    "0x38": "0x2683D33da0B1c182bd8c2D46C9C9B7F51051a54D"
};