import * as React from 'react';
import Loading from '../../../components/loading'
import ErrorMessage from '../../../components/errorMessage'
import { Box, Button, TextField, Typography, InputLabel, MenuItem, FormControl, Select, Avatar, FormHelperText, useTheme } from "@mui/material";

import { Formik } from "formik";
import * as yup from "yup";
import { tokens } from "../../../theme"
import useMediaQuery from "@mui/material/useMediaQuery";
import translate from "../../../i18nProvider/translate";
import useAxiosPrivate from "../../../hook/useAxiosPrivate";
import { validateDate } from '@mui/x-date-pickers/internals';

import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';

export const Update = ({ setToggle, rootAgentBank, postValue_handle, putValue_handle, value, id }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [disabled, setDisabled] = React.useState(false);
    const [validateForm, SetValidateForm] = React.useState();

    const handleFormSubmit = (values) => {
        console.log(values)
        setDisabled(true);

        if (id) {
            putValue_handle(id, values).then(([res, err]) => {
                if (err) {
                    SetValidateForm(res);
                }
                else {
                    SetValidateForm(null);
                }

                setDisabled(false);
            })
        }
        else {
            postValue_handle(values).then(([res, err]) => {
                if (err) {
                    SetValidateForm(res);
                }
                else {
                    SetValidateForm(null);
                }

                setDisabled(false);
            })
        }
    };


    return !value ? (<Loading />) : (
        <Box
            backgroundColor={colors.primary[500]}
            overflow="auto"
        >
            <Formik
                onSubmit={handleFormSubmit}
                initialValues={value}
                validationSchema={checkoutSchema}
                enableReinitialize={true}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                }) => (
                    <form onSubmit={handleSubmit}>
                        <Box
                            display="grid"
                            gap="30px"
                            gridTemplateColumns="repeat(12, minmax(0, 1fr))"
                            m="20px"
                        >
                            <Typography
                                variant="h3"
                                color={colors.grey[100]}
                                fontWeight="bold"
                                sx={{ m: "0 0 5px 0", gridColumn: "span 12" }}
                            >{translate('rootagent_update_title')}</Typography>

                            <TextField
                                type="text"
                                label={translate('rootagent_name')}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.root_agent_name}
                                name="root_agent_name"
                                error={!!touched.root_agent_name && !!errors.root_agent_name}
                                helperText={touched.root_agent_name && errors.root_agent_name}
                                sx={{ gridColumn: "span 12" }}
                            >
                            </TextField>

                            <TextField
                                type="text"
                                label={translate('rootagent_username')}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.root_agent_username}
                                name="root_agent_username"
                                error={!!touched.root_agent_username && !!errors.root_agent_username}
                                helperText={touched.root_agent_username && errors.root_agent_username}
                                sx={{ gridColumn: "span 6" }}
                            >
                            </TextField>
                            
                            <TextField
                                type="text"
                                label={translate('rootagent_password')}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.root_agent_password}
                                name="root_agent_password"
                                error={!!touched.root_agent_password && !!errors.root_agent_password}
                                helperText={touched.root_agent_password && errors.root_agent_password}
                                sx={{ gridColumn: "span 6" }}
                            >
                            </TextField>

                            <TextField
                                type="text"
                                label={translate('root_agent_member_username_prefix')}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.member_username_prefix}
                                name="member_username_prefix"
                                error={!!touched.member_username_prefix && !!errors.member_username_prefix}
                                helperText={touched.member_username_prefix && errors.member_username_prefix}
                                sx={{ gridColumn: "span 6" }}
                            >
                            </TextField>
                            
                            <TextField
                                type="text"
                                label={translate('root_agent_member_fix_password')}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.member_fixed_password}
                                name="member_fixed_password"
                                error={!!touched.member_fixed_password && !!errors.member_fixed_password}
                                helperText={touched.member_fixed_password && errors.member_fixed_password}
                                sx={{ gridColumn: "span 6" }}
                            >
                            </TextField>

                            <TextField
                                type="number"
                                label={translate('root_agent_member_running_no')}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.member_running_no}
                                name="member_running_no"
                                error={!!touched.member_running_no && !!errors.member_running_no}
                                helperText={touched.member_running_no && errors.member_running_no}
                                sx={{ gridColumn: "span 6" }}
                            >
                            </TextField>

                            <TextField
                                type="text"
                                label={translate('rootagent_api_endpoint')}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.root_agent_api_endpoint}
                                name="root_agent_api_endpoint"
                                error={!!touched.root_agent_api_endpoint && !!errors.root_agent_api_endpoint}
                                helperText={touched.root_agent_api_endpoint && errors.root_agent_api_endpoint}
                                sx={{ gridColumn: "span 12" }}
                            >
                            </TextField>

                            <TextField
                                type="text"
                                label={translate('rootagent_api_client_name')}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.root_agent_api_client_name}
                                name="root_agent_api_client_name"
                                error={!!touched.root_agent_api_client_name && !!errors.root_agent_api_client_name}
                                helperText={touched.root_agent_api_client_name && errors.root_agent_api_client_name}
                                sx={{ gridColumn: "span 12" }}
                            >
                            </TextField>

                            <TextField
                                type="text"
                                label={translate('rootagent_api_hash')}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.root_agent_api_hash}
                                name="root_agent_api_hash"
                                error={!!touched.root_agent_api_hash && !!errors.root_agent_api_hash}
                                helperText={touched.root_agent_api_hash && errors.root_agent_api_hash}
                                sx={{ gridColumn: "span 12" }}
                            >
                            </TextField>

                            <TextField
                                type="text"
                                label={translate('rootagent_api_key')}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.root_agent_api_key}
                                name="root_agent_api_key"
                                error={!!touched.root_agent_api_key && !!errors.root_agent_api_key}
                                helperText={touched.root_agent_api_key && errors.root_agent_api_key}
                                sx={{ gridColumn: "span 12" }}
                            >
                            </TextField>

                            <FormControl fullWidth sx={{ gridColumn: "span 12" }} >
                                <InputLabel id="demo-simple-select-label">{translate('account_status')}</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    label={translate('account_status')}
                                    value={values.status}
                                    name="status"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={!!touched.status && !!errors.status}
                                >
                                    <MenuItem value='A'>{translate('global_status_active')}</MenuItem>
                                    <MenuItem value='I'>{translate('global_status_inactive')}</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>

                        <Box display="flex" justifyContent="end" m={2} columnGap={2} >
                            <Button variant="text" onClick={(e) => {
                                setToggle(false)
                            }} >
                                {translate('global_close')}
                            </Button>
                            <Button type="submit" color="primary" variant="contained" disabled={disabled} >
                                {translate('global_save')}
                            </Button>
                        </Box>
                        <Box display="flex" justifyContent="end" m={2}>
                            <ErrorMessage valueList={validateForm} ></ErrorMessage>
                        </Box>
                    </form>
                )}
            </Formik>
        </Box>
    )
};

const phoneRegExp =
    /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
    root_agent_name: yup.string().required("required"),
    root_agent_username: yup.string().required("required"),
    root_agent_password: yup.string().required("required"),

    member_username_prefix: yup.string().required("required"),
    member_fixed_password: yup.string().required("required"),
    member_running_no: yup.number()
        .integer()
        .min(0, 'required')
        .required("required"),

    root_agent_api_endpoint: yup.string().required("required"),
    root_agent_api_client_name: yup.string().required("required"),
    root_agent_api_hash: yup.string().required("required"),
    root_agent_api_key: yup.string().required("required"),
});



export default Update