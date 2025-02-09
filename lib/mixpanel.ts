"use client";

import mixpanel from "mixpanel-browser";

const MIXPANEL_TOKEN: string = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN || "";

export function initMixpanel(): void {
  if (typeof window !== "undefined" && MIXPANEL_TOKEN) {
    mixpanel.init(MIXPANEL_TOKEN, {
      // 如果需要，這邊可以放額外設定
      // debug: true,
    });
  }
}

export function trackEvent(eventName: string, properties?: Record<string, unknown>): void {
  if (typeof window !== "undefined" && MIXPANEL_TOKEN) {
    mixpanel.track(eventName, properties);
  }
}

export function identifyUser(userId: string): void {
  if (typeof window !== "undefined" && MIXPANEL_TOKEN) {
    mixpanel.identify(userId);
  }
}
