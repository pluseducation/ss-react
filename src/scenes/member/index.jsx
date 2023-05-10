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


const Member = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const axiosPrivate = useAxiosPrivate();

    const [toggle, setToggle] = React.useState(false)
    const [selectedId, setSelectedId] = React.useState()
    const [id, setId] = React.useState()
    const [valueList, setValueList] = React.useState()
    const [value, setValue] = React.useState()

    const [memberBank, setMemberBank] = React.useState();
    const [memberAgency, setMemberAgency] = React.useState();
    const [memberRootagent, setMemberRootagent] = React.useState();


    const close_onclick = (e, reason) => {
        console.log(reason);
        if (reason && reason == "backdropClick")
            return;
        setToggle(false);
    }

    const loadValueList_handle = () => {
        try {
            axiosPrivate.get('/member/view-member')
                .then(res => {
                    setValueList(res.data.data);
                })

            axiosPrivate.get('/member/view-member-bank')
            .then(res => {
                setMemberBank(res.data.data);
            })

            // axiosPrivate.get('/member/view-member-agency')
            // .then(res => {
            //     setMemberAgency(res.data.data);
            // })

            axiosPrivate.get('/member/view-member-rootagent')
            .then(res => {
                setMemberRootagent(res.data.data);
            })

        } catch (err) {
            console.error(err);
        }
    }

    const loadValue_handle = (id) => {
        setValue(null);
        setId(id);
        setToggle(true);

        let fname = '';
        let lname = '';
        let username = '';
        let password = '';
        let agency_id = -1;
        let root_agent_id = -1;
        let telephone = '';
        let line_id = '';
        let bank_id = -1;
        let bank_account_number = '';
        let recommender_id = '';
        let recommender_value = '';
        let status = 'A'
        if (id) {
            try {
                axiosPrivate.get('/member/view-member-byId/' + id).then(res => {
                    id = res.data.data[0].id;
                    fname = res.data.data[0].fname;
                    lname = res.data.data[0].lname;
                    username = res.data.data[0].username;
                    password = res.data.data[0].password;
                    agency_id = res.data.data[0].agency_id;
                    root_agent_id = res.data.data[0].root_agent_id;
                    telephone = res.data.data[0].telephone;
                    line_id = res.data.data[0].line_id;
                    bank_id = res.data.data[0].bank_id;
                    bank_account_number = res.data.data[0].bank_account_number;
                    recommender_id = res.data.data[0].recommender_id;
                    recommender_value = res.data.data[0].recommender_value;
                    status = res.data.data[0].status;
                    
                    setValue({ id,fname,lname,username,password,agency_id,root_agent_id,telephone,line_id
                        ,bank_id,bank_account_number,recommender_id,recommender_value,status});
                });
            } catch (err) {
                console.error(err);
            }
        } else {
            setValue({ id,fname,lname,username,password,agency_id,root_agent_id,telephone,line_id
                ,bank_id,bank_account_number,recommender_id,recommender_value,status});
        }
    }

    const postValue_handle = async (value) => {
        try {
            if (value) {
                let res = await axiosPrivate.post('/member/create-member', value)
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
                let res = await axiosPrivate.put('/member/update-member', value)
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
                axiosPrivate.delete('/member/delete-member/' + id)
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
            <Header title={translate("member_title")} subtitle={translate("member_description")} />
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
                    <Update setToggle={setToggle} memberBank={memberBank} memberAgent={memberAgency} memberRootagent={memberRootagent}  postValue_handle={postValue_handle} putValue_handle={putValue_handle} value={value} id={id} ></Update>
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default Member;
