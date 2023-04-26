import { useEffect, useState } from "react";
import Loading from '../../../components/loading'
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import { Button, useTheme } from "@mui/material";
import translate from "../../../i18nProvider/translate";
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined';

const List = ({ setId, setSelectedId, loadValue_handle, valueList}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [selectionModel, setSelectionModel] = useState([]);

    const columns = [
        {
            field: "id",
            flex: 1,
            renderHeader: () => (
                <strong>
                    {translate('user_order')}
                </strong>
            ),
        },
        {
            field: "username",
            flex: 1,
            renderHeader: () => (
                <strong>
                    {translate('user_name')}
                </strong>
            ),
        },
        {
            field: "role_id",
            flex: 1,
            renderHeader: () => (
                <strong>
                    {translate('user_role')}
                </strong>
            ),
        },
        {
            field: "last_login",
            flex: 1,
            renderHeader: () => (
                <strong>
                    {translate('user_last_login_at')}
                </strong>
            ),
        },
        {
            field: "ip_address",
            flex: 1,
            renderHeader: () => (
                <strong>
                    {translate('user_ip')}
                </strong>
            ),
        },
        {
            field: "status",
            flex: 1,
            renderHeader: () => (
                <strong>
                    {translate('user_status')}
                </strong>
            ),
            renderCell: (params) => {
                return (<span>
                     {params.row.status == 'A' ? translate('global_status_active') : '' }
                     {params.row.status == 'I' ? translate('global_status_inactive') : '' }
                    </span> 
                )
            }
        },
        {
            field: "userOperation",
            flex: 1,
            renderHeader: () => (
                <strong>
                    {translate('user_operation')}
                </strong>
            ),
            renderCell: () => {
                return (
                    <Button variant="outlined" color="secondary"  >
                        {translate("user_operation")}
                    </Button>
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
