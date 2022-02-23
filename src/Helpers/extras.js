const Web3 = require("web3");
const web3 = Web3(window.web3);

web3.eth.getTransactionReceiptMined = function (txnHash, interval) {
    var transactionReceiptAsync;
    interval = interval ? interval : 500;
    transactionReceiptAsync = function(txnHash, resolve, reject) {
        try {
            var receipt = web3.eth.getTransactionReceipt(txnHash);
            if (receipt == null) {
                setTimeout(function () {
                    transactionReceiptAsync(txnHash, resolve, reject);
                }, interval);
            } else {
                resolve(receipt);
            }
        } catch(e) {
            reject(e);
        }
    };

    if (Array.isArray(txnHash)) {
        var promises = [];
        txnHash.forEach(function (oneTxHash) {
            promises.push(web3.eth.getTransactionReceiptMined(oneTxHash, interval));
        });
        return Promise.all(promises);
    } else {
        return new Promise(function (resolve, reject) {
                transactionReceiptAsync(txnHash, resolve, reject);
            });
    }
};



function toFixed(x) {
    if (Math.abs(x) < 1.0) {
      var e = parseInt(x.toString().split('e-')[1]);
      if (e) {
          x *= Math.pow(10,e-1);
          x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
      }
    } else {
      var e = parseInt(x.toString().split('+')[1]);
      if (e > 20) {
          e -= 20;
          x /= Math.pow(10,e);
          x += (new Array(e+1)).join('0');
      }
    }
    return x;
  }


  // Payment
  /** START **/
    /*
    const txHash = data.transactionHash;
    const expectedBlockTime = 1000;
    const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    };

    let transactionReceipt = null;

    while (transactionReceipt == null) {
    transactionReceipt = await web3Info.web3.eth.getTransactionReceipt(txHash);
    await sleep(expectedBlockTime);
    }

    console.log("Transaction Receipt: ", transactionReceipt);

    // Wait for the transaction to be mined before sending data to the backend


    // Send txn info to the backend
    // using axios
    ///api/order

    * buyer (string)
    * totalPrice (int)
    * totalQty (int)
    * paymentID (string)
    * orderID (string)

    * txnHash (string)

    * tokenIndex (int)

    * products[i].productLink (string)
    * products[i].quantity (int)
    * products[i].asin (string) -> add
    * products[i].price (int)


    if(transactionReceipt.status == '0x01' || transactionReceipt.status == true){
    //
    console.log("Data after mined: ", data);
    // console.log("TransactionMade: ", data.events.TransactionMade);
    // console.log("TransactionMade orderID: ", data.events.TransactionMade.returnValues.orderID);
    // console.log("TransactionMade paymentID: ", data.events.TransactionMade.returnValues.paymentID);
    if(data.events.TransactionMade == null){
        throw new CustomError("Transaction Failed");
    }

    // return { success: true, message: "Payment Successful"};


    const orderBody = {
        buyer: String(buyer),
        totalPrice: (Number(cart.totalPrice)).toFixed(5),
        totalQty: Number(cart.totalQty),
        paymentID: String(data.events.TransactionMade.returnValues.paymentID),
        orderID: String(orderID),
        chainID: Number(chainID),
        txnHash: String(data.events.TransactionMade.transactionHash),
        tokenIndex: Number(tokenIndex),
        products: cart.products
    };

    console.log("Order for backend: ", orderBody);
    const res = await axios.post(`${serverHost}/api/order`, orderBody, axiosConfig);
    if(res.data.success === 1){
        paymentDispatch(
        {
            type: MAKE_PAYMENT,
            payload: {
            paymentID: data.events.TransactionMade.returnValues.paymentID,
            orderID: data.events.TransactionMade.returnValues.orderID,
            buyer: DataTransfer.events.TransactionMade.returnValues.buyer
            }
        }
        );
        return {success: true, message: "Transaction Successful"};
    }
    console.log("Response data: ", res.data);
    return {success: false, message: res.data.message};

    }
    */

    /** END **/


  // Approval
  /** START **/
    // const txHash = data.transactionHash;
    // const expectedBlockTime = 1000;
    // const sleep = (milliseconds) => {
    //     return new Promise(resolve => setTimeout(resolve, milliseconds))
    // };

    // let transactionReceipt = null;

    // while (transactionReceipt == null) {
    //   transactionReceipt = await web3Info.web3.eth.getTransactionReceipt(txHash);
    //   await sleep(expectedBlockTime);
    // }

    // console.log("Bill transaction receipt: ", transactionReceipt);

    // if(transactionReceipt.status == '0x01' || transactionReceipt.status == true){
    //   setIsApproved(true);
    //   (() => toast.success("Approval Successful"))();
    // }
/** END **/




