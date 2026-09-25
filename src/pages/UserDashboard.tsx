import { Link } from 'react-router-dom';
import { ArrowRight, Bookmark, CalendarDays, UserRound } from 'lucide-react';
import { useAuth } from '@/auth/useAuth';

export function UserDashboard() {
  const { user, signOut } = useAuth();
  const name = user?.user_metadata?.full_name?.split(' ')[0] || 'there';
  return <div className="user-dashboard"><div className="dashboard-inner"><div className="dashboard-top"><div><span className="section-kicker">Your SheFind</span><h1>Welcome back, {name}.</h1><p>Keep your next steps close and your options open.</p></div><button className="dashboard-signout" onClick={() => void signOut()}>Sign out</button></div><div className="dashboard-grid"><div className="dashboard-card dashboard-card-large"><div className="dashboard-icon"><Bookmark size={19} /></div><span className="dashboard-card-kicker">Saved opportunities</span><h2>Your shortlist is waiting.</h2><p>Save the scholarships and support programmes you want to come back to.</p><Link to="/explore" className="text-cta">Explore opportunities <ArrowRight size={15} /></Link></div><div className="dashboard-card"><div className="dashboard-icon"><CalendarDays size={19} /></div><span className="dashboard-card-kicker">Upcoming deadlines</span><strong>Stay on track</strong><p>Deadline reminders will appear here as you save opportunities.</p></div><div className="dashboard-card"><div className="dashboard-icon"><UserRound size={19} /></div><span className="dashboard-card-kicker">Your profile</span><strong>Make it yours</strong><p>Add your education and interests to discover more relevant support.</p></div></div></div></div>;
}
