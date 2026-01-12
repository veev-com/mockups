import {
  Box,
  Typography,
  TextField,
  Grid,
  Select,
  MenuItem,
  FormControl,
} from '@mui/material';
import SettingItem from './SettingItem';

const placementOptions = [
  { value: 'interior', label: 'Only Interior' },
  { value: 'exterior', label: 'Only Exterior' },
  { value: 'both', label: 'Both Sides' },
];

function LedgerSupport({ settings, onUpdate }) {
  const { params, exteriorRule, interiorRule, bearingConfig } = settings;

  const handleParamChange = (field) => (e) => {
    onUpdate({
      ...settings,
      params: { ...params, [field]: e.target.value }
    });
  };

  const handleRuleChange = (field, value) => {
    onUpdate({
      ...settings,
      [field]: value
    });
  };

  const handleBearingChange = (field) => (e) => {
    onUpdate({
      ...settings,
      bearingConfig: { ...bearingConfig, [field]: e.target.value }
    });
  };

  return (
    <Box id="ledger-support" sx={{ mb: 5 }}>
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
        Ledger Support
      </Typography>
      <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary' }}>
        Configure parameter names and placement logic for ledger support elements.
      </Typography>

      {/* Parameters Subsection */}
      <Box id="ledger-parameters" sx={{ mb: 4 }}>
        <Typography
          variant="subtitle2"
          sx={{ color: 'text.primary', mb: 2, fontWeight: 600, fontSize: '0.875rem' }}
        >
          Parameters
        </Typography>
        <Grid container spacing={4} sx={{ maxWidth: 800 }}>
          <Grid item xs={6}>
            <SettingItem 
              title="Top Front detail parameter" 
              description="Parameter name for the front detail configuration (1/0)."
            >
              <TextField
                fullWidth
                value={params.frontDetail}
                onChange={handleParamChange('frontDetail')}
              />
            </SettingItem>
          </Grid>
          <Grid item xs={6}>
            <SettingItem 
              title="Top Back detail parameter" 
              description="Parameter name for the back detail configuration (1/0)."
            >
              <TextField
                fullWidth
                value={params.backDetail}
                onChange={handleParamChange('backDetail')}
              />
            </SettingItem>
          </Grid>
        </Grid>
      </Box>

      {/* Placement Logic Subsection */}
      <Box id="ledger-placement">
        <Typography
          variant="subtitle2"
          sx={{ color: 'text.primary', mb: 2, fontWeight: 600, fontSize: '0.875rem' }}
        >
          Placement Rules
        </Typography>
        <Box sx={{ ml: 1 }}>
          {/* Exterior Walls */}
          <Box id="ledger-placement-exterior" sx={{ mb: 4 }}>
            <SettingItem 
              title="Exterior Walls" 
              description="Choose the ledger placement side for exterior wall elements."
            >
              <FormControl sx={{ minWidth: 200, mt: 1 }}>
                <Select
                  value={exteriorRule}
                  onChange={(e) => handleRuleChange('exteriorRule', e.target.value)}
                >
                  {placementOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </SettingItem>
          </Box>

          {/* Interior Walls */}
          <Box id="ledger-placement-interior">
            <SettingItem 
              title="Interior Walls" 
              description="Configure placement rules and conditions for interior wall elements."
            >
              <Grid container spacing={4} sx={{ maxWidth: 850 }}>
                <Grid item xs={4}>
                  <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 0.5 }}>
                    Placement Side
                  </Typography>
                  <FormControl fullWidth>
                    <Select
                      value={interiorRule}
                      onChange={(e) => handleRuleChange('interiorRule', e.target.value)}
                    >
                      {placementOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 0.5 }}>
                    Bearing Property Name
                  </Typography>
                  <TextField
                    fullWidth
                    value={bearingConfig.parameter}
                    onChange={handleBearingChange('parameter')}
                    placeholder="e.g. Bearing_Property"
                  />
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 0.5 }}>
                    Value to Match (Placement if True)
                  </Typography>
                  <TextField
                    fullWidth
                    value={bearingConfig.value}
                    onChange={handleBearingChange('value')}
                    placeholder="e.g. LB"
                  />
                </Grid>
              </Grid>
            </SettingItem>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default LedgerSupport;
