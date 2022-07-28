import React from "react";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

function DashboardSkeleton() {
  return (
    <>
      <Box
        sx={{
          marginTop: 1,
        }}
      >
        {/* <Box
        sx={{
          display: 'flex',
justifyContent:'space-between',
marginY:'5px'

        }}
        >
          <Skeleton animation="wave" width='48%' height={40} />
          <Skeleton animation="wave" width='48%' height={40} />

        </Box> */}
        <Skeleton
          animation="wave"
          variant="rectangular"
          width="100%"
          height={80}
        />
        <Skeleton animation="wave" width="100%" height={40} />
        <Skeleton animation="wave" width="100%" height={40} />
        <Skeleton animation="wave" width="100%" height={40} />
        <Skeleton animation="wave" width="100%" height={40} />
        <Skeleton animation="wave" width="100%" height={40} />
        <Skeleton animation="wave" width="100%" height={40} />
        <Skeleton animation="wave" width="100%" height={40} />
        <Skeleton animation="wave" width="100%" height={40} />
        <Skeleton animation="wave" width="100%" height={40} />
        <Skeleton animation="wave" width="100%" height={40} />
        <Skeleton animation="wave" width="100%" height={40} />
        <Skeleton animation="wave" width="100%" height={40} />
        <Skeleton animation="wave" width="100%" height={40} />
        <Skeleton animation="wave" width="100%" height={40} />
        <Skeleton animation="wave" width="100%" height={40} />
        <Skeleton animation="wave" width="100%" height={40} />
        <Skeleton animation="wave" width="100%" height={40} />
      </Box>
    </>
  );
}

export default DashboardSkeleton;
