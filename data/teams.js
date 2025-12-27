export const teams = {
  team1: {
    id: 'team1',
    name: '🔴 Red Team',
    color: '#EF4444',
    members: ["4dm", "Melody", "Alexis (Second March)", "Coorslightkiller", "Gomu Gomu", "龜苓膏大盤商"],
    path: [
      { fort: 'S1', order: 1 },
      { fort: 'S9', order: 2 },
      { fort: 'S13', order: 3 },
      { fort: 'S19', order: 4 },
    ],
    instructions: [
      '🎯 Phase 1: Secure S1 with 2 marches',
      '⚔️ Push to S9 (critical 60k oil/min)',
      '🛡️ Defend S13 - your bridge position',
      '🌉 Cross north bridge to enemy territory',
      '💥 Assault S19 and push toward Citadel',
      '👑 Capture and hold the central Citadel',
      '📍 Always keep a garrison behind attacking march'
    ]
  },
  team2: {
    id: 'team2',
    name: '🔵 Blue Team',
    color: '#3B82F6',
    members: ["Success", "Budimanjojo", "Fatin", "Tyga", "Nani"],
    path: [
      { fort: 'S1', order: 1 },
      { fort: 'S9', order: 2 },
      { fort: 'S13', order: 3 },
      { fort: 'S20', order: 4 },
      { fort: 'S24', order: 5 },
      { fort: 'S28', order: 6 },
    ],
    instructions: [
      '🛡️ Hold S19 as primary defense line',
      '🔒 Secure S24 (high reward zone)',
      '⛓️ Control S30 - your bridge defense',
      '🌉 Guard north bridge from enemy crossings',
      '🏰 Defend S9 - your secondary stronghold',
      '📣 Call for backup if attacked',
      '⏰ Rotate garrisons every 3-4 minutes'
    ]
  },
  team3: {
    id: 'team3',
    name: '💚 Green Team',
    color: '#10B981',
    members: ["Gunner23", "Donnerfisch", "Vorin", "Adib", "Noahhh"],
    path: [
      { fort: 'S1', order: 1 },
      { fort: 'S9', order: 2 },
      { fort: 'S21', order: 3 },
      { fort: 'S29', order: 4 },
    ],
    instructions: [
      '🎯 Secure S13 early',
      '⚔️ Push through S21 toward center',
      '🌉 Cross central bridge',
      '💪 Support Red Team in I14 capture',
      '👑 Assist in Citadel conquest',
      '🔄 Pivot to help Red or Blue as needed',
      '⚡ Use speed-ups on critical objectives'
    ]
  },
  team4: {
    id: 'team4',
    name: '⭐ Yellow Team',
    color: '#F59E0B',
    members: ["Alexis", "Tang", "Abu Hatem", "Putri badai"],
    path: [
        { fort: 'S1', order: 1 },
        { fort: 'S3', order: 2 },
        { fort: 'S11', order: 3 },
        { fort: 'S16', order: 4 },
        { fort: 'S23', order: 5 },
        { fort: 'S27', order: 6 },
    ],
    instructions: []
  },
  team5: {
    id: 'team5',
    name: '💜 Purple Team',
    color: '#8B5CF6',
    members: ["Blue", "Patrick", "y usb eye", "Farmsheep", "我是莊兮兮"],
    path: [
         { fort: 'S1', order: 1 },
        { fort: 'S4', order: 2 },
        { fort: 'S12', order: 3 },
        { fort: 'S18', order: 4 },
    ],
    instructions: []
  },
  team6: {
    id: 'team6',
    name: '💗 Pink Team',
    color: '#EC4899',
    members: ["Uncle", "Gohan", "M_J", "Queenie", '我是莊CC'],
    path: [
        { fort: 'S1', order: 1 },
        { fort: 'S3', order: 2 },
        { fort: 'S10', order: 3 },
        { fort: 'S15', order: 4 },
        { fort: 'S26', order: 5 },
    ],
    instructions: []
  }
};