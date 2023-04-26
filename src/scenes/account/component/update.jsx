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

export const Update = ({ setToggle, accountType, bankType, postValue_handle, putValue_handle, value, id }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [disabled, setDisabled] = React.useState(false);
    const [validateForm, SetValidateForm] = React.useState();

    const handleFormSubmit = (values) => {
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
                            sx={{
                                "& > div": { gridColumn: "span 12" },
                            }}
                        >
                            <Typography
                                variant="h3"
                                color={colors.grey[100]}
                                fontWeight="bold"
                                sx={{ m: "0 0 5px 0", gridColumn: "span 12" }}
                            >{translate('account_update_title')}</Typography>

                            <FormControl fullWidth sx={{ gridColumn: "span 12" }} >
                                <InputLabel id="demo-simple-select-label">{translate('account_bank_name')}</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    label={translate('account_bank_name')}
                                    value={values.bank_id}
                                    name="bank_id"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={!!touched.bank_id && !!errors.bank_id}
                                    
                                >
                                    <MenuItem value={-1} m={1} >{translate('global_select_empty')}</MenuItem>
                                    {bankType?.map((obj, i) =>
                                        <MenuItem key={i}  value={obj.id}>
                                            <Box display='flex' columnGap={2} >
                                                <Avatar  src={obj.logoURL} sx={{ width: 24, height: 24 }} />
                                                {obj.bank_eng_name}
                                            </Box>
                                        </MenuItem>
                                    )}
                                </Select>
                                <FormHelperText error>{touched.bank_id && errors.bank_id}</FormHelperText>
                            </FormControl>

                            <TextField
                                type="text"
                                label={translate('account_account_name')}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.account_name}
                                name="account_name"
                                error={!!touched.account_name && !!errors.account_name}
                                helperText={touched.account_name && errors.account_name}
                                sx={{ gridColumn: "span 12" }}
                            >
                            </TextField>

                            <TextField
                                type="text"
                                label={translate('account_account_number')}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.account_number}
                                name="account_number"
                                error={!!touched.account_number && !!errors.account_number}
                                helperText={touched.account_number && errors.account_number}
                                sx={{ gridColumn: "span 12" }}
                            >
                            </TextField>

                            <FormControl fullWidth sx={{ gridColumn: "span 12" }}>
                                <InputLabel id="demo-simple-select-label">{translate('account_account_type')}</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    label={translate('account_account_type')}
                                    value={values.account_type_id}
                                    name="account_type_id"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={!!touched.account_type_id && !!errors.account_type_id}
                                    
                                >
                                    <MenuItem value={-1}>{translate('global_select_empty')}</MenuItem>
                                    {accountType?.map((obj, i) =>
                                        <MenuItem key={i} value={obj.id}>{obj.account_type_name}</MenuItem>
                                    )}
                                </Select>
                                <FormHelperText error>{touched.account_type_id && errors.account_type_id}</FormHelperText>
                            </FormControl>
                            
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
    bank_id: yup.number()
    .integer()
    .min(0, 'required')
    .required("required"),

    account_name: yup.string().required("required"),

    account_number: yup.number()
    .typeError("must be an integer")
    .integer("must be an integer")
    .required("required"),

    account_type_id: yup.number()
    .integer('required')
    .min(0, 'required')
    .required("required"),
});



export default Update