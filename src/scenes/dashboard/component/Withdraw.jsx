import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../../theme"

const Withdraw = ({ title, subtitle, icon}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
    backgroundColor={colors.primary[500]}
    display="flex"
    alignItems="center"
    justifyContent="center"
  >
    <Box width="100%" m="0 30px">
      <Box display="flex" justifyContent="space-between">
        <Box>
        <Typography
            variant="h3"
            fontWeight="bold"
            sx={{ color: colors.grey[100] }}
          >
           56,789
          </Typography>
          <Typography variant="h5" color="secondary">
          {title}
        </Typography>
        </Box>
        <Box>
          {icon}
        </Box>
      </Box>
    </Box>
  </Box>
  );
};

export default Withdraw;
