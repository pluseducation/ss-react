import { useState } from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import RequireAuth from './scenes/global/RequireAuth';

import Member from './scenes/member';
import Promotion from './scenes/promotion';
import User from './scenes/user'
import Login from './scenes/login';

import Agency from './scenes/agency';
import Account from './scenes/account';
import RootAgent from './scenes/rootAgent';
import Dashboard from './scenes/dashboard';
import Transaction from './scenes/transaction';
import Bonus from './scenes/bonus';
import Setting from './scenes/setting';
import Missing from './scenes/global/Missing'

import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { I18nPropvider, LOCALES } from './i18nProvider';
import { ConfirmProvider } from "material-ui-confirm";
import Layout from './scenes/global/Layout';
import LayoutLogin from './scenes/global/LayoutLogin';

function App() {

  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [locale, setLocale] = useState(LOCALES.THAILAND);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
          <I18nPropvider locale={locale}>
          <ConfirmProvider>
                <Routes>
                  <Route element={<LayoutLogin/>}>
                    <Route path="/" element={<Login />} />
                  </Route>
                  <Route element={<RequireAuth />}>
                    <Route element={<Layout isSidebar={isSidebar} locale={locale} setLocale={setLocale} />} >
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/transaction" element={<Transaction />} />
                      <Route path="/bonus" element={<Bonus />} />
                      <Route path="/member" element={<Member />} />
                      <Route path="/promotion" element={<Promotion />} />
                      <Route path="/user" element={<User />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/agency" element={<Agency />} />
                      <Route path="/account" element={<Account />} />
                      <Route path="/rootagent" element={<RootAgent />} />
                      <Route path="/setting" element={<Setting />} />
                    </Route>
                  </Route>
                  {/* <Route path="/*" element={<Missing />} /> */}
                  <Route path="/*" element={<Navigate to='/' />} /> 
                </Routes>
            </ConfirmProvider>
          </I18nPropvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default App
