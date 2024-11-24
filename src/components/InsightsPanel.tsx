import { AlertTriangle, TrendingUp, Zap } from 'lucide-react';
import { Insight } from '../types';

const InsightIcon = ({ type }: { type: Insight['type'] }) => {
  switch (type) {
    case 'term':
      return <TrendingUp className="h-4 w-4 text-emerald-500" />;
    case 'sentiment':
      return <Zap className="h-4 w-4 text-amber-500" />;
    case 'alert':
      return <AlertTriangle className="h-4 w-4 text-red-500" />;
  }
};

export default function InsightsPanel({ insights }: { insights: Insight[] }) {
  return (
    <div className="border-b border-slate-700 pb-4 mb-4">
      <h2 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-3">
        Active Alerts
      </h2>
      <div className="space-y-2">
        {insights.map((insight) => (
          <div
            key={insight.id}
            className="flex items-start space-x-2 p-2 rounded bg-slate-700/50"
          >
            <InsightIcon type={insight.type} />
            <p className="text-xs leading-tight text-slate-200">{insight.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}