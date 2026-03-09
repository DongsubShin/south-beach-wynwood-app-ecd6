import React from 'react';

const DashboardPage: React.FC = () => {
  return (
    <div className="space-y-8">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Overview</h2>
          <p className="text-slate-500">Welcome back, here's what's happening today.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-md text-sm font-medium text-slate-600 hover:bg-slate-50">
            Export Report
          </button>
          <button className="px-4 py-2 bg-[#ED1C24] text-white rounded-md text-sm font-medium hover:bg-opacity-90">
            Add Appointment
          </button>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Revenue', value: '$1,284.00', icon: 'lucide:dollar-sign', color: 'text-emerald-600' },
          { label: 'Appointments', value: '24', icon: 'lucide:calendar', color: 'text-blue-600' },
          { label: 'Queue Size', value: '8', icon: 'lucide:users', color: 'text-amber-600' },
          { label: 'Avg. Wait', value: '15m', icon: 'lucide:clock', color: 'text-purple-600' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <span className={`p-2 rounded-lg bg-slate-50 ${stat.color}`}>
                <span className="iconify text-xl" data-icon={stat.icon}></span>
              </span>
            </div>
            <p className="text-sm font-medium text-slate-500">{stat.label}</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Live Queue Section */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-bold text-slate-900">Live Walk-in Queue</h3>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Active</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3 font-semibold">Client</th>
                <th className="px-6 py-3 font-semibold">Service</th>
                <th className="px-6 py-3 font-semibold">Wait Time</th>
                <th className="px-6 py-3 font-semibold">Status</th>
                <th className="px-6 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[1, 2, 3].map((i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-900">John Doe</div>
                    <div className="text-xs text-slate-500">Walk-in</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">Signature Fade</td>
                  <td className="px-6 py-4 text-sm text-slate-600">~12 mins</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded-full text-[10px] font-bold uppercase bg-amber-100 text-amber-700">Waiting</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-[#ED1C24] hover:underline text-sm font-medium">Check In</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;