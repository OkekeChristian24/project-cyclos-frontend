import React from "react";

// import Header from '../../components/Header/HeaderComponents';
import "./dashboard.css";
import SearchIcon from "@mui/icons-material/Search";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { GlobalContext } from "../../Context/GlobalContext";
import { useNavigate } from "react-router-dom";
import DashboardSkeleton from "./DashboardSkeleton";
import { format } from "date-fns";
// import CloseIcon from '@mui/icons-material/Close';
import Card from "@mui/material/Card";
// import { useGetFulfilData } from "../../Redux/Services/auth-Query";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Calendar from "react-calendar";
import TablePagination from "@mui/material/TablePagination";
// import { useDispatch } from "react-redux";
// import { viewSingleOrder } from "../../Redux/Slices/AuthSlice";
import Button from "@mui/material/Button";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import Hero from "../../Base/Hero";
function Dashboard() {
  // Global Context
  const { web3Info, userTransactions, getUserTransactions } =
    React.useContext(GlobalContext);

  const [status1] = React.useState(true);
  const [status2] = React.useState(false);
  const [status, setStatus] = React.useState(true);
  const [progress, setProgress] = React.useState("pending");
  // const dispatch = useDispatch();
  const [FisLoading, setFisLoading] = React.useState(false);
  const [FisError, setFisError] = React.useState(false);
  const [Ferror, setFerror] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage] = React.useState(5);

  const [pageData, setPageData] = React.useState([]);
  const [value, onChange] = React.useState(null);
  const [value2, onChange2] = React.useState(new Date());
  const [displayDate, setDisplayDate] = React.useState(false);
  const [displayDate2, setDisplayDate2] = React.useState(false);
  const [filteredData, setFilteredData] = React.useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const [inputText, setInputText] = React.useState("");
  let inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
    setFilteredData();
  };

  // console.log("Page data: ", pageData);

  const FonSuccess = (data) => {
    console.log({ data });
    setPageData(data);
  };

  const FonError = (error) => {
    // console.log({ error })
  };

  // Defined
  const useGetFulfilData = () => {};
  const viewSingleOrder = () => {};

  // const {
  //   isLoading: FisLoading,
  //   error: Ferror,
  //   isError: FisError,
  // } = useGetFulfilData(FonSuccess, FonError);

  const navigate = useNavigate();

  const chechStatus = () => {
    if (status1 === true && status2 === false) {
      setStatus(true);
    } else {
      setStatus(false);
    }
  };

  const chechStatus1 = () => {
    if (status1 === false && status2 === true) {
      setStatus(true);
    } else {
      setStatus(false);
    }
  };

  React.useEffect(() => {
    const getUserOrders = async () => {
      try {
        if (web3Info.address !== undefined) {
          // const user = "0xd6cE06a65591f1C7967C74BCd841FdE7f26Ca065";
          const user = web3Info.address;
          setFisLoading(true);
          const allTxns = await getUserTransactions(user);
          setFisLoading(false);
          setFisError(false);
          if (allTxns.length > 0) {
            setPageData(allTxns);
          }
        }
      } catch (error) {
        setFisError(true);
        setFisLoading(false);
        setFerror(error?.message);
        console.log(error);
      }
    };

    if (web3Info.address !== undefined) {
      (async () => {
        await getUserOrders();
      })();
    }
  }, [web3Info.address]);

  React.useEffect(() => {
    const dataFiltered = pageData?.filter((el) => {
      if (inputText) {
        return (
          el.order_unique_id.toLowerCase().includes(inputText) ||
          el.payment_unique_id.toLowerCase().includes(inputText) ||
          el.tx_hash.toLowerCase().includes(inputText)
        );
      }
      if (progress) {
        return el.status === progress;
      }

      if (value && value2) {
        return (
          new Date(el.created_at) >= new Date(value) &&
          new Date(el.created_at) <= new Date(value2)
        );
      }
      //return the item which contains the user input
      // order_unique_id, payment_unique_id, buyer_addr, amount, chain_id, tx_hash
      else {
        return el;
      }
    });
    setFilteredData(dataFiltered);
  }, [pageData, inputText, progress, value, value2]);

  return (
    <>
      {/* <Header/> */}
      <Hero>
        <div className="admin-landingpage-container">
          <div className="admin-landingpage-box">
            <h2 className="admin-orders-text">Orders</h2>
            <p className="admin-orders-found">
              {filteredData?.length} orders found
            </p>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "1rem",
              }}
            >
              <div className="admin-landingpage-input-container">
                <SearchIcon
                  sx={{ color: "#4B4E67", paddingRight: 1, fontSize: 30 }}
                />
                <input
                  type="text"
                  name="search"
                  id=""
                  placeholder="Search orders"
                  value={inputText}
                  onChange={inputHandler}
                />
              </div>
              <Box
                sx={{
                  marginBottom: 1,
                }}
              >
                {/* <Button
                variant="contained"
                endIcon={<RotateLeftIcon />}
                onClick={() => {
                  setProgress("");
                  setInputText("");
                  onChange(null);
                  setStatus(null);
                  onChange2(new Date());
                }}
                sx={{
                  backgroundColor: "#ffff",

                  "&:hover": {
                    backgroundColor: "#ffff",
                  },
                  "&:active": {
                    backgroundColor: "#ffff",
                  },
                  color: "#4B4E67",
                  height: "44px",
                }}
              >
                Reset
              </Button> */}
              </Box>
            </Box>

            <div className="admin-landing-page-button-container">
              <div className="admin-double-status">
                <div
                  onClick={() => {
                    setProgress("pending");
                    chechStatus();
                  }}
                  className={status === status1 ? "pending" : "fulfilled"}
                >
                  PENDING
                </div>
                <div
                  onClick={() => {
                    setProgress("fulfilled");

                    chechStatus1();
                  }}
                  className={status === status2 ? "pending" : "fulfilled"}
                >
                  FULFILLED
                </div>
              </div>
              <div className="admin-date-container">
                <div className="admin-date-container-from">
                  <div>From:</div>
                  <div>
                    <button onClick={() => setDisplayDate(!displayDate)}>
                      <CalendarTodayIcon
                        sx={{ fontSize: 15, paddingRight: "4px" }}
                      />
                      {format(value || 0, "MMM dd, yyyy")}
                    </button>
                  </div>
                </div>
                {displayDate && (
                  <Box className="calendateDate1">
                    <Calendar onChange={onChange} value={value} />
                  </Box>
                )}

                <div className="admin-date-container-from">
                  <div>To:</div>
                  <div>
                    {" "}
                    <button onClick={() => setDisplayDate2(!displayDate2)}>
                      <CalendarTodayIcon
                        sx={{ fontSize: 15, paddingRight: "4px" }}
                      />
                      {format(value2, "MMM dd, yyyy")}
                    </button>
                  </div>
                </div>
                {displayDate2 && (
                  <Box className="calendateDate2">
                    <Calendar onChange={onChange2} value={value2} />
                  </Box>
                )}
              </div>
            </div>
            {FisLoading ? <DashboardSkeleton /> : null}
            {!FisLoading && FisError ? (
              <Box>
                <Card
                  sx={{
                    width: {
                      xs: "100%",
                      md: "100%",
                    },
                    height: 200,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 5,
                    backgroundColor: "#FD5D54",
                  }}
                >
                  <CardContent>
                    <Typography
                      sx={{ fontSize: 20 }}
                      color="#ffff"
                      gutterBottom
                    >
                      {Ferror}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            ) : null}
            {!FisLoading && !FisError && (
              <div className="landginpage-table-container">
                <TableContainer sx={{ backgroundColor: "#fff", padding: 2 }}>
                  <Table
                    sx={{
                      minWidth: 650,
                      [`& .${tableCellClasses.root}`]: {
                        borderBottom: "none",
                      },
                    }}
                    aria-label="simple table"
                  >
                    <TableHead sx={{ backgroundColor: "#F4F5FB" }}>
                      <TableRow>
                        <TableCell className="table-header-cell">
                          Order ID
                        </TableCell>
                        <TableCell align="center" className="table-header-cell">
                          Payment ID
                        </TableCell>
                        {/* <TableCell align="center" className="table-header-cell">
                        Buyer
                      </TableCell> */}
                        <TableCell align="center" className="table-header-cell">
                          Price
                        </TableCell>
                        <TableCell align="center" className="table-header-cell">
                          Chain ID
                        </TableCell>
                        <TableCell align="center" className="table-header-cell">
                          Txn hash
                        </TableCell>
                        <TableCell align="center" className="table-header-cell">
                          Status
                        </TableCell>

                        <TableCell align="center" className="table-header-cell">
                          Action
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredData
                        ?.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((item, index) => {
                          const {
                            order_unique_id,
                            payment_unique_id,
                            buyer_addr,
                            amount,
                            chain_id,
                            tx_hash,
                            id,
                            status,
                          } = item;
                          return (
                            <TableRow
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                              key={order_unique_id}
                            >
                              <TableCell component="th" scope="row">
                                {order_unique_id.slice(0, 12)}...
                              </TableCell>
                              <TableCell
                                align="center"
                                className="table-body-cell"
                              >
                                {payment_unique_id.slice(0, 12)}...
                              </TableCell>
                              {/* <TableCell
                              align="center"
                              className="table-body-cell"
                            >
                              {buyer_addr.slice(0, 12)}...
                            </TableCell> */}
                              <TableCell
                                align="center"
                                className="table-body-cell"
                              >
                                ${amount}
                              </TableCell>
                              <TableCell
                                align="center"
                                className="table-body-cell"
                              >
                                {chain_id}
                              </TableCell>
                              <TableCell
                                align="center"
                                className="table-body-cell"
                              >
                                {tx_hash.slice(0, 12)}...
                              </TableCell>
                              <TableCell
                                align="center"
                                className="table-body-cell"
                                sx={{
                                  textTransform: "capitalize",
                                }}
                              >
                                {status}
                              </TableCell>

                              <TableCell
                                align="center"
                                className="table-body-cell"
                                onClick={() => {
                                  navigate(`/item/${index}`);
                                  // dispatch(viewSingleOrder(item));
                                  localStorage.setItem(
                                    "order",
                                    JSON.stringify(item)
                                  );
                                }}
                              >
                                <span className="table-border-bottom">
                                  view
                                </span>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                  <div className="landing-page-table-pagination">
                    <TablePagination
                      component="div"
                      count={filteredData?.length || 0}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      rowsPerPageOptions={[]}
                    />
                  </div>

                  {/* <div className='btncontainer'>   <button>
          <ArrowBackIosIcon sx={{fontSize:10}}/>
          Prev </button></div>
        <div className='pagination-text'>1 2 3..</div>
        <div className='btncontainer'>
          <button>Next 
<ArrowForwardIosIcon sx={{fontSize:10}}/>

          </button>
        </div> */}
                </TableContainer>
              </div>
            )}
          </div>
        </div>
      </Hero>
    </>
  );
}

export default Dashboard;
