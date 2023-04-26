import { Box, Typography, useTheme } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import { useContext } from "react";
import { ColorModeContext, tokens } from "../theme";
import translate from "../i18nProvider/translate";

const Loading = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  return (
    <Box sx={{ display: 'flex', width: '150px', height: '150px', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            <CircularProgress  />
            <Typography mt={2}
                variant="h5"
                color={colors.grey[100]}
            >{translate('global_loading')}</Typography>
    </Box>
  );
};

export default Loading;
