import { CreateKeyForm } from './components/CreateKeyForm';
import { KeyList } from './components/KeyList';

export default function KeysPage() {
  return (
    <main className="space-y-4">
      <h1 className="text-2xl font-semibold">API Keys</h1>
      <CreateKeyForm />
      <KeyList keys={[]} />
    </main>
  );
}
