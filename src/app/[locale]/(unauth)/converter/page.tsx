import { redirect } from 'next/navigation';

export default function ConverterPage() {
  // Redirect to a default conversion type (e.g., "length").
  redirect('/converter/length');
}
