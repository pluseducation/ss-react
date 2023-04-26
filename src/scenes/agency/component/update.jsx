import * as React from 'react';
import Loading from '../../../components/loading'
import ErrorMessage from '../../../components/errorMessage'
import { Box, Button, TextField, Typography, InputLabel, MenuItem, FormControl, Select, FormHelperText, useTheme } from "@mui/material";

import { Formik } from "formik";
import * as yup from "yup";
import { tokens } from "../../../theme"
import useMediaQuery from "@mui/material/useMediaQuery";
import translate from "../../../i18nProvider/translate";
import useAxiosPrivate from "../../../hook/useAxiosPrivate";
import { validateDate } from '@mui/x-date-pickers/internals';

import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';

export const Update = ({ setToggle, commissionType, postValue_handle, putValue_handle, value, id }) => {
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
                            >{translate('agency_update_title')}</Typography>

                            <TextField
                                type="text"
                                label={translate('agency_name')}
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
                                label={translate('agency_commission')}
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
                                label={translate('agency_commission_send_company')}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.commission_send_company}
                                name="commission_send_company"
                                error={!!touched.commission_send_company && !!errors.commission_send_company}
                                helperText={touched.commission_send_company && errors.commission_send_company}
                                sx={{ gridColumn: "span 12" }}
                            >
                            </TextField>

                            <FormControl fullWidth sx={{ gridColumn: "span 12" }} >
                                <InputLabel id="demo-simple-select-label">{translate('agency_commission_type')}</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    label={translate('agency_commission_type')}
                                    value={values.agency_commission_type_id}
                                    name="agency_commission_type_id"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={!!touched.agency_commission_type_id && !!errors.agency_commission_type_id}
                                >
                                    <MenuItem value={-1}>{translate('global_select_empty')}</MenuItem>
                                    {commissionType?.map((obj, i) =>
                                        <MenuItem key={i} value={obj.id}>{obj.commission_type_detail}</MenuItem>
                                    )}
                                </Select>
                                <FormHelperText error>{touched.agency_commission_type_id && errors.agency_commission_type_id}</FormHelperText>
                            </FormControl>
                            
                            <FormControl fullWidth sx={{ gridColumn: "span 12" }} > 
                                <InputLabel id="demo-simple-select-label">{translate('agency_status')}</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    label={translate('agency_status')}
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
    name: yup.string().required("required"),
    commission: yup
    .string()
    .matches(patternTwoDigisAfterComma, "Commission is not valid")
    .required("required"),

    commission_send_company: yup
    .string()
    .matches(patternTwoDigisAfterComma, "Commission send company is not valid")
    .required("required"),

    agency_commission_type_id: yup.number()
    .integer()
    .min(0, 'required')
    .required("required"),
});



export default Update