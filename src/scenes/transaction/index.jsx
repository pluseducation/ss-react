import * as React from 'react';
import { Box, useTheme } from "@mui/material";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Header from "../../components/header";
import translate from "../../i18nProvider/translate";
import { tokens } from "../../theme";
import DepositTrx from './depositTrx';
import useAxiosPrivate from "../../hook/useAxiosPrivate";

const Transaction = () => {
    const [value, setValue] = React.useState(0);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const axiosPrivate = useAxiosPrivate();
    const [member, setMember] = React.useState();
    const [bank, setBank] = React.useState();
    const [depositAccount, setDepositAccount] = React.useState();
    const [withdrawAccount, setWithdrawAccount] = React.useState();
    

    const loadValueList_handle = () => {
        try {
            axiosPrivate.get('/member/view-member')
                .then(res => {
                    setMember(res.data.data);
                })

            axiosPrivate.get('/member/view-member-bank')
            .then(res => {
                setBank(res.data.data);
            })

            axiosPrivate.get('/account/view-account')
            .then(res => {
                let obj1 = getDepositAccount(res.data.data)
                let obj2 = getWithdrawAccount(res.data.data)
                setDepositAccount(obj1);
                setWithdrawAccount(obj2);
            })

        } catch (err) {
            console.error(err);
        }
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    React.useEffect(() => {
        loadValueList_handle();
    }, [])

    return (
        <Box m={2}>
            <Header title={translate("trx_title")} subtitle={translate("trx_description")} />
            <Box
                m="40px 0 0 0"
                height="75vh"
            >
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label={translate("trx_tab_deposit_title")} {...a11yProps(0)} />
                            <Tab label={translate("trx_tab_withdraw_title")} {...a11yProps(1)} />
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                        <DepositTrx member={member} bank={bank} depositAccount={depositAccount} ></DepositTrx>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        {/* <deposit/> */}
                    </TabPanel>
                </Box>
            </Box>
        </Box>
    );
};

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function getDepositAccount(accountList){
    return accountList.filter(account => account.account_type_id == 1)
}

function getWithdrawAccount(accountList){
    return accountList.filter(account => account.account_type_id == 2)
}

export default Transaction;
