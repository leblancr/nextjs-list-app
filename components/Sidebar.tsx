"use client"

import { useState } from "react"

type ItemList = {
    color: string
    id: number
    name: string
}

type Props = {
    lists: ItemList[]
    activeListId: number | null
    setActiveListId: (id: number | null) => void
    createList: (name: string, color: string) => void
}

export default function Sidebar({
                                    lists,
                                    activeListId,
                                    setActiveListId,
                                    createList,
                                }: Props) {

    const [isListOpen, setIsListOpen] = useState(false)
    const [newListName, setNewListName] = useState("")
    const [newListColor, setNewListColor] = useState("#666666")

    return (
        <>
            <div className="sidebar">
                <h1>Lists</h1>

                {lists.map(list => (
                    <div
                        key={list.id}
                        onClick={() => setActiveListId(list.id)}
                        className={`row ${activeListId === list.id ? "active" : ""}`}
                        style={{ "--row-accent": list.color } as React.CSSProperties}
                    >
                        {list.name}
                    </div>
                ))}

                <div>
                    <button onClick={() => setIsListOpen(true)}>
                        New List
                    </button>
                </div>

            </div>

            {isListOpen && (
                <div
                    className="overlay"
                    onClick={() => setIsListOpen(false)}
                >
                    <div
                        className="modal"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3>New List</h3>

                        <input
                            value={newListName}
                            onChange={(e) => setNewListName(e.target.value)}
                            placeholder="List name"
                        />

                        <input
                            type="color"
                            value={newListColor}
                            onChange={(e) => setNewListColor(e.target.value)}
                        />

                        <button
                            onClick={() => {
                                createList(newListName, newListColor)
                                setIsListOpen(false)
                            }}
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}