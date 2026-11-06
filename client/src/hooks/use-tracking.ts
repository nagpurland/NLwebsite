import { useEffect } from 'react';

export function useTracking() {
  useEffect(() => {
    // 1. Heatmap Injection (Configurable via mock setting)
    const heatmapId = "CLARITY_STUB_ID"; 
    if (heatmapId) {
      console.log(`[Tracking] Injecting heatmap script for ID: ${heatmapId}`);
      // In real app, this would be:
      // (function(c,l,a,r,i,t,y){...})(window, document, "clarity", "script", heatmapId);
    }

    // 2. Scroll Depth Tracking
    const scrollThresholds = [25, 50, 75, 100];
    const sentThresholds = new Set();

    const handleScroll = () => {
      const winHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight - winHeight;
      const scrollPos = window.scrollY;
      const pct = Math.round((scrollPos / docHeight) * 100);

      scrollThresholds.forEach(t => {
        if (pct >= t && !sentThresholds.has(t)) {
          sentThresholds.add(t);
          sendEvent('scroll_depth', { depth: t });
        }
      });
    };

    // 3. Click Event Delegation
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const trackedElement = target.closest('[data-track-event]');
      
      if (trackedElement) {
        const eventType = trackedElement.getAttribute('data-track-event');
        const metadata = trackedElement.getAttribute('data-track-metadata');
        sendEvent(eventType || 'click', metadata ? JSON.parse(metadata) : {});
      }
    };

    const sendEvent = (type: string, metadata: any) => {
      console.log(`[Event Tracked] ${type}:`, metadata);
      // In mockup mode, we just log to console or simulate API call
      // fetch('/events/track', { method: 'POST', body: JSON.stringify({ type, metadata }) });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('click', handleClick);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('click', handleClick);
    };
  }, []);
}
