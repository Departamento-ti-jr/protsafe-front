"use client"

import { useEffect, useMemo } from "react"
import { useSocketContext } from "./SocketProvider"
import { getSocketClient } from "./socket.client"

type EventName = string | string[]

/**
 * Hook genérico para ouvir eventos do Socket.IO.
 * @param eventName Nome do evento ou lista de eventos.
 * @param onEvent Callback disparado com o payload do evento.
 */
export function useSocketEvent<T>(eventName: EventName, onEvent: (payload: T) => void) {
  const { socket: contextSocket } = useSocketContext()
  const events = useMemo(() => (Array.isArray(eventName) ? eventName : [eventName]), [eventName])

  useEffect(() => {
    const socket = contextSocket ?? getSocketClient()
    if (!socket) return

    events.forEach((evt) => socket.on(evt, onEvent))

    return () => {
      events.forEach((evt) => socket.off(evt, onEvent))
    }
  }, [contextSocket, events, onEvent])
}
