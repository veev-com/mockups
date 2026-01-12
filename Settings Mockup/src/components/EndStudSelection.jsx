import { Box, Typography, TextField, Grid } from '@mui/material';
import SettingItem from './SettingItem';

function EndStudSelection({ values, onUpdate }) {
  const handleChange = (side, field) => (e) => {
    onUpdate({
      ...values,
      [side]: { ...values[side], [field]: e.target.value },
    });
  };

  return (
    <Box id="end-studs" sx={{ mb: 5 }}>
      <Typography
        variant="h6"
        sx={{
          color: 'text.primary',
          mb: 2,
          pb: 1,
          borderBottom: 1,
          borderColor: 'divider',
          fontSize: '1rem',
          fontWeight: 600,
        }}
      >
        End Stud Selection
      </Typography>
      <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary' }}>
        Configure the default number of studs and parameter names for wall boundaries.
      </Typography>

      <Grid container spacing={4} sx={{ maxWidth: 800 }}>
        <Grid item xs={6}>
          <SettingItem 
            title="Left End Studs" 
            description="Parameter name and default value for the left wall boundary studs."
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box>
                <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 0.5 }}>
                  Parameter Name
                </Typography>
                <TextField
                  fullWidth
                  value={values.left.parameter}
                  onChange={handleChange('left', 'parameter')}
                />
              </Box>
              <Box>
                <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 0.5 }}>
                  Default Value
                </Typography>
                <TextField
                  fullWidth
                  type="number"
                  value={values.left.defaultValue}
                  onChange={handleChange('left', 'defaultValue')}
                />
              </Box>
            </Box>
          </SettingItem>
        </Grid>
        <Grid item xs={6}>
          <SettingItem 
            title="Right End Studs" 
            description="Parameter name and default value for the right wall boundary studs."
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box>
                <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 0.5 }}>
                  Parameter Name
                </Typography>
                <TextField
                  fullWidth
                  value={values.right.parameter}
                  onChange={handleChange('right', 'parameter')}
                />
              </Box>
              <Box>
                <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 0.5 }}>
                  Default Value
                </Typography>
                <TextField
                  fullWidth
                  type="number"
                  value={values.right.defaultValue}
                  onChange={handleChange('right', 'defaultValue')}
                />
              </Box>
            </Box>
          </SettingItem>
        </Grid>
      </Grid>
      
      <Typography 
        variant="caption" 
        sx={{ 
          mt: 3, 
          display: 'block', 
          color: 'text.secondary',
          fontStyle: 'italic',
          p: 1.5,
          bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
          borderRadius: 1,
          borderLeft: 3,
          borderColor: 'primary.main',
        }}
      >
        * This sets the initial state of the panel boundaries to a single stud configuration by default.
      </Typography>
    </Box>
  );
}

export default EndStudSelection;
