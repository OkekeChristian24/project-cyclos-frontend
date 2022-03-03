import { useContext, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Hero from "../../Base/Hero";
import { GlobalContext } from "../../Context/GlobalContext";
import { formatInputData } from "../../Helpers/helperFunctions";


export default function OrderItems(){
    const { userTransactions } = useContext(GlobalContext);
    const { index } = useParams();
    const transaction = userTransactions[index];

    // const [transaction, setTransaction] = useState([]);

    // useEffect(() => {
    //     setTransaction(userTransactions[index]);
    // }, []);

    return (
        <Hero>
            <button className="button primary">
                <Link to="/dashboard"> Go back</Link>
            </button>
            <div>
                <h4>Details</h4>
                <div>
                <div>
                    <h5>Order ID</h5>
                    <p>{formatInputData(transaction.unique_id)}</p>
                </div>
                <div>
                    <h5>Payment ID</h5>
                    <p>{formatInputData(transaction.payment_unique_id)}</p>
                </div>
                <div>
                    <h5>Price</h5>
                    <p>${transaction.total_amount}</p>
                </div>
                <div>
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
                    <p>{formatInputData(transaction.tx_hash)}</p>
                </div>
                <div>
                    <h5>Total qty</h5>
                    <p>{transaction.total_items}</p>
                </div>
                <div>
                    <h5>Date/Time</h5>
                    <p>{transaction.created_at}</p>
                </div>
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