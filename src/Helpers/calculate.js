
const calculate = (chargePercent, taxPercent, price) => {
    const fees = (Number(chargePercent) + Number(taxPercent)) / 100;
    const feesCharged = fees * Number(price);

    return Number(feesCharged) + Number(price);
};

export default calculate