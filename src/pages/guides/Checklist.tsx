export default function Checklist({ items }: { items: string[] }) {
  return (
    <div className="checklist">
      {items.map((t) => (
        <label className="check-row" key={t}>
          <input type="checkbox" />
          {t}
        </label>
      ))}
    </div>
  );
}
