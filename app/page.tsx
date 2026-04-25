"use client"

import type { Item } from "@/types/Item"

import { useState, useEffect } from "react"
import Sidebar from "../components/Sidebar"
import ItemList from "../components/ItemList"

type List = {
    id: number
    name: string
}

export default function Page() {
    const [lists, setLists] = useState<List[]>([])
    const [items, setItems] = useState<Item[]>([])
    const [activeListId, setActiveListId] = useState<number | null>(null)

    // console.log("LISTS STATE IN PAGE:", lists)

    const [newListName, setNewListName] = useState("")
    const [newItemText, setNewItemText] = useState("")

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
                setLists(safe)

                if (safe.length > 0) {
                    setActiveListId(safe[0].id)
                }
            })
    }, [])

    // If no list selected, don't fetch items
    useEffect(() => {
        if (!activeListId) return

        // Load items for the selected list
        // api converts text AS "title", list_id AS "listId"
        fetch(`/api/items?list_id=${activeListId}`)
            .then(res => res.json())
            .then(data => {
                console.log("ITEMS API:", data)
                setItems(data)
            })
    }, [activeListId])

    const createItem = async () => {
        if (!newItemText || !activeListId) return

        const res = await fetch("/api/items", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                text: newItemText,
                list_id: activeListId
            })
        })

        const created = await res.json()

        setItems(prev => [...prev, created])
        setNewItemText("")
    }

    const createList = async () => {
        if (!newListName) return

        const res = await fetch("/api/lists?name=" + encodeURIComponent(newListName), {
            method: "POST"
        })

        const created = await res.json()

        setLists(prev => [...prev, created])
        setNewListName("")
    }

    return (
        <div style={{ display: "flex", height: "100vh", background: "#111", color: "#e5e7eb" }}>
            <Sidebar
                lists={lists}
                activeListId={activeListId}
                setActiveListId={setActiveListId}
            />

            <ItemList
                items={items}
                activeListId={activeListId}
            />
        </div>
    )
}