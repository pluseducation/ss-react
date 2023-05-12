import * as React from 'react';
import { Box } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import translate from "../../i18nProvider/translate";
import useMediaQuery from "@mui/material/useMediaQuery";
import ManageControl from "../../components/manageControl";
import List from "./component/list";
import Update from "./component/update";
import Header from "../../components/header";
import useAxiosPrivate from "../../hook/useAxiosPrivate";


const Promotion = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const axiosPrivate = useAxiosPrivate();

    const [toggle, setToggle] = React.useState(false)
    const [selectedId, setSelectedId] = React.useState()
    const [id, setId] = React.useState()
    const [valueList, setValueList] = React.useState()
    const [value, setValue] = React.useState()

    const close_onclick = (e, reason) => {
        console.log(reason);
        if (reason && reason == "backdropClick")
            return;
        setToggle(false);
    }

    const loadValueList_handle = () => {
        try {
            // axiosPrivate.get('/agency/view-agency')
            //     .then(res => {
            //         setValueList(res.data.data);
            //     })

            // axiosPrivate.get('/agency/commission-type')
            // .then(res => {
            //     setCommissionType(res.data.data);
            // })
            setValueList({})
        } catch (err) {
            console.error(err);
        }
    }

    const loadValue_handle = (id) => {
        setValue(null);
        setId(id);
        setToggle(true);

        let promotion_name = '';
        let promotion_desc = '';
        let promotion_link = '';
        let promotion_member_type = '1';
        let promotion_type = '1';
        let promotion_value = '';
        let promotion_image = '';
        let promotion_condition_deposit = '';
        let promotion_condition_bonus = '';
        let promotion_condition_count = '';
        let promotion_condition_turnover = '';
        let promotion_daily_type = '1';
        let promotion_time_type = '1';
        let promotion_start_time = '';
        let promotion_end_time = '';

        let status = 'A'
        if (id) {
            try {
                // axiosPrivate.get('/agency/view-agency-byId/' + id).then(res => {
                //     id = res.data.data[0].id;
                //     name = res.data.data[0].name;
                //     commission = res.data.data[0].commission;
                //     commission_send_company = res.data.data[0].commission_send_company;
                //     agency_commission_type_id = res.data.data[0].agency_commission_type_id;
                //     status = res.data.data[0].status;

                //     setValue({ id, promotion_name, promotion_desc, promotion_link, promotion_member_type,
                //         promotion_type, promotion_value, promotion_image, promotion_condition_deposit, promotion_condition_bonus,
                //         promotion_condition_count, promotion_condition_turnover, promotion_daily_type, promotion_time_type,
                //         promotion_start_time, promotion_end_time, status});
                // });

                setValue({
                    id, promotion_name, promotion_desc, promotion_link, promotion_member_type,
                    promotion_type, promotion_value, promotion_image, promotion_condition_deposit, promotion_condition_bonus,
                    promotion_condition_count, promotion_condition_turnover, promotion_daily_type, promotion_time_type,
                    promotion_start_time, promotion_end_time, status
                });

            } catch (err) {
                console.error(err);
            }
        } else {
            setValue({
                id, promotion_name, promotion_desc, promotion_link, promotion_member_type,
                promotion_type, promotion_value, promotion_image, promotion_condition_deposit, promotion_condition_bonus,
                promotion_condition_count, promotion_condition_turnover, promotion_daily_type, promotion_time_type,
                promotion_start_time, promotion_end_time, status
            });

        }
    }

    const postValue_handle = async (value) => {
        try {
            if (value) {
                let res = await axiosPrivate.post('/agency/create-agency', value)
                setToggle(false);
                loadValueList_handle();
                return [res, null];
            }
        } catch (err) {
            let res = err.response.data.data;
            return [res, err];
        }
    }

    const putValue_handle = async (id, value) => {
        try {
            if (value) {
                let res = await axiosPrivate.put('/agency/update-agency', value)
                setToggle(false);
                loadValueList_handle();
                return [res, null];
            }
        } catch (err) {
            let res = err.response.data.data;
            return [res, err];
        }
    }

    const delValue_handle = (id) => {
        try {
            if (id) {
                axiosPrivate.delete('/agency/delete-agency/' + id)
                    .then(res => {
                        console.log(res);
                        loadValueList_handle();
                    })
            }
        } catch (err) {
            console.error(err);
        }
    }

    React.useEffect(() => {
        loadValueList_handle();
    }, [])


    return (
        <Box m={2} >
            <Header title={translate("promotion_title")} subtitle={translate("promotion_description")} />
            <Box mb={2} display="flex" justifyContent="flex-end"  >
                <ManageControl selectedId={selectedId} loadValue_handle={loadValue_handle} delValue_handle={delValue_handle}  ></ManageControl>
            </Box>
            <div style={{ width: '100%' }}>
                <div style={{ height: '75vh', width: '100%' }}>
                    <List setId={setId} setSelectedId={setSelectedId} loadValue_handle={loadValue_handle} valueList={valueList} />
                </div>
            </div>
            <Dialog
                fullScreen={fullScreen}
                fullWidth
                maxWidth="md"
                open={toggle}
                onClose={close_onclick}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogContent sx={{ padding: 0 }}>
                    <Update setToggle={setToggle} postValue_handle={postValue_handle} putValue_handle={putValue_handle} value={value} id={id} ></Update>
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default Promotion;
