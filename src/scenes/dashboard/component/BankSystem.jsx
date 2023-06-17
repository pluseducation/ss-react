import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../../theme"
import { dash_bank_system, dash_bank_withdraw } from "../../../data/mokdata"
import Avatar from '@mui/material/Avatar';

const BankSystem = ({ title }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      backgroundColor={colors.primary[500]}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        borderBottom={`4px solid ${colors.primary[500]}`}
        colors={colors.grey[100]}
        p="15px"
      >
        <Typography variant="h5" fontWeight="600">
          {title}
        </Typography>
      </Box>
      {dash_bank_system.map((data, i) => (
        <Box
          key={`${data.id}-${i}`}
          alignItems="center"
          p="15px"
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
        >
          <Box gridColumn="span 4" >
            <Avatar alt={data.image} src={data.image} />
          </Box>
          <Box gridColumn="span 4">
            {data.name}
          </Box>
          <Box gridColumn="span 4" 
            justifyContent="end"
            display="flex">
            {data.amount.toLocaleString(undefined, { maximumFractionDigits: 2 })}
          </Box>
        </Box>
      ))}

    </Box>
  );
};

export default BankSystem;
