import { Badge } from '@/components/ui/Badge';
import { differenceInDays, isPast, parseISO } from 'date-fns';

export function DeadlineBadge({ deadline }: { deadline: string | null }) {
  if (!deadline) return <Badge variant="outline">Deadline TBC</Badge>;
  const date = parseISO(deadline);
  if (isPast(date)) return <Badge variant="outline">Closed</Badge>;
  const daysLeft = differenceInDays(date, new Date());
  if (daysLeft <= 7) return <Badge variant="warning">Closing in {Math.max(daysLeft, 0)} days</Badge>;
  return <Badge variant="success">Open</Badge>;
}
