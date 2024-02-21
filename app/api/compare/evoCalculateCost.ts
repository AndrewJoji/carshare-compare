import {GST_RATE, PST_RATE, EVO_HOUR_RATE, EVO_DAY_RATE, EVO_MINUTE_RATE, EVO_BASE} from './constants';


export function calculate_evo_cost(duration_minutes: number): Record<string, number> {

  let time_charge: number;
  if (duration_minutes <= 36) {
    time_charge = duration_minutes * EVO_MINUTE_RATE;
  } else if (duration_minutes <= 60) {
    time_charge = EVO_HOUR_RATE;
  } else if (duration_minutes <= 360) {
    let hours = Math.floor(duration_minutes / 60);
    let remaining_minutes = duration_minutes % 60;
    time_charge = hours * EVO_HOUR_RATE + remaining_minutes * EVO_MINUTE_RATE;
  } else {
    let hours = Math.floor(duration_minutes / 60);
    if (hours < 24) {
      time_charge = EVO_DAY_RATE;
    } else {
      let days = Math.floor(duration_minutes / (24 * 60));
      let remaining_minutes_after_days = duration_minutes % (24 * 60);
      hours = Math.floor(remaining_minutes_after_days / 60);
      let minutes = remaining_minutes_after_days % 60;
      if (minutes <= 36) {
        time_charge = days * EVO_DAY_RATE + hours * EVO_HOUR_RATE + minutes * EVO_MINUTE_RATE;
      } else {
        hours += 1;
        time_charge = days * EVO_DAY_RATE + hours * EVO_HOUR_RATE;
      }
    }
  }

  let total_cost = EVO_BASE + time_charge;
  let tax = total_cost * (GST_RATE + PST_RATE);
  let final_cost = total_cost + tax;

  return {
    base: Math.round(EVO_BASE * 100) / 100,
    time_charge: Math.round(time_charge * 100) / 100,
    tax: Math.round(tax * 100) / 100,
    total_cost: Math.round(final_cost * 100) / 100,
  };
}