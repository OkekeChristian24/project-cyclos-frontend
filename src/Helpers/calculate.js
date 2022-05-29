// import { PRECISION_FACTOR } from "../utils/bignum";
import BigNumber from 'bignumber.js';


const calculate = (chargePercent, taxPercent, price) => {
    const chargePercentBN = new BigNumber(chargePercent);
    const taxPercentBN = new BigNumber(taxPercent);
    const priceBN = new BigNumber(price);
    const percentage = new BigNumber(100)
    
    // const fees = ((Number(chargePercent)*PRECISION_FACTOR) + (Number(taxPercent)*PRECISION_FACTOR)) / (100*PRECISION_FACTOR);
    const feesBN = chargePercentBN.plus(taxPercentBN).dividedBy(percentage) ;
    
    // const feesCharged = fees * Number(price);
    const feesChargedBN = feesBN.times(priceBN);
    
    // return Number(feesCharged) + Number(price);
    return (feesChargedBN.plus(priceBN)).toFixed(15);
};

export default calculate