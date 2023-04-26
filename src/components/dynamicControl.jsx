import { TextField, InputLabel, MenuItem, FormControl, Select, useTheme } from "@mui/material";
import { tokens } from "../theme";
const group = ['textbox', 'dropdown']

const DynamicControl = (obj) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const componentName = obj.data.component_name.component_name;
    const data = obj.data;

    let isGroup = false;
    if (data?.ss_general_setting_level3?.length > 0) {
        if (data.ss_general_setting_level3[0].component_name.component_name = 'dropdown_header') {
            isGroup = true;
            console.log(isGroup);
        } else {
            isGroup = false;
        }
    }

    if (group.find(controlName => controlName == data.component_name.component_name)) {
        switch (componentName) {
            case group[0]:
                return (
                    <TextField
                        type="text"
                        label={data.name}
                        // onBlur={handleBlur}
                        // onChange={handleChange}
                        // value={values.firstName}
                        name={data.name}
                        // error={!!touched.firstName && !!errors.firstName}
                        // helperText={touched.firstName && errors.firstName}
                        sx={{ gridColumn: "span 2" }}
                    />
                );
            case group[1]:
                if (isGroup) {
                    return (
                        <FormControl fullWidth  sx={{ gridColumn: "span 2" }}>
                            <InputLabel htmlFor="grouped-native-select">{data.name}</InputLabel>
                            <Select native defaultValue="" id="grouped-native-select" label={data.name}>
                                <option aria-label="None" value="" />
                                {data?.ss_general_setting_level3.map((obj1, i) =>
                                    <optgroup label={obj1.name}>
                                        {obj1?.ss_general_setting_level4.map((obj2, j) =>
                                            <option value={obj2.name}>{obj2.name}</option>
                                        )}
                                    </optgroup>
                                )}
                            </Select>
                        </FormControl>
                    );
                } else {
                    return (
                        <FormControl fullWidth  sx={{ gridColumn: "span 2" }}>
                            <InputLabel id="demo-simple-select-label">{data.name}</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label={data.name}
                                //onChange={handleChange}
                            >
                                 {data?.ss_general_setting_level3.map((obj, i) =>
                                <MenuItem value={obj.name}>{obj.name}</MenuItem>
                                )}
                            </Select>
                        </FormControl>
                    );
                }
            default:
                return;
        }
    }
};

export default DynamicControl;
