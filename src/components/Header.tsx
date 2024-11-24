import { Radio } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-slate-900 text-white p-4 shadow-lg">
      <div className="container mx-auto flex items-center">
        <div className="flex items-center space-x-3">
          <Radio className="h-8 w-8 text-green-400" />
          <h1 className="text-2xl font-bold tracking-tight">Intercept Dashboard</h1>
        </div>
      </div>
    </header>
  );
}