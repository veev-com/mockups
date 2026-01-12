import { useState } from 'react';
import {
  Box,
  Typography,
  Select,
  MenuItem,
  IconButton,
  Tooltip,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import SettingsIcon from '@mui/icons-material/Settings';

function PresetManager({
  presets,
  activePresetId,
  onSelect,
  onAdd,
  onDuplicate,
  onRemove,
  onRename,
}) {
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);
  const [editingPresetId, setEditingPresetId] = useState(null);
  const [tempName, setTempName] = useState('');

  const activePreset = presets.find((p) => p.id === activePresetId);

  const handleStartRename = (preset) => {
    setEditingPresetId(preset.id);
    setTempName(preset.name);
  };

  const handleSaveRename = (id) => {
    onRename(id, tempName);
    setEditingPresetId(null);
  };

  return (
    <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 1,
        }}
      >
        <Typography
          variant="caption"
          sx={{
            color: 'text.secondary',
            fontWeight: 600,
            textTransform: 'uppercase',
          }}
        >
          Project Preset
        </Typography>
        <Tooltip title="Manage Projects">
          <IconButton
            size="small"
            onClick={() => setIsManageModalOpen(true)}
            sx={{ color: 'text.secondary' }}
          >
            <SettingsIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Tooltip>
      </Box>

      <Select
        value={activePresetId}
        onChange={(e) => onSelect(e.target.value)}
        fullWidth
        size="small"
        sx={{
          height: 32,
          fontSize: '0.8125rem',
          backgroundColor: 'background.default',
        }}
      >
        {presets.map((preset) => (
          <MenuItem
            key={preset.id}
            value={preset.id}
            sx={{ fontSize: '0.8125rem' }}
          >
            {preset.name}
          </MenuItem>
        ))}
      </Select>

      {/* Management Modal */}
      <Dialog
        open={isManageModalOpen}
        onClose={() => setIsManageModalOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: 'background.paper',
            backgroundImage: 'none',
            borderRadius: 2,
          },
        }}
      >
        <DialogTitle
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            pb: 1,
          }}
        >
          <Typography variant="h6" sx={{ fontSize: '1.1rem', fontWeight: 600 }}>
            Manage Project Presets
          </Typography>
          <Button
            startIcon={<AddIcon />}
            variant="contained"
            size="small"
            onClick={onAdd}
            sx={{ textTransform: 'none' }}
          >
            New Project
          </Button>
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ p: 0 }}>
          <List sx={{ py: 0 }}>
            {presets.map((preset) => (
              <Box key={preset.id}>
                <ListItem
                  sx={{
                    px: 3,
                    py: 1.5,
                    '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.05)' },
                  }}
                  secondaryAction={
                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                      <Tooltip title="Duplicate">
                        <IconButton
                          size="small"
                          onClick={() => onDuplicate(preset.id)}
                        >
                          <ContentCopyIcon sx={{ fontSize: 18 }} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton
                          size="small"
                          sx={{ '&:hover': { color: '#f44336' } }}
                          onClick={() => onRemove(preset.id)}
                          disabled={presets.length <= 1}
                        >
                          <DeleteOutlineIcon sx={{ fontSize: 18 }} />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  }
                >
                  <ListItemText
                    primary={
                      editingPresetId === preset.id ? (
                        <TextField
                          autoFocus
                          size="small"
                          value={tempName}
                          onChange={(e) => setTempName(e.target.value)}
                          onBlur={() => handleSaveRename(preset.id)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSaveRename(preset.id);
                          }}
                          sx={{
                            '& .MuiInputBase-input': { py: 0.5, fontSize: '0.9rem' },
                          }}
                        />
                      ) : (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography sx={{ fontSize: '0.9rem' }}>
                            {preset.name}
                          </Typography>
                          <IconButton
                            size="small"
                            onClick={() => handleStartRename(preset)}
                          >
                            <EditIcon sx={{ fontSize: 14 }} />
                          </IconButton>
                        </Box>
                      )
                    }
                    secondary={preset.id === activePresetId ? 'Active' : null}
                    secondaryTypographyProps={{
                      sx: { color: 'primary.main', fontWeight: 600, fontSize: '0.7rem' },
                    }}
                  />
                </ListItem>
                <Divider />
              </Box>
            ))}
          </List>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={() => setIsManageModalOpen(false)}
            sx={{ textTransform: 'none', color: 'text.secondary' }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default PresetManager;
