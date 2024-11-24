import { Radio } from 'lucide-react';
import { AudioFeed } from '../types';

interface AudioFeedSelectorProps {
  feeds: AudioFeed[];
  onFeedSelect: (feedId: string) => void;
  selectedFeedId: string | null;
}

function PriorityBadge({ priority }: { priority: 'high' | 'medium' | 'low' }) {
  if (priority !== 'high') return null;
  
  return (
    <span className="px-2 py-0.5 text-xs font-medium bg-red-100 text-red-700 rounded-full border border-red-200">
      HIGH
    </span>
  );
}

export default function AudioFeedSelector({ feeds, onFeedSelect, selectedFeedId }: AudioFeedSelectorProps) {
  return (
    <div>
      <h2 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-3">
        Active Feeds
      </h2>
      <div className="space-y-2">
        {feeds.map((feed) => {
          const isSelected = selectedFeedId === feed.id;
          const isHighPriority = feed.priority === 'high';
          
          return (
            <button
              key={feed.id}
              onClick={() => onFeedSelect(feed.id)}
              className={`w-full text-left p-3 rounded transition-colors ${
                isSelected
                  ? `bg-slate-700 ring-2 ${isHighPriority ? 'ring-red-500' : 'ring-emerald-500'}`
                  : `bg-slate-700/50 hover:bg-slate-700/75 ${isHighPriority ? 'ring-1 ring-red-500/50' : ''}`
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Radio className={`h-4 w-4 ${isHighPriority ? 'text-red-400' : 'text-emerald-400'}`} />
                  <span className="text-sm font-medium">{feed.name}</span>
                </div>
                <PriorityBadge priority={feed.priority} />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}