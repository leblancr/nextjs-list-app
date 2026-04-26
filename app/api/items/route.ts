import * as ItemsService from "@/server/items/service"

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const listId = Number(searchParams.get("list_id"))

    const items = await ItemsService.getItems(listId)

    return Response.json(items)
}