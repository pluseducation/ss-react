import * as React from 'react';
import { Box } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import translate from "../../i18nProvider/translate";
import useMediaQuery from "@mui/material/useMediaQuery";
import ManageControl from "../../components/manageControl";
import DepositList from "./component/depositList";
import DepositUpdate from "./component/depositUpdate";
import Header from "../../components/header";
import useAxiosPrivate from "../../hook/useAxiosPrivate";


const DepositTrx = ({member, bank, depositAccount}) => {
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
            axiosPrivate.get('/finance/viewDepositList')
                .then(res => {
                    setValueList(res.data.data);
                })

            setValueList({})
        } catch (err) {
            console.error(err);
        }
    }

    const loadValue_handle = (id) => {
        setValue(null);
        setId(id);
        setToggle(true);

        let member_id = -1;
        let username = null;
        let deposit_amount = 0;
        let deposit_source_account = '';
        let deposit_source_bank_id = -1;
        let deposit_dest_account = ' ';
        let deposit_dest_bank_id = -1;
        let transaction_remark = '';
        let status = 'A'

        if (id) {
            try {
                // axiosPrivate.get('/promotion/view-promotion-byId/' + id).then(res => {
                //     id = res.data.data[0].id;
                //     name = res.data.data[0].name;
                //     detail = res.data.data[0].detail;
                //     promotion_link = res.data.data[0].promotion_link;
                //     member_type_id = res.data.data[0].member_type_id;
                //     bonus_type_id = res.data.data[0].bonus_type_id;
                //     bonus_amount = res.data.data[0].bonus_amount;
                //     image_id = res.data.data[0].image_id;
                //     url = res.data.data[0].image.image
                //     minimum_deposit = res.data.data[0].minimum_deposit;
                //     maximum_bonus = res.data.data[0].maximum_bonus;
                //     bonus_time_per_day = res.data.data[0].bonus_time_per_day;
                //     turnover = res.data.data[0].turnover;
                //     bonus_opendate_type_id = res.data.data[0].bonus_opendate_type_id;
                //     bonus_opentime_type_id = res.data.data[0].bonus_opentime_type_id;
                //     bonus_opentime_start = res.data.data[0].bonus_opentime_start;
                //     bonus_opentime_end = res.data.data[0].bonus_opentime_end;

                //     status = res.data.data[0].status;

                //     setValue({
                //         id, name, detail, promotion_link, member_type_id, bonus_type_id,
                //         bonus_amount, image_id, url, minimum_deposit, maximum_bonus, bonus_time_per_day,
                //         turnover, bonus_opendate_type_id, bonus_opentime_type_id, bonus_opentime_start, bonus_opentime_end, status
                //     });
                // });

            } catch (err) {
                console.error(err);
            }
        } else {
            setValue({ id, member_id, username, deposit_amount, deposit_source_account, deposit_source_bank_id,
                deposit_dest_account, deposit_dest_bank_id, transaction_remark, status
            });

        }
    }

    const postValue_handle = async (value) => {
        try {
            if (value) {
                let res = await axiosPrivate.post('/finance/createMDeposit', value)
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
        // try {
        //     if (value) {
        //         let res = await axiosPrivate.put('/promotion/update-promotion', value)
        //         setToggle(false);
        //         loadValueList_handle();
        //         return [res, null];
        //     }
        // } catch (err) {
        //     let res = err.response.data.data;
        //     return [res, err];
        // }
    }

    const delValue_handle = (id) => {
        // try {
        //     if (id) {
        //         axiosPrivate.delete('/promotion/delete-promotion/' + id)
        //             .then(res => {
        //                 console.log(res);
        //                 loadValueList_handle();
        //             })
        //     }
        // } catch (err) {
        //     console.error(err);
        // }
    }

    const appValue_handle = (id, username, deposit_amount) => {
        try {
            if (id) {
                let value = {id: id, username: username, deposit_amount: deposit_amount}
                axiosPrivate.post('/finance/approveMDeposit', value)
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
            
            <Box mb={2} display="flex" justifyContent="flex-end"  >
                <ManageControl selectedId={selectedId} loadValue_handle={loadValue_handle} delValue_handle={delValue_handle} appValue_handle={appValue_handle}  ></ManageControl>
            </Box>
            <div style={{ width: '100%' }}>
                <div style={{ height: '75vh', width: '100%' }}>
                    <DepositList setId={setId} setSelectedId={setSelectedId} loadValue_handle={loadValue_handle} valueList={valueList} appValue_handle={appValue_handle} />
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
                    <DepositUpdate setToggle={setToggle} member={member} bank={bank} depositAccount={depositAccount} postValue_handle={postValue_handle} putValue_handle={putValue_handle} value={value} id={id} />
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default DepositTrx;
