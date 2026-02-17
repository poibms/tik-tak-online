import { useEffect, useState } from "react";

export function useEventsSource<T>(url: string) {
  const [isPending, setIsPending] = useState(true)
  const [dataStream, setDataStream] = useState<T>()
  const [error, setError] = useState<unknown | undefined>()
  useEffect(() => {
    const gameEvents = new EventSource(url);
    gameEvents.addEventListener('message', (message) => {
      try {
        setIsPending(false)
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

  return {dataStream, error, isPending }
}