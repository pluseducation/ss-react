import { useEffect, useState } from "react";
import Loading from '../../../components/loading'
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import { Box, Button, Avatar, useTheme } from "@mui/material";
import translate from "../../../i18nProvider/translate";
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined';
import { Padding } from "@mui/icons-material";
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import { useConfirm } from "material-ui-confirm";

const DepositList = ({ setId, setSelectedId, loadValue_handle, valueList, appValue_handle }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [selectionModel, setSelectionModel] = useState([]);
    const confirm = useConfirm();
    
    const columns = [
        {
            field: "id",
            flex: 1,
            renderHeader: () => (
                <strong>
                    {translate('trx_deposit_order')}
                </strong>
            ),
        },
        {
            field: "member_id",
            flex: 1,
            renderHeader: () => (
                <strong>
                    {translate('trx_deposit_member')}
                </strong>
            ),
            renderCell: (params) => {
                return (
                    <strong>
                        {params.row.member.username}
                    </strong>
                )
            }
        },
        {
            field: "deposit_source_account",
            flex: 1,
            renderHeader: () => (
                <strong>
                    {translate('trx_deposit_source_account')}
                </strong>
            ),
            renderCell: (params) => {
                return (
                    <Box display='flex' columnGap={1}>
                        <Avatar id={params.row.id} src={params.row.source_bank.logoURL} sx={{ width: 24, height: 24 }} />
                        <Box padding='4px 0px 0px 0px'>
                            {params.row.deposit_source_account}
                        </Box>
                    </Box>
                )
            }
        },
        {
            field: "deposit_amount",
            flex: 1,
            renderHeader: () => (
                <strong>
                    {translate('trx_deposit_amount')}
                </strong>
            ),
        },
        {
            field: "deposit_dest_account",
            flex: 1,
            renderHeader: () => (
                <strong>
                    {translate('trx_deposit_dest_account')}
                </strong>
            ),
            renderCell: (params) => {
                return (
                    <Box display='flex' columnGap={1}>
                        <Avatar id={params.row.id} src={params.row.dest_bank.logoURL} sx={{ width: 24, height: 24 }} />
                        <Box padding='4px 0px 0px 0px'>
                            {params.row.deposit_dest_account}
                        </Box>
                    </Box>
                )
            }
        },
        {
            field: "status",
            flex: 1,
            renderHeader: () => (
                <strong>
                    {translate('trx_deposit_status')}
                </strong>
            ),
            renderCell: (params) => {
                return (<span>
                    {params.row.status == 'A' ? translate('global_status_active') : ''}
                    {params.row.status == 'I' ? translate('global_status_inactive') : ''}
                </span>
                )
            }
        },
        {
            field: "transaction_status_id",
            flex: 1,
            renderHeader: () => (
                <strong>
                    {translate('trx_deposit_transaction_status')}
                </strong>
            ),
            renderCell: (params) => {
                return (<span>
                    {params.row.transaction_status_id == 1 ? translate('global_status_transaction_approve') : ''}
                    {params.row.transaction_status_id == 2 ? translate('global_status_transaction_reject') : ''}
                    {params.row.transaction_status_id == 3 ? translate('global_status_transaction_pending') : ''}
                </span>
                )
            }
        },
        {
            field: "approve",
            flex: 1,
            sortable: false,
            renderHeader: () => (
                <strong>
                    {translate('global_approve')}
                </strong>
            ),
            renderCell: (params) => {
                return (
                    params.row.transaction_status_id == 3 ?
                        <Button color="success" endIcon={<CheckCircleOutlinedIcon />} onClick={(e) => {
                            confirm({
                                title: translate("alert_confirm_title"),
                                description: translate("alert_approve_confirm_description"),
                                cancellationText: translate('global_close'),
                                confirmationText: translate('global_ok'),
                                confirmationButtonProps: { color: "primary", variant: "contained" }
                            })
                                .then(() => {
                                    let id = params.row.id;
                                    let username = params.row.member.username
                                    let depositAmount = params.row.deposit_amount;
                                    appValue_handle(id, username, depositAmount)
                                })
                                .catch(() => {

                                });
                        }} >
                            {translate("global_approve")}
                        </Button>
                        : <storage>-</storage>
                )
            }
        },
    ];

    return !valueList ? (<Loading />) : (

        <DataGrid
            getRowHeight={() => 'auto'}
            rows={valueList}
            columns={columns}
            initialState={{
                pagination: {
                    paginationModel: {
                        pageSize: 20,
                    },
                },
            }}
            pageSizeOptions={[20]}
            checkboxSelection
            sx={{
                "& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer": {
                    display: "none"
                }
            }}
            hideFooterSelectedRowCount
            rowSelectionModel={selectionModel}
            onRowSelectionModelChange={(selection) => {
                if (selection.length > 1) {
                    const selectionSet = new Set(selectionModel);
                    const result = selection.filter((s) => !selectionSet.has(s));
                    setSelectionModel(result);
                    setSelectedId(result[0])
                } else {
                    setSelectionModel(selection);
                    setSelectedId(selection[0])
                }
            }}
            components={{ Toolbar: GridToolbar }}
        />

    );

};

export default DepositList;
