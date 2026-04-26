"use client"

// Sidebar.tsx
// Displays list of user lists and allows selection

type ItemList = {
    color: string
    id: number
    name: string
}

type Props = {
    lists: ItemList[]
    activeListId: number | null
    setActiveListId: (id: number | null) => void
}

export default function Sidebar({
    lists,
    activeListId,
    setActiveListId,
}: Props) {
    return (
        <div style={{ width: 240, borderRight: "1px solid #333", padding: 16 }}>
    <h2>Lists</h2>

    {lists.map(list => (
        <div
            key={list.id}
            onClick={() => setActiveListId(list.id)}
            className={`row ${activeListId === list.id ? "active" : ""}`}
            style={{ "--row-color": list.color } as React.CSSProperties}
        >
            {list.name}
        </div>
    ))}
    </div>
)
}