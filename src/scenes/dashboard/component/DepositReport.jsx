import { Box, Typography, IconButton, useTheme } from "@mui/material";
import { tokens } from "../../../theme"
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import LineChart from '../../../components/LineChart'

const DepositReport = ({ title, value }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
    <Box
        gridRow="span 2"
        backgroundColor={colors.primary[500]}
    >
        <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
        >
            <Box>
                <Typography
                    variant="h5"
                    fontWeight="600"
                    color={colors.grey[100]}
                >
                    {title}
                </Typography>
                <Typography
                    variant="h3"
                    fontWeight="bold"
                    color="secondary"
                >
                    59,342.32
                </Typography>
            </Box>
            <Box>
                <IconButton>
                    <DownloadOutlinedIcon color="secondary"
                        sx={{ fontSize: "26px" }}
                    />
                </IconButton>
            </Box>
        </Box>
        <Box height="250px" m="-20px 0 0 0">
            <LineChart isDashboard={true} />
        </Box>
    </Box>
    )
};

export default DepositReport