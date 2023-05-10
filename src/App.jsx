import { useState } from 'react'
import { Routes, Route } from "react-router-dom";

import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Member from './scenes/member';
import User from './scenes/user'
import Login from './scenes/login';
import Agency from './scenes/agency';
import Account from './scenes/account';
import RootAgent from './scenes/rootAgent';


import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { I18nPropvider, LOCALES } from './i18nProvider';
import { ConfirmProvider } from "material-ui-confirm";

function App() {

  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [locale, setLocale] = useState(LOCALES.ENGLISH);


  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
          <I18nPropvider locale={locale}>
          <ConfirmProvider>
            <div className="app">
              <Sidebar isSidebar={isSidebar} />
              <main className="content">
                <Topbar setIsSidebar={setIsSidebar} />
                <Routes>

                  {/* we want to protect these routes */}
                  {/* <Route path="/" element={<Dashboard />} /> */}
                  <Route path="/member" element={<Member />} />
                  <Route path="/user" element={<User />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/agency" element={<Agency />} />
                  <Route path="/account" element={<Account />} />
                  <Route path="/rootagent" element={<RootAgent />} />
                </Routes>
              </main>
            </div>
            </ConfirmProvider>
          </I18nPropvider>
      </ThemeProvider>
    </ColorModeContext.Provider >
  )
}

export default App
