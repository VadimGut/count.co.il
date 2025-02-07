'use client';
import React from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function ConverterSidebar() {
  // A sidebar with static conversion tips
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-bold">Conversion Tips</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-sm">
          • Double-check your units before converting.
        </p>
        <p className="text-sm">
          • Use decimals for precise measurements.
        </p>
        <p className="text-sm">
          • Validate your input for better accuracy.
        </p>
      </CardContent>
    </Card>
  );
}
