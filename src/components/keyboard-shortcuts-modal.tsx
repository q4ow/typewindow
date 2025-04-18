"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Keyboard, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ShortcutItem {
    key: string;
    description: string;
}

const shortcuts: ShortcutItem[] = [
    { key: "Ctrl + S", description: "Save document" },
    { key: "Ctrl + N", description: "New document" },
    { key: "F2", description: "Rename document" },
    { key: "Ctrl + E", description: "Export document" },
    { key: "Ctrl + T", description: "Toggle timer" },
    { key: "Ctrl + B", description: "Toggle sidebar" },
    { key: "Ctrl + 1", description: "Switch to Write tab" },
    { key: "Ctrl + 2", description: "Switch to Preview tab" },
    { key: "Ctrl + 3", description: "Switch to Stats tab" },
];

export function KeyboardShortcutsModal() {
    const [open, setOpen] = React.useState(false);

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
                <button className="inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground h-9 py-5 px-3 rounded-md">
                    <Keyboard className="h-4 w-4" />
                </button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <AnimatePresence>
                    {open && (
                        <>
                            <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
                            <Dialog.Content className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background shadow-lg duration-200 sm:rounded-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                    className="p-6"
                                >
                                    <div className="flex flex-col space-y-1.5 text-center sm:text-left">
                                        <Dialog.Title className="text-lg font-semibold leading-none tracking-tight">
                                            Keyboard Shortcuts
                                        </Dialog.Title>
                                        <Dialog.Description className="text-sm text-muted-foreground">
                                            Quick access to TypeWindow features
                                        </Dialog.Description>
                                    </div>
                                    <div className="grid gap-2 mt-4">
                                        {shortcuts.map((shortcut) => (
                                            <div
                                                key={shortcut.key}
                                                className="flex items-center justify-between py-2"
                                            >
                                                <span className="text-sm">{shortcut.description}</span>
                                                <kbd className="px-2 py-1 text-xs rounded bg-muted font-mono">
                                                    {shortcut.key}
                                                </kbd>
                                            </div>
                                        ))}
                                    </div>
                                    <Dialog.Close asChild>
                                        <button
                                            className="absolute right-4 top-4 inline-flex h-6 w-6 appearance-none items-center justify-center rounded-full text-muted-foreground hover:bg-muted"
                                            aria-label="Close"
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    </Dialog.Close>
                                </motion.div>
                            </Dialog.Content>
                        </>
                    )}
                </AnimatePresence>
            </Dialog.Portal>
        </Dialog.Root>
    );
}