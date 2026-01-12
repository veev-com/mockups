import { Box, Typography, TextField, Grid } from '@mui/material';
import SettingItem from './SettingItem';

function ShearWallLogic({ values, onUpdate }) {
  const handleChange = (field) => (e) => {
    onUpdate({
      ...values,
      [field]: e.target.value,
    });
  };

  return (
    <Box id="shear-wall" sx={{ mb: 5 }}>
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
        Shear Wall Detection logic
      </Typography>
      <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary' }}>
        Configure the logic to automatically identify shear walls based on host wall properties and update the corresponding Combo parameter.
      </Typography>

      <Grid container spacing={4} sx={{ maxWidth: 800 }}>
        {/* Detection Rules */}
        <Grid item xs={12}>
          <Typography
            variant="subtitle2"
            sx={{ color: 'text.primary', mb: 2, fontWeight: 600, fontSize: '0.875rem' }}
          >
            Detection Rules
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <SettingItem 
                title="Layer Material Filter" 
                description="Identify as shear wall if any wall layer material contains this string."
              >
                <TextField
                  fullWidth
                  value={values.layerNameContains}
                  onChange={handleChange('layerNameContains')}
                  placeholder="e.g. OSB"
                />
              </SettingItem>
            </Grid>
          </Grid>
        </Grid>

        {/* Combo Parameter Mapping */}
        <Grid item xs={12} sx={{ mt: 2 }}>
          <Typography
            variant="subtitle2"
            sx={{ color: 'text.primary', mb: 2, fontWeight: 600, fontSize: '0.875rem' }}
          >
            Combo Parameter Mapping
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <SettingItem 
                title="Combo Parameter" 
                description="Parameter in the Combo family to set."
              >
                <TextField
                  fullWidth
                  value={values.comboParameter}
                  onChange={handleChange('comboParameter')}
                  placeholder="e.g. Is_Shear"
                />
              </SettingItem>
            </Grid>
            <Grid item xs={4}>
              <SettingItem 
                title="Shear Value" 
                description="Value to set if identified as Shear."
              >
                <TextField
                  fullWidth
                  value={values.shearValue}
                  onChange={handleChange('shearValue')}
                  placeholder="e.g. 1"
                />
              </SettingItem>
            </Grid>
            <Grid item xs={4}>
              <SettingItem 
                title="Non-Shear Value" 
                description="Value to set if NOT a Shear wall."
              >
                <TextField
                  fullWidth
                  value={values.nonShearValue}
                  onChange={handleChange('nonShearValue')}
                  placeholder="e.g. 0"
                />
              </SettingItem>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      
      <Typography 
        variant="caption" 
        sx={{ 
          mt: 4, 
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
        * The tool will automatically select the Shear-enabled combo version if the layer material detection rule matches. This ensures structural requirements are met automatically regardless of the host wall type.
      </Typography>
    </Box>
  );
}

export default ShearWallLogic;
