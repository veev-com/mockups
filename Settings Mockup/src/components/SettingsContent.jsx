import { Box } from '@mui/material';
import HostComboMapping from './HostComboMapping';
import JunctionType from './JunctionType';
import OpeningPosition from './OpeningPosition';
import LedgerSupport from './LedgerSupport';
import EndStudSelection from './EndStudSelection';
import ShearWallLogic from './ShearWallLogic';

function SettingsContent({ sections = [], searchQuery = '', settings, updateSettings }) {
  const sectionIds = sections.map((s) => s.id);
  
  // Check if a section or any of its children are visible
  const isVisible = (parentId) => {
    if (sectionIds.includes(parentId)) return true;
    return sections.some((s) => s.parent === parentId);
  };

  return (
    <Box>
      {isVisible('host-combo-mapping') && (
        <HostComboMapping 
          values={settings.hostCombo} 
          onUpdate={(newValues) => updateSettings(s => ({ ...s, hostCombo: newValues }))} 
        />
      )}
      {isVisible('junction-type') && (
        <JunctionType 
          junctions={settings.junctions} 
          edgeParams={settings.edgeParams}
          onUpdateJunctions={(newJunctions) => updateSettings(s => ({ ...s, junctions: newJunctions }))}
          onUpdateEdgeParams={(newParams) => updateSettings(s => ({ ...s, edgeParams: newParams }))}
        />
      )}
      {isVisible('opening-position') && (
        <OpeningPosition 
          values={settings.openings}
          onUpdate={(newValues) => updateSettings(s => ({ ...s, openings: newValues }))}
        />
      )}
      {isVisible('ledger-support') && (
        <LedgerSupport 
          settings={settings.ledger}
          onUpdate={(newValues) => updateSettings(s => ({ ...s, ledger: newValues }))}
        />
      )}
      {isVisible('end-studs') && (
        <EndStudSelection 
          values={settings.endStuds}
          onUpdate={(newValues) => updateSettings(s => ({ ...s, endStuds: newValues }))}
        />
      )}
      {isVisible('shear-wall') && (
        <ShearWallLogic 
          values={settings.shearWall}
          onUpdate={(newValues) => updateSettings(s => ({ ...s, shearWall: newValues }))}
        />
      )}
    </Box>
  );
}

export default SettingsContent;
