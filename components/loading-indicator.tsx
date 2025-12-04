"use client"

import { useIsFetching } from "@tanstack/react-query"
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"

type LoadingIndicatorContextValue = {
  startLoading: () => void
  stopLoading: () => void
  withLoading: <T>(action: () => Promise<T> | T) => Promise<T>
}

const LoadingIndicatorContext = createContext<LoadingIndicatorContextValue | null>(null)

export function LoadingIndicatorProvider({ children }: { children: ReactNode }) {
  const [manualCount, setManualCount] = useState(0)

  const startLoading = useCallback(() => {
    setManualCount((count) => count + 1)
  }, [])

  const stopLoading = useCallback(() => {
    setManualCount((count) => Math.max(0, count - 1))
  }, [])

  const withLoading = useCallback(
    async <T,>(action: () => Promise<T> | T): Promise<T> => {
      startLoading()
      try {
        return await Promise.resolve(action())
      } finally {
        stopLoading()
      }
    },
    [startLoading, stopLoading]
  )

  const contextValue = useMemo(
    () => ({
      startLoading,
      stopLoading,
      withLoading,
    }),
    [startLoading, stopLoading, withLoading]
  )

  return (
    <LoadingIndicatorContext.Provider value={contextValue}>
      <TopLoadingBar manualCount={manualCount} />
      {children}
    </LoadingIndicatorContext.Provider>
  )
}

export function useLoadingIndicator() {
  const context = useContext(LoadingIndicatorContext)

  if (!context) {
    throw new Error("useLoadingIndicator must be used within LoadingIndicatorProvider")
  }

  return context
}

function TopLoadingBar({ manualCount }: { manualCount: number }) {
  const isFetching = useIsFetching()
  const isActive = manualCount > 0 || isFetching > 0
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (isActive) {
      setVisible(true)
      return
    }

    const timeout = setTimeout(() => setVisible(false), 220)
    return () => clearTimeout(timeout)
  }, [isActive])

  if (!visible) return null

  return (
    <div className="fixed top-0 left-0 right-0 h-1.5 z-[1000] pointer-events-none">
      <div className="absolute inset-0 overflow-hidden rounded-b-full">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0bb8bf] via-[#09989d] to-[#0bb8bf] bg-[length:200%_100%] animate-loading-bar shadow-[0_6px_18px_rgba(9,152,157,0.25)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0bb8bf]/40 via-[#09989d]/30 to-transparent blur-md" />
      </div>
    </div>
  )
}
