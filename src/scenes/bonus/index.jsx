import * as React from 'react';
import { Box } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import translate from "../../i18nProvider/translate";
import useMediaQuery from "@mui/material/useMediaQuery";
import ManageControl from "../../components/manageControl";
// import List from "./component/list";
// import Update from "./component/update";
import Header from "../../components/header";
import useAxiosPrivate from "../../hook/useAxiosPrivate";


const Transaction = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const axiosPrivate = useAxiosPrivate();

    const [toggle, setToggle] = React.useState(false)
    const [selectedId, setSelectedId] = React.useState()
    const [id, setId] = React.useState()
    const [valueList, setValueList] = React.useState()
    const [value, setValue] = React.useState()

    const [rootAgentBank, setRootAgentBank] = React.useState();

    const close_onclick = (e, reason) => {
        console.log(reason);
        if (reason && reason == "backdropClick")
            return;
        setToggle(false);
    }

    const loadValueList_handle = () => {
        try {
            axiosPrivate.get('/root-agent/view-rootagent')
                .then(res => {
                    setValueList(res.data.data);
                })

            axiosPrivate.get('/root-agent/view-rootagent-bank')
            .then(res => {
                setRootAgentBank(res.data.data);
            })
            
        } catch (err) {
            console.error(err);
        }
    }

    const loadValue_handle = (id) => {
        setValue(null);
        setId(id);
        setToggle(true);

        let root_agent_name = '';
        let root_agent_username = '';
        let root_agent_password = '';

        let root_agent_username_page = '-'
        let member_username_prefix = ''
        let member_fixed_password = '';
        let member_running_no = 0;
  
        let root_agent_api_endpoint = '';
        let root_agent_api_client_name = '';
        let root_agent_api_hash = '';
        let root_agent_api_key = '';

        let status = 'A'
        if (id) {
            try {
                axiosPrivate.get('/root-agent/view-rootagent-byId/' + id).then(res => {
                    id = res.data.data[0].id;
                    root_agent_name = res.data.data[0].root_agent_name;
                    root_agent_username = res.data.data[0].root_agent_username;
                    root_agent_password = '';//res.data.data[0].root_agent_password;

                    member_username_prefix = res.data.data[0].member_username_prefix;
                    member_fixed_password = res.data.data[0].member_fixed_password;
                    member_running_no = res.data.data[0].member_running_no;

                    root_agent_api_endpoint = res.data.data[0].root_agent_api_endpoint;
                    root_agent_api_client_name = res.data.data[0].root_agent_api_client_name;
                    root_agent_api_hash = res.data.data[0].root_agent_api_hash;
                    root_agent_api_key = res.data.data[0].root_agent_api_key;
                    status = res.data.data[0].status;
                    
                    setValue({ id, root_agent_name, root_agent_username, root_agent_username_page, root_agent_password
                        , member_username_prefix, member_fixed_password, member_running_no
                        , root_agent_api_endpoint, root_agent_api_client_name, root_agent_api_hash, root_agent_api_key, status});
                });
            } catch (err) {
                console.error(err);
            }
        } else {
            setValue({ id, root_agent_name, root_agent_username, root_agent_username_page, root_agent_password
                , member_username_prefix, member_fixed_password, member_running_no
                , root_agent_api_endpoint, root_agent_api_client_name, root_agent_api_hash, root_agent_api_key, status});
        }
    }

    const postValue_handle = async (value) => {
        try {
            if (value) {
                let res = await axiosPrivate.post('/root-agent/register-rootagent', value)
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
                let res = await axiosPrivate.put('/root-agent/update-rootagent', value)
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
                axiosPrivate.delete('/root-agent/delete-rootagent/' + id)
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
            <Header title={translate("bonus_title")} subtitle={translate("bonus_description")} />
            <Box mb={2} display="flex" justifyContent="flex-end"  >
                <ManageControl selectedId={selectedId} loadValue_handle={loadValue_handle} delValue_handle={delValue_handle}  ></ManageControl>
            </Box>

            {/* <div style={{ width: '100%' }}>
                <div style={{ height: '75vh', width: '100%' }}>
                    <List setId={setId} setSelectedId={setSelectedId} loadValue_handle={loadValue_handle} valueList={valueList} />
                </div>
            </div>

            <Dialog
                fullScreen ={fullScreen}
                fullWidth
  maxWidth="md"
                open={toggle}
                onClose={close_onclick}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogContent sx={{ padding: 0 }}>
                    <Update setToggle={setToggle} rootAgentBank={rootAgentBank} postValue_handle={postValue_handle} putValue_handle={putValue_handle} value={value} id={id} ></Update>
                </DialogContent>
            </Dialog> */}
        </Box>
    );
};

export default Transaction;