// GlobalContext makePayment
/*
const makePayment = async(tokenDecimals, tokenIndex, cart, buyer) => {

    try {
      if(cart.products.length <= 0){
        throw new CustomError("No products were selected");
      }
      
      const web3 = initWeb3(window.detectedProvider);
      const chainID = await web3.eth.chainId();
      const paymentAddr = paymentAddresses[chainID];
      if(!paymentAddr){
        throw new CustomError(`${chainID} Is NOT A Supported Chain`);
      }
      
      // Initialise contracts
      // const tokenContract = new web3.eth.Contract(tokenABI, tokenAddress);
      const paymentContract = new web3.eth.Contract(paymentABI, paymentAddr);
      
      // const totalPriceBN = (new BigNumber(cart.totalPrice*10**tokenDecimals)).toFixed(20);
      
      // const totalPriceBN = (cart.totalPrice*10**tokenDecimals).toLocaleString('fullwide', {useGrouping:false});
      const totalPriceBN = (new BigNumber(cart.totalPrice*10**tokenDecimals));
      
      const totalQty = cart.totalQty;
      let products = [];
      for(let i=0; i<cart.products.length; i++){
        let price = (new BigNumber(cart.products[i].price*10**tokenDecimals).toFixed(0));
        console.log(price);
        let product = {
          asin: cart.products[i].asin,
          price: price,
          quantity: cart.products[i].quantity
        };
        console.log(product);
        products = [...products, product];
        product = "";
      }
      console.log("products: ", products);
      
      if (!Date.now) {
        Date.now = function() { return new Date().getTime(); }
      }
      const timeStampInMs = window.performance && window.performance.now && window.performance.timing && window.performance.timing.navigationStart ? window.performance.now() + window.performance.timing.navigationStart : Date.now();
      const orderID = uuidv4() + buyer + timeStampInMs.toString();
      const data = await paymentContract.methods.makePayment(orderID, tokenIndex, totalPriceBN, totalQty, products).send({from: buyer});
      console.log("Data: ", data);
      
       // data.events.TransactionMade.returnValues.buyer
       // data.events.TransactionMade.returnValues.orderID
       // data.events.TransactionMade.returnValues.paymentID
       
      
       const txHash = data.transactionHash;

      // awaitBlockConsensus(web3s, txhash, blockCount, timeout, callback)
      awaitBlockConsensus([web3Info.web3], txHash, 6, 750, async(error, txnReceipt) => {
        if(error){
          // return {success: false, message: error.message};
          throw new CustomError("Transaction Error");
        }

        const paymentDetails = await paymentContract.methods.getTransactionDetails(buyer, orderID).call();
        console.log("paymentDetails: ", paymentDetails);
        // paymentID: String(data.events.TransactionMade.returnValues.paymentID),
        
        const orderBody = {
          buyer: String(buyer),
          totalPrice: (Number(cart.totalPrice)).toFixed(5),
          totalQty: Number(cart.totalQty),
          paymentID: String(paymentDetails.paymentID),
          orderID: String(orderID),
          chainID: Number(chainID),
          txnHash: String(txHash),
          tokenIndex: Number(tokenIndex),
          products: cart.products
        };

        console.log("Order for backend: ", orderBody);
        const res = await axios.post(`${serverHost}/api/order`, orderBody, axiosConfig);
        if(res.data.success === 1){
          paymentDispatch(
            {
              type: MAKE_PAYMENT,
              payload: {
                paymentID: data.events.TransactionMade.returnValues.paymentID,
                orderID: data.events.TransactionMade.returnValues.orderID,
                buyer: DataTransfer.events.TransactionMade.returnValues.buyer
              }
            }
          );
          return {success: true, message: "Transaction Successful"};
        }
        console.log("Response data: ", res.data);
        // return {success: false, message: res.data.message};
        throw new CustomError(res.data.message);
        
      });
      
      

    } catch (error) {
      console.log("Error code: ", error);
      paymentDispatch({type: PAYMENT_ERROR, payload: "Transaction NOT Successful"});
      if(error.custom){
        return {success: false, message: error.message};
      }
      if(error.code === 4001){
        return {success: false, message: "Transaction Rejected"}
      }
      if(error.code === -32603){
        return { success: false, message: "Internal Error"}
      }
      return {success: false, message: "Payment Unsuccessful"};

    }
      

  };

*/


// Signing and verifying a message
/*
// (1) With personal_sign

Client side:
web3.personal.sign(web3.fromUtf8("dinosaur"), web3.eth.coinbase, console.log);\

Server side:

const msg = 'dinosaur';

const msgBuffer = ethereumJsUtil.toBuffer(msg);
const msgHash = ethereumJsUtil.hashPersonalMessage(msgBuffer);
const signatureBuffer = ethereumJsUtil.toBuffer(signature);
const signatureParams = ethereumJsUtil.fromRpcSig(signatureBuffer);
const publicKey = ethereumJsUtil.ecrecover(
  msgHash,
  signatureParams.v,
  signatureParams.r,
  signatureParams.s
);
const addressBuffer = ethereumJsUtil.publicToAddress(publicKey);
const address = ethereumJsUtil.bufferToHex(addressBuffer);

console.log(address); // Prints my initial web3.eth.coinbase

(2) With eth_sign

Client side:
web3.eth.sign(web3.eth.coinbase, web3.sha3("dinosaur"), console.log);

Server side:

const msg = 'dinosaur';

const msgHash = ethereumJsUtil.sha3(msg);
// The rest is the same as above
const signatureBuffer = ethereumJsUtil.toBuffer(signature);
const signatureParams = ethereumJsUtil.fromRpcSig(signatureBuffer);
const publicKey = ethereumJsUtil.ecrecover(
  msgHash,
  signatureParams.v,
  signatureParams.r,
  signatureParams.s
);
const addressBuffer = ethereumJsUtil.publicToAddress(publicKey);
const address = ethereumJsUtil.bufferToHex(addressBuffer);

console.log(address); // Prints my initial web3.eth.coinbase

*/