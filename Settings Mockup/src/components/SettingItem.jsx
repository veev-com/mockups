import { Box, Typography } from '@mui/material';

function SettingItem({ title, description, children }) {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography
        sx={{
          color: 'text.primary',
          fontSize: '0.875rem',
          fontWeight: 500,
          mb: 0.5,
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="body2"
        sx={{ color: 'text.secondary', mb: 1.5, lineHeight: 1.5 }}
      >
        {description}
      </Typography>
      {children}
    </Box>
  );
}

export default SettingItem;
