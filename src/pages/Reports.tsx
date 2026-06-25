import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Icon from '@/components/ui/icon';

const PERIODS = ['Неделя', 'Месяц', 'Квартал', 'Год'];

const WEEK_DATA = [
  { d: 'Пн', orders: 12, revenue: 38, done: 11 },
  { d: 'Вт', orders: 18, revenue: 52, done: 17 },
  { d: 'Ср', orders: 15, revenue: 41, done: 14 },
  { d: 'Чт', orders: 21, revenue: 60, done: 19 },
  { d: 'Пт', orders: 17, revenue: 47, done: 16 },
  { d: 'Сб', orders: 24, revenue: 72, done: 22 },
  { d: 'Вс', orders: 10, revenue: 35, done: 9 },
];

const SERVICE_BREAKDOWN = [
  { type: 'Генеральная', count: 42, revenue: 344400, pct: 45, color: 'bg-primary' },
  { type: 'Поддерживающая', count: 31, revenue: 139500, pct: 33, color: 'bg-accent' },
  { type: 'Мойка окон', count: 14, revenue: 43400, pct: 15, color: 'bg-info' },
  { type: 'Химчистка', count: 7, revenue: 46900, pct: 7, color: 'bg-warning' },
];

const TOP_STAFF = [
  { name: 'Анна Котова', done: 148, revenue: 584200, rating: 4.9, onTime: 97 },
  { name: 'Игорь Лебедев', done: 93, revenue: 288300, rating: 4.7, onTime: 91 },
  { name: 'Мария Седова', done: 72, revenue: 324000, rating: 4.8, onTime: 95 },
  { name: 'Олег Титов', done: 41, revenue: 205000, rating: 4.6, onTime: 88 },
];

