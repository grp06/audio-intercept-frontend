import { useState, useEffect } from 'react';
import Header from './components/Header';
import MessageFeed from './components/MessageFeed';
import Sidebar from './components/Sidebar';
import { Message, AudioFeed } from './types';
import audioData from './data/intercepted-audio.json';
import { transcripts, TranscriptKey } from './utils/loadTranscripts'

const mockFeeds: AudioFeed[] = audioData.audioFeeds.map(feed => ({
  id: feed.id,
  name: feed.name,
  fileName: feed.fileName,
  active: true,
  priority: feed.priority as 'high' | 'medium' | 'low',
  insights: feed.insights
}));

const mockMessages: { [key: string]: Message } = Object.fromEntries(
  audioData.audioFeeds.map(feed => {
    const transcriptKey = feed.fileName.replace('.mp3', '') as TranscriptKey;
    return [
      feed.id,
      {
        id: `${feed.id}-1`,
        timestamp: new Date(),
        originalText: transcripts[transcriptKey].russian,
        translation: transcripts[transcriptKey].english,
        priority: feed.priority as 'high' | 'medium' | 'low',
        feedId: feed.id,
        audioFile: transcripts[transcriptKey].audio
      }
    ];
  })
);

function App() {
  const [selectedFeedId, setSelectedFeedId] = useState<string | null>(null);

  // Set default selection on mount
  useEffect(() => {
    if (mockFeeds.length > 0) {
      setSelectedFeedId(mockFeeds[0].id);
    }
  }, []);

  const handleFeedSelect = (feedId: string) => {
    setSelectedFeedId(feedId);
  };

  const currentMessage = selectedFeedId ? mockMessages[selectedFeedId] : null;
  const currentFeed = selectedFeedId 
    ? mockFeeds.find(feed => feed.id === selectedFeedId)
    : null;

  return (
    <div className="flex flex-col h-screen bg-slate-100">
      <Header />
      <main className="flex-1 flex overflow-hidden">
        <Sidebar 
          feeds={mockFeeds}
          onFeedSelect={handleFeedSelect}
          selectedFeedId={selectedFeedId}
        />
        <MessageFeed 
          message={currentMessage}
          feed={currentFeed}
        />
      </main>
    </div>
  );
}

export default App;