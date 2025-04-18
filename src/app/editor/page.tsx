"use client"

import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Save, Download, Clock, FileText, Eye, Code, BarChart2, Menu, X } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { EditorSidebar } from "@/components/editor-sidebar"
import { FocusTimer } from "@/components/focus-timer"
import { MarkdownPreview } from "@/components/markdown-preview"
import { useMobile } from "@/hooks/use-mobile"
import { Document, createNewDocument, getDocuments, saveDocument } from "@/lib/document-storage"
import { Input } from "@/components/ui/input"
import { KeyboardShortcutsModal } from "@/components/keyboard-shortcuts-modal"
import { motion, AnimatePresence } from "framer-motion"
import { useToast } from "@/hooks/use-toast"

export default function EditorPage() {
  const [activeDocument, setActiveDocument] = useState<Document | null>(null);
  const [content, setContent] = useState<string>("");
  const [documentName, setDocumentName] = useState<string>("");
  const [showSidebar, setShowSidebar] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [activeTab, setActiveTab] = useState("write");
  const [lastSaveTimestamp, setLastSaveTimestamp] = useState(Date.now());
  const nameInputRef = useRef<HTMLInputElement>(null);
  const isMobile = useMobile();
  const { toast } = useToast();

  useEffect(() => {
    const docs = getDocuments();
    if (docs.length > 0) {
      setActiveDocument(docs[0]);
      setContent(docs[0].content);
      setDocumentName(docs[0].name);
    } else {
      const newDoc = createNewDocument();
      saveDocument(newDoc);
      setActiveDocument(newDoc);
      setContent(newDoc.content);
      setDocumentName(newDoc.name);
    }
  }, []);

  useEffect(() => {
    if (activeDocument && isEdited) {
      const saveTimer = setTimeout(() => {
        handleSave();
      }, 1000);

      return () => clearTimeout(saveTimer);
    }
  }, [content, documentName, isEdited]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement instanceof HTMLInputElement ||
        document.activeElement instanceof HTMLTextAreaElement
      ) {
        if (e.key === "F2") {
          e.preventDefault();
          if (nameInputRef.current) {
            nameInputRef.current.focus();
            nameInputRef.current.select();
          }
        }
        return;
      }

      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        handleSave();
      }

      if ((e.ctrlKey || e.metaKey) && e.key === "n") {
        e.preventDefault();
        handleNewDocument();
      }

      if ((e.ctrlKey || e.metaKey) && e.key === "e") {
        e.preventDefault();
        handleExport();
      }

      if ((e.ctrlKey || e.metaKey) && e.key === "t") {
        e.preventDefault();
        setShowTimer(!showTimer);
      }

      if ((e.ctrlKey || e.metaKey) && e.key === "b") {
        e.preventDefault();
        setShowSidebar(!showSidebar);
      }

      if ((e.ctrlKey || e.metaKey) && e.key === "1") {
        e.preventDefault();
        setActiveTab("write");
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "2") {
        e.preventDefault();
        setActiveTab("preview");
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "3") {
        e.preventDefault();
        setActiveTab("stats");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [showTimer, showSidebar, activeTab, setActiveTab]);

  useEffect(() => {
    if (activeDocument) {
      const allDocs = getDocuments();
      const updatedDoc = allDocs.find(doc => doc.id === activeDocument.id);
      if (updatedDoc && updatedDoc.name !== documentName) {
        setDocumentName(updatedDoc.name);
      }
    }
  }, [activeDocument]);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    setIsEdited(true);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDocumentName(e.target.value);
    setIsEdited(true);
  };

  const handleSave = () => {
    if (!activeDocument) return;

    const updatedDoc = {
      ...activeDocument,
      name: documentName,
      content: content,
      lastModified: Date.now(),
    };

    saveDocument(updatedDoc);
    setActiveDocument(updatedDoc);
    setIsEdited(false);
    setLastSaveTimestamp(Date.now());

    /* toast({
      title: "Document saved",
      description: `"${documentName}" has been saved`,
      variant: "default",
    }); */
  };

  const handleExport = () => {
    if (!activeDocument) return;

    const blob = new Blob([content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${documentName}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Document exported",
      description: `"${documentName}.md" has been downloaded`,
      variant: "default",
    });
  };

  const handleDocumentSelect = (doc: Document) => {
    if (isEdited) {
      handleSave();
    }

    setActiveDocument(doc);
    setContent(doc.content);
    setDocumentName(doc.name);
    setIsEdited(false);

    if (isMobile) {
      setShowSidebar(false);
    }

    toast({
      title: "Document opened",
      description: `"${doc.name}" is ready to edit`,
      variant: "default",
    });
  };

  const handleNewDocument = () => {
    if (isEdited) {
      handleSave();
    }

    const newDoc = createNewDocument();
    saveDocument(newDoc);
    setActiveDocument(newDoc);
    setContent(newDoc.content);
    setDocumentName(newDoc.name);
    setIsEdited(false);
    setLastSaveTimestamp(Date.now());

    if (isMobile) {
      setShowSidebar(false);
    }

    toast({
      title: "New document created",
      description: "Start typing to begin your new document",
      variant: "default",
    });
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <AnimatePresence>
        {showSidebar && (
          <motion.div
            className={`${isMobile ? "fixed inset-0 z-50 bg-background" : "w-64 border-r"}`}
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <EditorSidebar
              onClose={() => setShowSidebar(false)}
              activeDocumentId={activeDocument?.id || null}
              onDocumentSelect={handleDocumentSelect}
              onNewDocument={handleNewDocument}
              refreshTrigger={lastSaveTimestamp}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col flex-1 h-full overflow-hidden">
        <motion.header
          className="border-b p-2 flex items-center justify-between"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mx-2"
            >
              <Button variant="ghost" size="icon" onClick={() => setShowSidebar(!showSidebar)}>
                {showSidebar && isMobile ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </motion.button>
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              <Input
                ref={nameInputRef}
                value={documentName}
                onChange={handleNameChange}
                className="h-8 w-48 border-0 focus-visible:ring-1"
              />
              {isEdited && <span className="text-xs text-muted-foreground">(unsaved)</span>}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="ghost" size="icon" onClick={handleSave} title="Save (Ctrl+S)">
                <Save className="h-5 w-5" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="ghost" size="icon" onClick={() => setShowTimer(!showTimer)} title="Toggle Timer (Ctrl+T)">
                <Clock className="h-5 w-5" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="ghost" size="icon" onClick={handleExport} title="Download (Ctrl+E)">
                <Download className="h-5 w-5" />
              </Button>
            </motion.div>
            {!isMobile && (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <KeyboardShortcutsModal />
              </motion.div>
            )}
            <div className="px-1" />
            <ThemeToggle />
          </div>
        </motion.header>

        <main className="flex-1 overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
            <div className="border-b pl-2">
              <TabsList className="h-10 gap-x-2">
                <TabsTrigger value="write" className="data-[state=active]:bg-background">
                  <Code className="h-4 w-4 mr-2" />
                  Write
                </TabsTrigger>
                <TabsTrigger value="preview" className="data-[state=active]:bg-background">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </TabsTrigger>
                <TabsTrigger value="stats" className="data-[state=active]:bg-background">
                  <BarChart2 className="h-4 w-4 mr-2" />
                  Stats
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="write" className="flex-1 p-0 h-full overflow-auto">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="h-full"
              >
                <Textarea
                  value={content}
                  onChange={handleContentChange}
                  className="min-h-full h-full border-0 resize-none p-4 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none"
                  placeholder="Start typing..."
                />
              </motion.div>
            </TabsContent>

            <TabsContent value="preview" className="flex-1 p-4 h-full overflow-auto">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                <MarkdownPreview content={content} />
              </motion.div>
            </TabsContent>

            <TabsContent value="stats" className="flex-1 p-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="max-w-md mx-auto space-y-6"
              >
                <div className="text-center space-y-2">
                  <h2 className="text-2xl font-bold">Document Statistics</h2>
                  <p className="text-muted-foreground">Insights about your writing</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <motion.div
                    className="p-4 border rounded-lg text-center"
                    whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="text-3xl font-bold">{content.split(/\s+/).filter(Boolean).length}</div>
                    <div className="text-sm text-muted-foreground">Words</div>
                  </motion.div>
                  <motion.div
                    className="p-4 border rounded-lg text-center"
                    whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="text-3xl font-bold">{content.length}</div>
                    <div className="text-sm text-muted-foreground">Characters</div>
                  </motion.div>
                  <motion.div
                    className="p-4 border rounded-lg text-center"
                    whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="text-3xl font-bold">{content.split(/\n+/).filter(Boolean).length}</div>
                    <div className="text-sm text-muted-foreground">Paragraphs</div>
                  </motion.div>
                  <motion.div
                    className="p-4 border rounded-lg text-center"
                    whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="text-3xl font-bold">
                      {Math.ceil(content.split(/\s+/).filter(Boolean).length / 225)}
                    </div>
                    <div className="text-sm text-muted-foreground">Reading time (min)</div>
                  </motion.div>
                </div>

                <motion.div
                  className="p-4 border rounded-lg"
                  whileHover={{ boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="font-medium mb-2">Local Storage</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Your documents are saved in your browser's local storage. Export important documents as backup.
                  </p>
                  <Button onClick={handleExport} className="w-full">
                    Export Current Document
                  </Button>
                </motion.div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </main>
      </div>

      <AnimatePresence>
        {showTimer && (
          <motion.div
            className="fixed bottom-4 right-4 z-50"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <FocusTimer onClose={() => setShowTimer(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}