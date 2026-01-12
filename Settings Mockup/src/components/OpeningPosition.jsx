import { Box, Typography, TextField, Grid } from '@mui/material';
import SettingItem from './SettingItem';

const openingParams = [
  {
    id: 'opening-type',
    title: 'Opening Type',
    description: 'Parameter names for identifying the type of opening (door, window, etc.).',
  },
  {
    id: 'opening-vertical',
    title: 'Vertical Position',
    description: 'Parameter names for the vertical position/sill height of the opening and associated level parameters.',
  },
  {
    id: 'opening-horizontal',
    title: 'Horizontal Position',
    description: 'Parameter names for the horizontal offset of the opening from the wall start.',
  },
  {
    id: 'opening-height',
    title: 'Opening Height',
    description: 'Parameter names for the height dimension of the opening.',
  },
  {
    id: 'opening-width',
    title: 'Opening Width',
    description: 'Parameter names for the width dimension of the opening.',
  },
];

function OpeningPosition({ values, onUpdate }) {
  const handleChange = (paramId, field) => (e) => {
    onUpdate({
      ...values,
      [paramId]: { ...values[paramId], [field]: e.target.value },
    });
  };

  return (
    <Box id="opening-position" sx={{ mb: 5 }}>
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
        Opening Position
      </Typography>
      <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary' }}>
        Configure parameter mappings between host element opening properties and Combo element parameters.
      </Typography>

      {openingParams.map((param) => (
        <Box key={param.id} id={param.id}>
          <SettingItem title={param.title} description={param.description}>
            <Grid container spacing={4} sx={{ maxWidth: 800 }}>
              <Grid item xs={6}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box>
                    <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 0.5 }}>
                      Host Parameter
                    </Typography>
                    <TextField
                      fullWidth
                      value={values[param.id]?.host || ''}
                      onChange={handleChange(param.id, 'host')}
                    />
                  </Box>
                  
                  {param.id === 'opening-vertical' && (
                    <>
                      <Box>
                        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 0.5 }}>
                          Level Selection for Host Opening
                        </Typography>
                        <TextField
                          fullWidth
                          value={values[param.id]?.hostOpeningLevel || ''}
                          onChange={handleChange(param.id, 'hostOpeningLevel')}
                        />
                      </Box>
                      <Box>
                        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 0.5 }}>
                          Level Selection for Host Wall
                        </Typography>
                        <TextField
                          fullWidth
                          value={values[param.id]?.hostWallLevel || ''}
                          onChange={handleChange(param.id, 'hostWallLevel')}
                        />
                      </Box>
                    </>
                  )}
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box>
                    <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 0.5 }}>
                      Left Opening Combo Parameter
                    </Typography>
                    <TextField
                      fullWidth
                      value={values[param.id]?.leftCombo || ''}
                      onChange={handleChange(param.id, 'leftCombo')}
                    />
                  </Box>
                  <Box>
                    <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 0.5 }}>
                      Right Opening Combo Parameter
                    </Typography>
                    <TextField
                      fullWidth
                      value={values[param.id]?.rightCombo || ''}
                      onChange={handleChange(param.id, 'rightCombo')}
                    />
                  </Box>
                </Box>
              </Grid>
            </Grid>
            {param.id === 'opening-horizontal' && (
              <Typography 
                variant="caption" 
                sx={{ 
                  mt: 2, 
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
                * The left opening is calculated relative to the wall start (left side) and the right relative to the wall end.
              </Typography>
            )}
          </SettingItem>
        </Box>
      ))}
    </Box>
  );
}

export default OpeningPosition;
