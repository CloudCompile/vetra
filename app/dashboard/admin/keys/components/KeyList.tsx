interface KeyItem {
  id: string;
  name: string;
  isActive: boolean;
  key?: string | null;
  planName?: string | null;
  userEmail?: string | null;
  usageThisMonth?: number | null;
  lastUsedAt?: string | null;
  expiresAt?: string | null;
}

export function KeyList({ keys }: { keys: KeyItem[] }) {
  if (keys.length === 0) return <p className="text-sm text-vetra-ink/70">No keys yet.</p>;

  return (
    <ul className="space-y-2">
      {keys.map((key) => (
        <li key={key.id} className="clay-card rounded-3xl p-4 text-sm">
          <p className="font-medium">{key.name}</p>
          <p className="text-vetra-ink/70">Status: {key.isActive ? 'Active' : 'Revoked'}</p>
          {key.key ? (
            <p className="text-vetra-ink/70">
              Key: {key.key.slice(0, 6)}…{key.key.slice(-4)}
            </p>
          ) : null}
          {key.planName ? <p className="text-vetra-ink/70">Plan: {key.planName}</p> : null}
          {key.userEmail ? <p className="text-vetra-ink/70">User: {key.userEmail}</p> : null}
          {typeof key.usageThisMonth === 'number' ? (
            <p className="text-vetra-ink/70">Usage: {key.usageThisMonth} reqs this month</p>
          ) : null}
          {key.lastUsedAt ? <p className="text-vetra-ink/70">Last used: {key.lastUsedAt}</p> : null}
          {key.expiresAt ? <p className="text-vetra-ink/70">Expires: {key.expiresAt}</p> : null}
        </li>
      ))}
    </ul>
  );
}
