import { Box, List, ListItemButton, ListItemText, Collapse } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useState } from 'react';

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
                  py: 0.5,
                  pl: 1.5,
                  borderLeft: 2,
                  borderColor: active ? 'primary.main' : 'transparent',
                  bgcolor: activeSection === section.id ? alpha(theme.palette.text.primary, 0.05) : 'transparent',
                  '&:hover': {
                    bgcolor: alpha(theme.palette.text.primary, 0.08),
                  },
                }}
              >
                {hasChildren && (
                  <Box sx={{ mr: 0.5, display: 'flex', alignItems: 'center' }}>
                    {isExpanded ? (
                      <ExpandMoreIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                    ) : (
                      <ChevronRightIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                    )}
                  </Box>
                )}
                <ListItemText
                  primary={section.label}
                  primaryTypographyProps={{
                    fontSize: '0.8125rem',
                    color: active ? 'text.primary' : 'text.secondary',
                    fontWeight: active ? 500 : 400,
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
                          py: 0.5,
                          pl: 5,
                          borderLeft: 2,
                          borderColor: activeSection === child.id ? 'primary.main' : 'transparent',
                          bgcolor: activeSection === child.id ? alpha(theme.palette.text.primary, 0.05) : 'transparent',
                          '&:hover': {
                            bgcolor: alpha(theme.palette.text.primary, 0.08),
                          },
                        }}
                      >
                        <ListItemText
                          primary={child.label}
                          primaryTypographyProps={{
                            fontSize: '0.8125rem',
                            color: activeSection === child.id ? 'text.primary' : 'text.secondary',
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

