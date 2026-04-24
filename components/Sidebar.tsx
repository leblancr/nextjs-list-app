"use client"

// Sidebar.tsx
// Displays list of user lists and allows selection

type List = {
    id: number
    name: string
}

type Props = {
    lists: List[]
    activeListId: number | null
    setActiveListId: (id: number | null) => void
}

export default function Sidebar({ lists, activeListId, setActiveListId }: Props) {
    return (
        <div style={{ width: 240, borderRight: "1px solid #333", padding: 16 }}>
    <h2>Lists</h2>

    {lists.map(list => (
        <div
            key={list.id}
        onClick={() => setActiveListId(list.id)}
        style={{
        padding: 8,
            cursor: "pointer",
            color: activeListId === list.id ? "#38bdf8" : "#e5e7eb"
    }}
    >
        {list.name}
        </div>
    ))}
    </div>
)
}