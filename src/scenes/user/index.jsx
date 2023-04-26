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

const User = () => {
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
            axiosPrivate.get('/user/view-user')
                .then(res => {
                    setValueList(res.data.data);
                })
        } catch (err) {
            console.error(err);
        }
    }

    const loadValue_handle = (id) => {
        setValue(null);
        setId(id);
        setToggle(true);

        let username = '';
        let name = '';
        let password = '';
        let role_id = '';
        let telephone = '';
        let status = 'A';

        if (id) {
            try {
                axiosPrivate.get('/user/view-user-byId/' + id).then(res => {
                    id = res.data.data[0].id;
                    username = res.data.data[0].username;
                    name = res.data.data[0].name;
                    password = res.data.data[0].password;
                    role_id = res.data.data[0].role_id;
                    telephone = res.data.data[0].telephone;
                    status = res.data.data[0].status;
                    setValue({ id, username, name, password, role_id, telephone, status });
                });
            } catch (err) {
                console.error(err);
            }
        } else {
            setValue({ id, username, name, password, role_id, telephone, status })
        }
    }

    const postValue_handle = async (value) => {
        try {
            if (value) {
                let res = await axiosPrivate.post('/user/register-user', value)
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
                let res = await axiosPrivate.put('/user/update', value)
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
                axiosPrivate.delete('/user/delete-user/' + id)
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
            <Header title={translate("user_title")} subtitle={translate("user_description")} />
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
                    <Update setToggle={setToggle} postValue_handle={postValue_handle} putValue_handle={putValue_handle} value={value} id={id} ></Update>
                </DialogContent>
            </Dialog>
        </Box>


    );
};

export default User;
