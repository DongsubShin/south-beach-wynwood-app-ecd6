import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const navItems = [
    { label: 'Overview', icon: 'lucide:layout-dashboard', path: '/admin' },
    { label: 'Live Queue', icon: 'lucide:users-round', path: '/admin/queue' },
    { label: 'Clients', icon: 'lucide:contact-2', path: '/admin/clients' },
  ];

  const businessItems = [
    { label: 'Analytics', icon: 'lucide:bar-chart-3', path: '/admin/analytics' },
    { label: 'Commission', icon: 'lucide:wallet', path: '/admin/commission' },
  ];

  return (
    <aside className="fixed inset-y-0 left-0 w-[240px] bg-slate-50 border-r border-slate-200 flex flex-col z-50">
      <div className="p-6">
        <h1 className="text-xl font-bold text-[#1E3A5F] leading-tight">
          South Beach Cuts & <br />Wynwood Barbers
        </h1>
      </div>

      <nav className="flex-1 px-4 space-y-1 mt-4">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-2 mb-2">Main</p>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-sm font-medium ${
                isActive ? 'bg-slate-100 text-[#ED1C24]' : 'text-slate-600 hover:bg-slate-100'
              }`
            }
          >
            <span className="iconify text-lg" data-icon={item.icon}></span>
            <span>{item.label}</span>
          </NavLink>
        ))}

        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-2 mt-8 mb-2">Business</p>
        {businessItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-sm font-medium ${
                isActive ? 'bg-slate-100 text-[#ED1C24]' : 'text-slate-600 hover:bg-slate-100'
              }`
            }
          >
            <span className="iconify text-lg" data-icon={item.icon}></span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;