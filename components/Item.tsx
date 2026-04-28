type Props = {
    title: string
    color?: string
}

export default function Item({ title, color }: Props) {
    return (
        <div
            className="row"
            style={{ "--row-color": color } as React.CSSProperties}
        >
            {title}
        </div>
    )
}