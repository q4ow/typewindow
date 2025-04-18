"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { FileText, Plus, Trash2, X } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"
import Link from "next/link"
import { Document, getDocuments, deleteDocument, formatDate } from "@/lib/document-storage"
import { useToast } from "@/hooks/use-toast"

interface EditorSidebarProps {
  onClose: () => void;
  activeDocumentId: string | null;
  onDocumentSelect: (document: Document) => void;
  onNewDocument: () => void;
  refreshTrigger?: number
}

export function EditorSidebar({
  onClose,
  activeDocumentId,
  onDocumentSelect,
  onNewDocument,
  refreshTrigger = 0
}: EditorSidebarProps) {
  const [documents, setDocuments] = useState<Document[]>([]);
  const isMobile = useMobile();
  const { toast } = useToast();

  useEffect(() => {
    setDocuments(getDocuments());
  }, [refreshTrigger]);

  const handleDeleteDocument = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();

    const docToDelete = documents.find(doc => doc.id === id);
    const docName = docToDelete?.name || "Document";

    deleteDocument(id);
    setDocuments(getDocuments());

    toast({
      title: "Document deleted",
      description: `"${docName}" has been removed`,
      variant: "destructive",
    });
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b flex items-center justify-between">
        <h2 className="font-semibold">Documents</h2>
        {isMobile && (
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>

      <div className="p-2">
        <Button
          variant="outline"
          className="w-full justify-start gap-2"
          onClick={onNewDocument}
        >
          <Plus className="h-4 w-4" />
          New Document
        </Button>
      </div>

      <div className="flex-1 overflow-auto p-2">
        <div className="space-y-1">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className={`flex items-center justify-between p-2 rounded-md hover:bg-muted cursor-pointer group ${activeDocumentId === doc.id ? 'bg-muted' : ''
                }`}
              onClick={() => onDocumentSelect(doc)}
            >
              <div className="flex items-center gap-2 overflow-hidden">
                <FileText className="h-4 w-4 shrink-0" />
                <span className="text-sm truncate">{doc.name}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xs text-muted-foreground">{formatDate(doc.lastModified)}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 opacity-0 group-hover:opacity-100"
                  onClick={(e) => handleDeleteDocument(doc.id, e)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {documents.length === 0 && (
          <div className="text-center p-4 text-muted-foreground text-sm">
            No documents yet. Create one to get started.
          </div>
        )}
      </div>

      <div className="p-2 border-t">
        <div className="p-2">
          <Link href="/">
            <Button variant="ghost" size="sm" className="w-full">Home</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}