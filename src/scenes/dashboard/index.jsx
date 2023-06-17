import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";

import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import useMediaQuery from "@mui/material/useMediaQuery";
import translate from "../../i18nProvider/translate";

import Deposit from "./component/Deposit";
import Withdraw from "./component/Withdraw";
import NewMember from "./component/NewMember";
import DepositReport from "./component/DepositReport";
import DepositTransaction from "./component/DepositTransaction";
import WithdrawTransaction from "./component/WithdrawTransaction";
import BankSystem from "./component/BankSystem";
import BankDeposit from "./component/BankDeposit";
import BankWithdraw from "./component/BankWithdraw";

const Dashboard = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title={translate("dash_title")} subtitle={translate("dash_description")} />
      </Box>

      {/* ROW 1 */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        sx={{
          "& > div": { gridColumn: isNonMobile ? "span 3" : "span 12" },
        }}
        gridAutoRows="140px"
        gap="20px"
      >
        <Deposit title={translate("dash_cash_deposit")}
          icon={
            <MonetizationOnIcon color="secondary"
              sx={{ fontSize: "48px" }}
            />
          } ></Deposit>
        <Withdraw title={translate("dash_cash_withdraw")}
          icon={
            <CurrencyExchangeIcon color="secondary"
              sx={{ fontSize: "48px" }}
            />
          } >
        </Withdraw>
        <NewMember title={translate("dash_new_member")}
          icon={
            <PersonAddIcon color="secondary"
              sx={{ fontSize: "48px" }}
            />
          } >
        </NewMember>
      </Box>

      {/* ROW 0 */}
      <Box display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        sx={{
          "& > div": { gridColumn: isNonMobile ? "span 4" : "span 12" },
        }}
        gap="20px"
        mt={2}>
        <BankSystem title={translate("dash_bank_system")} />
        <BankDeposit title={translate("dash_bank_deposit")} />
        <BankWithdraw title={translate("dash_bank_withdraw")} />
      </Box>

      {/* ROW 2 */}
      <Box display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        sx={{
          "& > div": { gridColumn: isNonMobile ? "span 6" : "span 12" },
        }}
        gridAutoRows="140px"
        gap="20px"
        mt={2}>
        <DepositTransaction title={translate("dash_deposittrx_title")} />
        <WithdrawTransaction title={translate("dash_withdrawtrx_title")} />
      </Box>

      {/* ROW 3 */}
      <Box display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        sx={{
          "& > div": { gridColumn: isNonMobile ? "span 12" : "span 12" },
        }}
        gridAutoRows="140px"
        gap="20px"
        mt={2}>

        <DepositReport title={translate("dash_depositreport_title")} value={"59,342.32"} data={null} />
      </Box>
    </Box>
  );
};

export default Dashboard;
