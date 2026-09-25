import React from 'react';
import { Badge } from '@/components/ui/Badge';
import { differenceInDays, isPast, parseISO } from 'date-fns';

export function DeadlineBadge({ deadline }: { deadline: string }) {
  const date = parseISO(deadline);
  
  if (isPast(date)) {
    return <Badge variant="outline">Closed</Badge>;
  }

  const daysLeft = differenceInDays(date, new Date());

  if (daysLeft <= 7) {
    return <Badge variant="warning">Closing in {daysLeft} days</Badge>;
  }

  return <Badge variant="success">Open</Badge>;
}
