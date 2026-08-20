/**
 * Lightweight Client-Side Observability & Product Telemetry for Peec AI
 * Tracks feature adoption, high-value conversion actions (Jira/Brief exports),
 * dwell time, and model switching.
 */

export interface TelemetryEvent {
  id: string;
  eventName: string;
  timestamp: string;
  timeMs: number;
  properties: Record<string, any>;
}

const STORAGE_KEY = 'peec_telemetry_events';
const SESSION_ID = 'sess_' + Math.random().toString(36).substring(2, 9);

export class TelemetryService {
  private static events: TelemetryEvent[] = [];

  static init() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        this.events = JSON.parse(stored);
      }
    } catch {
      this.events = [];
    }

    // Auto-record session start
    this.track('session_start', {
      sessionId: SESSION_ID,
      referrer: typeof document !== 'undefined' ? (document.referrer || 'direct') : 'node',
      screenResolution: typeof window !== 'undefined' ? `${window.innerWidth}x${window.innerHeight}` : 'unknown',
      isMobile: typeof window !== 'undefined' ? window.innerWidth <= 768 : false,
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown'
    });
  }

  static track(eventName: string, properties: Record<string, any> = {}) {
    const event: TelemetryEvent = {
      id: 'evt_' + Math.random().toString(36).substring(2, 9),
      eventName,
      timestamp: new Date().toISOString(),
      timeMs: Date.now(),
      properties: {
        sessionId: SESSION_ID,
        path: typeof window !== 'undefined' ? window.location.pathname : '',
        search: typeof window !== 'undefined' ? window.location.search : '',
        ...properties
      }
    };

    this.events.unshift(event);
    if (this.events.length > 100) {
      this.events = this.events.slice(0, 100);
    }

    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.events));
      }
    } catch {
      // Ignored in strict privacy mode
    }

    // Recruiter-visible console logger
    if (typeof console !== 'undefined') {
      console.log(
        `%c[Peec Observability]%c ${eventName}`,
        'background: #111827; color: #818CF8; font-weight: bold; padding: 2px 6px; border-radius: 4px;',
        'color: #10B981; font-weight: 600;',
        properties
      );
    }

    // Dispatch custom event for UI reactivity
    if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
      window.dispatchEvent(new CustomEvent('peec:telemetry', { detail: event }));
    }
  }

  static getRecentEvents(): TelemetryEvent[] {
    return [...this.events];
  }

  static clear() {
    this.events = [];
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch {}
  }
}
