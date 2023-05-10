import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { tokens } from "../theme"
import { useTheme } from "@mui/material";
import { color } from '@mui/system';
import translate from "../i18nProvider/translate";
import { useConfirm } from "material-ui-confirm";

const ManageControl = ({ selectedId, loadValue_handle, delValue_handle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const confirm = useConfirm();

  return (
    <ButtonGroup>
      <Button endIcon={<AddCircleOutlineOutlinedIcon />} onClick={(e) => {
        loadValue_handle(null)
      }} >
        {translate("global_add")}
      </Button>
      <Button endIcon={<CheckCircleOutlinedIcon />} color="success" onClick={(e) => {
        approve_onClick()
      }} >
        {translate("global_approve")}
      </Button>
      <Button endIcon={<DeleteOutlinedIcon />} color="error" onClick={(e) => {
        if (selectedId) {
          confirm({
            title: translate("alert_confirm_title"),
            description: translate("alert_delete_confirm_description"),
            cancellationText: translate('global_close'),
            confirmationText: translate('global_ok'),
            confirmationButtonProps: { color:"primary", variant:"contained"}
          })
            .then(() => {
              delValue_handle(selectedId)
            })
            .catch(() => {

            });
        }
        else {

        }
      }} >
        {translate("global_Delete")}
      </Button>
    </ButtonGroup>
  );
}

export default ManageControl;