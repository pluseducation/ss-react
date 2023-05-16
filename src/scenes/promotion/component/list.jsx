import { useEffect, useState } from "react";
import Loading from '../../../components/loading'
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import { Box, Button, useTheme } from "@mui/material";
import translate from "../../../i18nProvider/translate";
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined';
import { Padding } from "@mui/icons-material";

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
                    {translate('promotion_order')}
                </strong>
            ),
        },
        {
            field: "name",
            flex: 1,
            renderHeader: () => (
                <strong>
                    {translate('promotion_name')}
                </strong>
            ),
        },
        {
            field: "image_id",
            flex: 1,
            renderHeader: () => (
                <strong>
                    {translate('promotion_image')}
                </strong>
            ),
            renderCell: (params) => {
                return (
                    <Box p='5px'>
                        <img width='100%' height='auto' src={params.row.image.image} ></img>
                    </Box>
                )
            }
        },
        {
            field: "detail",
            flex: 1,
            renderHeader: () => (
                <strong>
                    {translate('promotion_desc')}
                </strong>
            ),
        },
        {
            field: "minimum_deposit",
            flex: 2,
            renderHeader: () => (
                <strong>
                    {translate('promotion_condition')}
                </strong>
            ),
            renderCell: (params) => {
                return (
                <Box p='5px' display='flex' flexDirection='column' justifyContent='space-between' >
                    <li>{translate('promotion_condition_deposit')} {params.row.minimum_deposit}</li>
                    <li>{translate('promotion_condition_bonus')} {params.row.maximum_bonus}</li>
                    <li>{translate('promotion_condition_count')} {params.row.bonus_time_per_day}</li>
                    <li>{translate('promotion_condition_turnover')} {params.row.turnover}</li>
                </Box>
                )
            }
        },
        {
            field: "status",
            flex: 1,
            renderHeader: () => (
                <strong>
                    {translate('agency_status')}
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
                    <Button endIcon={<NoteAltOutlinedIcon />} onClick={(e) => {
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
