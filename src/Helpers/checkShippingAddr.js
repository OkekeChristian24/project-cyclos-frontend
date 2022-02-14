import { 
    validEmailRegex,
    validStreetReg,
    validCityReg,
    validStateReg,
    validCountryReg,
    validPostalCodeReg
  } from "./regExps";

const checkShippingAddr = (shippingAddress, phoneNum) => {
    let isError = false;
    let updatedShipAddrErr = {};
    let updatedShipAddrErrMsg = {};
    
    Object.keys(shippingAddress).forEach(function(key) {
      
      if(key === "phone"){
        if(phoneNum === undefined){
          isError = true;
          updatedShipAddrErr = {
            ...updatedShipAddrErr,
            [key]: true
          };
          updatedShipAddrErrMsg = {
            ...updatedShipAddrErrMsg,
            [key]: "This Field Is Required"
          };
        }else{
          updatedShipAddrErr = {
            ...updatedShipAddrErr,
            [key]: false
          };
        }
        return;
      }
      
      if (shippingAddress[key] === "") {
        isError = true;
        updatedShipAddrErr = {
          ...updatedShipAddrErr,
          [key]: true
        };
        updatedShipAddrErrMsg = {
          ...updatedShipAddrErrMsg,
          [key]: "This Field Is Required"
        };
      }else{
        switch(key){
          case "email":
            if(!validEmailRegex.test(shippingAddress[key])){
              updatedShipAddrErr = {
                ...updatedShipAddrErr,
                [key]: true
              };
              updatedShipAddrErrMsg = {
                ...updatedShipAddrErrMsg,
                [key]: "Email is NOT valid"
              };
            }else{
              updatedShipAddrErr = {
                ...updatedShipAddrErr,
                [key]: false
              };
            }

            break;
          case "street":
            console.log("Street: ", (shippingAddress[key]));
            if(!validStreetReg.test(shippingAddress[key])){
              updatedShipAddrErr = {
                ...updatedShipAddrErr,
                [key]: true
              };
              updatedShipAddrErrMsg = {
                ...updatedShipAddrErrMsg,
                [key]: `Invalid Inputs Are NOT Allowed`
              };
            }else{
              updatedShipAddrErr = {
                ...updatedShipAddrErr,
                [key]: false
              };
            }
            break;
          case "city":
            if(!validCityReg.test(shippingAddress[key])){
              updatedShipAddrErr = {
                ...updatedShipAddrErr,
                [key]: true
              };
              updatedShipAddrErrMsg = {
                ...updatedShipAddrErrMsg,
                [key]: `City Is NOT Valid`
              };
            }else{
              updatedShipAddrErr = {
                ...updatedShipAddrErr,
                [key]: false
              };
            }
            break;
          case "state":
            if(!validStateReg.test(shippingAddress[key])){
              updatedShipAddrErr = {
                ...updatedShipAddrErr,
                [key]: true
              };
              updatedShipAddrErrMsg = {
                ...updatedShipAddrErrMsg,
                [key]: `State Is NOT Valid`
              };
            }else{
              updatedShipAddrErr = {
                ...updatedShipAddrErr,
                [key]: false
              };
            }
            break;
          case "country":
            if(!validCountryReg.test(shippingAddress[key])){
              updatedShipAddrErr = {
                ...updatedShipAddrErr,
                [key]: true
              };
              updatedShipAddrErrMsg = {
                ...updatedShipAddrErrMsg,
                [key]: `Country Is NOT Valid`
              };
            }else{
              updatedShipAddrErr = {
                ...updatedShipAddrErr,
                [key]: false
              };
            }
            break;
          case "postalCode":
            if(!validPostalCodeReg.test(shippingAddress[key])){
              updatedShipAddrErr = {
                ...updatedShipAddrErr,
                [key]: true
              };
              updatedShipAddrErrMsg = {
                ...updatedShipAddrErrMsg,
                [key]: `Postal Code Is NOT Valid`
              };
            }else{
              updatedShipAddrErr = {
                ...updatedShipAddrErr,
                [key]: false
              };
            }
            break;
          default:
            break;
        }
      }
    });

    // setShippingAddrError({
    //   ...shippingAddrError,
    //   ...updatedShipAddrErr
    // });
    // setShipAddrErrMsg({
    //   ...shipAddrErrMsg,
    //   ...updatedShipAddrErrMsg
    // });

    // return isError;
    return {isError, updatedShipAddrErr, updatedShipAddrErrMsg};
};

export default checkShippingAddr;