import { PlanEditor } from './components/PlanEditor';
import { PlanList } from './components/PlanList';

export default function PlansPage() {
  return (
    <main className="space-y-4">
      <h1 className="text-2xl font-semibold">Plans</h1>
      <PlanEditor />
      <PlanList plans={[]} />
    </main>
  );
}
