import { Box, List, ListItemButton, ListItemText, Collapse } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Crop32Icon from '@mui/icons-material/Crop32'; // Rectangle for Host
import GridViewIcon from '@mui/icons-material/GridView'; // Grid for Combo

function SettingsNavigation({ sections, activeSection, onNavClick }) {
  const theme = useTheme();
  const [expanded, setExpanded] = useState({
    'host-combo-mapping': true,
    'opening-position': true,
  });

  const parentSections = sections.filter((s) => s.parent === null);

  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const getChildren = (parentId) => {
    return sections.filter((s) => s.parent === parentId);
  };

  const isActive = (sectionId) => {
    if (activeSection === sectionId) return true;
    const children = getChildren(sectionId);
    return children.some((child) => child.id === activeSection);
  };

  const getIcon = (label) => {
    const lower = label.toLowerCase();
    if (lower.includes('host')) return <Crop32Icon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />;
    if (lower.includes('combo')) return <GridViewIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />;
    return null;
  };

  return (
    <Box sx={{ flex: 1, overflow: 'auto', py: 1 }}>
      <List dense disablePadding>
        {parentSections.map((section) => {
          const children = getChildren(section.id);
          const hasChildren = children.length > 0;
          const isExpanded = expanded[section.id];
          const active = isActive(section.id);

          return (
            <Box key={section.id}>
              <ListItemButton
                onClick={() => {
                  if (hasChildren) {
                    toggleExpand(section.id);
                  }
                  onNavClick(section.id);
                }}
                sx={{
                  py: 0.5, // Condensed
                  px: 1.5,
                  borderLeft: 3,
                  borderColor: active ? 'primary.main' : 'transparent',
                  bgcolor: activeSection === section.id ? alpha(theme.palette.primary.main, 0.08) : 'transparent',
                  '&:hover': {
                    bgcolor: alpha(theme.palette.text.primary, 0.05),
                  },
                }}
              >
                {hasChildren && (
                  <Box sx={{ mr: 0.5, display: 'flex', alignItems: 'center' }}>
                    {isExpanded ? (
                      <ExpandMoreIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                    ) : (
                      <ChevronRightIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                    )}
                  </Box>
                )}
                {getIcon(section.label)}
                <ListItemText
                  primary={section.label}
                  primaryTypographyProps={{
                    fontSize: '0.8125rem',
                    fontWeight: active ? 600 : 400,
                    color: active ? 'primary.main' : 'text.primary',
                  }}
                />
              </ListItemButton>

              {hasChildren && (
                <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                  <List dense disablePadding>
                    {children.map((child) => (
                      <ListItemButton
                        key={child.id}
                        onClick={() => onNavClick(child.id)}
                        sx={{
                          py: 0.4, // Condensed
                          pl: 4.5,
                          borderLeft: 3,
                          borderColor: activeSection === child.id ? 'primary.main' : 'transparent',
                          bgcolor: activeSection === child.id ? alpha(theme.palette.primary.main, 0.06) : 'transparent',
                          '&:hover': {
                            bgcolor: alpha(theme.palette.text.primary, 0.05),
                          },
                        }}
                      >
                        {getIcon(child.label)}
                        <ListItemText
                          primary={child.label}
                          primaryTypographyProps={{
                            fontSize: '0.8125rem',
                            fontWeight: activeSection === child.id ? 600 : 400,
                            color: activeSection === child.id ? 'primary.main' : 'text.secondary',
                          }}
                        />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              )}
            </Box>
          );
        })}
      </List>
    </Box>
  );
}

export default SettingsNavigation;

