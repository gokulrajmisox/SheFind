import React from 'react';
import { FileText, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';
import { mockOpportunities } from '@/services/mockData';
import { Badge } from '@/components/ui/Badge';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';

export function Dashboard() {
  const activeCount = mockOpportunities.filter(o => o.status === 'active').length;
  
  return (
    <div>
      <h1 className="text-3xl font-bold text-primary mb-8">Admin Overview</h1>
      
      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-card p-6 rounded-2xl border border-border shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-success-light text-success rounded-xl">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-secondary">Active Opportunities</p>
              <p className="text-2xl font-bold text-primary">{activeCount}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-card p-6 rounded-2xl border border-border shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-warning-light text-warning rounded-xl">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-secondary">Pending Verification</p>
              <p className="text-2xl font-bold text-primary">2</p>
            </div>
          </div>
        </div>

        <div className="bg-card p-6 rounded-2xl border border-border shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-accent-light text-accent rounded-xl">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-secondary">Expiring Soon</p>
              <p className="text-2xl font-bold text-primary">4</p>
            </div>
          </div>
        </div>

        <div className="bg-card p-6 rounded-2xl border border-border shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gray-100 text-gray-600 rounded-xl">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-secondary">Drafts</p>
              <p className="text-2xl font-bold text-primary">1</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Opportunities */}
      <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border flex justify-between items-center">
          <h2 className="text-lg font-semibold text-primary">Recently Updated</h2>
          <Link to="/admin/opportunities" className="text-sm font-medium text-accent hover:underline">
            View All
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-background-alt text-secondary">
              <tr>
                <th className="px-6 py-4 font-medium">Opportunity</th>
                <th className="px-6 py-4 font-medium">Organization</th>
                <th className="px-6 py-4 font-medium">Deadline</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {mockOpportunities.slice(0, 5).map(opp => (
                <tr key={opp.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-primary">{opp.title}</td>
                  <td className="px-6 py-4 text-secondary">{opp.organization}</td>
                  <td className="px-6 py-4 text-secondary tabular-nums">
                    {format(parseISO(opp.application_deadline), 'dd MMM yyyy')}
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={opp.status === 'active' ? 'success' : 'default'}>
                      {opp.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-3">
                      <button className="text-accent hover:underline">Edit</button>
                      <button className="text-secondary hover:text-primary">Preview</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
