"use client";

import { useEffect } from "react";
import { useStore } from "@/store/useStore";

export function useSync() {
  const syncFromServer = useStore((s) => s.syncFromServer);

  useEffect(() => {
    // Initial load
    syncFromServer();

    // Poll every 3 seconds
    const interval = setInterval(syncFromServer, 3000);
    return () => clearInterval(interval);
  }, [syncFromServer]);
}
