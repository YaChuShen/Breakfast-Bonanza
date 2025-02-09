"use client";

import React, { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { initMixpanel, identifyUser, trackEvent } from "../../lib/mixpanel";
import { useSession } from "next-auth/react";
import mixpanel from "mixpanel-browser";

export default function MixpanelProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();

  // 取得目前頁面路徑與查詢參數
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 第一次渲染時初始化 Mixpanel
  useEffect(() => {
    initMixpanel();
  }, []);

  // 當使用者登入後，呼叫 identifyUser() 以綁定使用者識別
  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      // 假設我們使用 `session.user.email` 當 distinct_id
      identifyUser(session.user.email || "UnknownUser");
      mixpanel.people.set({
        $email: session.user.email,
        $name: session.user.name || "", 
        // 也可放你要追蹤的其他屬性
      });
      // 你也可以順便追蹤「使用者登入」事件，或設定 People Profile
      trackEvent("User Logged In", {
        email: session.user.email,
      });
    }
  }, [session, status]);

  // 監聽路徑或搜尋參數變化，追蹤 Page View
  useEffect(() => {
    trackEvent("Page View", { path: pathname });
  }, [pathname, searchParams]);

  return <>{children}</>;
}
