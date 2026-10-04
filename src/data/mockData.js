// SENTINEL LOGIX - Authentic Indian Army Forward Logistics Dataset
// Headquarters Northern Command (14 Corps & 15 Corps) Sector Database
// Ref: SIH 2026 Defence AI Logistics Architecture

export const THEATRES = [
  { id: '14-CORPS', name: '14 Corps (Fire & Fury) – Ladakh & Siachen Sector', hq: 'Leh', alertLevel: 'OPSCON 2 (ELEVATED PRE-WINTER)' },
  { id: '15-CORPS', name: '15 Corps (Chinar) – Kashmir Valley & LOC Sector', hq: 'Srinagar', alertLevel: 'OPSCON 3 (ROUTINE PATROL)' },
  { id: '17-CORPS', name: '17 Mountain Strike Corps – Eastern Sector', hq: 'Panagarh / Tezpur', alertLevel: 'OPSCON 3 (BALANCED)' }
];

export const SUPPLY_CLASSES = [
  { id: 'class-v', code: 'Class V', name: 'Ammunition & Artillery Munitions', icon: 'Crosshair', unit: 'Rounds / Crates', criticality: 'CRITICAL' },
  { id: 'class-iii', code: 'Class III', name: 'POL (Arctic Diesel & ATF)', icon: 'Flame', unit: 'Kilolitres (KL)', criticality: 'CRITICAL' },
  { id: 'class-i', code: 'Class I', name: 'Special High Altitude Rations & Water', icon: 'Utensils', unit: 'Days of Supply (DOS)', criticality: 'HIGH' },
  { id: 'class-viii', code: 'Class VIII', name: 'Trauma Medical & Blood Plasma', icon: 'HeartPulse', unit: 'Packs / Kits', criticality: 'HIGH' },
  { id: 'class-ii', code: 'Class II', name: 'Extreme Cold Weather Clothing (ECWCS)', icon: 'Shield', unit: 'Troop Sets', criticality: 'MEDIUM' }
];

