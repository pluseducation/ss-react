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
                            >{translate('promotion_update_title')}</Typography>

                            <UploadImage url={values.url} />
                            {/* <FormHelperText error>{touched.image_id && errors.image_id}</FormHelperText> */}

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
                                value={values.detail}
                                name="detail"
                                error={!!touched.detail && !!errors.detail}
                                helperText={touched.detail && errors.detail}
                                sx={{ gridColumn: "span 12" }}
                            >
                            </TextField>

                            <TextField
                                type="text"
                                label={translate('promotion_link')}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.promotion_link}
                                name="promotion_link"
                                error={!!touched.promotion_link && !!errors.promotion_link}
                                helperText={touched.promotion_link && errors.promotion_link}
                                sx={{ gridColumn: "span 12" }}
                            >
                            </TextField>

                            <FormControl sx={{ gridColumn: "span 12" }}>
                                <FormLabel id="demo-row-radio-buttons-group-label">{translate('promotion_member_type')}</FormLabel>
                                <RadioGroup row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.member_type_id}
                                    name="member_type_id"
                                    error={!!touched.member_type_id && !!errors.member_type_id}
                                    helperText={touched.member_type_id && errors.member_type_id}
                                >
                                    <FormControlLabel value={1} control={<Radio />} label={translate('promotion_member_type_1')} />
                                    <FormControlLabel value={2} control={<Radio />} label={translate('promotion_member_type_2')} />
                                    <FormControlLabel value={3} control={<Radio />} label={translate('promotion_member_type_3')} />
                                </RadioGroup>
                            </FormControl>
                            <FormControl sx={{ gridColumn: "span 6" }}>
                                <FormLabel id="demo-row-radio-buttons-group-label">{translate('promotion_type')}</FormLabel>
                                <RadioGroup row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.bonus_type_id}
                                    name="bonus_type_id"
                                    error={!!touched.bonus_type_id && !!errors.bonus_type_id}
                                    helperText={touched.bonus_type_id && errors.bonus_type_id}
                                >
                                    <FormControlLabel value={1} control={<Radio />} label={translate('promotion_type_1')} />
                                    <FormControlLabel value={2} control={<Radio />} label={translate('promotion_type_2')} />
                                </RadioGroup>
                            </FormControl>
                            <TextField
                                type="text"
                                label={translate('promotion_value')}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.bonus_amount}
                                name="bonus_amount"
                                error={!!touched.bonus_amount && !!errors.bonus_amount}
                                helperText={touched.bonus_amount && errors.bonus_amount}
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
                                name="minimum_deposit"
                                error={!!touched.minimum_deposit && !!errors.minimum_deposit}
                                helperText={touched.minimum_deposit && errors.minimum_deposit}
                                sx={{ gridColumn: "span 6" }}
                            >
                            </TextField>
                            <TextField
                                type="number"
                                label={translate('promotion_condition_bonus')}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.maximum_bonus}
                                name="maximum_bonus"
                                error={!!touched.maximum_bonus && !!errors.maximum_bonus}
                                helperText={touched.maximum_bonus && errors.maximum_bonus}
                                sx={{ gridColumn: "span 6" }}
                            >
                            </TextField>
                            <TextField
                                type="number"
                                label={translate('promotion_condition_count')}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.bonus_time_per_day}
                                name="bonus_time_per_day"
                                error={!!touched.bonus_time_per_day && !!errors.bonus_time_per_day}
                                helperText={touched.bonus_time_per_day && errors.bonus_time_per_day}
                                sx={{ gridColumn: "span 6" }}
                            >
                            </TextField>
                            <TextField
                                type="number"
                                label={translate('promotion_condition_turnover')}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.turnover}
                                name="turnover"
                                error={!!touched.turnover && !!errors.turnover}
                                helperText={touched.turnover && errors.turnover}
                                sx={{ gridColumn: "span 6" }}
                            >
                            </TextField>

                            <FormControl sx={{ gridColumn: "span 6" }}>
                                <FormLabel id="demo-row-radio-buttons-group-label">{translate('promotion_daily_type')}</FormLabel>
                                <RadioGroup row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.bonus_opendate_type_id}
                                    name="bonus_opendate_type_id"
                                    error={!!touched.bonus_opendate_type_id && !!errors.bonus_opendate_type_id}
                                    helperText={touched.bonus_opendate_type_id && errors.bonus_opendate_type_id}
                                >
                                    <FormControlLabel value={1} control={<Radio />} label={translate('promotion_daily_type_1')} />
                                </RadioGroup>
                            </FormControl>
                            <FormControl sx={{ gridColumn: "span 6" }}>
                                <FormLabel id="demo-row-radio-buttons-group-label">{translate('promotion_time_type')}</FormLabel>
                                <RadioGroup row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    onBlur={handleBlur}
                                    onChange={(e) => {
                                        if (e.target.value == 2) {
                                            setIsTimeSetting(true)
                                        } else {
                                            setIsTimeSetting(false)
                                        }
                                        handleChange(e)
                                    }}
                                    value={values.bonus_opentime_type_id}
                                    name="bonus_opentime_type_id"
                                    error={!!touched.bonus_opentime_type_id && !!errors.bonus_opentime_type_id}
                                    helperText={touched.bonus_opentime_type_id && errors.bonus_opentime_type_id}
                                >
                                    <FormControlLabel value={1} control={<Radio />} label={translate('promotion_time_type_1')} />
                                    <FormControlLabel value={2} control={<Radio />} label={translate('promotion_time_type_2')} />
                                </RadioGroup>

                            </FormControl>
                            
                            <TextField
                                type="time"
                                label={translate('gobal_starttime')}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.bonus_opentime_start}
                                name="bonus_opentime_start"
                                error={!!touched.bonus_opentime_start && !!errors.bonus_opentime_start}
                                helperText={touched.bonus_opentime_start && errors.bonus_opentime_start}
                                sx={{ gridColumn: "span 6" }}
                            >
                            </TextField>

                            <TextField
                                type="time"
                                label={translate('gobal_endtime')}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.bonus_opentime_end}
                                name="bonus_opentime_end"
                                error={!!touched.bonus_opentime_end && !!errors.bonus_opentime_end}
                                helperText={touched.bonus_opentime_end && errors.bonus_opentime_end}
                                sx={{ gridColumn: "span 6" }}
                            >
                            </TextField>

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

const checkoutSchema = yup.object().shape({
    name: yup.string().required("required"),
    detail: yup.string().required("required"),
    bonus_amount: yup.string().required("required"),
    minimum_deposit: yup.string().required("required"),
    maximum_bonus: yup.string().required("required"),
    bonus_time_per_day: yup.string().required("required"),
    turnover: yup.string().required("required"),

    member_type_id: yup.number()
        .integer()
        .min(0, 'required')
        .required("required"),
    bonus_type_id: yup.number()
        .integer()
        .min(0, 'required')
        .required("required"),
    bonus_opendate_type_id: yup.number()
        .integer()
        .min(0, 'required')
        .required("required"),
    bonus_opentime_type_id: yup.number()
        .integer()
        .min(0, 'required')
        .required("required"),
    image_id: yup.number()
        .integer()
        .min(0, 'required')
        .required("required"),
});



export default Update