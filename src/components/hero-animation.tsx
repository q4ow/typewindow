"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"

export function HeroAnimation() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="h-[400px] rounded-lg border bg-card"></div>
  }

  return (
    <Card className="overflow-hidden relative h-[400px] border shadow-lg">
      <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/50 to-background/80 backdrop-blur-sm z-10"></div>

      <motion.div
        className="absolute top-10 left-10 right-10 bottom-10 bg-card rounded-lg shadow-lg p-6 z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="text-xs text-muted-foreground">Untitled.md</div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="space-y-3"
        >
          <motion.h1
            className="text-2xl font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            # The Art of Writing
          </motion.h1>

          <motion.p
            className="text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            Writing is not just about putting words on a page. It&apos;s about capturing thoughts, emotions, and ideas
            in a way that resonates with readers.
          </motion.p>

          <motion.p
            className="text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.5 }}
          >
            With TypeWindow, you can focus on your craft without distractions.
          </motion.p>

          <motion.div
            className="w-full h-6 mt-4"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 1.6, duration: 2 }}
          >
            <motion.div
              className="h-0.5 bg-primary"
              initial={{ width: 0 }}
              animate={{ width: "60%" }}
              transition={{ delay: 1.6, duration: 2 }}
            />
          </motion.div>
        </motion.div>
      </motion.div>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="grid grid-cols-3 gap-4 w-full h-full p-4">
          {Array.from({ length: 9 }).map((_, i) => (
            <motion.div
              key={i}
              className="bg-primary/5 rounded-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.2, scale: 1 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            />
          ))}
        </div>
      </div>
    </Card>
  )
}
