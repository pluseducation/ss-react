import { Outlet } from 'react-router-dom';
import Container from '@mui/material/Container';
import { Box } from "@mui/material";
import { useState } from 'react'

import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import { I18nPropvider, LOCALES } from '../../i18nProvider';

const Layout = ({isSidebar,locale,setLocale}) => {

    return (
        <div className="app">
            <Sidebar isSidebar={isSidebar} />
            <main className="content">
                <Topbar locale={locale} setLocale={setLocale} />
                <Outlet />
            </main>
        </div>
    );
};

export default Layout