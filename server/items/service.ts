import * as repo from "./repo"

export async function getItems(listId: number) {
    return repo.getItemsByList(listId)
}