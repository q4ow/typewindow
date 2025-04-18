import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Edit3, Clock, Download, Palette } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { HeroAnimation } from "@/components/hero-animation"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="container flex items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Edit3 className="w-6 h-6" />
          <span className="text-xl font-bold">TypeWindow</span>
        </div>
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/features" className="text-sm font-medium hover:underline underline-offset-4">
              Features
            </Link>
            <Link href="/about" className="text-sm font-medium hover:underline underline-offset-4">
              About
            </Link>
          </nav>
          <ThemeToggle />
          <Link href="/editor">
            <Button size="sm">Open Editor</Button>
          </Link>
        </div>
      </header>
      <main className="flex-1">
        <section className="py-20 md:py-28">
          <div className="container flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight max-w-3xl">
              Focus on your writing, not your tools
            </h1>
            <p className="mt-6 text-xl text-muted-foreground max-w-2xl">
              TypeWindow is a distraction-free text editor that helps you focus on what matters most—your words.
            </p>
            <div className="mt-10">
              <Link href="/editor">
                <Button size="lg" className="gap-2">
                  Start writing <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20 bg-muted/5">
          <div className="container">
            <div className="mx-auto max-w-5xl">
              <HeroAnimation />
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">Features that enhance your writing</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card">
                <Edit3 className="w-10 h-10 mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">Distraction-Free</h3>
                <p className="text-muted-foreground">Clean interface that lets you focus solely on your content.</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card">
                <Palette className="w-10 h-10 mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">Beautiful Themes</h3>
                <p className="text-muted-foreground">Choose from multiple themes including rosé pine and catppuccin.</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card">
                <Clock className="w-10 h-10 mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">Focus Timer</h3>
                <p className="text-muted-foreground">Set timers to maintain productivity during writing sessions.</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card">
                <Download className="w-10 h-10 mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">Easy Export</h3>
                <p className="text-muted-foreground">Export your documents in markdown format for use anywhere.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-muted/5">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Privacy-Focused</h2>
              <p className="text-lg mb-8">
                TypeWindow runs entirely in your browser. Your documents are stored in your browser's local storage and never sent to a server.
              </p>
              <div className="flex justify-center items-center gap-4 flex-wrap">
                <div className="bg-card p-4 rounded-lg border flex items-center gap-3">
                  <Download className="w-6 h-6 text-primary" />
                  <div>
                    <h3 className="font-medium">Export Your Work</h3>
                    <p className="text-sm text-muted-foreground">Download your documents as Markdown files</p>
                  </div>
                </div>
                <div className="bg-card p-4 rounded-lg border flex items-center gap-3">
                  <Edit3 className="w-6 h-6 text-primary" />
                  <div>
                    <h3 className="font-medium">Local Storage</h3>
                    <p className="text-sm text-muted-foreground">Documents are saved in your browser</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-8">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Edit3 className="w-5 h-5" />
            <span className="font-semibold">TypeWindow</span>
          </div>
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} TypeWindow. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">
              About
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}