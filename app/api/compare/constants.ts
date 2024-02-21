import { ModoClass } from "./modoCalculateCost";

export const GST_RATE = 0.05;
export const PST_RATE = 0.07;

// EVO Constants
export const EVO_BASE = 1.25;
export const EVO_MINUTE_RATE = 0.49;
export const EVO_HOUR_RATE = 17.99;
export const EVO_DAY_RATE = 104.99;

// Modo Constants
// https://www.modo.coop/faqs/how-much-is-the-current-fuel-surcharge
export const CURRENT_FUEL_SURCHARGE = 0.00091;
export const BASELINE_GAS_PRICE = 1.6;
export const SURCHARGE_INCREMENT = 0.01;
export const PRICE_INCREMENT = 0.1;
export const OPEN_RETURN_FEE = 3;

// Day Tripper https://www.modo.coop/faqs/whats-the-day-tripper
export const Plus_Daily_Drives = new ModoClass(
  "plus_daily_drives",
  1.5,
  4,
  0.4,
  0.28,
  90,
  250,
);
export const Plus_Large_Loadable = new ModoClass(
  "plus_large_loadable",
  1.5,
  Plus_Daily_Drives.time_charge_rate + 2,
  0.4,
  0.28,
  125,
  250,
);

export const Monthly_Daily_Drives = new ModoClass(
  "monthly_daily_drives",
  1.5,
  5,
  0.4,
  0.28,
  99,
  250,
);
export const Monthly_Large_Loadable = new ModoClass(
  "monthly_large_loadable",
  1.5,
  Monthly_Daily_Drives.time_charge_rate + 2,
  0.4,
  0.28,
  135,
  250,
);

// No Day Tripper Rate for Oversized
export const Plus_Oversized = new ModoClass(
  "plus_oversized",
  1.5,
  Plus_Daily_Drives.time_charge_rate + 5,
  0.4,
  0.28,
  -1,
  -1,
);
export const Monthly_Oversized = new ModoClass(
  "monthly_oversized",
  1.5,
  Monthly_Daily_Drives.time_charge_rate + 5,
  0.4,
  0.28,
  -1,
  -1,
);
