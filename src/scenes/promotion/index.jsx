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
            axiosPrivate.get('/promotion/view-promotion')
                .then(res => {
                    setValueList(res.data.data);
                })

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

        let name = '';
        let detail = '';
        let promotion_link = '';
        let member_type_id = 1;
        let bonus_type_id = 1;
        let bonus_amount = '';
        let image_id = '';
        let url = '';
        let minimum_deposit = '';
        let maximum_bonus = '';
        let bonus_time_per_day = '';
        let turnover = '';
        let bonus_opendate_type_id = 1;
        let bonus_opentime_type_id = 1;
        let bonus_opentime_start = '';
        let bonus_opentime_end = '';

        let status = 'A'
        if (id) {
            try {
                axiosPrivate.get('/promotion/view-promotion-byId/' + id).then(res => {
                    id = res.data.data[0].id;
                    name = res.data.data[0].name;
                    detail = res.data.data[0].detail;
                    promotion_link = res.data.data[0].promotion_link;
                    member_type_id = res.data.data[0].member_type_id;
                    bonus_type_id = res.data.data[0].bonus_type_id;
                    bonus_amount = res.data.data[0].bonus_amount;
                    image_id = res.data.data[0].image_id;
                    url = res.data.data[0].image.image
                    minimum_deposit = res.data.data[0].minimum_deposit;
                    maximum_bonus = res.data.data[0].maximum_bonus;
                    bonus_time_per_day = res.data.data[0].bonus_time_per_day;
                    turnover = res.data.data[0].turnover;
                    bonus_opendate_type_id = res.data.data[0].bonus_opendate_type_id;
                    bonus_opentime_type_id = res.data.data[0].bonus_opentime_type_id;
                    bonus_opentime_start = res.data.data[0].bonus_opentime_start;
                    bonus_opentime_end = res.data.data[0].bonus_opentime_end;

                    status = res.data.data[0].status;

                    setValue({
                        id, name, detail, promotion_link, member_type_id, bonus_type_id,
                        bonus_amount, image_id, url, minimum_deposit, maximum_bonus, bonus_time_per_day,
                        turnover, bonus_opendate_type_id, bonus_opentime_type_id, bonus_opentime_start, bonus_opentime_end, status
                    });
                });

            } catch (err) {
                console.error(err);
            }
        } else {
            setValue({
                id, name, detail, promotion_link, member_type_id, bonus_type_id,
                bonus_amount, image_id, url, minimum_deposit, maximum_bonus, bonus_time_per_day,
                turnover, bonus_opendate_type_id, bonus_opentime_type_id, bonus_opentime_start, bonus_opentime_end, status
            });

        }
    }

    const postValue_handle = async (value) => {
        try {
            if (value) {
                let res = await axiosPrivate.post('/promotion/create-promotion', value)
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
                let res = await axiosPrivate.put('/promotion/update-promotion', value)
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
                axiosPrivate.delete('/promotion/delete-promotion/' + id)
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
