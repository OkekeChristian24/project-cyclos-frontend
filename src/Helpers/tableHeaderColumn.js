const headerColumn = {
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
      {
        Header: "Products",
        accessor: "allData",
        filter: "fuzzyText",
      }
    ],
  };

  export default headerColumn;