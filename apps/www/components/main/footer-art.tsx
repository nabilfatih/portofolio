const artRows = Array.from({ length: 23 }, (_, index) => index);

export default function MainFooterArt() {
  return (
    <div aria-hidden="true" className="mt-24 bg-card-foreground pb-36">
      {artRows.map((row) => (
        <div
          className="bg-card"
          key={row}
          style={{
            height: `${23 - row}px`,
            marginTop: `${row}px`,
          }}
        />
      ))}
    </div>
  );
}
