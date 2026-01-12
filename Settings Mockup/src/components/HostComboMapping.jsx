import { Box, Typography, TextField, Grid, Button, IconButton, useTheme } from '@mui/material';
import SettingItem from './SettingItem';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

function HostComboMapping({ values, onUpdate }) {
  const theme = useTheme();
  const handleChange = (section, field) => (e) => {
    onUpdate({
      ...values,
      [section]: { ...values[section], [field]: e.target.value },
    });
  };

  const handleBearingChange = (id, field) => (e) => {
    onUpdate({
      ...values,
      bearings: values.bearings.map((b) => 
        b.id === id ? { ...b, [field]: e.target.value } : b
      ),
    });
  };

  const addBearing = () => {
    onUpdate({
      ...values,
      bearings: [
        ...values.bearings,
        { id: Date.now(), host: '', combo: '' }
      ],
    });
  };

  const removeBearing = (id) => {
    onUpdate({
      ...values,
      bearings: values.bearings.filter((b) => b.id !== id),
    });
  };

  const renderSection = (id, title, description, sectionKey, hostDisabled = false, hostValue = null) => (
    <Box id={id}>
      <SettingItem title={title} description={description}>
        <Grid container spacing={4} sx={{ maxWidth: 800 }}>
          <Grid item xs={6}>
            <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 0.5 }}>
              Host Parameter
            </Typography>
            <TextField
              fullWidth
              disabled={hostDisabled}
              value={hostValue !== null ? hostValue : values[sectionKey].host}
              onChange={handleChange(sectionKey, 'host')}
              sx={hostDisabled ? { 
                '& .MuiInputBase-input.Mui-disabled': { 
                  WebkitTextFillColor: theme.palette.text.secondary,
                  color: theme.palette.text.secondary,
                  fontStyle: 'italic'
                },
                bgcolor: 'action.hover'
              } : {}}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 0.5 }}>
              Combo Matching Parameter
            </Typography>
            <TextField
              fullWidth
              value={values[sectionKey].combo}
              onChange={handleChange(sectionKey, 'combo')}
            />
          </Grid>
        </Grid>
      </SettingItem>
    </Box>
  );

  return (
    <Box id="host-combo-mapping" sx={{ mb: 5 }}>
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
        Host Combo Mapping
      </Typography>
      <Typography variant="body2" sx={{ mb: 4, color: 'text.secondary' }}>
        Configure parameter names for mapping host element properties to Combo elements.
      </Typography>

      {renderSection(
        'host-combo-level',
        'Level',
        'Parameter name used to identify the level/floor for the Combo element placement.',
        'level'
      )}
      
      {/* Bearing Section */}
      <Box id="host-combo-bearing" sx={{ mb: 4 }}>
        <SettingItem 
          title="Bearing" 
          description="Parameter names for the bearing/orientation of the Combo element. You can add multiple mappings if needed."
        >
          {values.bearings.map((bearing, index) => (
            <Box key={bearing.id} sx={{ mb: index === values.bearings.length - 1 ? 2 : 3 }}>
              <Grid container spacing={4} sx={{ maxWidth: 850, alignItems: 'center' }}>
                <Grid item xs={5.5}>
                  <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 0.5 }}>
                    Host Parameter
                  </Typography>
                  <TextField
                    fullWidth
                    value={bearing.host}
                    onChange={handleBearingChange(bearing.id, 'host')}
                  />
                </Grid>
                <Grid item xs={5.5}>
                  <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 0.5 }}>
                    Combo Matching Parameter
                  </Typography>
                  <TextField
                    fullWidth
                    value={bearing.combo}
                    onChange={handleBearingChange(bearing.id, 'combo')}
                  />
                </Grid>
                <Grid item xs={1} sx={{ mt: 2 }}>
                  <IconButton 
                    size="small" 
                    onClick={() => removeBearing(bearing.id)}
                    disabled={values.bearings.length === 1 && values.bearings[0].host === '' && values.bearings[0].combo === ''}
                    sx={{ color: 'text.secondary', '&:hover': { color: '#f44336' } }}
                  >
                    <DeleteOutlineIcon fontSize="small" />
                  </IconButton>
                </Grid>
              </Grid>
            </Box>
          ))}
          <Button
            startIcon={<AddIcon />}
            onClick={addBearing}
            sx={{
              color: 'primary.main',
              textTransform: 'none',
              fontSize: '0.8125rem',
              p: 0,
              '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' },
            }}
          >
            Add Bearing Mapping
          </Button>
        </SettingItem>
      </Box>

      {renderSection(
        'host-combo-opening-count',
        'Opening Count',
        'Parameter name that stores the number of openings in the host element.',
        'openingCount',
        true,
        'Calculated from model'
      )}
    </Box>
  );
}

export default HostComboMapping;
