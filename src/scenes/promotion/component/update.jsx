import * as React from 'react';
import Loading from '../../../components/loading'
import ErrorMessage from '../../../components/errorMessage'
import {
    Box, Button, TextField, Typography, InputLabel, MenuItem, FormControl,
    Select, FormControlLabel, FormLabel, RadioGroup, Radio, FormHelperText, useTheme
} from "@mui/material";

import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimeField } from '@mui/x-date-pickers/TimeField';

import { Formik } from "formik";
import * as yup from "yup";
import { tokens } from "../../../theme"
import useMediaQuery from "@mui/material/useMediaQuery";
import translate from "../../../i18nProvider/translate";
import useAxiosPrivate from "../../../hook/useAxiosPrivate";
import UploadImage from "./uploadImage";

export const Update = ({ setToggle, postValue_handle, putValue_handle, value, id }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [disabled, setDisabled] = React.useState(false);
    const [validateForm, SetValidateForm] = React.useState();
    const [isTimeSetting, setIsTimeSetting] = React.useState();

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
                            >{translate('promotion_update_title')}</Typography>

                            <UploadImage />
                            <TextField
                                type="text"
                                label={translate('promotion_name')}
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
                                label={translate('promotion_desc')}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.commission}
                                name="commission"
                                error={!!touched.commission && !!errors.commission}
                                helperText={touched.commission && errors.commission}
                                sx={{ gridColumn: "span 12" }}
                            >
                            </TextField>

                            <TextField
                                type="text"
                                label={translate('promotion_link')}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.commission_send_company}
                                name="commission_send_company"
                                error={!!touched.commission_send_company && !!errors.commission_send_company}
                                helperText={touched.commission_send_company && errors.commission_send_company}
                                sx={{ gridColumn: "span 12" }}
                            >
                            </TextField>



                            <FormControl sx={{ gridColumn: "span 12" }}>
                                <FormLabel id="demo-row-radio-buttons-group-label">{translate('promotion_member_type')}</FormLabel>
                                <RadioGroup row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.promotion_member_type}
                                    name="promotion_member_type"
                                    error={!!touched.promotion_member_type && !!errors.promotion_member_type}
                                    helperText={touched.promotion_member_type && errors.promotion_member_type}
                                >
                                    <FormControlLabel value='1' control={<Radio />} label={translate('promotion_member_type_1')} />
                                    <FormControlLabel value='2' control={<Radio />} label={translate('promotion_member_type_2')} />
                                    <FormControlLabel value='3' control={<Radio />} label={translate('promotion_member_type_3')} />
                                </RadioGroup>
                            </FormControl>
                            <FormControl sx={{ gridColumn: "span 6" }}>
                                <FormLabel id="demo-row-radio-buttons-group-label">{translate('promotion_type')}</FormLabel>
                                <RadioGroup row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.promotion_type}
                                    name="promotion_type"
                                    error={!!touched.promotion_type && !!errors.promotion_type}
                                    helperText={touched.promotion_type && errors.promotion_type}
                                >
                                    <FormControlLabel value='1' control={<Radio />} label={translate('promotion_type_1')} />
                                    <FormControlLabel value='2' control={<Radio />} label={translate('promotion_type_2')} />
                                </RadioGroup>
                            </FormControl>
                            <TextField
                                type="text"
                                label={translate('promotion_value')}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.promotion_value}
                                name="promotion_value"
                                error={!!touched.promotion_value && !!errors.promotion_value}
                                helperText={touched.promotion_value && errors.promotion_value}
                                sx={{ gridColumn: "span 6" }}
                            >
                            </TextField>


                            <Typography
                                variant="h5"
                                color={colors.grey[100]}
                                fontWeight="bold"
                                sx={{ gridColumn: "span 12" }}
                            >{translate('promotion_condition')}</Typography>

                            <TextField
                                type='number'
                                label={translate('promotion_condition_deposit')}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.promotion_condition_deposit}
                                name="promotion_condition_deposit"
                                error={!!touched.promotion_condition_deposit && !!errors.promotion_condition_deposit}
                                helperText={touched.promotion_condition_deposit && errors.promotion_condition_deposit}
                                sx={{ gridColumn: "span 6" }}
                            >
                            </TextField>
                            <TextField
                                type="number"
                                label={translate('promotion_condition_bonus')}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.promotion_condition_bonus}
                                name="promotion_condition_bonus"
                                error={!!touched.promotion_condition_bonus && !!errors.promotion_condition_bonus}
                                helperText={touched.promotion_condition_bonus && errors.promotion_condition_bonus}
                                sx={{ gridColumn: "span 6" }}
                            >
                            </TextField>
                            <TextField
                                type="number"
                                label={translate('promotion_condition_count')}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.promotion_condition_count}
                                name="promotion_condition_count"
                                error={!!touched.promotion_condition_count && !!errors.promotion_condition_count}
                                helperText={touched.promotion_condition_count && errors.promotion_condition_count}
                                sx={{ gridColumn: "span 6" }}
                            >
                            </TextField>
                            <TextField
                                type="number"
                                label={translate('promotion_condition_turnover')}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.promotion_condition_turnover}
                                name="promotion_condition_turnover"
                                error={!!touched.promotion_condition_turnover && !!errors.promotion_condition_turnover}
                                helperText={touched.promotion_condition_turnover && errors.promotion_condition_turnover}
                                sx={{ gridColumn: "span 6" }}
                            >
                            </TextField>

                            <FormControl sx={{ gridColumn: "span 6" }}>
                                <FormLabel id="demo-row-radio-buttons-group-label">{translate('promotion_daily_type')}</FormLabel>
                                <RadioGroup row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.promotion_daily_type}
                                    name="promotion_daily_type"
                                    error={!!touched.promotion_daily_type && !!errors.promotion_daily_type}
                                    helperText={touched.promotion_daily_type && errors.promotion_daily_type}
                                >
                                    <FormControlLabel value='1' control={<Radio />} label={translate('promotion_daily_type_1')} />
                                </RadioGroup>
                            </FormControl>
                            <FormControl sx={{ gridColumn: "span 6" }}>
                                <FormLabel id="demo-row-radio-buttons-group-label">{translate('promotion_time_type')}</FormLabel>
                                <RadioGroup row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    onBlur={handleBlur}
                                    onChange={(e) => {
                                        if(e.target.value == 2) {
                                            setIsTimeSetting(true)
                                        } else {
                                            setIsTimeSetting(false)
                                        }
                                        handleChange(e)
                                    }}
                                    value={values.promotion_time_type}
                                    name="promotion_time_type"
                                    error={!!touched.promotion_time_type && !!errors.promotion_time_type}
                                    helperText={touched.promotion_time_type && errors.promotion_time_type}
                                >
                                    <FormControlLabel value='1' control={<Radio />} label={translate('promotion_time_type_1')} />
                                    <FormControlLabel value='2' control={<Radio />} label={translate('promotion_time_type_2')} />
                                </RadioGroup>

                            </FormControl>

                            <Box sx={{ gridColumn: "span 12", display: isTimeSetting ? 'block': 'none' }}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['TimePicker']} >
                                        <TimeField format='HH:mm'
                                         label={translate("gobal_starttime")} 
                                         onBlur={handleBlur}
                                         onChange={handleChange}
                                         value={values.promotion_start_time}
                                         name="promotion_start_time"
                                         error={!!touched.promotion_start_time && !!errors.promotion_start_time}
                                         helperText={touched.promotion_start_time && errors.promotion_start_time}
                                         sx={{ minWidth: "50px" }}
                                        />
                                        <TimeField format='HH:mm'
                                        label={translate("gobal_endtime")} 
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.promotion_end_time}
                                        name="promotion_end_time"
                                        error={!!touched.promotion_end_time && !!errors.promotion_end_time}
                                        helperText={touched.promotion_end_time && errors.promotion_end_time}
                                        sx={{ minWidth: "50px" }}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </Box>


                            <FormControl fullWidth sx={{ gridColumn: "span 12" }} >
                                <InputLabel id="demo-simple-select-label">{translate('promotion_status')}</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    label={translate('promotion_status')}
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

let patternTwoDigisAfterComma = /^\d+(\.\d{0,2})?$/;

const checkoutSchema = yup.object().shape({
    // name: yup.string().required("required"),
    // commission: yup
    //     .string()
    //     .matches(patternTwoDigisAfterComma, "Commission is not valid")
    //     .required("required"),

    // commission_send_company: yup
    //     .string()
    //     .matches(patternTwoDigisAfterComma, "Commission send company is not valid")
    //     .required("required"),

    // agency_commission_type_id: yup.number()
    //     .integer()
    //     .min(0, 'required')
    //     .required("required"),
});



export default Update