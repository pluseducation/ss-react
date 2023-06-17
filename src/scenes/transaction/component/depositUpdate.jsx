import * as React from 'react';
import Loading from '../../../components/loading'
import ErrorMessage from '../../../components/errorMessage'
import { Box, Button, TextField, Typography, InputLabel, MenuItem, FormControl, Select, Avatar, FormHelperText, OutlinedInput, useTheme } from "@mui/material";
import Autocomplete from '@mui/material/Autocomplete';

import { Formik } from "formik";
import * as yup from "yup";
import { tokens } from "../../../theme"
import useMediaQuery from "@mui/material/useMediaQuery";
import translate from "../../../i18nProvider/translate";
import useAxiosPrivate from "../../../hook/useAxiosPrivate";
import { validateDate } from '@mui/x-date-pickers/internals';

import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';

export const DepositUpdate = ({ setToggle, member, bank, depositAccount, postValue_handle, putValue_handle, value, id }) => {
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
                    setFieldValue,
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
                            >{translate('trx_deposit_update_title')}</Typography>

                            <Autocomplete
                                id="username"
                                name="username"
                                onBlur={handleBlur}
                                options={member}
                                getOptionLabel={option => option.username}
                                onChange={(e, value) => {
                                    if(value)
                                    {
                                        values.member_id = value.id
                                        values.deposit_source_account = value.bank_account_number
                                        values.deposit_source_bank_id = value.bank_id
                                    } else {
                                        values.member_id = -1
                                        values.deposit_source_account = ""
                                        values.deposit_source_bank_id = -1
                                    }
                                    setFieldValue("username", value.username)
                                }}
                                renderInput={params => (
                                    <TextField
                                        {...params}
                                        name="username"
                                        label={translate('trx_deposit_member')}
                                        variant="outlined"
                                        fullWidth
                                    />
                                )}
                            />

                            <FormControl fullWidth sx={{ gridColumn: "span 12" }} >
                                <InputLabel id="demo-simple-select-label">{translate('trx_deposit_source_account')}</InputLabel>
                                <Select readOnly
                                    labelId="demo-simple-select-label"
                                    label={translate('trx_deposit_source_account')}
                                    value={values.member_id}
                                    name="member_id"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={!!touched.member_id && !!errors.member_id}
                                >
                                    <MenuItem value={-1} m={1} >{translate('global_select_empty')}</MenuItem>
                                    {member?.map((obj, i) =>
                                        <MenuItem key={i} value={obj.id}>
                                            <Box display='flex' columnGap={2} >
                                                <Avatar src={obj.bank_detail.logoURL} sx={{ width: 24, height: 24 }} />
                                                {obj.bank_account_number}
                                            </Box>
                                        </MenuItem>
                                    )}
                                </Select>
                                <FormHelperText error>{touched.member_id && errors.member_id}</FormHelperText>
                            </FormControl>

                            <FormControl fullWidth sx={{ gridColumn: "span 12" }} >
                                <InputLabel id="demo-simple-select-label">{translate('trx_deposit_dest_account')}</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    label={translate('trx_deposit_dest_account')}
                                    value={values.deposit_dest_account}
                                    name="deposit_dest_account"
                                    onBlur={handleBlur}
                                    onChange={(e, value) => {
                                            let obj = (value?.props?.children?.props?.children)
                                            if(obj)
                                            {
                                                values.deposit_dest_bank_id = obj[0].props.value
                                            }
                                            else {
                                                values.deposit_dest_bank_id = -1
                                            }
                                        handleChange(e);
                                    }}
                                    error={!!touched.deposit_dest_account && !!errors.deposit_dest_account}
                                >
                                    <MenuItem  value=' ' m={1} >{translate('global_select_empty')}</MenuItem>
                                    {depositAccount?.map((obj, i) =>
                                        <MenuItem key={i} value={obj.account_number}>
                                            <Box display='flex' columnGap={2} >
                                                <Avatar src={obj.bank.logoURL} sx={{ width: 24, height: 24 }} value={obj.bank.id} />
                                                {obj.account_name} ({obj.account_number})
                                            </Box>
                                        </MenuItem>
                                    )}
                                </Select>
                                <FormHelperText error>{touched.deposit_dest_account && errors.deposit_dest_account}</FormHelperText>
                            </FormControl>

                            <TextField
                                type="text"
                                label={translate('trx_deposit_amount')}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.deposit_amount}
                                name="deposit_amount"
                                error={!!touched.deposit_amount && !!errors.deposit_amount}
                                helperText={touched.deposit_amount && errors.deposit_amount}
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

const checkoutSchema = yup.object().shape({
    // username: yup.string().required("required"),
    deposit_source_account: yup.string().trim().required("required"),
    deposit_dest_account: yup.string().trim().required("required"),
    member_id: yup.number()
    .integer('required')
    .min(0, 'required')
    .required("required"),

    deposit_amount: yup.number()
        .typeError("must be an integer")
        .integer("must be an integer")
        .min(1, 'required')
        .required("required"),

});


export default DepositUpdate