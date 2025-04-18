export interface Document {
    id: string;
    name: string;
    content: string;
    lastModified: number;
}

const STORAGE_KEY = 'typewindow-documents';

export function getDocuments(): Document[] {
    if (typeof window === 'undefined') return [];

    try {
        const documents = localStorage.getItem(STORAGE_KEY);
        return documents ? JSON.parse(documents) : [];
    } catch (error) {
        console.error('Failed to parse documents from localStorage', error);
        return [];
    }
}

export function saveDocument(document: Document): void {
    if (typeof window === 'undefined') return;

    try {
        const documents = getDocuments();
        const existingIndex = documents.findIndex(doc => doc.id === document.id);

        if (existingIndex >= 0) {
            documents[existingIndex] = document;
        } else {
            documents.push(document);
        }

        localStorage.setItem(STORAGE_KEY, JSON.stringify(documents));
    } catch (error) {
        console.error('Failed to save document to localStorage', error);
    }
}

export function deleteDocument(id: string): void {
    if (typeof window === 'undefined') return;

    try {
        const documents = getDocuments();
        const filteredDocuments = documents.filter(doc => doc.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredDocuments));
    } catch (error) {
        console.error('Failed to delete document from localStorage', error);
    }
}

export function createNewDocument(): Document {
    const id = Date.now().toString();
    return {
        id,
        name: 'Untitled',
        content: '# Untitled Document\n\nStart typing...',
        lastModified: Date.now(),
    };
}

export function formatDate(timestamp: number): string {
    const date = new Date(timestamp);
    const now = new Date();

    if (date.toDateString() === now.toDateString()) {
        return 'Today';
    }

    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    if (date.toDateString() === yesterday.toDateString()) {
        return 'Yesterday';
    }

    return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric'
    }).format(date);
}