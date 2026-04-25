import type { Item } from "@/types/Item"

type Props = {
    items: Item[]
    activeListId: number | null
}

// receives data through props, filters it, and displays a list of items for the currently selected list.
export default function ItemList({ items, activeListId }: Props) {
    console.log("activeListId:", activeListId)
    console.log("items:", items)
    console.log(
        items.map(i => ({
            listId: i.listId,
            active: activeListId,
            match: i.listId === activeListId
        }))
    )

    const filtered =
        activeListId === null
            ? []
            : items.filter(i => i.listId === activeListId)

    return (
        <div style={{ flex: 1, padding: 16 }}>
    <h2>Items</h2>

    {filtered.map(item => (
        <div key={item.id} style={{ padding: 8 }}>
        {item.title}
        </div>
    ))}
    </div>
)
}