import React, { useContext, useState } from "react";
import Hero from "../../Base/Hero";
import { matchSorter } from "match-sorter";
import {data} from  "./MockData";
import {Table} from "./Table";
import "./Table.css";
import axios from "axios";
import { serverHost, axiosConfig } from "../../Helpers/backendHost";
import { GlobalContext } from "../../Context/GlobalContext";
import { reqSuccess } from "../../Helpers/constants/reqStatus";
import { tabUnstyledClasses } from "@mui/material";
import { useEffect } from "react";
import { formatInputData } from "../../Helpers/helperFunctions";
import { pending as pendingStatus, fulfilled as fulfilledStatus } from "../../Helpers/constants/txnStatus";
import { Link, Route, Routes } from "react-router-dom";
import OrderItems from "../OrderItems/OrderItems";
import headerColumn from "../../Helpers/tableHeaderColumn";



//Helpers  function
// Fuzzy text search essentially means approximate string matching and is a way of looking up strings that match a pattern even if the characters are not in the correct order.
function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
}
// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = (val) => !val;


export default function Orders() {

  const { web3Info, userTransactions, getUserTransactions } = useContext(GlobalContext);

  const [pending, setPending]= useState(true);
  const [history, setHistory] = useState(false);
  const [pendingData, setPendingData] = useState([]);
  const [historyData, setHistoryData] = useState([]);

  
  const filterPendingData = (txns) => {
    const pendingTxns = txns.filter(txn => txn.status === pendingStatus);
    if(pendingTxns.length > 0){
      const data = pendingTxns.map((txn, index) => {
        const txnObj = {
          orderId: formatInputData(txn.unique_id),
          paymentId: formatInputData(txn.payment_unique_id),
          // buyer: formatInputData(txn.buyer_addr),
          price: txn.total_amount,
          chainId: `${txn.chain_id}`,
          hash: formatInputData(txn.tx_hash),
          allData: <button className="button primary"><Link to={`/item/${index}`}> View products</Link></button>
        };
        return txnObj;
      });
      return data;
    }
    return ([]);
  };

  const filterHistoryData = (txns) => {
    const historyTxns = txns.filter(txn => txn.status === fulfilledStatus);
    if(historyTxns.length > 0){
      const data = historyTxns.map((txn, index) => {
        const txnObj = {
          orderId: formatInputData(txn.unique_id),
          paymentId: formatInputData(txn.payment_unique_id),
          price: txn.total_amount,
          chainId: `${txn.chain_id}`,
          hash: formatInputData(txn.tx_hash),
          products: <button className="button primary"><Link to={`/item/${index}`}> View products</Link></button>
        };
        return txnObj;
      });
      return data;
    }
    return ([]);
  };


  const handlePending = () => {
    setPending(true)
    setHistory(false)
  }
  const handleHistory = () => {
    setPending(false)
    setHistory(true)
  }
  const columns = React.useMemo(
    () => [headerColumn],
    []
  );

  useEffect(() => {
    const getUserOrders = async () => {
      try {
        
        if(web3Info.address !== undefined){
          const user = "0xFd0522277d30bB29fB69268987019F254B98519c";
          // const user = web3Info.address;
          // const response = await axios.get(`${serverHost}/api/order/user/${user}`, axiosConfig);
          const allTxns = await getUserTransactions(user);
          if(allTxns.length > 0){
            setPendingData(filterPendingData(allTxns));
            setHistoryData(filterHistoryData(allTxns));
          }
          
        }
      } catch (error) {
        console.log(error);
      }
    };

    if(web3Info.address !== undefined){
      (async() => {
        await getUserOrders();
      })();
    }
  }, [web3Info.address]);
  return (
    <Hero>
      <div style={{width: "100%", display: "flex", justifyContent:"space-evenly", alignItems: "center", marginBottom: "20px"}}>
        <button className="button primary" onClick={handlePending}>Pending</button>
        <button className="button primary" onClick={handleHistory}>History</button>
      </div>
      {
        pending &&
        <>
          <div className="bill">
            <div style={{color: "#000", fontWeight: "900"}} >
              <div className="bill__header-text">
              <h3>Pending Transaction</h3>
              </div>
            </div>
          </div>
          {
            web3Info.address === undefined
            ?
            <p>Connect wallet to view transactions</p>
            :
            (
              pendingData.length > 0
              ?
              <Table columns={columns} data={pendingData} />
              :
              <p>No pending transactions</p>
            )
          }
        </>
      }
      {
        history &&
        <>
          <div className="bill">
            <div style={{color: "#000", fontWeight: "900"}} >
              <div className="bill__header-text">
              <h3>Transaction History</h3>
              </div>
            </div>
          </div>
          {
            web3Info.address === undefined 
            ?
            <p>Connect wallet to view your transactions</p>
            :
            (
              historyData.length > 0
              ?
              <Table columns={columns} data={historyData} />
              :
              <p>No history transactions</p>
            )
          }
        </>
      }
    </Hero>
  );
}
