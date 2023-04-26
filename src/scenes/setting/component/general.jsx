import { useEffect, useState } from "react";
import { Box, Button, TextField, Select, Typography, FormControl, InputLabel, MenuItem, useTheme } from "@mui/material";

import DynamicControl from '../../../components/dynamicControl'
import { Formik } from "formik";
import * as yup from "yup";
import { tokens } from "../../../theme"
import useMediaQuery from "@mui/material/useMediaQuery";
import { GetGeneral } from "../../../api/setting/generalService";

export const General = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const isNonMobile = useMediaQuery("(min-width:600px)");

    const { data } = GetGeneral();
    const handleFormSubmit = (values) => {
        console.log(values);
    };

    return (
        <Box
            gridRow="span 2"
            backgroundColor={colors.primary[500]}
            overflow="auto"
        >
            <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={checkoutSchema}
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
                            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                            m = "20px"
                            sx={{
                                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                            }}
                        >
                            {data &&
                                <>
                                    <Box
                                        display="flex"
                                        alignItems="center"
                                        borderBottom={`4px solid ${colors.primary[500]}`}
                                        sx={{ gridColumn: "span 4" }}
                                        colors={colors.grey[100]}
                                        p="15px"
                                    >
                                        <Typography variant="h5" fontWeight="600">
                                            {data?.name}
                                        </Typography>
                                    </Box>
                                    {data?.ss_general_setting_level2.map((obj, i) => 
                                        <DynamicControl data={obj} ></DynamicControl>
                                    )}
                                </>
                            }
                        </Box>
                        <Box display="flex" justifyContent="end" m={2}>
                            <Button type="submit" color="primary" variant="contained">
                                Save
                            </Button>
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
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    contact: yup
        .string()
        .matches(phoneRegExp, "Phone number is not valid")
        .required("required"),
    address1: yup.string().required("required"),
    address2: yup.string().required("required"),
});

const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    address1: "",
    address2: "",
};



export default General