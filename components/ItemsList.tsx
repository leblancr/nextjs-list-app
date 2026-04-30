import type { ItemType } from "@/types/Item"
import type { ItemsListType } from "@/types/ItemsList"
import Item from "./Item"

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

    const activeListColor = activeItemList?.color
    const activeListName = activeItemList?.name || "Items"

    const filtered =
        activeListId === null
            ? []
            : items.filter(i => i.listId === activeListId)

    return (
        <div className="content">
            <h1
                style={{
                    border: `1px solid ${activeListColor || "#666"}`,
                    backgroundColor: `${activeListColor || "#666"}20`
                }}
            >
                {activeListName}
            </h1>

            {filtered.map(item => (
                <Item
                    key={item.id}
                    title={item.title}
                    color={activeItemList?.color}
                />
            ))}
        </div>
    )
}