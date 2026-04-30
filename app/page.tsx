"use client"
import { useItems } from "@/hooks/useItems"
import { useState, useEffect } from "react"
import Sidebar from "../components/Sidebar"
import ItemsList from "../components/ItemsList"

import type { ItemsListType } from "@/types/ItemsList"

export default function Page() {
    const [itemsLists, setItemsLists] = useState<ItemsListType[]>([])
    const [activeListId, setActiveListId] = useState<number | null>(null)

    const { items, createItem } = useItems(activeListId)

    // console.log("LISTS STATE IN PAGE:", lists)

    const [newListName, setNewListName] = useState("")
    const [isListOpen, setIsListOpen] = useState(false)
    const [newListColor, setNewListColor] = useState("#666666")
    const [sidebarWidth, setSidebarWidth] = useState(260)
    const [dragging, setDragging] = useState(false)

    const startDrag = () => setDragging(true)
    const stopDrag = () => setDragging(false)

    // Load all lists on first render
    useEffect(() => {
        fetch("/api/lists")
            .then(async res => {
                // console.log("FETCH URL:", res.url)
                // console.log("STATUS:", res.status)

                if (!res.ok) return []
                return res.json()
            })
            .then(data => {
                const safe = Array.isArray(data) ? data : []
                // console.log("DATA:", safe)
                setItemsLists(safe)

                if (safe.length > 0) {
                    setActiveListId(safe[0].id)
                }
            })
    }, [])

    useEffect(() => {
        if (!dragging) return

        const onMove = (e: MouseEvent) => {
            setSidebarWidth(Math.max(180, Math.min(500, e.clientX)))
        }

        const stop = () => setDragging(false)

        window.addEventListener("mousemove", onMove)
        window.addEventListener("mouseup", stop)

        return () => {
            window.removeEventListener("mousemove", onMove)
            window.removeEventListener("mouseup", stop)
        }
    }, [dragging])

    const createList = async () => {
        if (!newListName) return

        const res = await fetch("/api/lists", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: newListName,
                color: newListColor
            })
        })

        const created = await res.json()

        setItemsLists(prev => [...prev, created])
        setNewListName("")
    }

    return (
        <div
            className="app"
            style={{
                ["--accent" as any]:
                    itemsLists.find(l => l.id === activeListId)?.color || "#666"
            }}
        >
            <div style={{ width: sidebarWidth, flexShrink: 0, minWidth: 0, overflow: "hidden" }}>
                <Sidebar
                    lists={itemsLists}
                    activeListId={activeListId}
                    setActiveListId={setActiveListId}
                />
            </div>

            <div
                onMouseDown={() => setDragging(true)}
                style={{
                    width: "4px",
                    cursor: "col-resize",
                    background: "#333",
                    flexShrink: 0
                }}
            />

            <div style={{ flex: 1, minWidth: 0 }}>
                <ItemsList
                    items={items}
                    activeListId={activeListId}
                    itemsList={itemsLists}
                />
            </div>

        </div>
    )
}