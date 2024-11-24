import AudioFeedSelector from './AudioFeedSelector';
import { AudioFeed } from '../types';

interface SidebarProps {
  feeds: AudioFeed[];
  onFeedSelect: (feedId: string) => void;
  selectedFeedId: string | null;
}

export default function Sidebar({ feeds, onFeedSelect, selectedFeedId }: SidebarProps) {
  return (
    <aside className="w-72 bg-slate-800 text-white p-4 flex flex-col">
      <AudioFeedSelector 
        feeds={feeds} 
        onFeedSelect={onFeedSelect}
        selectedFeedId={selectedFeedId}
      />
    </aside>
  );
}