export const INITIAL_NODES = [
  {
    id: 'NODE-CP-01',
    code: 'CD-PTK-01',
    name: 'Pathankot Base Logistics Depot',
    type: 'Central Depot',
    tier: 1,
    theatre: '14-CORPS',
    coordinates: [32.26, 75.65],
    mapPos: { x: 18, y: 72 }, // percentage on tactical canvas
    elevation: '1,090 ft',
    commander: 'Brig. S. K. Rawat, VSM',
    satcomStatus: 'ONLINE (FIBRE + SATCOM)',
    overallResilience: 92,
    resilienceStatus: 'Strong',
    stockoutRisk: 4.2,
    criticalDaysRemaining: 45.0,
    dailyBurnRate: 120,
    demandRange: '110–135 units/day',
    resilienceDimensions: {
      inventory: 94,
      transport: 92,
      weather: 95,
      demand: 88,
      route: 91
    },
    topRiskFactors: [
      { factor: 'Railhead congestion delay', weight: 35, impact: '+2.1% risk' },
      { factor: 'Inter-theatre requisition backlog', weight: 28, impact: '+1.4% risk' },
      { factor: 'Bulk fuel tanker turn-around time', weight: 18, impact: '+0.7% risk' }
    ],
    inventory: [
      { category: 'Class V (Ammunition)', current: 18500, max: 20000, min: 5000, unit: 'Crates', status: 'optimal', burnRate: 85, daysLeft: 52 },
      { category: 'Class III (POL/Diesel)', current: 4800, max: 5000, min: 1200, unit: 'KL', status: 'optimal', burnRate: 95, daysLeft: 50 },
      { category: 'Class I (Combat Rations)', current: 95000, max: 100000, min: 25000, unit: 'DOS', status: 'optimal', burnRate: 1200, daysLeft: 79 },
      { category: 'Class VIII (Medical)', current: 4200, max: 5000, min: 1000, unit: 'Kits', status: 'optimal', burnRate: 40, daysLeft: 105 },
      { category: 'Class II (Cold Weather Gear)', current: 14200, max: 15000, min: 3000, unit: 'Sets', status: 'optimal', burnRate: 60, daysLeft: 236 }
    ],
    notes: 'Strategic railway trans-shipment node. Stockpiles ready for winter forward staging.'
  },
  {
    id: 'NODE-CP-02',
    code: 'CD-UDH-02',
    name: 'Udhampur Northern Command Logistics Core',
    type: 'Central Depot',
    tier: 1,
    theatre: '14-CORPS',
    coordinates: [32.92, 75.14],
    mapPos: { x: 26, y: 64 },
    elevation: '2,480 ft',
    commander: 'Maj. Gen. Rajiv Sharma, AVSM',
    satcomStatus: 'ONLINE (MIL-NET DUAL DUPLEX)',
    overallResilience: 88,
    resilienceStatus: 'Strong',
    stockoutRisk: 7.5,
    criticalDaysRemaining: 38.0,
    dailyBurnRate: 180,
    demandRange: '165–205 units/day',
    resilienceDimensions: {
      inventory: 90,
      transport: 86,
      weather: 89,
      demand: 84,
      route: 91
    },
    topRiskFactors: [
      { factor: 'Banihal pass traffic bottlenecks', weight: 42, impact: '+3.5% risk' },
      { factor: 'Emergency airlift allocation lag', weight: 26, impact: '+2.1% risk' },
      { factor: 'Weather advisory on Jammu-Srinagar NH-44', weight: 22, impact: '+1.9% risk' }
    ],
    inventory: [
      { category: 'Class V (Ammunition)', current: 15400, max: 18000, min: 4500, unit: 'Crates', status: 'optimal', burnRate: 110, daysLeft: 42 },
      { category: 'Class III (POL/Diesel)', current: 3900, max: 4500, min: 1000, unit: 'KL', status: 'optimal', burnRate: 105, daysLeft: 37 },
      { category: 'Class I (Combat Rations)', current: 82000, max: 90000, min: 20000, unit: 'DOS', status: 'optimal', burnRate: 1500, daysLeft: 54 },
      { category: 'Class VIII (Medical)', current: 3800, max: 4500, min: 900, unit: 'Kits', status: 'optimal', burnRate: 55, daysLeft: 69 },
      { category: 'Class II (Cold Weather Gear)', current: 11800, max: 13000, min: 2500, unit: 'Sets', status: 'optimal', burnRate: 80, daysLeft: 147 }
    ],
    notes: 'Theatre Master Supply Depot. Controls multi-axis convoys to Srinagar and Leh.'
  },
  {
    id: 'NODE-IN-01',
    code: 'SH-LEH-01',
    name: 'Leh High-Altitude Staging Hub (14 Corps)',
    type: 'Supply Node',
    tier: 2,
    theatre: '14-CORPS',
    coordinates: [34.15, 77.57],
    mapPos: { x: 55, y: 38 },
    elevation: '11,560 ft',
    commander: 'Brig. K. V. Nambiar',
    satcomStatus: 'ONLINE (GSAT-7A SECURE)',
    overallResilience: 58,
    resilienceStatus: 'Vulnerable',
    stockoutRisk: 58.6,
    criticalDaysRemaining: 9.4,
    dailyBurnRate: 310,
    demandRange: '280–350 units/day',
    resilienceDimensions: {
      inventory: 64,
      transport: 52,
      weather: 48,
      demand: 62,
      route: 64
    },
    topRiskFactors: [
      { factor: 'Early snowfall blocking Rohtang & Zojila axes', weight: 46, impact: '+22.5% risk' },
      { factor: 'Forward post emergency requisitions', weight: 31, impact: '+15.2% risk' },
      { factor: 'Sub-zero fuel gelling prevention overhead', weight: 23, impact: '+11.3% risk' }
    ],
    inventory: [
      { category: 'Class V (Ammunition)', current: 4800, max: 8000, min: 3000, unit: 'Crates', status: 'warning', burnRate: 210, daysLeft: 12 },
      { category: 'Class III (POL/Diesel)', current: 1420, max: 3500, min: 1200, unit: 'KL', status: 'warning', burnRate: 155, daysLeft: 9.1 },
      { category: 'Class I (Combat Rations)', current: 32000, max: 50000, min: 15000, unit: 'DOS', status: 'optimal', burnRate: 1100, daysLeft: 29 },
      { category: 'Class VIII (Medical)', current: 980, max: 2000, min: 600, unit: 'Kits', status: 'warning', burnRate: 45, daysLeft: 14 },
      { category: 'Class II (Cold Weather Gear)', current: 4100, max: 6000, min: 1800, unit: 'Sets', status: 'optimal', burnRate: 50, daysLeft: 46 }
    ],
    notes: 'Crucial trans-shipment node for Siachen, DBO, and Eastern Ladakh forward posts. Single road choke points.'
  },
  {
    id: 'NODE-IN-02',
    code: 'SH-SXR-02',
    name: 'Srinagar Transit Staging Base (15 Corps)',
    type: 'Supply Node',
    tier: 2,
    theatre: '15-CORPS',
    coordinates: [34.08, 74.79],
    mapPos: { x: 34, y: 46 },
    elevation: '5,200 ft',
    commander: 'Col. Amitav Bakshi',
    satcomStatus: 'ONLINE (TACTICAL MESH + WAN)',
    overallResilience: 69,
    resilienceStatus: 'Stable',
    stockoutRisk: 34.2,
    criticalDaysRemaining: 16.5,
    dailyBurnRate: 240,
    demandRange: '220–270 units/day',
    resilienceDimensions: {
      inventory: 72,
      transport: 65,
      weather: 68,
      demand: 71,
      route: 69
    },
    topRiskFactors: [
      { factor: 'Zojila Pass NH-1D weather freeze alerts', weight: 48, impact: '+18.4% risk' },
      { factor: 'Convoy marshaling yard congestion', weight: 28, impact: '+9.8% risk' },
      { factor: 'Night movement curfew constraints', weight: 16, impact: '+6.0% risk' }
    ],
    inventory: [
      { category: 'Class V (Ammunition)', current: 5200, max: 7500, min: 2000, unit: 'Crates', status: 'optimal', burnRate: 140, daysLeft: 24 },
      { category: 'Class III (POL/Diesel)', current: 1850, max: 2800, min: 800, unit: 'KL', status: 'optimal', burnRate: 98, daysLeft: 18.8 },
      { category: 'Class I (Combat Rations)', current: 41000, max: 55000, min: 12000, unit: 'DOS', status: 'optimal', burnRate: 1400, daysLeft: 29 },
      { category: 'Class VIII (Medical)', current: 1450, max: 2200, min: 500, unit: 'Kits', status: 'optimal', burnRate: 48, daysLeft: 30 },
      { category: 'Class II (Cold Weather Gear)', current: 5800, max: 7000, min: 1500, unit: 'Sets', status: 'optimal', burnRate: 65, daysLeft: 66 }
    ],
    notes: 'Primary gateway to Dras and Kargil sectors via Zojila Pass.'
  },
  {
    id: 'NODE-FW-01',
    code: 'FP-SIA-01',
    name: 'Siachen Base Camp (102 Inf Bde)',
    type: 'Forward Node',
    tier: 3,
    theatre: '14-CORPS',
    coordinates: [35.19, 77.12],
    mapPos: { x: 50, y: 15 },
    elevation: '12,000 ft (Glacier Base)',
    commander: 'Col. Vikram Rathore, SC',
    satcomStatus: 'RESTRICTED (SATCOM TERRESTRIAL BACKUP)',
    overallResilience: 34,
    resilienceStatus: 'Critical',
    stockoutRisk: 89.4,
    criticalDaysRemaining: 2.8,
    dailyBurnRate: 95,
    demandRange: '85–115 units/day',
    resilienceDimensions: {
      inventory: 38,
      transport: 28,
      weather: 22,
      demand: 45,
      route: 37
    },
    topRiskFactors: [
      { factor: 'Khardung La Pass blizzard warning (Wind 65kt, -34°C)', weight: 45, impact: '+38.2% risk' },
      { factor: 'Arctic Diesel high-pour-point reserves depleted', weight: 32, impact: '+27.1% risk' },
      { factor: 'Helicopter supply sortie cancelation rate 80%', weight: 23, impact: '+19.5% risk' }
    ],
    inventory: [
      { category: 'Class V (Ammunition)', current: 620, max: 1800, min: 500, unit: 'Crates', status: 'warning', burnRate: 35, daysLeft: 6.2 },
      { category: 'Class III (POL/Diesel)', current: 110, max: 600, min: 250, unit: 'KL', status: 'critical', burnRate: 38, daysLeft: 2.8 },
      { category: 'Class I (Combat Rations)', current: 3200, max: 8000, min: 2000, unit: 'DOS', status: 'warning', burnRate: 280, daysLeft: 8.5 },
      { category: 'Class VIII (Medical)', current: 85, max: 350, min: 120, unit: 'Kits', status: 'critical', burnRate: 22, daysLeft: 3.1 },
      { category: 'Class II (Cold Weather Gear)', current: 890, max: 1500, min: 600, unit: 'Sets', status: 'optimal', burnRate: 15, daysLeft: 29.3 }
    ],
    notes: 'URGENT: Arctic Diesel and Pulmonary Edema hyperbaric kits below critical reserve threshold.'
  },
  {
    id: 'NODE-FW-02',
    code: 'FP-DBO-02',
    name: 'Daulat Beg Oldi (DBO) Outpost',
    type: 'Forward Node',
    tier: 3,
    theatre: '14-CORPS',
    coordinates: [35.40, 77.92],
    mapPos: { x: 74, y: 12 },
    elevation: '16,614 ft (Highest Airstrip)',
    commander: 'Lt. Col. Pradeep Rawal',
    satcomStatus: 'DEGRADED (LOW-BAND VHF RELAY)',
    overallResilience: 31,
    resilienceStatus: 'Critical',
    stockoutRisk: 92.1,
    criticalDaysRemaining: 2.1,
    dailyBurnRate: 85,
    demandRange: '75–105 units/day',
    resilienceDimensions: {
      inventory: 32,
      transport: 24,
      weather: 28,
      demand: 40,
      route: 31
    },
    topRiskFactors: [
      { factor: 'D-S-DBO Road Shyok River seasonal flash erosion', weight: 48, impact: '+42.0% risk' },
      { factor: '155mm Precision Munitions stockout trajectory', weight: 30, impact: '+26.2% risk' },
      { factor: 'Extreme sub-zero night freeze (-38°C)', weight: 22, impact: '+19.2% risk' }
    ],
    inventory: [
      { category: 'Class V (Ammunition)', current: 310, max: 1500, min: 450, unit: 'Crates', status: 'critical', burnRate: 55, daysLeft: 2.1 },
      { category: 'Class III (POL/Diesel)', current: 140, max: 700, min: 300, unit: 'KL', status: 'critical', burnRate: 42, daysLeft: 2.9 },
      { category: 'Class I (Combat Rations)', current: 2800, max: 7000, min: 1800, unit: 'DOS', status: 'warning', burnRate: 220, daysLeft: 7.2 },
      { category: 'Class VIII (Medical)', current: 70, max: 300, min: 100, unit: 'Kits', status: 'critical', burnRate: 18, daysLeft: 2.6 },
      { category: 'Class II (Cold Weather Gear)', current: 720, max: 1200, min: 400, unit: 'Sets', status: 'optimal', burnRate: 12, daysLeft: 26.6 }
    ],
    notes: 'CRITICAL ALERT: Class V Munitions & Class III Fuel depleted. Road transit severed by river swell.'
  },
  {
    id: 'NODE-FW-03',
    code: 'FP-KGL-03',
    name: 'Kargil Forward Base (121 Inf Bde)',
    type: 'Forward Node',
    tier: 3,
    theatre: '14-CORPS',
    coordinates: [34.55, 76.13],
    mapPos: { x: 42, y: 35 },
    elevation: '8,780 ft',
    commander: 'Col. Sandeep Joshi, SM',
    satcomStatus: 'ONLINE (TACTICAL FIBRE + GSAT)',
    overallResilience: 52,
    resilienceStatus: 'Vulnerable',
    stockoutRisk: 76.8,
    criticalDaysRemaining: 4.1,
    dailyBurnRate: 160,
    demandRange: '145–185 units/day',
    resilienceDimensions: {
      inventory: 56,
      transport: 48,
      weather: 44,
      demand: 60,
      route: 52
    },
    topRiskFactors: [
      { factor: 'Zojila Pass NH-1D closure probability 92%', weight: 44, impact: '+28.4% risk' },
      { factor: 'Artillery ammunition replenishment queue', weight: 34, impact: '+22.0% risk' },
      { factor: 'Bridge load restrictions at Bodhkharbu', weight: 22, impact: '+14.2% risk' }
    ],
    inventory: [
      { category: 'Class V (Ammunition)', current: 1200, max: 3000, min: 1000, unit: 'Crates', status: 'warning', burnRate: 95, daysLeft: 4.1 },
      { category: 'Class III (POL/Diesel)', current: 380, max: 1200, min: 400, unit: 'KL', status: 'warning', burnRate: 65, daysLeft: 4.8 },
      { category: 'Class I (Combat Rations)', current: 8900, max: 15000, min: 4000, unit: 'DOS', status: 'optimal', burnRate: 450, daysLeft: 15.3 },
      { category: 'Class VIII (Medical)', current: 310, max: 700, min: 200, unit: 'Kits', status: 'optimal', burnRate: 24, daysLeft: 11.2 },
      { category: 'Class II (Cold Weather Gear)', current: 1850, max: 2500, min: 800, unit: 'Sets', status: 'optimal', burnRate: 30, daysLeft: 35.0 }
    ],
    notes: 'Vulnerable to Zojila Pass closure. Pre-positioning of heavy artillery munitions recommended.'
  },
  {
    id: 'NODE-FW-04',
    code: 'FP-DRS-04',
    name: 'Dras Sub-Sector Outpost',
    type: 'Forward Node',
    tier: 3,
    theatre: '14-CORPS',
    coordinates: [34.43, 75.76],
    mapPos: { x: 38, y: 40 },
    elevation: '10,800 ft (2nd Coldest Inhabited Place)',
    commander: 'Lt. Col. Harinder Singh',
    satcomStatus: 'ONLINE (UHF MESH)',
    overallResilience: 48,
    resilienceStatus: 'Vulnerable',
    stockoutRisk: 81.3,
    criticalDaysRemaining: 3.5,
    dailyBurnRate: 115,
    demandRange: '100–130 units/day',
    resilienceDimensions: {
      inventory: 50,
      transport: 42,
      weather: 38,
      demand: 55,
      route: 55
    },
    topRiskFactors: [
      { factor: 'Sub-zero frost freeze (-32°C) freezing pipe networks', weight: 46, impact: '+31.0% risk' },
      { factor: 'Direct dependence on Zojila axis convoys', weight: 34, impact: '+23.0% risk' },
      { factor: 'High consumption of kerosene room-heaters (Bukharis)', weight: 20, impact: '+13.5% risk' }
    ],
    inventory: [
      { category: 'Class V (Ammunition)', current: 850, max: 2000, min: 600, unit: 'Crates', status: 'warning', burnRate: 70, daysLeft: 5.0 },
      { category: 'Class III (POL/Diesel)', current: 190, max: 800, min: 300, unit: 'KL', status: 'critical', burnRate: 48, daysLeft: 3.5 },
      { category: 'Class I (Combat Rations)', current: 5200, max: 10000, min: 2500, unit: 'DOS', status: 'optimal', burnRate: 320, daysLeft: 12.5 },
      { category: 'Class VIII (Medical)', current: 160, max: 450, min: 150, unit: 'Kits', status: 'warning', burnRate: 19, daysLeft: 6.8 },
      { category: 'Class II (Cold Weather Gear)', current: 1200, max: 1800, min: 500, unit: 'Sets', status: 'optimal', burnRate: 20, daysLeft: 35.0 }
    ],
    notes: 'Kerosene & Arctic diesel burn rate 2.4x higher than standard due to severe cold wave.'
  },
  {
    id: 'NODE-FW-05',
    code: 'FP-GLW-05',
    name: 'Galwan Valley Forward Node (114 Inf Bde)',
    type: 'Forward Node',
    tier: 3,
    theatre: '14-CORPS',
    coordinates: [34.75, 78.18],
    mapPos: { x: 79, y: 26 },
    elevation: '14,200 ft',
    commander: 'Col. Mohit Chopra, SC',
    satcomStatus: 'ONLINE (TACTICAL SECURE GSAT)',
    overallResilience: 64,
    resilienceStatus: 'Stable',
    stockoutRisk: 45.2,
    criticalDaysRemaining: 6.8,
    dailyBurnRate: 90,
    demandRange: '80–110 units/day',
    resilienceDimensions: {
      inventory: 68,
      transport: 58,
      weather: 60,
      demand: 65,
      route: 69
    },
    topRiskFactors: [
      { factor: 'Culvert icing and rockfall on Patrol Axis KM-80', weight: 40, impact: '+15.2% risk' },
      { factor: 'Surge in high-altitude battery and generator fuel', weight: 32, impact: '+12.1% risk' },
      { factor: 'River ford water depth during afternoon melt', weight: 28, impact: '+10.6% risk' }
    ],
    inventory: [
      { category: 'Class V (Ammunition)', current: 1100, max: 2200, min: 650, unit: 'Crates', status: 'optimal', burnRate: 60, daysLeft: 9.8 },
      { category: 'Class III (POL/Diesel)', current: 280, max: 750, min: 250, unit: 'KL', status: 'warning', burnRate: 35, daysLeft: 6.8 },
      { category: 'Class I (Combat Rations)', current: 6400, max: 11000, min: 2800, unit: 'DOS', status: 'optimal', burnRate: 260, daysLeft: 18.0 },
      { category: 'Class VIII (Medical)', current: 210, max: 500, min: 140, unit: 'Kits', status: 'optimal', burnRate: 15, daysLeft: 13.0 },
      { category: 'Class II (Cold Weather Gear)', current: 1400, max: 2000, min: 600, unit: 'Sets', status: 'optimal', burnRate: 18, daysLeft: 44.4 }
    ],
    notes: 'Well supplied following early autumn stocking, but fuel requires buffer reinforcement.'
  },
  {
    id: 'NODE-FW-06',
    code: 'FP-NYM-06',
    name: 'Nyoma Forward Logistics Airfield (ALG)',
    type: 'Forward Node',
    tier: 3,
    theatre: '14-CORPS',
    coordinates: [33.20, 78.69],
    mapPos: { x: 82, y: 55 },
    elevation: '13,700 ft (C-130J Capable)',
    commander: 'Group Capt. A. Sengupta',
    satcomStatus: 'ONLINE (RADAR + AIR-NET SECURE)',
    overallResilience: 82,
    resilienceStatus: 'Strong',
    stockoutRisk: 19.5,
    criticalDaysRemaining: 14.5,
    dailyBurnRate: 140,
    demandRange: '125–160 units/day',
    resilienceDimensions: {
      inventory: 85,
      transport: 80,
      weather: 78,
      demand: 82,
      route: 85
    },
    topRiskFactors: [
      { factor: 'Crosswind gusts exceeding 40 knots on runway', weight: 45, impact: '+8.2% risk' },
      { factor: 'Pangong South sector troop fuel consumption', weight: 32, impact: '+5.8% risk' },
      { factor: 'Spares for aviation refuelling bowsers', weight: 23, impact: '+4.1% risk' }
    ],
    inventory: [
      { category: 'Class V (Ammunition)', current: 2400, max: 3500, min: 900, unit: 'Crates', status: 'optimal', burnRate: 75, daysLeft: 24 },
      { category: 'Class III (POL/Diesel)', current: 950, max: 1500, min: 450, unit: 'KL', status: 'optimal', burnRate: 60, daysLeft: 14.5 },
      { category: 'Class I (Combat Rations)', current: 14200, max: 20000, min: 4500, unit: 'DOS', status: 'optimal', burnRate: 480, daysLeft: 25 },
      { category: 'Class VIII (Medical)', current: 420, max: 800, min: 200, unit: 'Kits', status: 'optimal', burnRate: 20, daysLeft: 18 },
      { category: 'Class II (Cold Weather Gear)', current: 2800, max: 3500, min: 800, unit: 'Sets', status: 'optimal', burnRate: 25, daysLeft: 80 }
    ],
    notes: 'Operational runway supports heavy airlifters (C-130J, IL-76). Ideal staging base for emergency diversions.'
  },
  {
    id: 'NODE-FW-07',
    code: 'FP-CHS-07',
    name: 'Chushul Advance Staging Point',
    type: 'Forward Node',
    tier: 3,
    theatre: '14-CORPS',
    coordinates: [33.59, 78.65],
    mapPos: { x: 80, y: 44 },
    elevation: '14,350 ft',
    commander: 'Lt. Col. R. K. Thapa',
    satcomStatus: 'ONLINE (TACTICAL UHF + BACKHAUL)',
    overallResilience: 66,
    resilienceStatus: 'Stable',
    stockoutRisk: 38.6,
    criticalDaysRemaining: 7.9,
    dailyBurnRate: 85,
    demandRange: '75–100 units/day',
    resilienceDimensions: {
      inventory: 69,
      transport: 62,
      weather: 64,
      demand: 68,
      route: 67
    },
    topRiskFactors: [
      { factor: 'Pangong Tso freeze-up halting boat logistics', weight: 42, impact: '+12.4% risk' },
      { factor: 'Tsaga La pass drifting snow', weight: 35, impact: '+10.2% risk' },
      { factor: 'Solar inverter battery drain during overcast days', weight: 23, impact: '+6.8% risk' }
    ],
    inventory: [
      { category: 'Class V (Ammunition)', current: 1350, max: 2400, min: 650, unit: 'Crates', status: 'optimal', burnRate: 50, daysLeft: 18.0 },
      { category: 'Class III (POL/Diesel)', current: 310, max: 850, min: 250, unit: 'KL', status: 'warning', burnRate: 32, daysLeft: 7.9 },
      { category: 'Class I (Combat Rations)', current: 7100, max: 12000, min: 3000, unit: 'DOS', status: 'optimal', burnRate: 280, daysLeft: 19.2 },
      { category: 'Class VIII (Medical)', current: 240, max: 550, min: 150, unit: 'Kits', status: 'optimal', burnRate: 16, daysLeft: 13.5 },
      { category: 'Class II (Cold Weather Gear)', current: 1600, max: 2200, min: 600, unit: 'Sets', status: 'optimal', burnRate: 22, daysLeft: 45.4 }
    ],
    notes: 'Southern bank corridor. Road link to Nyoma remains operational throughout winter.'
  },
  {
    id: 'NODE-IN-03',
    code: 'SH-TEZ-03',
    name: 'Tezpur Advance Forward Depot (Eastern Command)',
    type: 'Supply Node',
    tier: 2,
    theatre: '17-CORPS',
    coordinates: [26.65, 92.80],
    mapPos: { x: 88, y: 78 },
    elevation: '157 ft (Foothills Staging)',
    commander: 'Brig. Debabrata Das',
    satcomStatus: 'ONLINE (HIGH SPEED OPTICAL)',
    overallResilience: 84,
    resilienceStatus: 'Strong',
    stockoutRisk: 14.2,
    criticalDaysRemaining: 22.0,
    dailyBurnRate: 220,
    demandRange: '200–250 units/day',
    resilienceDimensions: {
      inventory: 86,
      transport: 82,
      weather: 84,
      demand: 83,
      route: 85
    },
    topRiskFactors: [
      { factor: 'Sela Tunnel approach road landslides', weight: 44, impact: '+6.2% risk' },
      { factor: 'Brahmaputra seasonal fog disrupting airlift', weight: 32, impact: '+4.5% risk' },
      { factor: 'Forward ammunition depot buffer distribution', weight: 24, impact: '+3.4% risk' }
    ],
    inventory: [
      { category: 'Class V (Ammunition)', current: 6800, max: 9000, min: 2500, unit: 'Crates', status: 'optimal', burnRate: 150, daysLeft: 34 },
      { category: 'Class III (POL/Diesel)', current: 2400, max: 3200, min: 900, unit: 'KL', status: 'optimal', burnRate: 100, daysLeft: 22 },
      { category: 'Class I (Combat Rations)', current: 48000, max: 60000, min: 15000, unit: 'DOS', status: 'optimal', burnRate: 1300, daysLeft: 33 },
      { category: 'Class VIII (Medical)', current: 1800, max: 2500, min: 600, unit: 'Kits', status: 'optimal', burnRate: 50, daysLeft: 32 },
      { category: 'Class II (Cold Weather Gear)', current: 6200, max: 8000, min: 2000, unit: 'Sets', status: 'optimal', burnRate: 70, daysLeft: 60 }
    ],
    notes: 'Strategic staging depot for Tawang and Kameng sector high-altitude defense.'
  }
];

