import threatHighEnglish from '/assets/threat-high-english.txt?raw'
import threatHighRussian from '/assets/threat-high-russian.txt?raw'
import threatMediumEnglish from '/assets/threat-medium-english.txt?raw'
import threatMediumRussian from '/assets/threat-medium-russian.txt?raw'
import threatLowEnglish from '/assets/threat-low-english.txt?raw'
import threatLowRussian from '/assets/threat-low-russian.txt?raw'

// Define the valid transcript keys
export type TranscriptKey = 'threat-high' | 'threat-medium' | 'threat-low';

// Define the transcript structure
export interface Transcript {
  english: string;
  russian: string;
  audio: string;
}

export const transcripts: Record<TranscriptKey, Transcript> = {
  'threat-high': {
    english: threatHighEnglish,
    russian: threatHighRussian,
    audio: '/assets/threat-high.mp3'
  },
  'threat-medium': {
    english: threatMediumEnglish,
    russian: threatMediumRussian,
    audio: '/assets/threat-medium.mp3'
  },
  'threat-low': {
    english: threatLowEnglish,
    russian: threatLowRussian,
    audio: '/assets/threat-low.mp3'
  }
}