'use client';
import React, { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// Using shadcn UI components for styling and layout
import { Input } from '@/components/ui/input';
import { conversionFunctions } from '@/lib/converter/conversions';

export type ConverterCalculatorProps = {
  conversionType: string;
  initialVal: number;
  initialFromUnit?: string;
  initialToUnit?: string;
};

// Define sample unit options for each conversion type
const unitOptions: Record<keyof typeof conversionFunctions, string[]> = {
  length: ['meter', 'centimeter', 'kilometer'],
  temperature: ['celsius', 'fahrenheit', 'kelvin'],
  area: [],
  volume: [],
  weight: [],
  time: [],
};

export function ConverterCalculator({
  conversionType,
  initialVal,
  initialFromUnit,
  initialToUnit,
}: ConverterCalculatorProps) {
  // Get unit options for the conversion type.
  const safeUnits = unitOptions[conversionType as keyof typeof conversionFunctions]!;

  // Derive default values, ensuring we fall back to an empty string if no valid unit is available.
  const defaultFromUnit = initialFromUnit ?? safeUnits[0] ?? '';
  const defaultToUnit
    = initialToUnit ?? (safeUnits[1] ?? safeUnits[0] ?? '');

  // Local state for input values
  const [value, setValue] = useState(initialVal);
  const [fromUnit, setFromUnit] = useState(defaultFromUnit);
  const [toUnit, setToUnit] = useState(defaultToUnit);
  const [result, setResult] = useState<number | null>(null);

  useEffect(() => {
    try {
      // Guard clause: if fromUnit or toUnit is empty, skip conversion
      if (!fromUnit || !toUnit) {
        return;
      }
      // Safely retrieve the conversion function and check it's defined.
      const conversionFn = conversionFunctions[conversionType as keyof typeof conversionFunctions];
      if (!conversionFn) {
        console.error(
          `No conversion function available for conversion type: ${conversionType}`,
        );
        setResult(null);
        return;
      }
      const convertedValue = conversionFn(value, fromUnit, toUnit);
      setResult(convertedValue);
    } catch (error) {
      console.error('Conversion error:', error);
      setResult(null);
    }
  }, [value, fromUnit, toUnit, conversionType]);

  // Handler for conversion (to be implemented with actual logic)
  const handleConvert = () => {
    console.log(`Converting ${value} from ${fromUnit} to ${toUnit} for ${conversionType}`);
  };

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="text-xl font-bold">
          {conversionType}
          {' '}
          Conversion
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Input for numerical value */}
          <div>
            <label htmlFor="value" className="block text-sm font-medium">Value</label>
            <Input
              id="value"
              type="number"
              value={value}
              onChange={e => setValue(Number(e.target.value))}
              placeholder="Enter value"
              className="mt-1"
            />
          </div>
          {/* Inputs for units */}
          <div className="flex flex-col sm:flex-row sm:space-x-4">
            <div className="flex-1">
              <label htmlFor="fromUnit" className="block text-sm font-medium">From Unit</label>
              <Input
                id="fromUnit"
                type="text"
                value={fromUnit}
                onChange={e => setFromUnit(e.target.value)}
                placeholder="e.g. meters"
                className="mt-1"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="toUnit" className="block text-sm font-medium">To Unit</label>
              <Input
                id="toUnit"
                type="text"
                value={toUnit}
                onChange={e => setToUnit(e.target.value)}
                placeholder="e.g. feet"
                className="mt-1"
              />
            </div>
          </div>
          <Button onClick={handleConvert} className="w-full">
            Convert
          </Button>
        </div>
        <div className="mt-4">
          <span className="font-semibold">Result: </span>
          {result !== null ? result : 'Error in conversion'}
        </div>
      </CardContent>
    </Card>
  );
}
