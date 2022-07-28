import React from "react";

// import Header from "../../components/Header/HeaderComponents";
import "./dashboardDetail.css";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import HeaderSmall from "../../Components/HeaderSmall/HeaderSmall";
import DashboardDetailsLoading from "./DashboardDetailsLoading";
import { GlobalContext } from "../../Context/GlobalContext";
// import { useUpdateData, useDeleteData } from "../../Redux/Services/auth-Query";
// import { useSelector } from "react-redux";
import { format } from "date-fns";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";

// import { useQueryClient } from "react-query";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  border: "2px solid #ffff",
  boxShadow: 24,
  p: 1,
};

function DashboardDetail() {
  const { userTransactions, web3Info } = React.useContext(GlobalContext);
  const { index } = useParams();
  const transaction = userTransactions[index];
  console.log("Gotten index: ", index);
  console.log("Gotten trxn: ", transaction);

  const navigate = useNavigate();

  // const [transaction, setTransaction] = React.useState({});
  //   const dataFind = useSelector((state) => state.auth);
  const dataFind = {
    data: [],
  };
  // console.log(dataFind?.data, 'find ooooooo')
  const { Id } = useParams();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [open2, setOpen2] = React.useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);
  // const queryClient = useQueryClient();

  const onSuccess = (data) => {
    // queryClient.invalidateQueries("getAllFulfilData");
    toast.success(`Fulfiller order request successful.`);
    navigate("/");
    console.log({ data });
  };

  const onError = (error) => {
    toast.error(`${error?.response?.data.message}`);
  };

  const UpdateonSuccess = (data) => {
    // queryClient.invalidateQueries("getAllFulfilData");
    toast.success(`Order status update successful.`);
    navigate("/");
    console.log({ data });
  };

  const UpdateonError = (error) => {
    toast.error(`${error?.response?.data.message}`);
  };

  //   const { isLoading, mutate } = useUpdateData(UpdateonSuccess, UpdateonError);
  //   const { isLoading: deleteLoading, mutate: deleteMutate } = useDeleteData(
  //     onSuccess,
  //     onError
  //   );

  // Defined
  const isLoading = false;
  const mutate = (id) => {};
  const deleteLoading = false;
  const deleteMutate = (id) => {};

  
  // const {
  //   order_id,
  //   payment_unique_id,
  //   amount,
  //   buyer_addr,
  //   chain_id,
  //   created_at,
  //   order_unique_id,
  //   total_amount,
  //   total_items,
  //   tx_hash,
  //   products,
  //   status,
  // } = transaction;


  React.useEffect(() => {
    console.log("userTransactions data: ", userTransactions);
    console.log("item index: ", index);
    console.log("item data: ", userTransactions[index]);

    // setTransaction(userTransactions[index]);
  }, [index, userTransactions]);
  return (
    <>
      {/* <Box
        sx={{
          display: {
            xs: "none",
            md: "block",
          },
        }}
      >
        <Header />
      </Box> */}
      <Box
        sx={{
          display: {
            xs: "block",
            md: "none",
          },
        }}
      >
        <HeaderSmall />
      </Box>
      {isLoading && <DashboardDetailsLoading />}
      {!isLoading && (
        <div className="admin-details-container">
          <div className="admin-details-box">
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <ArrowBackIcon
                sx={{
                  fontSize: 30,
                  cursor: "pointer",
                  marginRight: 1,
                  display: {
                    xs: "none",
                    md: "block",
                  },
                }}
                onClick={() => {
                  navigate(-1);
                }}
              />

              <h4 className="admin-detail-heading">Order details</h4>
            </Box>

            <div className="admin-detail-content-container">
              <Grid container spacing={1}>
                <Grid item xs={12} md={7} order={{ xs: 2, md: 1 }}>
                  <Paper
                    className="admin-detail-content-container-box1"
                    elevation={1}
                    sx={{
                      borderRadius: "8px",
                      padding: 2,
                      marginBottom: {
                        xs: 4,
                        md: 0,
                      },
                    }}
                  >
                    <Box className="sideRight-header-summary"> Products</Box>

                    <Box className="admin-detail-borderBottom"></Box>
                    {transaction?.products?.map((product) => {
                      return (
                        <Grid
                          container
                          spacing={0}
                          sx={{
                            width: "100%",
                            height: "auto",
                            minHeight: 158,
                            padding: 1,
                            marginBottom: 1,
                          }}
                          key={product.id}
                        >
                          <Grid item xs={6} md={4}>
                            <Box className="admin-detail-box-left">
                              <img
                                src={product.image}
                                alt="product"
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                }}
                              />
                            </Box>
                          </Grid>
                          <Grid item xs={6} md={8}>
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: {
                                  xs: "column",
                                  md: "row",
                                },
                                justifyContent: "space-between",
                                paddingLeft: 2,
                              }}
                            >
                              <Box sx={{ flex: 2 }}>
                                <Box className="admin-details-text1">
                                  {product.title}
                                </Box>
                                <Box className="admin-details-text2">
                                  Seller: {product.asin}
                                </Box>
                              </Box>
                              <Box
                                sx={{
                                  flex: 1,
                                  display: "flex",

                                  justifyContent: {
                                    xs: "space-between",
                                    md: "space-evenly",
                                  },
                                  marginBottom: 0.4,
                                }}
                              >
                                <Box
                                  sx={{ display: "flex" }}
                                  className="admin-details-text3"
                                >
                                  {" "}
                                  <Box
                                    sx={{
                                      display: {
                                        xs: "block",
                                        md: "none",
                                      },
                                    }}
                                  >
                                    Price
                                  </Box>
                                  ${product.price}
                                </Box>
                                <Box
                                  sx={{ display: "flex" }}
                                  className="admin-details-text3"
                                >
                                  <Box
                                    sx={{
                                      display: {
                                        xs: "block",
                                        md: "none",
                                      },
                                    }}
                                  >
                                    Qty
                                  </Box>
                                  {product.quantity}
                                </Box>
                              </Box>
                              <Box
                                x={{ flex: 1 }}
                                className="admin-details-text4"
                              >
                                <a
                                  href={product.product_link}
                                  target="_blank"
                                  className="admin-details-text4"
                                  rel="noopener noreferrer"
                                >
                                  {" "}
                                  Visit seller
                                </a>
                              </Box>
                            </Box>
                          </Grid>
                        </Grid>
                      );
                    })}

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        marginTop: 1,
                      }}
                    >
                      <Button
                        variant="contained"
                        startIcon={<DeleteIcon />}
                        sx={{
                          marginRight: 1,
                          backgroundColor: "#FD5D54",
                          "&:hover": {
                            backgroundColor: "#FD5D54",
                            boxShadow: "none",
                          },
                          "&:active": {
                            boxShadow: "none",
                            backgroundColor: "#FD5D54",
                          },
                        }}
                        onClick={handleOpen}
                      >
                        Delete
                      </Button>
                      {transaction?.status === "pending" && (
                        <Button
                          variant="contained"
                          endIcon={<UpgradeIcon />}
                          onClick={handleOpen2}
                          sx={{
                            backgroundColor: "#293B7A",

                            "&:hover": {
                              backgroundColor: "#293B7A",
                              boxShadow: "none",
                            },
                            "&:active": {
                              boxShadow: "none",
                              backgroundColor: "#293B7A",
                            },
                          }}
                        >
                          Update
                        </Button>
                      )}
                    </Box>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={5} order={{ xs: 1, md: 2 }}>
                  <Paper
                    className="admin-detail-content-container-box1"
                    elevation={1}
                    sx={{ borderRadius: "8px", padding: 2 }}
                  >
                    <Box className="admin-detail-sideRight-header">
                      <Box className="sideRight-header-summary"> Summary</Box>
                      <Box className="sideRight-header-time">
                        <span>
                          {format(new Date(transaction?.created_at || 0), "hh:mmaaaaa'm'")}
                        </span>
                        {format(new Date(transaction?.created_at || 0), "MMM dd, yyyy")}
                      </Box>
                    </Box>
                    <Box className="admin-detail-borderBottom"></Box>
                    <Box className="sideRight-header-box-content">
                      <Box className="sideRight-header-box-content-item1">
                        Order ID
                      </Box>
                      <Box
                        className="sideRight-header-box-content-item2"
                        sx={{
                          fontSize: {
                            xs: "12px !important",
                            md: "12px !important",
                          },
                          fontWeight: "bold",
                          wordWrap: "break-word",
                        }}
                      >
                        {transaction?.order_id}
                      </Box>
                    </Box>
                    <Box className="sideRight-header-box-content">
                      <Box className="sideRight-header-box-content-item1">
                        Order Unique ID
                      </Box>
                      <Box
                        className="sideRight-header-box-content-item2"
                        sx={{
                          fontSize: {
                            xs: "12px !important",
                            md: "12px !important",
                          },
                          fontWeight: "bold",
                          wordWrap: "break-word",
                        }}
                      >
                        {transaction?.order_unique_id}
                      </Box>
                    </Box>
                    <Box className="sideRight-header-box-content">
                      <Box className="sideRight-header-box-content-item1">
                        Payment ID
                      </Box>
                      <Box
                        className="sideRight-header-box-content-item2"
                        sx={{
                          fontSize: {
                            xs: "12px !important",
                            md: "12px !important",
                          },
                          fontWeight: "bold",
                          wordWrap: "break-word",
                        }}
                      >
                        {transaction?.payment_unique_id}
                      </Box>
                    </Box>
                    <Box className="sideRight-header-box-content">
                      <Box className="sideRight-header-box-content-item1">
                        Buyer
                      </Box>
                      <Box
                        className="sideRight-header-box-content-item2"
                        sx={{
                          fontSize: {
                            xs: "12px !important",
                            md: "12px !important",
                          },
                          fontWeight: "bold",
                          wordWrap: "break-word",
                        }}
                      >
                        {transaction?.buyer_addr}
                      </Box>
                    </Box>
                    <Box className="sideRight-header-box-content">
                      <Box className="sideRight-header-box-content-item1">
                        Chain ID
                      </Box>
                      <Box
                        className="sideRight-header-box-content-item2"
                        sx={{
                          fontSize: "12px !important",
                          fontWeight: "bold",
                          wordWrap: "break-word",
                        }}
                      >
                        {transaction?.chain_id}
                      </Box>
                    </Box>
                    <Box className="sideRight-header-box-content">
                      <Box className="sideRight-header-box-content-item1">
                        Txn hash
                      </Box>
                      <Box
                        className="sideRight-header-box-content-item2"
                        sx={{
                          fontSize: {
                            xs: "12px !important",
                            md: "12px !important",
                          },
                          fontWeight: "bold",
                          wordWrap: "break-word",
                        }}
                      >
                        {transaction?.tx_hash}
                      </Box>
                    </Box>

                    <Box className="admin-detail-borderBottom2"></Box>
                    <Box className="admin-detail-total-box">
                      <Box className="admin-detail-total-box-text">
                        Total Quantity
                      </Box>
                      <Box className="admin-detail-total-box-text">
                        {transaction?.total_items}
                      </Box>
                    </Box>

                    <Box className="admin-detail-total-box">
                      <Box className="admin-detail-total-box-text">Price</Box>
                      <Box className="admin-detail-total-box-text">
                        ${transaction?.amount}
                      </Box>
                    </Box>
                    <Box className="admin-detail-total-box">
                      <Box className="admin-detail-total-box-text">
                        Total Price
                      </Box>
                      <Box className="admin-detail-total-box-text">
                        ${transaction?.total_amount}
                      </Box>
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
      )}

      {/* // modal section */}
      <Modal
        open={open}
        //   onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              margin: 1,
            }}
          >
            <DeleteIcon
              sx={{
                fontSize: 40,
                color: "#FD5D54",
              }}
            />
          </Box>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{
              textAlign: "center",
              fontSize: "20px",
            }}
          >
            Are you sure, you want to delete this order?
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: 2,
            }}
          >
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#FD5D54",
                "&:hover": {
                  backgroundColor: "#FD5D54",
                  boxShadow: "none",
                },
                "&:active": {
                  boxShadow: "none",
                  backgroundColor: "#FD5D54",
                },
              }}
              onClick={handleClose}
            >
              No
            </Button>
            <Button
              variant="contained"
              sx={{
                marginLeft: {
                  xs: 2,
                  md: 2,
                },
                backgroundColor: "#293B7A",

                "&:hover": {
                  backgroundColor: "#293B7A",
                  boxShadow: "none",
                },
                "&:active": {
                  boxShadow: "none",
                  backgroundColor: "#293B7A",
                },
              }}
              onClick={() => deleteMutate(Id)}
            >
              {deleteLoading ? <CircularProgress size={20} /> : "Yes"}
            </Button>
          </Box>
        </Box>
      </Modal>

      <Modal
        open={open2}
        //   onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              margin: 1,
            }}
          >
            <UpgradeIcon
              sx={{
                fontSize: 40,
                color: "#FD5D54",
              }}
            />
          </Box>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{
              textAlign: "center",
              fontSize: "20px",
            }}
          >
            Are you sure, you want to update this order?
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: 2,
            }}
          >
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#FD5D54",
                "&:hover": {
                  backgroundColor: "#FD5D54",
                  boxShadow: "none",
                },
                "&:active": {
                  boxShadow: "none",
                  backgroundColor: "#FD5D54",
                },
              }}
              onClick={handleClose2}
            >
              No
            </Button>
            <Button
              variant="contained"
              sx={{
                marginLeft: {
                  xs: 2,
                  md: 2,
                },
                backgroundColor: "#293B7A",

                "&:hover": {
                  backgroundColor: "#293B7A",
                  boxShadow: "none",
                },
                "&:active": {
                  boxShadow: "none",
                  backgroundColor: "#293B7A",
                },
              }}
              onClick={() => mutate(Id)}
            >
              {isLoading ? <CircularProgress size={20} /> : "Yes"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default DashboardDetail;
