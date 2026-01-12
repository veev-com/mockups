import { useState, useRef, useEffect, useContext } from 'react';
import { Box, Typography, TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import SettingsNavigation from './components/SettingsNavigation';
import SettingsContent from './components/SettingsContent';
import PresetManager from './components/PresetManager';
import { ColorModeContext } from './main';
import { createDefaultSettings } from './initialState';

const sections = [
  { id: 'host-combo-mapping', label: 'Host Combo Mapping', parent: null },
  { id: 'host-combo-level', label: 'Level', parent: 'host-combo-mapping' },
  { id: 'host-combo-bearing', label: 'Bearing', parent: 'host-combo-mapping' },
  { id: 'host-combo-opening-count', label: 'Opening Count', parent: 'host-combo-mapping' },
  { id: 'junction-type', label: 'Junction Type', parent: null },
  { id: 'opening-position', label: 'Opening Position', parent: null },
  { id: 'opening-type', label: 'Opening Type', parent: 'opening-position' },
  { id: 'opening-vertical', label: 'Vertical Position', parent: 'opening-position' },
  { id: 'opening-horizontal', label: 'Horizontal Position', parent: 'opening-position' },
  { id: 'opening-height', label: 'Opening Height', parent: 'opening-position' },
  { id: 'opening-width', label: 'Opening Width', parent: 'opening-position' },
  { id: 'ledger-support', label: 'Ledger Support', parent: null },
  { id: 'ledger-parameters', label: 'Parameters', parent: 'ledger-support' },
  { id: 'ledger-placement', label: 'Placement Rules', parent: 'ledger-support' },
  { id: 'end-studs', label: 'End Stud Selection', parent: null },
  { id: 'shear-wall', label: 'Shear Wall Selection', parent: null },
];

function App({ mode }) {
  const [activeSection, setActiveSection] = useState('host-combo-mapping');
  const [searchQuery, setSearchQuery] = useState('');
  const contentRef = useRef(null);
  const colorMode = useContext(ColorModeContext);

  // Resizable pane state
  const [leftPaneWidth, setLeftPaneWidth] = useState(280);
  const [isResizing, setIsResizing] = useState(false);
  const resizeRef = useRef(null);

  // Preset State
  const [presets, setPresets] = useState([
    { id: 'p1016', name: 'P1016', settings: createDefaultSettings() },
    { id: 'p1009', name: 'P1009', settings: createDefaultSettings() },
  ]);
  const [activePresetId, setActivePresetId] = useState('p1016');

  const activePreset = presets.find((p) => p.id === activePresetId);

  // Update logic
  const updateActiveSettings = (updater) => {
    setPresets((prev) =>
      prev.map((p) =>
        p.id === activePresetId
          ? { ...p, settings: updater(p.settings) }
          : p
      )
    );
  };

  const handleAddPreset = () => {
    const id = `p${Date.now()}`;
    const name = `Project ${presets.length + 1}`;
    const newPreset = { id, name, settings: createDefaultSettings() };
    setPresets([...presets, newPreset]);
    setActivePresetId(id);
  };

  const handleDuplicatePreset = (id) => {
    const source = presets.find((p) => p.id === id);
    const newId = `p${Date.now()}`;
    const newPreset = { 
      id: newId, 
      name: `${source.name} Copy`, 
      settings: JSON.parse(JSON.stringify(source.settings)) 
    };
    setPresets([...presets, newPreset]);
    setActivePresetId(newId);
  };

  const handleRemovePreset = (id) => {
    if (presets.length <= 1) return;
    const newPresets = presets.filter((p) => p.id !== id);
    setPresets(newPresets);
    if (activePresetId === id) {
      setActivePresetId(newPresets[0].id);
    }
  };

  const handleRenamePreset = (id, newName) => {
    setPresets((prev) =>
      prev.map((p) => (p.id === id ? { ...p, name: newName } : p))
    );
  };

  // Resize handlers
  const handleMouseDown = (e) => {
    setIsResizing(true);
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (!isResizing) return;
    const newWidth = e.clientX;
    if (newWidth >= 200 && newWidth <= 600) {
      setLeftPaneWidth(newWidth);
    }
  };

  const handleMouseUp = () => {
    setIsResizing(false);
  };

  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isResizing]);

  // Filter sections based on search query
  const filteredSections = sections.filter((section) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    if (section.label.toLowerCase().includes(query)) return true;
    if (section.parent) {
      const parent = sections.find((s) => s.id === section.parent);
      if (parent && parent.label.toLowerCase().includes(query)) return true;
    }
    const children = sections.filter((s) => s.parent === section.id);
    if (children.some((child) => child.label.toLowerCase().includes(query))) return true;
    return false;
  });

  const handleNavClick = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element && contentRef.current) {
      contentRef.current.scrollTo({
        top: element.offsetTop - 20,
        behavior: 'smooth',
      });
    }
  };

  const handleScroll = () => {
    if (!contentRef.current) return;
    const scrollTop = contentRef.current.scrollTop;
    for (let i = filteredSections.length - 1; i >= 0; i--) {
      const section = filteredSections[i];
      const element = document.getElementById(section.id);
      if (element) {
        const elementTop = element.offsetTop - 50;
        if (scrollTop >= elementTop) {
          setActiveSection(section.id);
          break;
        }
      }
    }
  };

  useEffect(() => {
    const container = contentRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [filteredSections]);

  return (
    <Box sx={{ display: 'flex', height: '100vh', bgcolor: 'background.default' }}>
      {/* Left Navigation Pane */}
      <Box
        sx={{
          width: leftPaneWidth,
          minWidth: leftPaneWidth,
          bgcolor: 'background.paper',
          borderRight: 1,
          borderColor: 'divider',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}
      >
        {/* Header */}
        <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
            <Typography variant="h6" sx={{ color: 'text.primary', fontSize: '1rem' }}>
              Settings
            </Typography>
            <IconButton onClick={colorMode.toggleColorMode} color="inherit" size="small">
              {mode === 'dark' ? <Brightness7Icon fontSize="small" /> : <Brightness4Icon fontSize="small" />}
            </IconButton>
          </Box>
          <TextField
            fullWidth
            placeholder="Search settings"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'text.secondary', fontSize: 18 }} />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                height: 28,
                fontSize: '0.8125rem',
              },
            }}
          />
        </Box>
        
        {/* Navigation */}
        <SettingsNavigation
          sections={filteredSections}
          activeSection={activeSection}
          onNavClick={handleNavClick}
        />

        {/* PresetManager at bottom */}
        <PresetManager 
          presets={presets}
          activePresetId={activePresetId}
          onSelect={setActivePresetId}
          onAdd={handleAddPreset}
          onDuplicate={handleDuplicatePreset}
          onRemove={handleRemovePreset}
          onRename={handleRenamePreset}
        />

        {/* Resize Handle */}
        <Box
          onMouseDown={handleMouseDown}
          sx={{
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            width: '4px',
            cursor: 'col-resize',
            bgcolor: 'transparent',
            '&:hover': {
              bgcolor: 'primary.main',
            },
            '&:active': {
              bgcolor: 'primary.main',
            },
            transition: 'background-color 0.2s',
            zIndex: 10,
          }}
        />
      </Box>

      {/* Main Content Area */}
      <Box
        ref={contentRef}
        sx={{
          flex: 1,
          overflow: 'auto',
          p: 4,
          bgcolor: 'background.default',
        }}
      >
        <Box sx={{ maxWidth: 800 }}>
          <SettingsContent 
            sections={filteredSections} 
            searchQuery={searchQuery} 
            settings={activePreset.settings}
            updateSettings={updateActiveSettings}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default App;
