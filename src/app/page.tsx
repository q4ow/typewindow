"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Edit3, Clock, Download, Palette } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { HeroAnimation } from "@/components/hero-animation"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

export default function Home() {
  const featuresRef = useRef(null)
  const privacyRef = useRef(null)

  const featuresInView = useInView(featuresRef, { once: true, amount: 0.3 })
  const privacyInView = useInView(privacyRef, { once: true, amount: 0.3 })

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const featureCardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.2 }
    }
  }

  const logoAnimation = {
    hidden: { rotate: -5, opacity: 0 },
    visible: {
      rotate: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 10
      }
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <motion.header
        className="container flex items-center justify-between py-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="flex items-center gap-2"
          variants={logoAnimation}
          initial="hidden"
          animate="visible"
        >
          <Edit3 className="w-6 h-6" />
          <span className="text-xl font-bold">TypeWindow</span>
        </motion.div>
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex items-center gap-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Link href="/features" className="text-sm font-medium hover:underline underline-offset-4">
                Features
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Link href="/about" className="text-sm font-medium hover:underline underline-offset-4">
                About
              </Link>
            </motion.div>
          </nav>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <ThemeToggle />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
          >
            <Link href="/editor">
              <Button size="sm">Open Editor</Button>
            </Link>
          </motion.div>
        </div>
      </motion.header>
      <main className="flex-1">
        <section className="py-20 md:py-28">
          <div className="container flex flex-col items-center text-center">
            <motion.h1
              className="text-4xl md:text-6xl font-bold tracking-tight max-w-3xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Focus on your writing, not your tools
            </motion.h1>
            <motion.p
              className="mt-6 text-xl text-muted-foreground max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              TypeWindow is a distraction-free text editor that helps you focus on what matters most—your words.
            </motion.p>
            <motion.div
              className="mt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
            >
              <Link href="/editor">
                <Button size="lg" className="gap-2">
                  Start writing <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        <section className="py-20 bg-muted/5">
          <div className="container">
            <motion.div
              className="mx-auto max-w-5xl"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
            >
              <HeroAnimation />
            </motion.div>
          </div>
        </section>

        <section className="py-20" ref={featuresRef}>
          <div className="container">
            <motion.h2
              className="text-3xl font-bold text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7 }}
            >
              Features that enhance your writing
            </motion.h2>
            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
              variants={staggerContainer}
              initial="hidden"
              animate={featuresInView ? "visible" : "hidden"}
            >
              <motion.div
                className="flex flex-col items-center text-center p-6 rounded-lg border bg-card"
                variants={featureCardVariants}
                whileHover="hover"
              >
                <Edit3 className="w-10 h-10 mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">Distraction-Free</h3>
                <p className="text-muted-foreground">Clean interface that lets you focus solely on your content.</p>
              </motion.div>
              <motion.div
                className="flex flex-col items-center text-center p-6 rounded-lg border bg-card"
                variants={featureCardVariants}
                whileHover="hover"
              >
                <Palette className="w-10 h-10 mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">Beautiful Themes</h3>
                <p className="text-muted-foreground">Choose from multiple themes including rosé pine and catppuccin.</p>
              </motion.div>
              <motion.div
                className="flex flex-col items-center text-center p-6 rounded-lg border bg-card"
                variants={featureCardVariants}
                whileHover="hover"
              >
                <Clock className="w-10 h-10 mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">Focus Timer</h3>
                <p className="text-muted-foreground">Set timers to maintain productivity during writing sessions.</p>
              </motion.div>
              <motion.div
                className="flex flex-col items-center text-center p-6 rounded-lg border bg-card"
                variants={featureCardVariants}
                whileHover="hover"
              >
                <Download className="w-10 h-10 mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">Easy Export</h3>
                <p className="text-muted-foreground">Export your documents in markdown format for use anywhere.</p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section className="py-20 bg-muted/5" ref={privacyRef}>
          <div className="container">
            <motion.div
              className="text-center max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={privacyInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h2
                className="text-3xl font-bold mb-6"
                variants={fadeIn}
              >
                Privacy-Focused
              </motion.h2>
              <motion.p
                className="text-lg mb-8"
                variants={fadeIn}
              >
                TypeWindow runs entirely in your browser. Your documents are stored in your browser's local storage and never sent to a server.
              </motion.p>
              <motion.div
                className="flex justify-center items-center gap-4 flex-wrap"
                initial={{ opacity: 0 }}
                animate={privacyInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <motion.div
                  className="bg-card p-4 rounded-lg border flex items-center gap-3"
                  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                >
                  <Download className="w-6 h-6 text-primary" />
                  <div>
                    <h3 className="font-medium">Export Your Work</h3>
                    <p className="text-sm text-muted-foreground">Download your documents as Markdown files</p>
                  </div>
                </motion.div>
                <motion.div
                  className="bg-card p-4 rounded-lg border flex items-center gap-3"
                  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                >
                  <Edit3 className="w-6 h-6 text-primary" />
                  <div>
                    <h3 className="font-medium">Local Storage</h3>
                    <p className="text-sm text-muted-foreground">Documents are saved in your browser</p>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
      <motion.footer
        className="border-t py-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="container flex flex-col md:flex-row justify-between items-center gap-4">
          <motion.div
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            <Edit3 className="w-5 h-5" />
            <span className="font-semibold">TypeWindow</span>
          </motion.div>
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} TypeWindow. All rights reserved.
          </div>
          <motion.div
            className="flex items-center gap-4"
            whileHover={{ scale: 1.05 }}
          >
            <Link href="https://github.com/q4ow/typewindow" className="text-sm text-muted-foreground hover:text-foreground">
              Source
            </Link>
          </motion.div>
        </div>
      </motion.footer>
    </div>
  )
}