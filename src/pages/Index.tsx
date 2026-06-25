import { useState } from 'react';
import Icon from '@/components/ui/icon';

const NAV = [
  { id: 'dashboard', label: 'Дашборд', icon: 'LayoutDashboard' },
  { id: 'orders', label: 'Заказы', icon: 'ClipboardList' },
  { id: 'staff', label: 'Сотрудники', icon: 'Users' },
  { id: 'reports', label: 'Отчёты', icon: 'BarChart3' },
  { id: 'finance', label: 'Финансы', icon: 'Wallet' },
  { id: 'clients', label: 'Клиенты', icon: 'Contact' },
  { id: 'photos', label: 'Фотоотчёты', icon: 'Image' },
  { id: 'settings', label: 'Настройки', icon: 'Settings' },
];

const KPIS = [
  { label: 'Заказов сегодня', value: '24', delta: '+6', up: true, icon: 'CalendarCheck', tone: 'primary', sub: 'к вчерашнему' },
  { label: 'В работе сейчас', value: '3', delta: 'live', up: true, icon: 'Activity', tone: 'info', sub: 'идёт уборка' },
  { label: 'Просрочки', value: '2', delta: '-1', up: false, icon: 'AlertTriangle', tone: 'destructive', sub: 'требуют внимания' },
  { label: 'Выручка за день', value: '47 500 ₽', delta: '+12%', up: true, icon: 'TrendingUp', tone: 'primary', sub: 'план 52 000 ₽' },
  { label: 'Не оплачено', value: '5 300 ₽', delta: '4 счёта', up: false, icon: 'Clock', tone: 'warning', sub: 'ожидают оплаты' },
];

const REVENUE = [
  { d: 'Пн', v: 38 }, { d: 'Вт', v: 52 }, { d: 'Ср', v: 41 }, { d: 'Чт', v: 60 },
  { d: 'Пт', v: 47 }, { d: 'Сб', v: 72 }, { d: 'Вс', v: 35 },
];

const FUNNEL = [
  { stage: 'Новая заявка', count: 24, color: 'bg-info', pct: 100 },
  { stage: 'Назначен', count: 19, color: 'bg-accent', pct: 79 },
  { stage: 'Выполнение', count: 12, color: 'bg-primary', pct: 50 },
  { stage: 'Фотоотчёт', count: 9, color: 'bg-warning', pct: 38 },
  { stage: 'Проверка', count: 7, color: 'bg-primary/70', pct: 29 },
  { stage: 'Оплачено', count: 6, color: 'bg-primary', pct: 25 },
];

const STAFF = [
  { name: 'Анна Котова', spec: 'Генеральная', load: 92, tasks: 4, status: 'busy' },
  { name: 'Игорь Лебедев', spec: 'Окна', load: 60, tasks: 2, status: 'busy' },
  { name: 'Мария Седова', spec: 'Поддерживающая', load: 35, tasks: 1, status: 'free' },
  { name: 'Олег Титов', spec: 'Химчистка', load: 0, tasks: 0, status: 'free' },
];

const ORDERS = [
  { id: '#1042', client: 'ТЦ «Галерея»', type: 'Генеральная', time: '09:00', status: 'Выполнение', tone: 'info', staff: 'Анна Котова', sum: '8 200 ₽' },
  { id: '#1041', client: 'Офис «Атлант»', type: 'Поддерживающая', time: '10:30', status: 'Назначен', tone: 'accent', staff: 'Мария Седова', sum: '4 500 ₽' },
  { id: '#1040', client: 'Квартира, Невский 28', type: 'Окна', time: '08:00', status: 'Просрочен', tone: 'destructive', staff: 'Игорь Лебедев', sum: '3 100 ₽' },
  { id: '#1039', client: 'Салон «Вита»', type: 'Химчистка', time: '12:00', status: 'Новая', tone: 'warning', staff: '—', sum: '6 700 ₽' },
  { id: '#1038', client: 'Бизнес-центр «Сфера»', type: 'Генеральная', time: '14:00', status: 'Оплачено', tone: 'primary', staff: 'Анна Котова', sum: '11 900 ₽' },
];

const toneText: Record<string, string> = {
  primary: 'text-primary', info: 'text-info', destructive: 'text-destructive', warning: 'text-warning', accent: 'text-accent',
};
const toneBg: Record<string, string> = {
  primary: 'bg-primary/15 text-primary border-primary/30',
  info: 'bg-info/15 text-info border-info/30',
  destructive: 'bg-destructive/15 text-destructive border-destructive/30',
  warning: 'bg-warning/15 text-warning border-warning/30',
  accent: 'bg-accent/15 text-accent border-accent/30',
};

