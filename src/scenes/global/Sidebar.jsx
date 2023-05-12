import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined"; import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import translate from "../../i18nProvider/translate";
import useMediaQuery from "@mui/material/useMediaQuery";

import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import HandshakeOutlinedIcon from '@mui/icons-material/HandshakeOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import TravelExploreOutlinedIcon from '@mui/icons-material/TravelExploreOutlined';

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <MenuItem
      active={selected.props.id === title.props.id}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isBreakPoints = useMediaQuery(theme.breakpoints.down('sm'));

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState(translate("global_dashboard"));

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.blueAccent[900]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#9465d1 !important",
        },
        "& .pro-menu-item.active": {
          color: "#793ec6 !important",
        },
      }}
    >

      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">

          <MenuItem
            onClick={() => {
                setIsCollapsed(!isCollapsed)
            }}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  ADMINIS
                </Typography>
                <IconButton onClick={() => {
                    setIsCollapsed(!isCollapsed);
                }}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box textAlign="center">
                <Typography
                  variant="h4"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  Ed Roh
                </Typography>
                <Typography variant="h6" color="secondary">
                  VP Fancy Admin
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title={translate("global_dashboard")}
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              {translate("global_menu")}
            </Typography>
            <Item
              title={translate("global_transaction")}
              to="/transaction"
              icon={<AssignmentOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title={translate("global_member")}
              to="/member"
              icon={<HowToRegOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title={translate("global_promotion")}
              to="/promotion"
              icon={<SellOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title={translate("global_agency")}
              to="/agency"
              icon={<HandshakeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title={translate("global_bankaccount")}
              to="/account"
              icon={<AccountBalanceOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title={translate("global_rootagent")}
              to="/rootagent"
              icon={<TravelExploreOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              {/* {translate("global_system")} */}
            </Typography>
            <Item
              title={translate("global_setting")}
              to="/setting"
              icon={<SettingsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title={translate("global_user")}
              to="/user"
              icon={<PersonOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title={translate("global_role")}
              to="/pie"
              icon={<WorkOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title={translate("global_operation")}
              to="/login"
              icon={<FactCheckOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
