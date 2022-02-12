export const validEmailRegex = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);

export const validStreetReg = /^[,#@\.:;\(\)\|\w\-\s]+$/;
// const validStreetReg = RegExp(/^[,#@\.:;\(\)\|\w\-\s]+$/);
// var invalidChars = shippingAddress[key].match(/^[,#@\.:;\(\)\|\w\-\s]+$/g);

export const validCityReg = /^[\w\-\s]+$/;

export const validStateReg = /^[\w\-\s]+$/;

export const validCountryReg = /^[\w\-\s]+$/;

export const validPostalCodeReg = /^[\w\-\s]+$/;


