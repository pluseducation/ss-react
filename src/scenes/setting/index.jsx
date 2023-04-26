import * as React from 'react';
import { Box, useTheme } from "@mui/material";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Header from "../../components/header";
import General from "./component/general";
import translate from "../../i18nProvider/translate";
import { tokens } from "../../theme";

const Setting = () => {
  const [value, setValue] = React.useState(0);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box m={2}>
      <Header title={translate("set_title")} subtitle={translate("set_description")} />
      <Box
        m="40px 0 0 0"
        height="75vh"
      >
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label={translate("set_general_title")} {...a11yProps(0)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <General/>
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

export default Setting;
