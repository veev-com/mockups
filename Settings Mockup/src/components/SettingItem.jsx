import { Box, Typography } from '@mui/material';

function SettingItem({ title, description, children }) {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography
        variant="subtitle2"
        sx={{
          color: 'text.primary',
          mb: 1,
        }}
      >
        {title}
      </Typography>
      {description && (
        <Typography
          variant="body2"
          sx={{ color: 'text.secondary', mb: 2, lineHeight: 1.6, maxWidth: '600px' }}
        >
          {description}
        </Typography>
      )}
      <Box sx={{ mt: 1 }}>
        {children}
      </Box>
    </Box>
  );
}

export default SettingItem;
