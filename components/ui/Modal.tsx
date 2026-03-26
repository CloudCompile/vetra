import { PropsWithChildren } from 'react';

interface ModalProps extends PropsWithChildren {
  open: boolean;
  title: string;
}

export function Modal({ open, title, children }: ModalProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="clay-card w-full max-w-lg rounded-3xl p-6">
        <h2 className="mb-3 text-lg font-semibold text-vetra-ink">{title}</h2>
        {children}
      </div>
    </div>
  );
}
