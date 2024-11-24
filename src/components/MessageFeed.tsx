import { useState, useEffect, useCallback } from 'react';
import { MessageSquare, AlertCircle, Brain, ArrowRight, FileText, ChevronDown, ChevronUp, Tag, Zap, Shield, RefreshCw } from 'lucide-react';
import { Message, AudioFeed, AIAnalysis, DetailedAIAnalysis } from '../types';

function PriorityBadge({ priority }: { priority: Message['priority'] }) {
  const colors = {
    high: 'bg-red-600 text-white',
    medium: 'bg-yellow-500 text-white',
    low: 'bg-blue-500 text-white',
  };

  return (
    <div className={`${colors[priority]} px-6 py-3 rounded-lg text-2xl font-bold uppercase tracking-wider`}>
      {priority}
    </div>
  );
}

function MessageContent({ message }: { message: Message }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mt-4">
      <div className="flex justify-end mb-2">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center space-x-1 text-sm text-indigo-600 hover:text-indigo-800"
        >
          {isExpanded ? (
            <>
              <ChevronUp className="h-4 w-4" />
              <span>Show Less</span>
            </>
          ) : (
            <>
              <ChevronDown className="h-4 w-4" />
              <span>Show More</span>
            </>
          )}
        </button>
      </div>
      <div className={`bg-slate-50 p-4 rounded-lg ${!isExpanded ? 'max-h-[30vh] overflow-y-auto' : ''}`}>
        <p className="text-sm">
          {message.translation}
        </p>
      </div>
    </div>
  );
}

