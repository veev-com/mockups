import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  Grid,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Crop32Icon from '@mui/icons-material/Crop32'; // Host
import GridViewIcon from '@mui/icons-material/GridView'; // Combo
import SettingItem from './SettingItem';
import CopyTextField from './common/CopyTextField';

const junctionOptions = [
  'T 3 walls',
  'T 2 walls',
  'L',
  'L-Hidden',
  'Free',
  'Splice',
];

function JunctionType({ junctions, edgeParams, onUpdateJunctions, onUpdateEdgeParams }) {
  const handleNumberChange = (id, value) => {
    onUpdateJunctions(
      junctions.map((j) => (j.id === id ? { ...j, number: parseInt(value) || 0 } : j))
    );
  };

  const handleTypeChange = (id, value) => {
    onUpdateJunctions(
      junctions.map((j) => (j.id === id ? { ...j, type: value } : j))
    );
  };

  const handleEdgeParamChange = (side) => (e) => {
    onUpdateEdgeParams({ ...edgeParams, [side]: e.target.value });
  };

  const addJunction = () => {
    const nextNumber = junctions.length > 0 
      ? Math.max(...junctions.map(j => j.number)) + 1 
      : 1;
    onUpdateJunctions([
      ...junctions,
      { id: Date.now(), number: nextNumber, type: '' },
    ]);
  };

  const removeJunction = (id) => {
    onUpdateJunctions(junctions.filter((j) => j.id !== id));
  };

  const selectedTypes = junctions.map((j) => j.type).filter(t => t !== '');

  return (
    <Box id="junction-type" sx={{ mb: 5 }}>
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
        Junction Type
      </Typography>
      
      <Box sx={{ mb: 4 }}>
        <SettingItem 
          title="Edge Type Parameters" 
          description="Configure the parameter names used for left and right edge types."
        >
          <Grid container spacing={4} sx={{ maxWidth: 800 }}>
            <Grid item xs={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5, gap: 0.5 }}>
                <GridViewIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                  Left Edge Parameter
                </Typography>
              </Box>
              <CopyTextField
                fullWidth
                value={edgeParams?.left || ''}
                onChange={handleEdgeParamChange('left')}
              />
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5, gap: 0.5 }}>
                <GridViewIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                  Right Edge Parameter
                </Typography>
              </Box>
              <CopyTextField
                fullWidth
                value={edgeParams?.right || ''}
                onChange={handleEdgeParamChange('right')}
              />
            </Grid>
          </Grid>
        </SettingItem>
      </Box>

      <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
        Map numeric junction codes to their corresponding junction type descriptions.
        Note: Each junction type can only be selected once.
      </Typography>

      <TableContainer
        component={Paper}
        sx={{
          bgcolor: 'background.paper',
          backgroundImage: 'none',
          maxWidth: 600,
          mb: 2,
        }}
      >
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: 'text.secondary', fontWeight: 600, width: 100 }}>
                Number
              </TableCell>
              <TableCell sx={{ color: 'text.secondary', fontWeight: 600 }}>
                Junction Type
              </TableCell>
              <TableCell sx={{ color: 'text.secondary', fontWeight: 600, width: 50 }} />
            </TableRow>
          </TableHead>
          <TableBody>
            {junctions.map((junction) => (
              <TableRow key={junction.id}>
                <TableCell>
                  <TextField
                    type="number"
                    value={junction.number}
                    onChange={(e) => handleNumberChange(junction.id, e.target.value)}
                    sx={{ width: 70 }}
                    inputProps={{ min: 0 }}
                  />
                </TableCell>
                <TableCell>
                  <FormControl sx={{ minWidth: 200, width: '100%' }}>
                    <Select
                      displayEmpty
                      value={junction.type}
                      onChange={(e) => handleTypeChange(junction.id, e.target.value)}
                      renderValue={(selected) => {
                        if (selected === '') {
                          return <Box component="em" sx={{ color: 'text.secondary', fontStyle: 'normal' }}>None</Box>;
                        }
                        return selected;
                      }}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {junctionOptions.map((option) => {
                        const isSelectedElsewhere = selectedTypes.includes(option) && junction.type !== option;
                        return (
                          <MenuItem 
                            key={option} 
                            value={option}
                            disabled={isSelectedElsewhere}
                          >
                            {option}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell align="right">
                  <IconButton 
                    size="small" 
                    onClick={() => removeJunction(junction.id)}
                    sx={{ color: 'text.secondary', '&:hover': { color: '#f44336' } }}
                  >
                    <DeleteOutlineIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Button
        startIcon={<AddIcon />}
        onClick={addJunction}
        sx={{
          color: 'primary.main',
          textTransform: 'none',
          fontSize: '0.8125rem',
          '&:hover': { bgcolor: 'rgba(0, 120, 212, 0.1)' },
        }}
      >
        Add Mapping
      </Button>
    </Box>
  );
}

export default JunctionType;
