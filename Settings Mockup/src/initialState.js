export const createDefaultSettings = () => ({
  hostCombo: {
    level: { host: 'Level', combo: 'Combo_Level' },
    bearings: [
      { id: 1, host: 'Bearing', combo: 'Combo_Bearing' }
    ],
    openingCount: { host: 'Opening_Count', combo: 'Combo_Opening_Count' },
  },
  junctions: [
    { id: 1, number: 1, type: 'T 3 walls' },
    { id: 2, number: 2, type: 'T 2 walls' },
    { id: 3, number: 3, type: 'L' },
    { id: 4, number: 4, type: 'L-Hidden' },
    { id: 5, number: 5, type: 'Free' },
    { id: 6, number: 6, type: 'Splice' },
  ],
  edgeParams: {
    left: 'Edge_Type_Left',
    right: 'Edge_Type_Right',
  },
  openings: {
    'opening-type': { host: 'Opening_Type', leftCombo: 'Left_Combo_Opening_Type', rightCombo: 'Right_Combo_Opening_Type' },
    'opening-vertical': { 
      host: 'Sill_Height', 
      hostOpeningLevel: 'Level',
      hostWallLevel: 'Base Constraint',
      leftCombo: 'Left_Combo_Sill_Height', 
      rightCombo: 'Right_Combo_Sill_Height' 
    },
    'opening-horizontal': { host: 'Horizontal_Offset', leftCombo: 'Left_Combo_Horizontal_Offset', rightCombo: 'Right_Combo_Horizontal_Offset' },
    'opening-height': { host: 'Opening_Height', leftCombo: 'Left_Combo_Opening_Height', rightCombo: 'Right_Combo_Opening_Height' },
    'opening-width': { host: 'Opening_Width', leftCombo: 'Left_Combo_Opening_Width', rightCombo: 'Right_Combo_Opening_Width' },
  },
  ledger: {
    params: {
      frontDetail: 'WL_T_Detail_Front',
      backDetail: 'WL_T_Detail_Back',
    },
    exteriorRule: 'interior',
    interiorRule: 'both',
    bearingConfig: {
      parameter: 'Bearing_Property',
      value: 'LB',
    }
  },
  endStuds: {
    left: { parameter: 'WL_L_Studs', defaultValue: 1 },
    right: { parameter: 'WL_R_Studs', defaultValue: 1 },
  },
  shearWall: {
    layerNameContains: 'OSB',
    comboParameter: 'Is_Shear',
    shearValue: '1',
    nonShearValue: '0',
  }
});
