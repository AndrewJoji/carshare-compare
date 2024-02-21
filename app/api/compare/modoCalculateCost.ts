import {
  BASELINE_GAS_PRICE,
  CURRENT_FUEL_SURCHARGE,
  GST_RATE,
  PRICE_INCREMENT,
  PST_RATE,
  SURCHARGE_INCREMENT,
} from "./constants";
import { Trip } from "./trip";

export class ModoClass {
  name: string;
  base: number;
  time_charge_rate: number;
  distance_charge_rate: number;
  distance_charge_rate_after_25: number;
  day_tripper_rate: number;
  day_tripper_distance_included: number;

  constructor(
    name: string,
    base: number,
    time_charge_rate: number,
    distance_charge_rate: number,
    distance_charge_rate_after_25: number,
    day_tripper_rate: number,
    day_tripper_distance_included: number,
  ) {
    this.name = name;
    this.base = base;
    this.time_charge_rate = time_charge_rate;
    this.distance_charge_rate = distance_charge_rate;
    this.distance_charge_rate_after_25 = distance_charge_rate_after_25;
    this.day_tripper_rate = day_tripper_rate;
    this.day_tripper_distance_included = day_tripper_distance_included;
  }
}

export function calculate_fuel_surcharge(current_gas_price: number): number {
  let price_difference = current_gas_price - BASELINE_GAS_PRICE;
  if (price_difference <= 0) {
    return 0.0;
  }

  let increments = Math.floor(price_difference / PRICE_INCREMENT);
  return increments * SURCHARGE_INCREMENT;
}

export function calculateDistanceCharge(
  distance: number,
  rate1: number,
  rate2: number,
): number {
  const surcharge: number = CURRENT_FUEL_SURCHARGE * distance;
  let tempCharge: number;

  if (distance > 25) {
    tempCharge = 25 * rate1;
    const remainingDist: number = distance - 25;
    tempCharge += remainingDist * rate2;
    return tempCharge + surcharge;
  } else {
    return distance * rate1 + surcharge;
  }
}

export function calculateModoCost(
  trip: Trip,
  modo: ModoClass,
  currentGasPrice: number,
): Record<string, number> {
  // // Calculate the fuel surcharge based on current gas price
  // const fuelSurcharge = calculate_fuel_surcharge(currentGasPrice);

  const start_date_time = trip.start_date_time;
  const end_date_time = trip.end_date_time;

  const durationMinutes =
    (end_date_time.getTime() - start_date_time.getTime()) / 60000;

  const hours = Math.floor(durationMinutes / 60);
  const days = Math.floor(hours / 24);
  const remainingHours = hours % 24;
  const remainingMinutes = hours % 12;

  let timeCharge: number = 0;
  //  TODO timeCharge logic

  //  TODO distance from Maps API
  const distance = 0;
  const distanceCharge = calculateDistanceCharge(
    distance,
    modo.distance_charge_rate,
    modo.distance_charge_rate_after_25,
  );

  const totalCost = modo.base + timeCharge + distanceCharge;
  const tax = totalCost * (GST_RATE + PST_RATE);
  const finalCost = totalCost + tax;

  return {
    base: parseFloat(modo.base.toFixed(2)),
    time_charge: parseFloat(timeCharge.toFixed(2)),
    distance_charge: parseFloat(distanceCharge.toFixed(2)),
    tax: parseFloat(tax.toFixed(2)),
    total_cost: parseFloat(finalCost.toFixed(2)),
  };
}