const Reports = () => {
  const [period, setPeriod] = useState('Неделя');
  const maxRev = Math.max(...WEEK_DATA.map(d => d.revenue));
  const maxOrd = Math.max(...WEEK_DATA.map(d => d.orders));

  const totOrders = WEEK_DATA.reduce((a, d) => a + d.orders, 0);
  const totRevenue = WEEK_DATA.reduce((a, d) => a + d.revenue, 0);
  const totDone = WEEK_DATA.reduce((a, d) => a + d.done, 0);
  const completionRate = Math.round((totDone / totOrders) * 100);

  return (
    <DashboardLayout
      title="Отчёты"
      subtitle="Аналитика и показатели эффективности"
      action={
        <button className="flex items-center gap-2 h-9 px-4 rounded-lg border border-border text-sm font-semibold text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
          <Icon name="Download" size={16} /> Экспорт
        </button>
      }
    >
      <div className="space-y-4">
        {/* Period switcher */}
        <div className="flex gap-1">
          {PERIODS.map(p => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`h-9 px-4 rounded-lg text-sm font-semibold transition-colors border ${
                period === p
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'border-border text-muted-foreground hover:bg-secondary hover:text-foreground'
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        {/* KPI strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label: 'Заказов', value: totOrders, icon: 'ClipboardList', tone: 'accent', suffix: '' },
            { label: 'Выручка, тыс. ₽', value: totRevenue, icon: 'TrendingUp', tone: 'primary', suffix: '' },
            { label: 'Выполнено', value: totDone, icon: 'CheckCircle', tone: 'primary', suffix: '' },
            { label: 'Выполнение в срок', value: completionRate, icon: 'Timer', tone: 'info', suffix: '%' },
          ].map((k, i) => (
            <div
              key={k.label}
              className="animate-fade-in rounded-xl border border-border bg-card p-4"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <Icon name={k.icon} size={18} className={`text-${k.tone} mb-2`} />
              <div className="text-2xl font-extrabold font-mono-num">{k.value}{k.suffix}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{k.label}</div>
            </div>
          ))}
        </div>

        {/* Main charts row */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          {/* Combo chart */}
          <div className="xl:col-span-2 rounded-xl border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-bold">Заказы и выручка по дням</h2>
                <p className="text-[11px] text-muted-foreground">шт. и тыс. ₽</p>
              </div>
              <div className="flex items-center gap-4 text-[11px] text-muted-foreground">
                <span className="flex items-center gap-1.5"><span className="w-3 h-2 rounded-sm bg-primary inline-block" />Выручка</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-2 rounded-sm bg-accent/60 inline-block" />Заказы</span>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-2 h-52 items-end grid-bg rounded-lg p-3">
              {WEEK_DATA.map((d, i) => (
                <div key={d.d} className="flex flex-col items-center gap-1.5 h-full justify-end">
                  <div className="flex gap-0.5 items-end w-full" style={{ height: '85%' }}>
                    <div
                      className="flex-1 rounded-t bg-primary animate-bar origin-bottom"
                      style={{ height: `${(d.revenue / maxRev) * 100}%`, animationDelay: `${i * 80}ms` }}
                    />
                    <div
                      className="flex-1 rounded-t bg-accent/50 animate-bar origin-bottom"
                      style={{ height: `${(d.orders / maxOrd) * 100}%`, animationDelay: `${i * 80 + 40}ms` }}
                    />
                  </div>
                  <span className="text-[10px] text-muted-foreground">{d.d}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Service breakdown */}
          <div className="rounded-xl border border-border bg-card p-5">
            <h2 className="font-bold mb-1">Структура услуг</h2>
            <p className="text-[11px] text-muted-foreground mb-4">по количеству заказов</p>

            {/* Stacked bar */}
            <div className="flex h-4 rounded-full overflow-hidden mb-4 gap-0.5">
              {SERVICE_BREAKDOWN.map(s => (
                <div key={s.type} className={`${s.color} h-full`} style={{ width: `${s.pct}%` }} />
              ))}
            </div>

            <div className="space-y-3">
              {SERVICE_BREAKDOWN.map(s => (
                <div key={s.type}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <div className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-sm ${s.color}`} />
                      <span className="text-foreground/80">{s.type}</span>
                    </div>
                    <div className="flex gap-3">
                      <span className="font-mono-num text-muted-foreground">{s.count} заказов</span>
                      <span className="font-mono-num font-semibold">{(s.revenue / 1000).toFixed(0)} тыс.</span>
                    </div>
                  </div>
                  <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                    <div className={`h-full ${s.color}`} style={{ width: `${s.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Staff performance */}
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="p-4 border-b border-border">
            <h2 className="font-bold">Эффективность сотрудников</h2>
            <p className="text-[11px] text-muted-foreground">за выбранный период</p>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[11px] uppercase tracking-wide text-muted-foreground border-b border-border">
                <th className="font-medium px-5 py-3">Сотрудник</th>
                <th className="font-medium px-3 py-3">Выполнено</th>
                <th className="font-medium px-3 py-3">Выручка</th>
                <th className="font-medium px-3 py-3">В срок</th>
                <th className="font-medium px-3 py-3">Рейтинг</th>
                <th className="font-medium px-5 py-3">Эффективность</th>
              </tr>
            </thead>
            <tbody>
              {TOP_STAFF.map((s, i) => (
                <tr key={s.name} className="animate-fade-in border-b border-border/60 last:border-0 hover:bg-secondary/30 transition-colors" style={{ animationDelay: `${i * 50}ms` }}>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-secondary flex items-center justify-center text-xs font-bold">
                        {s.name.split(' ').map(p => p[0]).join('')}
                      </div>
                      <span className="font-semibold">{s.name}</span>
                    </div>
                  </td>
                  <td className="px-3 py-3 font-mono-num font-semibold">{s.done}</td>
                  <td className="px-3 py-3 font-mono-num">{(s.revenue / 1000).toFixed(0)} тыс. ₽</td>
                  <td className="px-3 py-3">
                    <span className={`font-mono-num font-semibold ${s.onTime >= 95 ? 'text-primary' : s.onTime >= 90 ? 'text-warning' : 'text-destructive'}`}>
                      {s.onTime}%
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <span className="flex items-center gap-1 text-warning font-semibold">
                      <Icon name="Star" size={12} /> {s.rating}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 rounded-full bg-secondary overflow-hidden max-w-[80px]">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${s.onTime}%` }} />
                      </div>
                      <span className="text-[11px] text-muted-foreground">{s.onTime}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Reports;
