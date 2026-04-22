import type { Item } from "@/types/Item"

type Props = {
    items: Item[]
    activeListId: number | null
}

export default function ItemList({ items, activeListId }: Props) {
    const filtered = items.filter(i => i.listId === activeListId)

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