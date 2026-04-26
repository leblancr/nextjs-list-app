// hooks/useItems.ts

import { useEffect, useState } from "react"
import type { Item } from "@/types/Item"

// React hook, not a single action function.
export function useItems(listId: number | null) {
    const [items, setItems] = useState<Item[]>([])

    useEffect(() => {
        if (!listId) return

        fetch(`/api/items?list_id=${listId}`)
            .then(res => res.json())
            .then(setItems)
    }, [listId])

    async function createItem(text: string) {
        if (!listId) return

        const res = await fetch("/api/items", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                text,
                list_id: listId
            })
        })

        const created = await res.json()

        setItems(prev => [...prev, created])
    }

    return { items, createItem }
}