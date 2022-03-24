import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';

import supportedChains from '../Helpers/chains';

export default function NetOptions(props) {
    const { onClose, selectedValue, open } = props;

    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = (value) => {
        onClose(value);
    };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Choose A Network</DialogTitle>
      <List sx={{ pt: 0 }}>
        {supportedChains.map((chain) => (
          <ListItem button onClick={() => handleListItemClick(chain.chain_id_hex)} key={chain.chain_id_hex}>
            <ListItemAvatar>
              {/* <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                <PersonIcon />
                {chain.logoUrl}
              </Avatar> */}
              <img src={chain.logoUrl} alt="Chain Logo" srcset="" />
            </ListItemAvatar>
            <ListItemText primary={chain.name} />
          </ListItem>
        ))}

      </List>
    </Dialog>
  );
}

NetOptions.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

