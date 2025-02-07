import type { Metadata } from 'next';
import React from 'react';

import { ConverterCalculator } from '@/app/[locale]/(unauth)/converter/[conversionType]/_components/converter-calculator';
import { ConverterSidebar } from '@/app/[locale]/(unauth)/converter/[conversionType]/_components/converter-sidebar';
import { ConverterTabs } from '@/app/[locale]/(unauth)/converter/[conversionType]/_components/converter-tabs';

export async function generateMetadata({
  params,
}: {
  params: { conversionType: string };
}): Promise<Metadata> {
  const title = `${params.conversionType.charAt(0).toUpperCase()}${params.conversionType.slice(1)} Conversion`;
  return {
    title,
    description: `Perform ${params.conversionType} conversions quickly and easily.`,
  };
}

export default function ConversionPage({
  params,
  searchParams,
}: {
  params: { conversionType: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const conversionType = params.conversionType;

  let initialVal = 0;
  let initialFromUnit: string | undefined;
  let initialToUnit: string | undefined;

  if (searchParams.val) {
    const valStr = Array.isArray(searchParams.val) ? searchParams.val[0] : searchParams.val;
    if (valStr) {
      const parsed = Number.parseFloat(valStr);
      if (!Number.isNaN(parsed)) {
        initialVal = parsed;
      }
    }
  }

  if (searchParams.units) {
    const unitsStr = Array.isArray(searchParams.units)
      ? searchParams.units[0]
      : searchParams.units;
    if (unitsStr) {
      const [from, to] = unitsStr.split(':');
      if (from && to) {
        initialFromUnit = from;
        initialToUnit = to;
      }
    }
  }

  return (
    <div className="container mx-auto max-w-screen-lg p-4">
      <div className="flex flex-col md:flex-row">
        <div className="flex-1">
          <ConverterTabs currentType={conversionType} />
          <ConverterCalculator
            conversionType={conversionType}
            initialVal={initialVal}
            initialFromUnit={initialFromUnit}
            initialToUnit={initialToUnit}
          />
        </div>
        <div className="mt-4 w-full md:ml-4 md:mt-0 md:w-1/3">
          <ConverterSidebar />
        </div>
      </div>
    </div>
  );
}
