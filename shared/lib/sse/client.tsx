import { useEffect, useState } from "react";

export function useEventsSource<T>(url: string, def: T) {
  const [dataStream, setDataStream] = useState<T>(def)
  const [error, setError] = useState<unknown | undefined>()
  useEffect(() => {
    const gameEvents = new EventSource(url);
    gameEvents.addEventListener('message', (message) => {
      try {
        setDataStream(JSON.parse(message.data))
        setError(undefined)
      } catch(e) {
        console.error('event parse error')
        setError(e)
      }
    })

    gameEvents.addEventListener('error', (err) => {
      setError(err)
    })

    return () => gameEvents.close()
  }, [url])

  return {dataStream, error}
}