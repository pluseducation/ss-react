import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { tokens } from "../theme"
import { useTheme } from "@mui/material";
import { color } from '@mui/system';

const OptionBarControl = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

    return (
      <ButtonGroup>
        <Button variant="outlined" endIcon={<AddCircleOutlineOutlinedIcon />}>
          Add
        </Button>
        <Button variant="outlined"  endIcon={<CheckCircleOutlinedIcon />} color="success" >
          Approve
        </Button>
        <Button variant="outlined" endIcon={<DeleteOutlinedIcon />} color="error"  >
          Delete
        </Button>
      </ButtonGroup>
    );
  }

export default OptionBarControl;