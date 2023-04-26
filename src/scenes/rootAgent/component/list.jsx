import { useEffect, useState } from "react";
import Loading from '../../../components/loading'
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import { Button, Box, Avatar, useTheme } from "@mui/material";
import translate from "../../../i18nProvider/translate";
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined';

const List = ({ setId, setSelectedId, loadValue_handle, valueList }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [selectionModel, setSelectionModel] = useState([]);

    const columns = [
        {
            field: "id",
            flex: 1,
            renderHeader: () => (
                <strong>
                    {translate('rootagent_order')}
                </strong>
            ),
        },
        {
            field: "root_agent_name",
            flex: 1,
            renderHeader: () => (
                <strong>
                    {translate('rootagent_name')}
                </strong>
            ),
        },
        {
            field: "root_agent_username",
            flex: 1,
            renderHeader: () => (
                <strong>
                    {translate('rootagent_username')}
                </strong>
            ),
        },
        {
            field: "root_agent_username_page",
            flex: 1,
            renderHeader: () => (
                <strong>
                    {translate('rootagent_username_page')}
                </strong>
            ),
        },
        {
            field: "root_agent_password",
            flex: 1,
            renderHeader: () => (
                <strong>
                    {translate('rootagent_password')}
                </strong>
            ),
        },
        {
            field: "bank_id",
            flex: 1,
            renderHeader: () => (
                <strong>
                    {translate('rootagent_bank')}
                </strong>
            ),
            renderCell: (params) => {
                return (
                    <Box display='flex' columnGap={1}>
                        <Avatar id={params.row.id} src={params.row.bank_detail.logoURL} sx={{ width: 24, height: 24 }} />
                        <Box padding='4px 0px 0px 0px'>
                        {params.row.bank_detail.bank_short_eng_name}
                        </Box>
                    </Box>


                )
            }
        },
        {
            field: "root_agent_api_endpoint",
            flex: 1,
            renderHeader: () => (
                <strong>
                    {translate('rootagent_api_endpoint')}
                </strong>
            ),
        },
        {
            field: "root_agent_api_client_name",
            flex: 1,
            renderHeader: () => (
                <strong>
                    {translate('rootagent_api_client_name')}
                </strong>
            ),
        },
        {
            field: "root_agent_api_hash",
            flex: 1,
            renderHeader: () => (
                <strong>
                    {translate('rootagent_api_hash')}
                </strong>
            ),
        },
        {
            field: "root_agent_api_key",
            flex: 1,
            renderHeader: () => (
                <strong>
                    {translate('rootagent_api_key')}
                </strong>
            ),
        },
        
        {
            field: "status",
            flex: 1,
            renderHeader: () => (
                <strong>
                    {translate('rootagent_status')}
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
            field: "edit",
            flex: 1,
            sortable: false,
            renderHeader: () => (
                <strong>
                    {translate('global_edit')}
                </strong>
            ),
            renderCell: (params) => {
                return (
                    <Button variant="outlined" endIcon={<NoteAltOutlinedIcon />} onClick={(e) => {
                        setId(params.id)
                        loadValue_handle(params.id)
                    }} >
                        {translate("global_edit")}
                    </Button>
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

export default List;