export const INITIAL_ROUTES = [
  {
    id: 'ROUTE-01',
    from: 'NODE-CP-02', // Udhampur
    to: 'NODE-IN-02',   // Srinagar
    name: 'NH-44 Strategic Highway (Banihal-Qazigund Tunnel)',
    distanceKm: 228,
    transitHours: 7.5,
    riskLevel: 'medium', // stable, medium, high, critical
    riskScore: 28,
    passElevation: '7,200 ft (Banihal)',
    weatherStatus: 'Light rain, visibility 3.5 km',
    closureProbability: 18,
    primaryBottleneck: 'Landslide-prone zone between Ramban and Banihal'
  },
  {
    id: 'ROUTE-02',
    from: 'NODE-IN-02', // Srinagar
    to: 'NODE-FW-04',   // Dras
    name: 'NH-1D Himalayan Axis via Zojila Pass',
    distanceKm: 142,
    transitHours: 8.0,
    riskLevel: 'critical',
    riskScore: 92,
    passElevation: '11,575 ft (Zojila Pass)',
    weatherStatus: 'Heavy blizzard warning, 4 ft snow accumulation expected in 18h',
    closureProbability: 92,
    primaryBottleneck: 'Severe avalanche chutes at Captains Morh & Gumri. Imminent seasonal freeze.'
  },
  {
    id: 'ROUTE-03',
    from: 'NODE-FW-04', // Dras
    to: 'NODE-FW-03',   // Kargil
    name: 'NH-1D Dras-Kargil River Axis',
    distanceKm: 58,
    transitHours: 2.2,
    riskLevel: 'high',
    riskScore: 68,
    passElevation: '9,800 ft',
    weatherStatus: 'Sub-zero icing, black ice warning',
    closureProbability: 45,
    primaryBottleneck: 'Single-lane bridges at Matayan, black ice risk'
  },
  {
    id: 'ROUTE-04',
    from: 'NODE-FW-03', // Kargil
    to: 'NODE-IN-01',   // Leh
    name: 'NH-1D Kargil-Leh Highway (Fotu La & Namika La)',
    distanceKm: 216,
    transitHours: 6.5,
    riskLevel: 'medium',
    riskScore: 42,
    passElevation: '13,478 ft (Fotu La)',
    weatherStatus: 'Clear skies, night temp -18°C',
    closureProbability: 25,
    primaryBottleneck: 'High wind shear at Fotu La summit'
  },
  {
    id: 'ROUTE-05',
    from: 'NODE-CP-01', // Pathankot
    to: 'NODE-IN-01',   // Leh
    name: 'Strategic Southern Axis (Manali - Atal Tunnel - Darcha - Shinku La - Padum - Leh)',
    distanceKm: 472,
    transitHours: 15.0,
    riskLevel: 'stable',
    riskScore: 22,
    passElevation: '16,580 ft (Shinku La Tunnel Axis)',
    weatherStatus: 'Operational, all-weather tunnel operational',
    closureProbability: 12,
    primaryBottleneck: 'Alternative emergency corridor. High clearance priority.'
  },
  {
    id: 'ROUTE-06',
    from: 'NODE-IN-01', // Leh
    to: 'NODE-FW-01',   // Siachen Base
    name: 'Khardung La - Nubra Valley Glacier Lifeline',
    distanceKm: 148,
    transitHours: 9.0,
    riskLevel: 'critical',
    riskScore: 88,
    passElevation: '17,582 ft (Khardung La Pass)',
    weatherStatus: 'Gale wind 65 kt, temp -34°C, drifting snow',
    closureProbability: 88,
    primaryBottleneck: 'North Pullu to South Pullu hairpin curves blocked by snowdrifts'
  },
  {
    id: 'ROUTE-07',
    from: 'NODE-IN-01', // Leh
    to: 'NODE-FW-02',   // DBO
    name: 'Darbuk-Shyok-DBO (D-S-DBO) Strategic Highway',
    distanceKm: 255,
    transitHours: 14.5,
    riskLevel: 'critical',
    riskScore: 94,
    passElevation: '16,614 ft (DBO ALG Plateau)',
    weatherStatus: 'Sub-zero flash flood erosion at Shyok ford, temp -38°C',
    closureProbability: 95,
    primaryBottleneck: 'KM-120 bridge washout and mudslide at Sasoma-Sasser La bypass'
  },
  {
    id: 'ROUTE-08',
    from: 'NODE-IN-01', // Leh
    to: 'NODE-FW-05',   // Galwan
    name: 'D-S-DBO Axis Galwan Valley Spur (KM-80)',
    distanceKm: 210,
    transitHours: 11.0,
    riskLevel: 'high',
    riskScore: 65,
    passElevation: '14,800 ft',
    weatherStatus: 'Overcast, iced culverts',
    closureProbability: 40,
    primaryBottleneck: 'Narrow gorge single-vehicle passage'
  },
  {
    id: 'ROUTE-09',
    from: 'NODE-IN-01', // Leh
    to: 'NODE-FW-06',   // Nyoma
    name: 'Indus River Axis (Upshi-Karu-Chumathang-Nyoma)',
    distanceKm: 180,
    transitHours: 4.5,
    riskLevel: 'stable',
    riskScore: 18,
    passElevation: '13,700 ft (Wide Valley Axis)',
    weatherStatus: 'Clear, road dry and asphalted',
    closureProbability: 8,
    primaryBottleneck: 'None significant. High-speed military heavy vehicle rated.'
  },
  {
    id: 'ROUTE-10',
    from: 'NODE-FW-06', // Nyoma
    to: 'NODE-FW-07',   // Chushul
    name: 'Nyoma-Loma Bend-Tsaga La-Chushul Axis',
    distanceKm: 85,
    transitHours: 3.0,
    riskLevel: 'medium',
    riskScore: 35,
    passElevation: '15,200 ft (Tsaga La)',
    weatherStatus: 'Cold dry winds, snow flurries',
    closureProbability: 20,
    primaryBottleneck: 'Sandy winddrifts on high plateau'
  },
  {
    id: 'ROUTE-11',
    from: 'NODE-CP-01', // Pathankot
    to: 'NODE-FW-02',   // DBO
    name: 'IAF Tactical Strategic Air Bridge (C-130J / AN-32 Airdrop)',
    distanceKm: 390,
    transitHours: 1.4,
    riskLevel: 'high',
    riskScore: 72,
    passElevation: 'Cruise 28,000 ft',
    weatherStatus: 'Severe turbulence, runway surface icy at DBO',
    closureProbability: 70,
    primaryBottleneck: 'Runway braking action poor; require container air delivery system (CDS)'
  },
  {
    id: 'ROUTE-12',
    from: 'NODE-IN-01', // Leh
    to: 'NODE-FW-01',   // Siachen Base
    name: '114 Aviation Squadron Rotary Lifeline (Mi-17V5 & ALH Dhruv)',
    distanceKm: 130,
    transitHours: 0.8,
    riskLevel: 'high',
    riskScore: 78,
    passElevation: 'Ridge clear 18,500 ft',
    weatherStatus: 'Cloud base below 14,000 ft, whiteout conditions',
    closureProbability: 80,
    primaryBottleneck: 'Whiteout and wind gusts exceeding rotor envelope limits'
  }
];

