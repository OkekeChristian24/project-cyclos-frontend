import React, { useState } from "react";
import Hero from "../../Base/Hero";
import { matchSorter } from "match-sorter";
import {data} from  "./MockData"
import {Table} from "./Table"
import "./Table.css"

//Helpers  function
// Fuzzy text search essentially means approximate string matching and is a way of looking up strings that match a pattern even if the characters are not in the correct order.
function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
}
// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = (val) => !val;


export default function Orders() {
  const [pending, setPending]= useState(true)
  const [history, setHistory] = useState(false)

  const handlePending = () => {
    setPending(true)
    setHistory(false)
  }
  const handleHistory = () => {
    setPending(false)
    setHistory(true)
  }
  const columns = React.useMemo(
    () => [
      {
        Header: " ",
        columns: [
          {
            Header: "Order ID  ",
            accessor: "orderId",
            filter: "fuzzyText",
          },
          {
            Header: "Payment ID",
            accessor: "paymentId",
            filter: "fuzzyText",
          },
          {
            Header: "Buyer",
            accessor: "buyer",
            filter: "fuzzyText",
          },
          {
            Header: "Price",
            accessor: "price",
            filter: "fuzzyText",
          },
          {
            Header: "Chain ID",
            accessor: "chainId",
            filter: "fuzzyText",
          },
          {
            Header: "Hash",
            accessor: "hash",
            filter: "fuzzyText",
          },
        ],
      },
    ],
    []
  );
  return (
    <>

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
<Table columns={columns} data={data} />
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
<Table columns={columns} data={data} />
  </>
}
    </Hero>

  
 
    </>

  );
}
