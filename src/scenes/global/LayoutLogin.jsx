import { Outlet } from 'react-router-dom';
import Container from '@mui/material/Container';
import { Box } from "@mui/material";
import { useState } from 'react'

const LayoutLogin = () => {
    return (
        <div className="app">
            <main className="content">
                <Outlet />
            </main>
        </div>
    );
};
export default LayoutLogin