export const SIMULATION_SCENARIOS = [
  {
    id: 'SCENARIO-ZOJILA',
    name: 'Primary Route Disruption – Zojila Pass (NH-1D) Catastrophic Closure',
    type: 'Route Failure',
    icon: 'AlertTriangle',
    severity: 'CRITICAL',
    description: 'A 200-meter massive rockslide combined with an early blizzard completely blocks NH-1D at Captains Morh / Zojila. Border Roads Organisation (BRO) projects 10–14 days for clearance.',
    affectedRouteIds: ['ROUTE-02', 'ROUTE-03'],
    impactFactor: {
      routeClosureRate: 98,
      weatherDegradation: 85,
      demandSurgeMultiplier: 1.25,
      transportDelayDays: 11
    },
    projectedNodeImpact: [
      { nodeId: 'NODE-FW-04', initialRisk: 81.3, simulatedRisk: 99.4, daysToStockout: 0.9, delta: '+18.1%', criticalSupply: 'Class III (POL/Diesel)' },
      { nodeId: 'NODE-FW-03', initialRisk: 76.8, simulatedRisk: 96.2, daysToStockout: 1.6, delta: '+19.4%', criticalSupply: 'Class V (Ammunition)' },
      { nodeId: 'NODE-IN-01', initialRisk: 58.6, simulatedRisk: 86.4, daysToStockout: 4.2, delta: '+27.8%', criticalSupply: 'Class III (POL/Diesel)' }
    ],
    recommendedPlan: {
      title: 'Contingency Directive OPLAN RESILIENT AXIS-1',
      summary: 'Immediate dynamic rerouting of all heavy Class III and Class V convoys via Pathankot-Atal Tunnel-Shinku La axis, bypassing Srinagar-Zojila completely. Dispatch emergency helicopter resupply from Srinagar before blizzard peak.',
      actions: [
        'Divert 12x Tatra 8x8 convoys (48 KL Arctic Diesel + 800 crates ammo) to Southern Manali-Padum Corridor (ROUTE-05)',
        'Authorize 4x emergency Mi-17V5 supply sorties to Dras Post within next 06 hours window',
        'Release 30% strategic buffer from Leh Staging Hub to reverse-supply Kargil formation via Fotu La',
        'Issue priority clearance order to BRO Taskforce Beacon for snow-cutter deployment'
      ],
      mitigatedRiskScore: 28.5,
      riskReduction: '70.9% Risk Reduction',
      estimatedSavings: 'Zero stockout events averted across 3 forward garrisons'
    }
  },
  {
    id: 'SCENARIO-BLIZZARD',
    name: 'Extreme Sub-Zero Blizzard & Avalanche Advisory – Sector North',
    type: 'Severe Weather',
    icon: 'Snowflake',
    severity: 'CRITICAL',
    description: 'Western Disturbance triggers record -42°C freeze with 7 feet of snowfall across Khardung La and Shyok Valley. Ground transport halted and aviation whiteout declared.',
    affectedRouteIds: ['ROUTE-06', 'ROUTE-07', 'ROUTE-12'],
    impactFactor: {
      routeClosureRate: 95,
      weatherDegradation: 98,
      demandSurgeMultiplier: 1.85,
      transportDelayDays: 9
    },
    projectedNodeImpact: [
      { nodeId: 'NODE-FW-01', initialRisk: 89.4, simulatedRisk: 99.8, daysToStockout: 0.7, delta: '+10.4%', criticalSupply: 'Class III (Arctic Diesel)' },
      { nodeId: 'NODE-FW-02', initialRisk: 92.1, simulatedRisk: 99.9, daysToStockout: 0.5, delta: '+7.8%', criticalSupply: 'Class VIII (Medical Plasma)' },
      { nodeId: 'NODE-FW-05', initialRisk: 45.2, simulatedRisk: 78.6, daysToStockout: 3.2, delta: '+33.4%', criticalSupply: 'Class III (POL)' }
    ],
    recommendedPlan: {
      title: 'Contingency Directive OPLAN ARCTIC PRE-POSITION',
      summary: 'Execute emergency high-altitude CDS airdrop using IAF C-130J Super Hercules from Pathankot prior to storm envelope touchdown. Activate local snowmobile courier lines between Nubra and Glacier Base.',
      actions: [
        'Pre-position 25 KL Arctic Diesel in insulated bladders at Partapur intermediate staging base',
        'Task 2x IAF C-130J sorties for container delivery airdrop over DBO ALG before 050800Z',
        'Deploy mobile thermal heaters to keep fuel lines fluid at Siachen Base Camp',
        'Conserve power by switching forward surveillance sensors to automated low-drain mesh cycle'
      ],
      mitigatedRiskScore: 32.1,
      riskReduction: '67.8% Risk Reduction',
      estimatedSavings: 'Averts fuel freeze and frostbite medical evacuation crisis'
    }
  },
  {
    id: 'SCENARIO-DEMAND-SURGE',
    name: 'Sudden Tactical Readiness Escalation – 250% Munitions Surge',
    type: 'Demand Surge',
    icon: 'Zap',
    severity: 'HIGH',
    description: 'Heightened forward deployment order increases daily expenditure of 155mm Bofors shells, ATGM missiles, and emergency trauma resuscitation units by 250% in Eastern Ladakh.',
    affectedRouteIds: ['ROUTE-07', 'ROUTE-08', 'ROUTE-10'],
    impactFactor: {
      routeClosureRate: 20,
      weatherDegradation: 35,
      demandSurgeMultiplier: 2.50,
      transportDelayDays: 4
    },
    projectedNodeImpact: [
      { nodeId: 'NODE-FW-02', initialRisk: 92.1, simulatedRisk: 99.9, daysToStockout: 0.8, delta: '+7.8%', criticalSupply: 'Class V (Ammunition)' },
      { nodeId: 'NODE-FW-05', initialRisk: 45.2, simulatedRisk: 88.5, daysToStockout: 2.4, delta: '+43.3%', criticalSupply: 'Class V (Ammunition)' },
      { nodeId: 'NODE-FW-07', initialRisk: 38.6, simulatedRisk: 79.2, daysToStockout: 3.1, delta: '+40.6%', criticalSupply: 'Class VIII (Medical Plasma)' }
    ],
    recommendedPlan: {
      title: 'Contingency Directive OPLAN RAPID ARSENAL SURGE',
      summary: 'Initiate continuous double-crewed Tatra convoy express from Pathankot Strategic Railhead through Nyoma air hub. Deploy 2x Chinook CH-47 heavy-lift helicopters for direct external-sling ammo transport.',
      actions: [
        'Dispatch 1,800 crates 155mm M-982 precision shells from Pathankot directly to Nyoma ALG via heavy airlift',
        'Establish mobile ammunition transfer point at Loma Bend for rapid tactical re-supply to Chushul & Galwan',
        'Re-allocate 60 High-Altitude Trauma Packs from Udhampur Command Hospital to Forward Surgical Centres',
        'Implement automated dynamic consumption tracking with RFID pallet scanners at forward posts'
      ],
      mitigatedRiskScore: 24.2,
      riskReduction: '75.8% Risk Reduction',
      estimatedSavings: 'Guarantees 100% artillery combat readiness without depot exhaustion'
    }
  },
  {
    id: 'SCENARIO-BRIDGE-FAILURE',
    name: 'Strategic Route Severance – Shyok River KM-120 Bridge Collapse',
    type: 'Infrastructure Failure',
    icon: 'ShieldAlert',
    severity: 'HIGH',
    description: 'Flash mudslide damages bridge piers on D-S-DBO axis at KM-120, cutting the only all-weather road link to Daulat Beg Oldi and Sub-Sector North for wheeled heavy vehicles.',
    affectedRouteIds: ['ROUTE-07'],
    impactFactor: {
      routeClosureRate: 100,
      weatherDegradation: 40,
      demandSurgeMultiplier: 1.10,
      transportDelayDays: 14
    },
    projectedNodeImpact: [
      { nodeId: 'NODE-FW-02', initialRisk: 92.1, simulatedRisk: 100.0, daysToStockout: 0.4, delta: '+7.9%', criticalSupply: 'Class III & Class V' },
      { nodeId: 'NODE-FW-05', initialRisk: 45.2, simulatedRisk: 74.0, daysToStockout: 4.1, delta: '+28.8%', criticalSupply: 'Class III (POL)' }
    ],
    recommendedPlan: {
      title: 'Contingency Directive OPLAN BYPASS SSN-LIFELINE',
      summary: 'Task Indian Army Engineers (Bombay Sappers) for Rapid Bailey Bridge erection while instantly shifting critical resupply to Nyoma-based CH-47 Chinook underslung cargo flights.',
      actions: [
        'Mobilize 3x Chinook CH-47 sorties per day carrying 10-ton underslung container pallets directly to DBO',
        'Divert light 4x4 troop resupply via high-pass Sasser La winter bridle trail',
        'Deploy Army Engineer Plant Col 14 Corps with 120-ft pre-fabricated Bailey Bridge module',
        'Coordinate IAF C-130J rough-field landings during morning 0600–0900Z weather windows'
      ],
      mitigatedRiskScore: 29.8,
      riskReduction: '70.2% Risk Reduction',
      estimatedSavings: 'Maintains DBO garrison operational baseline throughout 14-day bridge repair'
    }
  }
];

