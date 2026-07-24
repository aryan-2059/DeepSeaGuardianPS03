// Derives a UI risk bucket from NOAA Coral Reef Watch's Bleaching Alert Area (baa) scale:
// 0 = No Stress, 1 = Watch, 2 = Warning, 3 = Alert Level 1, 4 = Alert Level 2
export function getRiskLevel(baa) {
  if (baa >= 4) return "critical";
  if (baa === 3) return "high";
  if (baa === 2) return "watch";
  return "low";
}