const Index = () => {
  const [active, setActive] = useState('dashboard');
  const maxRev = Math.max(...REVENUE.map((r) => r.v));

  return (
    <div className="min-h-screen flex text-foreground">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-60 shrink-0 border-r border-border bg-card/60 backdrop-blur-sm">
        <div className="flex items-center gap-2.5 px-5 h-16 border-b border-border">
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center shrink-0">
            <Icon name="Sparkles" size={20} className="text-primary-foreground" />
          </div>
          <div className="leading-tight">
            <div className="font-extrabold tracking-tight">Cleaning OS</div>
            <div className="text-[11px] text-muted-foreground">Центр управления</div>
          </div>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {NAV.map((n) => (
            <button
              key={n.id}
              onClick={() => setActive(n.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active === n.id
                  ? 'bg-primary/15 text-primary'
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
              }`}
            >
              <Icon name={n.icon} size={18} />
              {n.label}
            </button>
          ))}
        </nav>
        <div className="p-3 m-3 rounded-xl bg-secondary/60 border border-border">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">КС</div>
            <div className="text-sm leading-tight">
              <div className="font-semibold">Клин-Сервис</div>
              <div className="text-[11px] text-muted-foreground">Тариф «Команда»</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 min-w-0">
        {/* Topbar */}
        <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm flex items-center justify-between px-4 md:px-8 sticky top-0 z-10">
          <div>
            <h1 className="text-lg md:text-xl font-extrabold tracking-tight">Дашборд</h1>
            <p className="text-[11px] text-muted-foreground flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary pulse-dot" />
              Среда, 25 июня · данные в реальном времени
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button className="hidden sm:flex items-center gap-2 h-9 px-3 rounded-lg border border-border text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
              <Icon name="Search" size={16} /> Поиск
            </button>
            <button className="relative w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
              <Icon name="Bell" size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-destructive" />
            </button>
            <button className="flex items-center gap-2 h-9 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity">
              <Icon name="Plus" size={16} /> Заказ
            </button>
          </div>
        </header>

        <div className="p-4 md:p-8 space-y-6">
          {/* KPI Row */}
          <section className="grid grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4">
            {KPIS.map((k, i) => (
              <div
                key={k.label}
                className="animate-fade-in rounded-xl border border-border bg-card p-4 hover:border-primary/40 transition-colors"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${toneBg[k.tone]} border`}>
                    <Icon name={k.icon} size={16} />
                  </div>
                  <span className={`text-[11px] font-semibold ${k.up ? 'text-primary' : 'text-warning'}`}>{k.delta}</span>
                </div>
                <div className="text-2xl font-extrabold font-mono-num tracking-tight">{k.value}</div>
                <div className="text-xs text-foreground/80 mt-0.5">{k.label}</div>
                <div className="text-[11px] text-muted-foreground mt-1">{k.sub}</div>
              </div>
            ))}
          </section>

          {/* Charts row */}
          <section className="grid grid-cols-1 xl:grid-cols-3 gap-4">
            {/* Revenue chart */}
            <div className="xl:col-span-2 rounded-xl border border-border bg-card p-5">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="font-bold">Выручка за неделю</h2>
                  <p className="text-[11px] text-muted-foreground">тыс. ₽ по дням</p>
                </div>
                <div className="text-right">
                  <div className="text-xl font-extrabold font-mono-num text-primary">345 000 ₽</div>
                  <div className="text-[11px] text-muted-foreground">итого за 7 дней</div>
                </div>
              </div>
              <div className="grid grid-cols-7 gap-2 md:gap-3 h-48 items-end grid-bg rounded-lg p-3">
                {REVENUE.map((r, i) => (
                  <div key={r.d} className="flex flex-col items-center justify-end gap-2 h-full">
                    <span className="text-[10px] font-mono-num text-muted-foreground">{r.v}</span>
                    <div
                      className="w-full rounded-t-md bg-gradient-to-t from-primary/40 to-primary animate-bar origin-bottom"
                      style={{ height: `${(r.v / maxRev) * 100}%`, animationDelay: `${i * 80}ms` }}
                    />
                    <span className="text-[11px] text-muted-foreground">{r.d}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Funnel */}
            <div className="rounded-xl border border-border bg-card p-5">
              <h2 className="font-bold mb-1">Жизненный цикл заказов</h2>
              <p className="text-[11px] text-muted-foreground mb-4">воронка за сегодня</p>
              <div className="space-y-3">
                {FUNNEL.map((f, i) => (
                  <div key={f.stage} className="animate-fade-in" style={{ animationDelay: `${i * 70}ms` }}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-foreground/80">{f.stage}</span>
                      <span className="font-mono-num font-semibold">{f.count}</span>
                    </div>
                    <div className="h-2 rounded-full bg-secondary overflow-hidden">
                      <div className={`h-full rounded-full ${f.color}`} style={{ width: `${f.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Bottom row: orders + auto-assign */}
          <section className="grid grid-cols-1 xl:grid-cols-3 gap-4">
            {/* Orders table */}
            <div className="xl:col-span-2 rounded-xl border border-border bg-card overflow-hidden">
              <div className="flex items-center justify-between p-5 border-b border-border">
                <h2 className="font-bold">Заказы на сегодня</h2>
                <button className="text-xs text-primary font-semibold hover:underline flex items-center gap-1">
                  Все заказы <Icon name="ArrowRight" size={14} />
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-[11px] uppercase tracking-wide text-muted-foreground border-b border-border">
                      <th className="font-medium px-5 py-3">Заказ</th>
                      <th className="font-medium px-3 py-3">Время</th>
                      <th className="font-medium px-3 py-3">Исполнитель</th>
                      <th className="font-medium px-3 py-3">Статус</th>
                      <th className="font-medium px-5 py-3 text-right">Сумма</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ORDERS.map((o) => (
                      <tr key={o.id} className="border-b border-border/60 last:border-0 hover:bg-secondary/40 transition-colors">
                        <td className="px-5 py-3">
                          <div className="font-semibold">{o.client}</div>
                          <div className="text-[11px] text-muted-foreground font-mono-num">{o.id} · {o.type}</div>
                        </td>
                        <td className="px-3 py-3 font-mono-num text-muted-foreground">{o.time}</td>
                        <td className="px-3 py-3 text-foreground/80">{o.staff}</td>
                        <td className="px-3 py-3">
                          <span className={`inline-block text-[11px] font-semibold px-2.5 py-1 rounded-md border ${toneBg[o.tone]}`}>{o.status}</span>
                        </td>
                        <td className="px-5 py-3 text-right font-mono-num font-semibold">{o.sum}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Auto-assign + staff load */}
            <div className="rounded-xl border border-border bg-card p-5 flex flex-col">
              <div className="flex items-center gap-2 mb-1">
                <Icon name="Zap" size={18} className="text-accent" />
                <h2 className="font-bold">Автоназначение</h2>
              </div>
              <p className="text-[11px] text-muted-foreground mb-4">по загрузке и специализации</p>

              <div className="rounded-lg border border-accent/30 bg-accent/10 p-3 mb-4">
                <div className="text-[11px] text-muted-foreground mb-1">Рекомендация для #1039 · Химчистка</div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-accent/20 flex items-center justify-center text-accent text-xs font-bold">ОТ</div>
                    <div className="text-sm font-semibold">Олег Титов</div>
                  </div>
                  <span className="text-[11px] font-semibold text-primary">100% совпадение</span>
                </div>
                <button className="mt-3 w-full h-8 rounded-md bg-accent text-accent-foreground text-xs font-semibold hover:opacity-90 transition-opacity">
                  Назначить автоматически
                </button>
              </div>

              <div className="text-[11px] uppercase tracking-wide text-muted-foreground mb-2">Загрузка команды</div>
              <div className="space-y-3 flex-1">
                {STAFF.map((s) => (
                  <div key={s.name} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-bold shrink-0">
                      {s.name.split(' ').map((p) => p[0]).join('')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between text-xs">
                        <span className="font-semibold truncate">{s.name}</span>
                        <span className="font-mono-num text-muted-foreground">{s.load}%</span>
                      </div>
                      <div className="text-[10px] text-muted-foreground">{s.spec} · {s.tasks} задач</div>
                      <div className="h-1.5 rounded-full bg-secondary mt-1 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${s.load > 80 ? 'bg-destructive' : s.load > 50 ? 'bg-warning' : 'bg-primary'}`}
                          style={{ width: `${s.load}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Index;
