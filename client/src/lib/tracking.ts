// Mock tracking utility for frontend prototype
// In a real app, this would send data to the backend

export type EventType = 
  | 'property_view' 
  | 'property_save' 
  | 'filter_applied' 
  | 'page_visit' 
  | 'cta_click' 
  | 'form_view' 
  | 'share_click';

export interface TrackingEvent {
  event_type: EventType;
  property_id?: number;
  event_data?: Record<string, any>;
  page_url?: string;
  timestamp: string;
}

class Tracker {
  private sessionId: string;
  private events: TrackingEvent[] = [];

  constructor() {
    this.sessionId = this.initSession();
  }

  private initSession(): string {
    let sid = localStorage.getItem('sessionId');
    if (!sid) {
      sid = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('sessionId', sid);
    }
    return sid;
  }

  public track(event_type: EventType, data: Partial<Omit<TrackingEvent, 'event_type' | 'timestamp'>> = {}) {
    const event: TrackingEvent = {
      event_type,
      timestamp: new Date().toISOString(),
      page_url: window.location.pathname,
      ...data
    };
    
    console.log(`[Tracking] ${event_type}:`, event);
    this.events.push(event);
    
    // Simulate sending to backend
    // fetch('/api/events/track', ...)
  }

  public getEvents() {
    return this.events;
  }
}

export const tracker = new Tracker();

// React Hook for auto-tracking page views
import { useEffect } from 'react';
import { useLocation } from 'wouter';

export function usePageTracking() {
  const [location] = useLocation();

  useEffect(() => {
    tracker.track('page_visit', { page_url: location });
  }, [location]);
}
