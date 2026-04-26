import type { ItemType } from "@/types/Item"
import type { ItemsListType } from "@/types/ItemsList"

type Props = {
    items: ItemType[]
    activeListId: number | null
    itemsList: ItemsListType[]
}

// receives data through props, filters it, and displays a list of items for the currently selected list.
export default function ItemsList({ items, activeListId, itemsList }: Props) {
    console.log("activeListId:", activeListId)
    console.log("items:", items)
    console.log(
        items.map(i => ({
            listId: i.listId,
            active: activeListId,
            match: i.listId === activeListId
        }))
    )

    const activeItemList = itemsList.find(
        itemList => itemList.id === activeListId
    )

    const filtered =
        activeListId === null
            ? []
            : items.filter(i => i.listId === activeListId)

    return (
        <div style={{ flex: 1, padding: 16 }}>
    <h2>Items</h2>

    {filtered.map(item => (
        <div
            key={item.id}
            className={`row ${item.listId === activeListId ? "active" : ""}`}
            style={{ "--row-color": activeItemList?.color } as React.CSSProperties}        >
            {item.title}
        </div>
    ))}
    </div>
)
}