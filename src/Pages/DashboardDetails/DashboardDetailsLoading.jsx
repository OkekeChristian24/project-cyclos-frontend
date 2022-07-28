import React from "react";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

function DashboardDetailsLoading() {
  return (
    <>
      <Box
        sx={{
          marginTop: 5,
          marginX: {
            xs: 1,
            md: 5,
          },
        }}
      >
        <Grid container spacing={1}>
          <Grid item xs={12} md={7} order={{ xs: 2, md: 1 }}>
            <Paper
              className="admin-detail-content-container-box1"
              elevation={1}
              sx={{ borderRadius: "8px", padding: 2 }}
            >
              <Skeleton animation="wave" width="100%" height={40} />

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
              >
                <Grid item xs={6} md={4}>
                  <Skeleton
                    animation="wave"
                    variant="rectangular"
                    width="100%"
                    height={200}
                  />
                </Grid>
                <Grid item xs={6} md={8} sx={{ paddingX: 2 }}>
                  <Skeleton animation="wave" width="100%" height={40} />
                  <Skeleton animation="wave" width="100%" height={40} />
                  <Skeleton animation="wave" width="100%" height={40} />
                  <Skeleton animation="wave" width="100%" height={40} />
                  <Skeleton animation="wave" width="100%" height={40} />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12} md={5} order={{ xs: 1, md: 2 }}>
            <Paper
              className="admin-detail-content-container-box1"
              elevation={1}
              sx={{ borderRadius: "8px", padding: 2 }}
            >
              <Box className="admin-detail-sideRight-header">
                <Skeleton animation="wave" width="100%" height={40} />
                <Skeleton animation="wave" width="100%" height={40} />
              </Box>
              <Box className="sideRight-header-box-content">
                <Skeleton animation="wave" width="100%" height={40} />
                <Skeleton animation="wave" width="100%" height={40} />
              </Box>
              <Box className="sideRight-header-box-content">
                <Skeleton animation="wave" width="100%" height={40} />
                <Skeleton animation="wave" width="100%" height={40} />
              </Box>
              <Box className="sideRight-header-box-content">
                <Skeleton animation="wave" width="100%" height={40} />
                <Skeleton animation="wave" width="100%" height={40} />
              </Box>
              <Box className="sideRight-header-box-content">
                <Skeleton animation="wave" width="100%" height={40} />
                <Skeleton animation="wave" width="100%" height={40} />
              </Box>
              <Box className="sideRight-header-box-content">
                <Skeleton animation="wave" width="100%" height={40} />
                <Skeleton animation="wave" width="100%" height={40} />
              </Box>
              <Box className="sideRight-header-box-content">
                <Skeleton animation="wave" width="100%" height={40} />
                <Skeleton animation="wave" width="100%" height={40} />
              </Box>
              <Box className="admin-detail-total-box">
                <Skeleton animation="wave" width="100%" height={40} />
                <Skeleton animation="wave" width="100%" height={40} />
              </Box>
              <Box className="admin-detail-total-box">
                <Skeleton animation="wave" width="100%" height={40} />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default DashboardDetailsLoading;
