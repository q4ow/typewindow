"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, RotateCcw, X, Volume2, VolumeX } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

interface FocusTimerProps {
  onClose: () => void
}

export function FocusTimer({ onClose }: FocusTimerProps) {
  const [duration, setDuration] = useState(25)
  const [timeLeft, setTimeLeft] = useState(duration * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [muted, setMuted] = useState(false)
  const [showNotifications, setShowNotifications] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      setIsRunning(false)
      if (showNotifications) {
        toast({
          title: "Focus Timer Completed",
          description: `Your ${duration} minute focus session has ended.`,
          variant: "default",
        })
      }
    }

    return () => clearInterval(interval)
  }, [isRunning, timeLeft, showNotifications, duration, toast])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleReset = () => {
    setTimeLeft(duration * 60)
    setIsRunning(false)
  }

  const handleDurationChange = (value: number[]) => {
    const newDuration = value[0]
    setDuration(newDuration)
    setTimeLeft(newDuration * 60)
  }

  return (
    <Card className="w-72 shadow-lg">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Focus Timer</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-7 w-7">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-center items-center h-24">
          <div className="text-4xl font-bold">{formatTime(timeLeft)}</div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm">Duration: {duration} min</span>
          </div>
          <Slider
            value={[duration]}
            min={5}
            max={60}
            step={5}
            onValueChange={handleDurationChange}
            disabled={isRunning}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Label htmlFor="notifications" className="text-sm">
                Notifications
              </Label>
              <Switch id="notifications" checked={showNotifications} onCheckedChange={setShowNotifications} />
            </div>
            <Button variant="ghost" size="icon" onClick={() => setMuted(!muted)} className="h-8 w-8">
              {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm" onClick={handleReset}>
          <RotateCcw className="h-4 w-4 mr-1" />
          Reset
        </Button>
        <Button size="sm" onClick={() => setIsRunning(!isRunning)}>
          {isRunning ? (
            <>
              <Pause className="h-4 w-4 mr-1" />
              Pause
            </>
          ) : (
            <>
              <Play className="h-4 w-4 mr-1" />
              Start
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