export const INITIAL_RECOMMENDATIONS = [
  {
    id: 'REC-2026-0891',
    urgency: 'IMMEDIATE', // IMMEDIATE, NEXT_24H, CONTINGENCY
    status: 'PENDING_APPROVAL', // PENDING_APPROVAL, APPROVED, REJECTED, MODIFIED
    confidence: 96.4,
    headline: 'Emergency Pre-Positioning: Arctic Diesel (Class III) to Siachen Base Camp',
    what: 'Pre-position 42,000 Litres (42 KL) High Pour Point Arctic-Grade Diesel (HPD) in insulated collapsible bladders',
    where: 'Origin: Leh Staging Hub (NODE-IN-01) ➔ Destination: Siachen Base Camp (NODE-FW-01)',
    howMuch: '6x Tatra 8x8 All-Terrain High Mobility Tankers + 2x Mi-17V5 underslung bladder sorties',
    when: 'Immediate execution window: 050400Z OCT to 051100Z OCT (Must cross Khardung La before 1200Z blizzard onset)',
    why: 'Current stock depleted to 2.8 days reserve (110 KL vs 250 KL safe min). Khardung La pass has 88% probability of severe blizzard closure in 18 hours. Sub-zero temperatures (-34°C) will freeze unheated water systems within 48 hours without continuous generator diesel.',
    explainableFactors: [
      { name: 'Khardung La Pass Closure Probability', value: 88, weightPercentage: 42, trend: 'Increasing' },
      { name: 'Sub-Zero Consumption Burn Multiplier (-34°C)', value: 145, weightPercentage: 28, trend: 'Critical' },
      { name: 'Stockout Lead-Time Buffer Exhaustion', value: 92, weightPercentage: 18, trend: 'Exhausted' },
      { name: 'IAF Rotary Flight Window Availability', value: 35, weightPercentage: 12, trend: 'Narrowing' }
    ],
    impactSummary: {
      initialStockoutRisk: 89.4,
      postApprovalStockoutRisk: 14.8,
      daysSaved: 22.0,
      readinessGain: '+38% Garrison Resilience'
    },
    suggestedBy: 'Logistics Disruption Prediction Engine (Model: XGBoost-Himalaya-V4.2)',
    auditRef: 'SHA256:7e8a9f...31c2'
  },
  {
    id: 'REC-2026-0892',
    urgency: 'IMMEDIATE',
    status: 'PENDING_APPROVAL',
    confidence: 94.8,
    headline: 'Pre-Emptive Airlift: 155mm Precision Munitions to Daulat Beg Oldi (DBO)',
    what: 'Dispatch 480 Rounds 155mm Extended Range Full Bore (ERFB) Artillery Shells + 120 Hyperbaric Trauma Plasma Kits',
    where: 'Origin: Pathankot Central Railhead (NODE-CP-01) via Nyoma ALG ➔ Destination: DBO Outpost (NODE-FW-02)',
    howMuch: '2x IAF C-130J Super Hercules sorties configured for Container Delivery System (CDS) airdrop / short-field landing',
    when: 'Execution slot: 050530Z OCT (First light morning inversion window before high-altitude crosswinds peak)',
    why: 'Shyok River road bridge at KM-120 has 94% probability of mudslide cutoff. DBO ammunition reserve is at 2.1 days of baseline consumption. Ground convoys will take 48+ hours and cannot negotiate washed-out culverts.',
    explainableFactors: [
      { name: 'D-S-DBO Road Washout Probability', value: 94, weightPercentage: 45, trend: 'Critical' },
      { name: 'Forward Ammo Reserve Deficit (<2.5 Days)', value: 91, weightPercentage: 30, trend: 'Severe' },
      { name: 'Crosswind Gust Forecast on DBO Airstrip', value: 38, weightPercentage: 15, trend: 'Approaching limit' },
      { name: 'Airframe Payload Optimization Index', value: 85, weightPercentage: 10, trend: 'Favourable' }
    ],
    impactSummary: {
      initialStockoutRisk: 92.1,
      postApprovalStockoutRisk: 16.2,
      daysSaved: 18.5,
      readinessGain: '+44% Forward Defense Posture'
    },
    suggestedBy: 'Adaptive Pre-Positioning Engine (Model: Multi-Objective LP-V2)',
    auditRef: 'SHA256:3a1b4c...9f88'
  },
  {
    id: 'REC-2026-0893',
    urgency: 'NEXT_24H',
    status: 'PENDING_APPROVAL',
    confidence: 91.2,
    headline: 'Dynamic Reroute: Divert 18 Convoy Units via Manali-Shinku La Axis to Leh',
    what: 'Reroute 18 heavy logistics trucks carrying Class I rations and Class V ammunition from NH-1D to Southern Shinku La corridor',
    where: 'Reroute from: Srinagar-Zojila Axis (ROUTE-02) ➔ Shifted to: Pathankot-Atal Tunnel-Shinku La Axis (ROUTE-05)',
    howMuch: '18x Ashok Leyland Stallion 4x4 & Tatra 8x8 heavy freight transport vehicles',
    when: 'Initiate reroute directive before 051600Z OCT at Jammu staging junction',
    why: 'Zojila Pass NH-1D has 92% predicted closure in 18 hours due to blizzard. Convoy traversing NH-1D faces 84% chance of being stranded at Gumri for 7–10 days. Shinku La axis is protected by new tunnels and has 88% operational safety rating.',
    explainableFactors: [
      { name: 'Zojila Pass Avalanche Hazard Index', value: 92, weightPercentage: 48, trend: 'Rising' },
      { name: 'Alternative Route Transit Time Delta (+6 hrs vs 7 days blockage)', value: 85, weightPercentage: 28, trend: 'Optimal' },
      { name: 'Vehicle Breakdown Vulnerability in Sub-Zero Freeze', value: 74, weightPercentage: 14, trend: 'Mitigated' },
      { name: 'Snow Clearance Equipment Readiness on Manali Axis', value: 90, weightPercentage: 10, trend: 'High' }
    ],
    impactSummary: {
      initialStockoutRisk: 76.8,
      postApprovalStockoutRisk: 22.4,
      daysSaved: 9.0,
      readinessGain: '+31% Corridor Resilience'
    },
    suggestedBy: 'Dynamic Routing & Resilience Optimizer',
    auditRef: 'SHA256:8b4c2e...11dd'
  },
  {
    id: 'REC-2026-0894',
    urgency: 'CONTINGENCY',
    status: 'PENDING_APPROVAL',
    confidence: 88.5,
    headline: 'Cold Weather Gear (Class II) Reinforcement for Dras Sub-Sector Post',
    what: 'Forward position 600 sets Extreme Cold Weather Clothing System (ECWCS) + 120 Bukharis (Kerosene Room Heaters)',
    where: 'Origin: Srinagar Transit Staging (NODE-IN-02) ➔ Destination: Dras Post (NODE-FW-04)',
    howMuch: '4x Medium Mobility 4x4 Vehicles with snow-chains',
    when: 'Dispatch within next 36 hours before night temperatures drop below -30°C',
    why: 'Forecast temperature plunge to -32°C in Dras sector. Existing clothing sets at forward pickets are operating at 85% capacity with emergency reserves depleted. High risk of non-battle cold injury casualties without buffer.',
    explainableFactors: [
      { name: 'Wind Chill Equivalent Forecast (-41°C)', value: 88, weightPercentage: 40, trend: 'Severe' },
      { name: 'Forward Picket Reserve Depletion', value: 78, weightPercentage: 35, trend: 'High' },
      { name: 'Medical Evacuation Difficulty in Whiteout', value: 82, weightPercentage: 25, trend: 'Critical' }
    ],
    impactSummary: {
      initialStockoutRisk: 81.3,
      postApprovalStockoutRisk: 29.0,
      daysSaved: 14.0,
      readinessGain: '+25% Troop Survivability'
    },
    suggestedBy: 'Cold Wave Medical Vulnerability Predictor',
    auditRef: 'SHA256:9f1a2b...55aa'
  }
];

