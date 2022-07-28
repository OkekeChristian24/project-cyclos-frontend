import React from 'react'
import './HeaderSmall.css'
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from 'react-router-dom';

function HeaderSmall() {
    const navigate=useNavigate()

  return (
    < Paper className='headersmall-header-container'
    elevation={24}
    >
        <Box>
< ArrowBackIosIcon sx={{fontSize:20,
cursor:'pointer',
}}
    onClick={()=>{
                          navigate(-1)
                      }}
/>
        </Box>
        <Box className='headersmall-details'>
        Order Details</Box></ Paper>
  )
}

export default HeaderSmall