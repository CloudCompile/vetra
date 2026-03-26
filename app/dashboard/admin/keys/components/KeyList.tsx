interface KeyItem {
  id: string;
  name: string;
  isActive: boolean;
}

export function KeyList({ keys }: { keys: KeyItem[] }) {
  if (keys.length === 0) return <p className="text-sm text-slate-500">No keys yet.</p>;

  return (
    <ul className="space-y-2">
      {keys.map((key) => (
        <li key={key.id} className="rounded border border-slate-200 p-3 text-sm">
          <p className="font-medium">{key.name}</p>
          <p className="text-slate-500">Status: {key.isActive ? 'Active' : 'Revoked'}</p>
        </li>
      ))}
    </ul>
  );
}
