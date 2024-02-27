export default function MainFooterArt() {
  return (
    <div className="mt-24 bg-card-foreground pb-36">
      {Array.from({ length: 23 }).map((_, i) => (
        <div
          key={i}
          className="bg-card"
          style={{
            marginTop: `${0 + i}px`,
            height: `${23 - i}px`
          }}
        />
      ))}
    </div>
  )
}
