import axios from "axios";
import { serverHost } from "./backendHost";

const getFeesPercent = async (company) => {
    const feesPercent = await axios.get(`${serverHost}/api/fee/company/${company}`);
    //http://localhost:5000/api/fee/company/amazon
    console.log("feesPercent: ", feesPercent);
    if(feesPercent.data.success === 1){
        return ({
            charge: feesPercent.data.data[0].charge_percent,
            tax: feesPercent.data.data[0].tax_percent
        })
        
    }
    return null;
};

export default getFeesPercent;