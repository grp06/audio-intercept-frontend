export interface Message {
  id: string;
  timestamp: Date;
  originalText: string;
  translation: string;
  priority: 'high' | 'medium' | 'low';
  feedId: string;
  audioFile: string;
}

export interface AudioFeed {
  id: string;
  name: string;
  fileName: string;
  active: boolean;
  priority: 'high' | 'medium' | 'low';
  insights: string[];
}

export interface AIAnalysis {
  threat_level: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  sentiment: string;
  tags: string[];
  key_insights: string[];
}

export interface DetailedAIAnalysis {
  threat_level: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  threat_sources: string[];
  potential_actions: string[];
  sentiment: string;
  morale_indicators: string[];
  psychological_state: string;
  operational_insights: {
    troop_movements: string[];
    logistics: string[];
    command_structure: string[];
  };
  tactical_insights: string[];
  strategic_insights: string[];
  weaknesses: string[];
  communication_patterns: {
    frequency: string;
    urgency: string;
    code_words: string[];
  };
  key_entities: string[];
  relationships: Record<string, string>;
  geospatial_info: {
    locations: string[];
    movement_patterns: string[];
  };
  risk_assessment: {
    immediate_risks: string[];
    potential_scenarios: string[];
  };
  recommendations: {
    countermeasures: string[];
    priority_actions: string[];
  };
}