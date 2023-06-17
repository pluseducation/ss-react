import { Box, Typography, IconButton, useTheme } from "@mui/material";
import { tokens } from "../../../theme"
import { mockTransactions } from "../../../data/mockData";

const DepositTransaction = ({ title }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box
            gridRow="span 2"
            backgroundColor={colors.primary[500]}
            overflow="auto"
        >
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`4px solid ${colors.primary[500]}`}
                colors={colors.grey[100]}
                p="15px"
            >
                <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
                    {title}
                </Typography>
            </Box>
            {mockTransactions.map((transaction, i) => (
                <Box
                    key={`${transaction.txId}-${i}`}
                    display="grid"
                    gridTemplateColumns="repeat(12, 1fr)"
                    alignItems="center"
                    p="15px"
                >
                    <Box gridColumn="span 4">
                        <Typography
                            color="secondary"
                            variant="h5"
                            fontWeight="600"
                        >
                        </Typography>
                        <Typography color={colors.grey[100]}>
                            {transaction.user}
                        </Typography>
                    </Box>
                    <Box gridColumn="span 4"
                        color={colors.grey[100]}
                        justifyContent="center"
                        display="flex" >{transaction.date}</Box>
                    <Box gridColumn="span 4"
                        justifyContent="end"
                        display="flex"
                    // backgroundColor={colors.blueAccent[500]}
                    // p="5px 10px"
                    // borderRadius="4px"
                    >
                        ${transaction.cost}
                    </Box>
                </Box>
            ))}

        </Box>
    )
};

export default DepositTransaction