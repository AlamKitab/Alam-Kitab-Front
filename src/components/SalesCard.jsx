import { Card, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme, color }) => ({
  padding: theme.spacing(3),
  backgroundColor: theme.palette[color]?.main || theme.palette.primary.main,
  color: 'white',
  borderRadius: '10px',
  boxShadow: '0 4px 20px 0 rgba(0,0,0,0.1)',
  transition: 'transform 0.3s',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
}));

const SalesCard = ({ title, total, color = 'primary' }) => {
  return (
    <StyledCard color={color}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: 500 }}>
          {title}
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          {total}
        </Typography>
      </Box>
    </StyledCard>
  );
};

export default SalesCard; 