function DetailedReport({ feed, message }: { feed: AudioFeed; message: Message }) {
  const [detailedAnalysis, setDetailedAnalysis] = useState<DetailedAIAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetailedAnalysis = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await fetch('https://c92f-98-97-26-16.ngrok-free.app/generate-detailed-analysis', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            transcript: message.originalText
          })
        });

        if (!response.ok) {
          throw new Error(`Server responded with ${response.status}`);
        }

        const data = await response.json();
        setDetailedAnalysis(typeof data === 'string' ? JSON.parse(data) : data);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to load detailed analysis');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetailedAnalysis();
  }, [message]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-lg text-red-700">
        <AlertCircle className="h-5 w-5 inline mr-2" />
        {error}
      </div>
    );
  }

  if (!detailedAnalysis) return null;

  const threatColors = {
    'LOW': 'bg-blue-50 text-blue-700 border-blue-200',
    'MEDIUM': 'bg-yellow-50 text-yellow-700 border-yellow-200',
    'HIGH': 'bg-red-50 text-red-700 border-red-200',
    'CRITICAL': 'bg-purple-50 text-purple-700 border-purple-200'
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold mb-4">Threat Assessment</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Threat Level:</span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                threatColors[detailedAnalysis.threat_level]
              }`}>
                {detailedAnalysis.threat_level}
              </span>
            </div>
            <div>
              <h4 className="font-medium mb-2">Threat Sources:</h4>
              <ul className="list-disc pl-5 space-y-1">
                {detailedAnalysis.threat_sources.map((source, i) => (
                  <li key={i}>{source}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold mb-4">Operational Insights</h3>
          <div className="space-y-4">
            {Object.entries(detailedAnalysis.operational_insights).map(([key, values]) => (
              <div key={key}>
                <h4 className="font-medium mb-2 capitalize">{key.replace('_', ' ')}:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  {values.map((value, i) => (
                    <li key={i}>{value}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MessageAnalysis({ analysis }: { analysis: AIAnalysis | null }) {
  if (!analysis) return null;

  const threatColors = {
    'LOW': 'bg-blue-50 text-blue-700 border-blue-200',
    'MEDIUM': 'bg-yellow-50 text-yellow-700 border-yellow-200',
    'HIGH': 'bg-red-50 text-red-700 border-red-200',
    'CRITICAL': 'bg-purple-50 text-purple-700 border-purple-200'
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
      <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
        <div className="flex items-center space-x-2 text-slate-700 mb-3">
          <Shield className="h-5 w-5" />
          <h3 className="font-medium">Threat Assessment</h3>
        </div>
        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${threatColors[analysis.threat_level]} border`}>
          {analysis.threat_level}
        </span>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
        <div className="flex items-center space-x-2 text-slate-700 mb-3">
          <Brain className="h-5 w-5" />
          <h3 className="font-medium">Sentiment Analysis</h3>
        </div>
        <p className="text-sm text-slate-600">{analysis.sentiment || 'No sentiment analysis available'}</p>
      </div>

      {analysis.tags && analysis.tags.length > 0 && (
        <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
          <div className="flex items-center space-x-2 text-slate-700 mb-3">
            <Tag className="h-5 w-5" />
            <h3 className="font-medium">Keywords</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {analysis.tags.map((tag, index) => (
              <span key={index} className="px-2 py-1 bg-slate-100 text-slate-700 rounded-full text-xs">
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {analysis.key_insights && analysis.key_insights.length > 0 && (
        <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
          <div className="flex items-center space-x-2 text-slate-700 mb-3">
            <Zap className="h-5 w-5" />
            <h3 className="font-medium">Key Insights</h3>
          </div>
          <ul className="text-sm text-slate-600 space-y-1">
            {analysis.key_insights.map((insight, index) => (
              <li key={index} className="flex items-start space-x-2">
                <ArrowRight className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>{insight}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function ErrorDisplay({ error, onRetry }: { error: string; onRetry: () => void }) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center justify-between">
      <div className="flex items-center space-x-2 text-red-700">
        <AlertCircle className="h-5 w-5" />
        <span>{error}</span>
      </div>
      <button
        onClick={onRetry}
        className="flex items-center space-x-1 px-3 py-1 bg-red-100 hover:bg-red-200 text-red-700 rounded-md transition-colors"
      >
        <RefreshCw className="h-4 w-4" />
        <span>Retry</span>
      </button>
    </div>
  );
}

export default function MessageFeed({ 
  message,
  feed
}: { 
  message: Message | null;
  feed: AudioFeed | null;
}) {
  const [view, setView] = useState<'overview' | 'report'>('overview');
  const [analysis, setAnalysis] = useState<AIAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const fetchAnalysis = useCallback(async () => {
    if (!message) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);
      console.log('Sending request with transcript:', message.originalText);
      const response = await fetch('https://c92f-98-97-26-16.ngrok-free.app/generate-overview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          transcript: message.originalText
        }),
        signal: controller.signal
      });
      console.log('Response status:', response.status);
      console.log('Response:', response);
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }
      
      const data = await response.json();
      const analysisData = typeof data === 'string' ? JSON.parse(data) : data;
      setAnalysis(analysisData);
      setRetryCount(0);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      console.error('Failed to fetch analysis:', error);
      setError(
        error instanceof Error && error.name === 'AbortError'
          ? 'Request timed out. Please try again.'
          : `Failed to load analysis: ${errorMessage}`
      );
    } finally {
      setIsLoading(false);
    }
  }, [message]);

  useEffect(() => {
    fetchAnalysis();
  }, [fetchAnalysis]);

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    fetchAnalysis();
  };

  if (!feed || !message) {
    return (
      <div className="flex-1 flex items-center justify-center text-slate-500">
        Select an audio feed to view intercepted transmissions
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-4xl mx-auto p-6">
        <nav className="flex items-center space-x-2 text-sm text-slate-600 mb-4">
          <button 
            onClick={() => setView('overview')}
            className={`hover:text-slate-900 ${view === 'overview' ? 'text-slate-900 font-medium' : ''}`}
          >
            Overview
          </button>
        </nav>

        {view === 'overview' ? (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex justify-between items-center mb-4">
              <PriorityBadge priority={feed.priority} />
              <div className="text-right">
                <div className="text-lg font-semibold text-slate-900">{feed.name}</div>
              </div>
            </div>
            
            {isLoading ? (
              <div className="flex justify-center items-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
              </div>
            ) : error ? (
              <ErrorDisplay error={error} onRetry={handleRetry} />
            ) : (
              <MessageAnalysis analysis={analysis} />
            )}
            
            <MessageContent message={message} />
            
            <div className="flex justify-center mt-8">
              <button
                onClick={() => setView('report')}
                className="flex items-center space-x-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <FileText className="h-5 w-5" />
                <span>Generate Detailed Report</span>
              </button>
            </div>
          </div>
        ) : (
          <DetailedReport feed={feed} message={message} />
        )}
      </div>
    </div>
  );
}