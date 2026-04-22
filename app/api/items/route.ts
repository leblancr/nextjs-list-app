let lists: { id: number; name: string }[] = []

export async function GET() {
    return Response.json(lists)
}

export async function POST(req: Request) {
    const { searchParams } = new URL(req.url)
    const name = searchParams.get("name")

    const newList = {
        id: Date.now(),
        name: name ?? ""
    }

    lists.push(newList)

    return Response.json(newList)
}
