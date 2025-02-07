// This file contains conversion functions for various conversion types.
// For demonstration purposes, we implement length, temperature, area, volume, weight, and time conversions.

// Interface representing a conversion function.
export type ConversionFunction = {
  (value: number, from: string, to: string): number;
};

// ===== Length Conversion =====
// Conversion rates for length units (base: meter).
const lengthConversionRates: Record<string, number> = {
  meter: 1,
  centimeter: 0.01,
  kilometer: 1000,
  // Additional units can be added here.
};

// Converts a length value between units.
export function convertLength(value: number, from: string, to: string): number {
  const fromRate = lengthConversionRates[from];
  const toRate = lengthConversionRates[to];

  if (!fromRate || !toRate) {
    throw new Error(`Invalid length units: ${from} or ${to}`);
  }

  // Convert value to base unit (meter) then to the target unit.
  return (value * fromRate) / toRate;
}

// ===== Temperature Conversion =====
// Converts a temperature value between units.
export function convertTemperature(value: number, from: string, to: string): number {
  if (from === to) {
    return value;
  }

  // Convert from Celsius.
  if (from === 'celsius') {
    if (to === 'fahrenheit') {
      return (value * 9) / 5 + 32;
    } else if (to === 'kelvin') {
      return value + 273.15;
    }
  } else if (from === 'fahrenheit') {
    // Convert from Fahrenheit.
    if (to === 'celsius') {
      return ((value - 32) * 5) / 9;
    } else if (to === 'kelvin') {
      return ((value - 32) * 5) / 9 + 273.15;
    }
  } else if (from === 'kelvin') {
    // Convert from Kelvin.
    if (to === 'celsius') {
      return value - 273.15;
    } else if (to === 'fahrenheit') {
      return ((value - 273.15) * 9) / 5 + 32;
    }
  }

  throw new Error(`Conversion not implemented for ${from} to ${to}`);
}

// ===== Area Conversion =====
// Conversion rates for area units (base: square meter).
const areaConversionRates: Record<string, number> = {
  sqm: 1, // square meter
  sqcm: 0.0001, // square centimeter (1 cm² = 1e-4 m²)
  sqkm: 1e6, // square kilometer (1 km² = 1e6 m²)
  sqft: 0.092903, // square foot
  acre: 4046.86, // acre
};

// Converts an area value between units.
export function convertArea(value: number, from: string, to: string): number {
  const fromRate = areaConversionRates[from];
  const toRate = areaConversionRates[to];

  if (fromRate === undefined || toRate === undefined) {
    throw new Error(`Invalid area units: ${from} or ${to}`);
  }

  // Convert value to base unit (sqm) then to the target unit.
  return (value * fromRate) / toRate;
}

// ===== Volume Conversion =====
// Conversion rates for volume units (base: cubic meter).
const volumeConversionRates: Record<string, number> = {
  m3: 1, // cubic meter
  l: 0.001, // liter (1 L = 0.001 m³)
  ml: 1e-6, // milliliter
  ft3: 0.0283168, // cubic foot
  gallon: 0.00378541, // US gallon
};

// Converts a volume value between units.
export function convertVolume(value: number, from: string, to: string): number {
  const fromRate = volumeConversionRates[from];
  const toRate = volumeConversionRates[to];

  if (fromRate === undefined || toRate === undefined) {
    throw new Error(`Invalid volume units: ${from} or ${to}`);
  }

  // Convert value to base unit (m³) then to the target unit.
  return (value * fromRate) / toRate;
}

// ===== Weight Conversion =====
// Conversion rates for weight units (base: kilogram).
const weightConversionRates: Record<string, number> = {
  kg: 1,
  g: 0.001, // gram
  lb: 0.453592, // pound
  oz: 0.0283495, // ounce
};

// Converts a weight value between units.
export function convertWeight(value: number, from: string, to: string): number {
  const fromRate = weightConversionRates[from];
  const toRate = weightConversionRates[to];

  if (fromRate === undefined || toRate === undefined) {
    throw new Error(`Invalid weight units: ${from} or ${to}`);
  }

  // Convert value to base unit (kg) then to the target unit.
  return (value * fromRate) / toRate;
}

// ===== Time Conversion =====
// Conversion rates for time units (base: second).
const timeConversionRates: Record<string, number> = {
  sec: 1,
  min: 60,
  hr: 3600,
  day: 86400,
};

// Converts a time value between units.
export function convertTime(value: number, from: string, to: string): number {
  const fromRate = timeConversionRates[from];
  const toRate = timeConversionRates[to];

  if (fromRate === undefined || toRate === undefined) {
    throw new Error(`Invalid time units: ${from} or ${to}`);
  }

  // Convert value to base unit (seconds) then to the target unit.
  return (value * fromRate) / toRate;
}

// Export a map to select conversion functions dynamically.
export const conversionFunctions: Record<string, ConversionFunction> = {
  length: convertLength,
  temperature: convertTemperature,
  area: convertArea,
  volume: convertVolume,
  weight: convertWeight,
  time: convertTime,
};