export const INITIAL_AUDIT_LOGS = [
  {
    id: 'LOG-2026-9041',
    timestamp: '2026-10-04T18:45:12Z',
    istTimestamp: '04 OCT 2026 23:45 IST',
    officer: 'Col. Vikram Rathore, SM',
    role: 'Logistics Officer (14 Corps)',
    action: 'APPROVED_AND_DISPATCHED',
    directiveId: 'DIR-2026-0418',
    itemSummary: 'Dispatched 30 KL Arctic Fuel via Tatra Convoy Bravo-4 to Kargil Depot',
    origin: 'Leh Staging Hub',
    destination: 'Kargil Forward Base',
    blockHash: '0x8f2d9c1b74a382e01f66d4a5b98c2134e790a1b2c3d4e5f6a7b8c9d0e1f2a3b4',
    previousHash: '0x4a1e9b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0',
    verificationStatus: 'VERIFIED_TAMPER_EVIDENT',
    syncStatus: 'COMMITTED_TO_SECURE_LEDGER'
  },
  {
    id: 'LOG-2026-9040',
    timestamp: '2026-10-04T16:12:05Z',
    istTimestamp: '04 OCT 2026 21:12 IST',
    officer: 'Brig. S. K. Rawat, VSM',
    role: 'Command Reviewer',
    action: 'SIMULATION_EXECUTED',
    directiveId: 'SIM-ZOJILA-PASS-09',
    itemSummary: 'Ran What-If Multi-Factor Stress Test: Zojila Pass 14-day Landslide Disruption',
    origin: 'Northern Command HQ',
    destination: 'All 14 Corps Formations',
    blockHash: '0x4a1e9b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0',
    previousHash: '0x1c8b3a7d9e0f2a4b6c8d0e2f4a6b8c0d2e4f6a8b0c2d4e6f8a0b2c4d6e8f0a2',
    verificationStatus: 'VERIFIED_TAMPER_EVIDENT',
    syncStatus: 'COMMITTED_TO_SECURE_LEDGER'
  },
  {
    id: 'LOG-2026-9039',
    timestamp: '2026-10-04T13:30:44Z',
    istTimestamp: '04 OCT 2026 19:00 IST',
    officer: 'Maj. Gen. Rajiv Sharma, AVSM',
    role: 'Admin / Theatre Commander',
    action: 'POLICY_OVERRIDE',
    directiveId: 'POL-OVR-003',
    itemSummary: 'Elevated Theatre Fuel Safety Reserve Threshold from 15 Days to 25 Days due to early snowfall alert',
    origin: 'Udhampur HQ Core',
    destination: 'Northern Command Forward Depots',
    blockHash: '0x1c8b3a7d9e0f2a4b6c8d0e2f4a6b8c0d2e4f6a8b0c2d4e6f8a0b2c4d6e8f0a2',
    previousHash: '0x99a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a',
    verificationStatus: 'VERIFIED_TAMPER_EVIDENT',
    syncStatus: 'COMMITTED_TO_SECURE_LEDGER'
  }
];

export const MOCK_OFFLINE_SYNC_QUEUE = [
  { id: 'SYNC-01', type: 'LOCAL_INVENTORY_UPDATE', target: 'NODE-FW-01', payload: 'Diesel burn rate adjusted to 38 KL/day', queuedAt: '04 OCT 19:42 IST', status: 'PENDING_MESH_SYNC' },
  { id: 'SYNC-02', type: 'WAYPOINT_PASS_REPORT', target: 'ROUTE-06', payload: 'North Pullu snow drift depth measured at 3.4 ft', queuedAt: '04 OCT 20:05 IST', status: 'PENDING_MESH_SYNC' }
];
