import * as React from 'react';
import Loading from '../../../components/loading'
import ErrorMessage from '../../../components/errorMessage'
import { Box, Button, TextField, Typography, InputLabel, MenuItem, FormControl , Select, useTheme } from "@mui/material";

import { Formik } from "formik";
import * as yup from "yup";
import { tokens } from "../../../theme"
import useMediaQuery from "@mui/material/useMediaQuery";
import translate from "../../../i18nProvider/translate";
import useAxiosPrivate from "../../../hook/useAxiosPrivate";
import { validateDate } from '@mui/x-date-pickers/internals';

export const Update = ({ setToggle, postValue_handle, putValue_handle, value, id }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [disabled, setDisabled] = React.useState(false);
    const [validateForm, SetValidateForm] = React.useState();

    const handleFormSubmit = (values) => {
        setDisabled(true);

        if (id) {
            putValue_handle(id, values).then( ([res, err]) => {
                if(err)
                {
                    SetValidateForm(res);
                }
                else
                {
                    SetValidateForm(null);
                }

                setDisabled(false);
            })
        }
        else {
            postValue_handle(values).then( ([res, err]) => {
                if(err)
                {
                    SetValidateForm(res);
                }
                else
                {
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
                            sx={{
                                "& > div": { gridColumn: "span 12" },
                            }}
                        >
                            <Typography
                                variant="h3"
                                color={colors.grey[100]}
                                fontWeight="bold"
                                sx={{ m: "0 0 5px 0", gridColumn: "span 12" }}
                            >{translate('user_update_title')}</Typography>


                            <TextField
                                type="text"
                                label={translate('user_username')}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.username}
                                name="username"
                                error={!!touched.username && !!errors.username}
                                helperText={touched.username && errors.username}
                                sx={{ gridColumn: "span 12" }}
                            >
                            </TextField>

                            <TextField
                                type="text"
                                label={translate('user_password')}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.password}
                                name="password"
                                error={!!touched.password && !!errors.password}
                                helperText={touched.password && errors.password}
                                sx={{ gridColumn: "span 12" }}
                            >
                            </TextField>

                            <TextField
                                type="text"
                                label={translate('user_name')}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.name}
                                name="name"
                                error={!!touched.name && !!errors.name}
                                helperText={touched.name && errors.name}
                                sx={{ gridColumn: "span 12" }}
                            >
                            </TextField>

                            <TextField
                                type="text"
                                label={translate('user_role')}
                                value={values.role_id}
                                name="role_id"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={!!touched.role_id && !!errors.role_id}
                                helperText={touched.role_id && errors.role_id}
                                sx={{ gridColumn: "span 12" }}
                            >
                            </TextField>

                            <TextField
                                type="text"
                                label={translate('user_telephone')}
                                value={values.telephone}
                                name="telephone"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={!!touched.telephone && !!errors.telephone}
                                helperText={touched.telephone && errors.telephone}
                                sx={{ gridColumn: "span 12" }}
                            >
                            </TextField>

                            <FormControl fullWidth sx={{ gridColumn: "span 12" }} > 
                                <InputLabel id="demo-simple-select-label">{translate('user_status')}</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    label={translate('user_status')}
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

const phoneRegExp = /^\d{10}$/

const checkoutSchema = yup.object().shape({
    username: yup.string().required("required"),
    name: yup.string().required("required"),
    password: yup.string().required("required"),
    role_id: yup.string().required("required"),
    telephone: yup
        .string()
        .matches(phoneRegExp, "Phone number is not valid")
        .required("required"),

    status: yup.string().required("required"),
});



export default Update