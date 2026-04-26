"use client"

import { useState, useEffect } from "react"
import { useItems } from "@/hooks/useItems"

import Sidebar from "../components/Sidebar"
import ItemsList from "../components/ItemsList"

import type { ItemsListType } from "@/types/ItemsList"

export default function Page() {
    const [itemsLists, setItemsLists] = useState<ItemsListType[]>([])
    const [activeListId, setActiveListId] = useState<number | null>(null)

    const { items, createItem } = useItems(activeListId)

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
                setItemsLists(safe)

                if (safe.length > 0) {
                    setActiveListId(safe[0].id)
                }
            })
    }, [])

    const createList = async () => {
        if (!newListName) return

        const res = await fetch("/api/lists?name=" + encodeURIComponent(newListName), {
            method: "POST"
        })

        const created = await res.json()

        setItemsLists(prev => [...prev, created])
        setNewListName("")
    }

    return (
        <div style={{ display: "flex", height: "100vh", background: "#111", color: "#e5e7eb" }}>
            <Sidebar
                lists={itemsLists}
                activeListId={activeListId}
                setActiveListId={setActiveListId}
            />

            <ItemsList
                items={items}
                activeListId={activeListId}
                itemsList={itemsLists}
            />
        </div>
    )
}