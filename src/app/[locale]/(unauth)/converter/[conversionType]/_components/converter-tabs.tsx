'use client';
import Link from 'next/link';
import React from 'react';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const conversionTypes = ['length', 'temperature', 'area', 'volume', 'weight', 'time'];

type ConverterTabsProps = {
  currentType: string;
};

export function ConverterTabs({ currentType }: ConverterTabsProps) {
  return (
    <Tabs defaultValue={currentType} className="mb-4">
      <TabsList className="w-full">
        {conversionTypes.map(type => (
          <TabsTrigger
            key={type}
            value={type}
            asChild
          >
            <Link href={`/converter/${type}`}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Link>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
