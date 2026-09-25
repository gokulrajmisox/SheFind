import React, { useState } from 'react';
import { Bookmark } from 'lucide-react';
import { cn } from '@/lib/utils';

export function SaveButton({ opportunityId, initialSaved = false }: { opportunityId: string, initialSaved?: boolean }) {
  const [saved, setSaved] = useState(initialSaved);

  const toggleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Optimistic UI update. In real app, call Supabase here.
    setSaved(!saved);
  };

  return (
    <button
      onClick={toggleSave}
      className="p-2 rounded-full hover:bg-gray-100 transition-colors text-secondary hover:text-accent focus:outline-none"
      aria-label={`${saved ? "Remove from saved" : "Save opportunity"} ${opportunityId}`}
    >
      <Bookmark className={cn("w-5 h-5", saved && "fill-accent text-accent")} />
    </button>
  );
}
