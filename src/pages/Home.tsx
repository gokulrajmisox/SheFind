import React from 'react';
import { ArrowRight, CalendarDays, Check, Search, ShieldCheck, Sparkles } from 'lucide-react';
import { mockOpportunities } from '@/services/mockData';
import { OpportunityCard } from '@/components/OpportunityCard';
import { Link } from 'react-router-dom';

export function Home() {
  const featured = mockOpportunities[0];
  const recent = mockOpportunities.slice(1, 4);
  const tags = ['Undergraduate', 'Postgraduate', 'Skill development', 'Financial support'];

  return (
    <div className="home-shell">
      <section className="hero-wrap">
        <div className="hero-grid">
          <div>
            <span className="eyebrow">A better way forward</span>
            <h1 className="hero-title">Your next <em>chapter</em> starts here.</h1>
            <p className="hero-copy">SheFind brings verified scholarships, schemes, and support into one calm, clear place—so you can spend less time searching and more time moving forward.</p>
            <div className="hero-actions">
              <Link to="/explore" className="primary-cta">Explore opportunities <ArrowRight size={16} /></Link>
              <Link to="/how-it-works" className="text-cta">How SheFind works <ArrowRight size={15} /></Link>
            </div>
            <div className="hero-note"><ShieldCheck size={16} /><span>Every opportunity is checked against its official source.</span></div>
          </div>
          <div className="hero-art" aria-label="A warm abstract illustration representing possibility">
            <span className="art-label">SheFind / 2024 — 2025</span>
            <div className="art-quote"><p>“The right support can change the shape of a life.”</p><span>Opportunities for women and girls, thoughtfully found.</span></div>
          </div>
        </div>
      </section>

      <section className="trust-strip">
        <div className="trust-inner">
          <div className="trust-item"><ShieldCheck size={16} /> Verified opportunities</div>
          <div className="trust-item"><Check size={16} /> Official sources</div>
          <div className="trust-item"><Sparkles size={16} /> Eligibility checked</div>
          <div className="trust-item"><CalendarDays size={16} /> Deadline tracked</div>
        </div>
      </section>

      <section className="home-section">
        <span className="section-kicker">Start with what you need</span>
        <h2 className="section-heading">Find a little more room to grow.</h2>
        <p className="section-intro">Search by what you are working toward. We will help you find the support that fits.</p>
        <div className="search-panel">
          <Search size={18} color="#9b9197" />
          <input type="text" placeholder="Try “technical education” or “business support”" aria-label="Search opportunities" />
          <Link to="/explore" className="search-button">Search</Link>
        </div>
        <div className="tag-row">{tags.map(tag => <Link className="tag" key={tag} to="/explore">{tag}</Link>)}</div>
      </section>

      <section className="home-section" style={{ paddingTop: 20 }}>
        <span className="section-kicker">Worth knowing</span>
        <div className="featured-card">
          <div className="featured-main">
            <span className="featured-label">Featured opportunity</span>
            <h2 className="featured-title">{featured.title}</h2>
            <p className="featured-desc">{featured.description}</p>
            <Link to={`/opportunity/${featured.slug}`} className="primary-cta" style={{ marginTop: 25 }}>View details <ArrowRight size={16} /></Link>
          </div>
          <div className="featured-side">
            <div><div className="stat-label">Benefit</div><div className="stat-value">{featured.benefits}</div></div>
            <div><div className="stat-label">Designed for</div><div className="stat-value">{featured.eligibility_text}</div></div>
            <div><div className="stat-label">Application</div><div className="stat-value">Closing soon</div></div>
            <a className="official-link" href={featured.official_application_url} target="_blank" rel="noopener noreferrer">Visit official portal <ArrowRight size={15} style={{ verticalAlign: 'middle', marginLeft: 4 }} /></a>
          </div>
        </div>
      </section>

      <section className="home-section" style={{ paddingTop: 45 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: 20 }}>
          <div><span className="section-kicker">A considered shortlist</span><h2 className="section-heading">More to explore</h2></div>
          <Link to="/explore" className="text-cta">View all <ArrowRight size={15} /></Link>
        </div>
        <div className="opportunity-grid">{recent.map(opp => <OpportunityCard key={opp.id} opportunity={opp} />)}</div>
      </section>
    </div>
  );
}
