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


const Account = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const axiosPrivate = useAxiosPrivate();

    const [toggle, setToggle] = React.useState(false)
    const [selectedId, setSelectedId] = React.useState()
    const [id, setId] = React.useState()
    const [valueList, setValueList] = React.useState()
    const [value, setValue] = React.useState()
    const [oldValue, setOldValue] = React.useState()

    const [accountType, setAccountType] = React.useState();
    const [bankType, setBankType] = React.useState();

    const close_onclick = (e, reason) => {
        console.log(reason);
        if (reason && reason == "backdropClick")
            return;
        setToggle(false);
    }

    const loadValueList_handle = () => {
        try {
            axiosPrivate.get('/account/view-account')
                .then(res => {
                    setValueList(res.data.data);
                })

            axiosPrivate.get('/account/account-type')
            .then(res => {
                setAccountType(res.data.data);
            })

            axiosPrivate.get('/account/bank-type')
            .then(res => {
                setBankType(res.data.data);
            })

        } catch (err) {
            console.error(err);
        }
    }

    const loadValue_handle = (id) => {
        setValue(null);
        setId(id);
        setToggle(true);

        let bank_id = -1;
        let account_name = '';
        let account_number = '';
        let account_type_id = -1;
        let status = 'A'
        if (id) {
            try {
                axiosPrivate.get('/account/view-account-byId/' + id).then(res => {
                    id = res.data.data[0].id;
                    account_type_id = res.data.data[0].account_type_id;
                    bank_id = res.data.data[0].bank_id;
                    account_name = res.data.data[0].account_name;
                    account_number = res.data.data[0].account_number;
                    status = res.data.data[0].status;
                    
                    setValue({ id, account_type_id, bank_id, account_name, account_number, status});
                });
            } catch (err) {
                console.error(err);
            }
        } else {
            setValue({ id, account_type_id, bank_id, account_name, account_number, status});
        }
    }

    const postValue_handle = async (value) => {
        try {
            if (value) {
                let res = await axiosPrivate.post('/account/create-account', value)
                setToggle(false);
                loadValueList_handle();
                return [res, null];
            }
        } catch (err) {
            let res = err.response.data.data;
            return [res, err];
        }
    }

    const putValue_handle = async (id, values) => {
        try {
            if (values) {
                console.log(value);
                console.log(values);
                let res = await axiosPrivate.put('/account/updateAccount-account', values)
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
                axiosPrivate.delete('/account/delete-account/' + id)
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
            <Header title={translate("account_title")} subtitle={translate("account_escription")} />
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
                open={toggle}
                onClose={close_onclick}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogContent sx={{ padding: 0 }}>
                    <Update setToggle={setToggle} accountType={accountType} bankType={bankType} postValue_handle={postValue_handle} putValue_handle={putValue_handle} value={value} id={id} ></Update>
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default Account;
