import { useState, ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import Icon from '@/components/ui/icon';

export const NAV = [
  { to: '/', label: 'Дашборд', icon: 'LayoutDashboard' },
  { to: '/orders', label: 'Заказы', icon: 'ClipboardList' },
  { to: '/staff', label: 'Сотрудники', icon: 'Users' },
  { to: '/reports', label: 'Отчёты', icon: 'BarChart3' },
  { to: '/finance', label: 'Финансы', icon: 'Wallet' },
  { to: '/clients', label: 'Клиенты', icon: 'Contact' },
  { to: '/photos', label: 'Фотоотчёты', icon: 'Image' },
  { to: '/settings', label: 'Настройки', icon: 'Settings' },
];

const Sidebar = ({ onNav }: { onNav?: () => void }) => (
  <div className="flex flex-col h-full">
    <div className="flex items-center gap-2.5 px-5 h-16 border-b border-border shrink-0">
      <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center shrink-0">
        <Icon name="Sparkles" size={20} className="text-primary-foreground" />
      </div>
      <div className="leading-tight">
        <div className="font-extrabold tracking-tight">Cleaning OS</div>
        <div className="text-[11px] text-muted-foreground">Центр управления</div>
      </div>
    </div>

    <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
      {NAV.map((n) => (
        <NavLink
          key={n.to}
          to={n.to}
          end={n.to === '/'}
          onClick={onNav}
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              isActive
                ? 'bg-primary/15 text-primary'
                : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
            }`
          }
        >
          <Icon name={n.icon} size={18} />
          {n.label}
        </NavLink>
      ))}
    </nav>

    <div className="p-3 m-3 rounded-xl bg-secondary/60 border border-border shrink-0">
      <div className="flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold shrink-0">
          КС
        </div>
        <div className="text-sm leading-tight">
          <div className="font-semibold">Клин-Сервис</div>
          <div className="text-[11px] text-muted-foreground">Тариф «Команда»</div>
        </div>
      </div>
    </div>
  </div>
);

interface Props {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
}

const DashboardLayout = ({ title, subtitle, action, children }: Props) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen flex text-foreground">
      {/* Desktop sidebar */}
      <aside className="hidden md:block w-60 shrink-0 border-r border-border bg-card/60 backdrop-blur-sm sticky top-0 h-screen">
        <Sidebar />
      </aside>

      {/* Mobile drawer overlay */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-40">
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="absolute left-0 top-0 h-full w-64 bg-card border-r border-border animate-fade-in">
            <Sidebar onNav={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}

      <main className="flex-1 min-w-0">
        <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm flex items-center justify-between px-4 md:px-8 sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground"
            >
              <Icon name="Menu" size={18} />
            </button>
            <div>
              <h1 className="text-lg md:text-xl font-extrabold tracking-tight">{title}</h1>
              {subtitle && (
                <p className="text-[11px] text-muted-foreground">{subtitle}</p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="relative w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
              <Icon name="Bell" size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-destructive" />
            </button>
            {action}
          </div>
        </header>

        <div className="p-4 md:p-8">{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;
