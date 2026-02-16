import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/shared/ui/card"
import { ReactNode } from "react"

export function GameLayout({status, actions, field, players}: {status?: ReactNode, players?: ReactNode, actions?: ReactNode, field?: ReactNode}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tik tak toe 3x3</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {players}
        {status}
        <div className="flex items-center justify-center">
        {field}
        </div>
      </CardContent>
      <CardFooter>{actions}</CardFooter>
    </Card>
  )
} 
