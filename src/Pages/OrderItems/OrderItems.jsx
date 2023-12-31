import axios from "axios";
import { useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import Hero from "../../Base/Hero";
import { GlobalContext } from "../../Context/GlobalContext";
import { axiosConfig, serverHost } from "../../Helpers/backendHost";
import genRandomness from "../../Helpers/genRandomness";
import { formatInputData } from "../../Helpers/helperFunctions";
import signMessage from "../../Helpers/signMessage";
import "../../CustomStyles/orderItems.css";
import { reqSuccess } from "../../Helpers/constants/reqStatus";
import { RestaurantRounded } from "@mui/icons-material";


export default function OrderItems(){
    const { userTransactions, web3Info } = useContext(GlobalContext);
    const { index } = useParams();
    const transaction = userTransactions[index];

    const [shippingInfo, setShippingInfo] = useState(null);
    
    // const [transaction, setTransaction] = useState([]);
    // useEffect(() => {
    //     setTransaction(userTransaction[index]);
    // }, []);
    const getShippingDetails = async() => {
        try {
            if(web3Info.address === ""){
                (() => toast.error("Please Connect Wallet"))();
                return;
            }
            console.log("txn unique id: ", transaction);
            const message = `Please sign this random message below. This signing does NOT cost gas. This is to authenticate endpoint caller. ${genRandomness()}`;
            const signed = await signMessage(message);
            const payload = {
                message,
                signature: signed,
                address: web3Info.address
            };
            /**
             * 
             * const orderUID = req.params.id;
        const message = req.body.message;
        const signature = req.body.signature
        const signer = req.params.address;
        
             */
            if(signed !== undefined){
                // Send signed message
                const response = await axios.post(`${serverHost}/api/shippings/uid/${transaction.order_unique_id}`, payload, axiosConfig);
                const { data: resData } = response;
                if(resData.success === reqSuccess){
                    if(resData.data.length > 0){
                        console.log("shipping det: ", resData.data[0]);
                        setShippingInfo(resData.data[0])
                    }else{
                        (() => toast.error("No Shipping Details"))();
                    }
                }else{
                    (() => toast.error("Could Not Get Shipping Details"))();
                }

            }else{
                (() => toast.error("Message Not Signed"))();
            }

        } catch (error) {
            console.log(error);
            if(error.code === 4001){
                (() => toast.error("Message Signing Rejected"))();
            }else{
                (() => toast.error("Could Not Get Shipping Details"))();
            }
        }
    };
    return (
        <Hero>
            <Link className="button primary" to="/dashboard"> Go back</Link>
            
            <div className="order">
                <h4>Details</h4>
                <div className="order-details">
                    <div className="info">
                        <h5>Order ID</h5>
                        <p>{formatInputData(transaction.unique_id)}</p>
                    </div>
                    <div className="info">
                        <h5>Payment ID</h5>
                        <p>{formatInputData(transaction.payment_unique_id)}</p>
                    </div>
                    <div className="info">
                        <h5>Price</h5>
                        <p>${transaction.total_amount}</p>
                    </div>
                    <div className="info">
                        <h5>Chain ID</h5>
                        <p>{transaction.chain_id}</p>
                    </div>
                </div>
                <div>
                    <div>
                        <h5>Token Index</h5>
                        <p>{transaction.asset_id}</p>
                    </div>
                    <div>
                        <h5>Txn hash</h5>
                        <p>{transaction.tx_hash}</p>
                    </div>
                    <div>
                        <h5>Total qty</h5>
                        <p>{transaction.total_items}</p>
                    </div>
                    <div>
                        <h5>Date/Time</h5>
                        <p>{transaction.created_at}</p>
                    </div>
                    {
                        shippingInfo === null &&
                        <div>
                            <button onClick={getShippingDetails} className="button primary">View shipping details </button>
                        </div>
                    }
                    {
                        shippingInfo != null && 
                        <div>
                            <h5>Shipping Info</h5>
                            <div>

                            </div>
                        </div>
                    }
                </div>
            </div>
            <div>
                <h4>Products</h4>
                <div>
                    {transaction.products.map(product => (
                        <div>
                            <div><img src={product.image} alt="product" /></div>
                            <div style={{color: "black"}}>{product.title}</div>
                            <div>{product.price}</div>
                            <div>{product.quantity}</div>
                            <a target="_blank" rel="noreferrer noopener" href={product.product_link}>Explore</a>
                        </div>
                    ))}
                </div>
            </div>
        </Hero>
    );
}