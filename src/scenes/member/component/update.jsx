import * as React from 'react';
import Loading from '../../../components/loading'
import ErrorMessage from '../../../components/errorMessage'
import {
    Box, Button, TextField, Typography, InputLabel, MenuItem, FormControl,
    Select, Avatar, FormHelperText, FormControlLabel, FormLabel, RadioGroup, Radio, useTheme
} from "@mui/material";

import { Formik } from "formik";
import * as yup from "yup";
import { tokens } from "../../../theme"
import useMediaQuery from "@mui/material/useMediaQuery";
import translate from "../../../i18nProvider/translate";

import useAxiosPrivate from "../../../hook/useAxiosPrivate";
import { validateDate } from '@mui/x-date-pickers/internals';

import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';

export const Update = ({ setToggle, memberBank, memberAgency, memberRootagent, postValue_handle, putValue_handle, value, id }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [disabled, setDisabled] = React.useState(false);
    const [validateForm, SetValidateForm] = React.useState();
    const [other, setOther] = React.useState();


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
                        >
                            <Typography
                                variant="h3"
                                color={colors.grey[100]}
                                fontWeight="bold"
                                sx={{ m: "0 0 5px 0", gridColumn: "span 12" }}
                            >{translate('member_update_title')}</Typography>

                            <FormControl fullWidth sx={{ gridColumn: "span 12" }} >
                                <InputLabel id="demo-simple-select-label">{translate('member_root_agent')}</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    label={translate('member_root_agent')}
                                    value={values.root_agent_id}
                                    name="root_agent_id"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={!!touched.root_agent_id && !!errors.root_agent_id}

                                >
                                    <MenuItem value={-1} m={1} >{translate('global_select_empty')}</MenuItem>
                                    {memberRootagent?.map((obj, i) =>
                                        <MenuItem value={obj.id}>{obj.root_agent_name}</MenuItem>
                                    )}
                                </Select>
                                <FormHelperText error>{touched.root_agent_id && errors.root_agent_id}</FormHelperText>
                            </FormControl>

                            <TextField
                                type="text"
                                label={translate('member_username')}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.username}
                                name="username"
                                disabled={true}
                                error={!!touched.username && !!errors.username}
                                helperText={touched.username && errors.username}
                                sx={{ gridColumn: "span 6" }}
                            >
                            </TextField>

                            <TextField
                                type="text"
                                label={translate('member_password')}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.password}
                                name="password"
                                disabled={true}
                                error={!!touched.password && !!errors.password}
                                helperText={touched.password && errors.password}
                                sx={{ gridColumn: "span 6" }}
                            >
                            </TextField>

                            <TextField
                                type="text"
                                label={translate('member_fname')}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.fname}
                                name="fname"
                                error={!!touched.fname && !!errors.fname}
                                helperText={touched.fname && errors.fname}
                                sx={{ gridColumn: "span 6" }}
                            >
                            </TextField>

                            <TextField
                                type="text"
                                label={translate('member_lname')}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.lname}
                                name="lname"
                                error={!!touched.lname && !!errors.lname}
                                helperText={touched.lname && errors.lname}
                                sx={{ gridColumn: "span 6" }}
                            >
                            </TextField>

                            <TextField
                                type="text"
                                label={translate('member_telephone')}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.telephone}
                                name="telephone"
                                error={!!touched.telephone && !!errors.telephone}
                                helperText={touched.telephone && errors.telephone}
                                sx={{ gridColumn: "span 12" }}
                            >
                            </TextField>

                            <TextField
                                type="text"
                                label={translate('member_line_id')}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.line_id}
                                name="line_id"
                                error={!!touched.line_id && !!errors.line_id}
                                helperText={touched.line_id && errors.line_id}
                                sx={{ gridColumn: "span 12" }}
                            >
                            </TextField>

                            <FormControl fullWidth sx={{ gridColumn: "span 12" }} >
                                <InputLabel id="demo-simple-select-label">{translate('member_bank')}</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    label={translate('member_bank')}
                                    value={values.bank_id}
                                    name="bank_id"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={!!touched.bank_id && !!errors.bank_id}

                                >
                                    <MenuItem value={-1} m={1} >{translate('global_select_empty')}</MenuItem>
                                    {memberBank?.map((obj, i) =>
                                        <MenuItem value={obj.id}>
                                            <Box display='flex' columnGap={2} >
                                                <Avatar id={i} src={obj.logoURL} sx={{ width: 24, height: 24 }} />
                                                {obj.bank_eng_name}
                                            </Box>
                                        </MenuItem>
                                    )}
                                </Select>
                                <FormHelperText error>{touched.bank_id && errors.bank_id}</FormHelperText>
                            </FormControl>

                            <TextField
                                type="text"
                                label={translate('member_bank_account_number')}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.bank_account_number}
                                name="bank_account_number"
                                error={!!touched.bank_account_number && !!errors.bank_account_number}
                                helperText={touched.bank_account_number && errors.bank_account_number}
                                sx={{ gridColumn: "span 12" }}
                            >
                            </TextField>

                            <FormControl fullWidth sx={{ gridColumn: "span 12" }} >
                                <InputLabel id="demo-simple-select-label">{translate('member_agency')}</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    label={translate('member_root_agent')}
                                    value={values.agency_id}
                                    name="agency_id"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={!!touched.agency_id && !!errors.agency_id}
                                >
                                    <MenuItem value={-1} m={1} >{translate('global_select_empty')}</MenuItem>
                                    {memberAgency?.map((obj, i) =>
                                        <MenuItem value={obj.id}>{obj.name}</MenuItem>
                                    )}
                                </Select>
                                <FormHelperText error>{touched.agency_id && errors.agency_id}</FormHelperText>
                            </FormControl>
                            <FormControl sx={{ gridColumn: "span 12" }}>
                                <FormLabel id="demo-row-radio-buttons-group-label">{translate('member_recommender')}</FormLabel>
                                <RadioGroup row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    onBlur={handleBlur}
                                    onChange={(e) => {
                                        if (e.target.value == 4) {
                                            setOther(true)
                                        } else {
                                            setOther(false)
                                        }

                                        handleChange(e)
                                    }}
                                    value={values.recommender_id}
                                    name="recommender_id"
                                    error={!!touched.recommender_id && !!errors.recommender_id}
                                    helperText={touched.recommender_id && errors.recommender_id}
                                >
                                    <FormControlLabel value='1' control={<Radio />} label={translate('member_recommender_1')} />
                                    <FormControlLabel value='2' control={<Radio />} label={translate('member_recommender_2')} />
                                    <FormControlLabel value='3' control={<Radio />} label={translate('member_recommender_3')} />
                                    <FormControlLabel value='4' control={<Radio />} label={translate('member_recommender_4')} />
                                    <FormControlLabel value='5' control={<Radio />} label={translate('member_recommender_5')} />
                                </RadioGroup>
                            </FormControl>

                            <TextField
                                type="text"
                                label={translate('member_recommender_5')}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.recommender_value}
                                name="recommender_value"
                                error={!!touched.recommender_value && !!errors.recommender_value}
                                helperText={touched.recommender_value && errors.recommender_value}
                                sx={{ gridColumn: "span 12", display: other ? 'block' : 'none' }}
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
    root_agent_id: yup.number()
        .integer()
        .min(0, 'required')
        .required("required"),
    agency_id: yup.number()
        .integer()
        .min(0, 'required')
        .required("required"),
    username: yup.string().required("required"),
    password: yup.string().required("required"),
    fname: yup.string().required("required"),
    lname: yup.string().required("required"),
    telephone: yup.string().required("required"),
    line_id: yup.string().required("required"),
    bank_id: yup.number()
        .integer()
        .min(0, 'required')
        .required("required"),
    bank_account_number: yup.string().required("required"),
});



export default Update