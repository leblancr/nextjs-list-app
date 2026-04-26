import { useEffect, useState } from "react"
import type { Item } from "@/types/Item"

export function useItems(listId: number | null) {
    const [items, setItems] = useState<Item[]>([])

    useEffect(() => {
        if (!listId) return

        fetch(`/api/items?list_id=${listId}`)
            .then(res => res.json())
            .then(setItems)
    }, [listId])

    return items
}