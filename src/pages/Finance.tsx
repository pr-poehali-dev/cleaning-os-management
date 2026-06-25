import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Icon from '@/components/ui/icon';

const MONTHS = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн'];
const REVENUE_DATA = [210, 245, 189, 310, 278, 345];
const EXPENSE_DATA = [85, 92, 78, 120, 105, 118];

const TRANSACTIONS = [
  { id: 'T001', date: '25.06', desc: 'Оплата заказа #1038 — Бизнес-центр «Сфера»', type: 'income', sum: 11900, method: 'Безнал' },
  { id: 'T002', date: '25.06', desc: 'Выплата зарплаты — Анна Котова', type: 'expense', sum: 32500, method: 'Безнал' },
  { id: 'T003', date: '24.06', desc: 'Оплата заказа #1037 — Ресторан «Пальма»', type: 'income', sum: 14500, method: 'Наличные' },
  { id: 'T004', date: '24.06', desc: 'Закупка расходников (химия)', type: 'expense', sum: 8400, method: 'Карта' },
  { id: 'T005', date: '24.06', desc: 'Оплата заказа #1036 — Отель «Северный»', type: 'income', sum: 7800, method: 'Безнал' },
  { id: 'T006', date: '23.06', desc: 'Аренда склада', type: 'expense', sum: 15000, method: 'Безнал' },
  { id: 'T007', date: '23.06', desc: 'Оплата заказа #1034 — ТЦ «Галерея»', type: 'income', sum: 8200, method: 'Безнал' },
  { id: 'T008', date: '22.06', desc: 'Обслуживание инвентаря', type: 'expense', sum: 3200, method: 'Наличные' },
];

const INVOICES = [
  { id: 'INV-042', client: 'ТЦ «Галерея»', sum: 8200, issued: '25.06', due: '28.06', status: 'Ожидает' },
  { id: 'INV-041', client: 'Офис «Атлант»', sum: 4500, issued: '25.06', due: '28.06', status: 'Ожидает' },
  { id: 'INV-040', client: 'Кв. Невский 28', sum: 3100, issued: '25.06', due: '26.06', status: 'Просрочен' },
  { id: 'INV-039', client: 'Салон «Вита»', sum: 6700, issued: '25.06', due: '30.06', status: 'Черновик' },
];

const INV_TONE: Record<string, string> = {
  'Ожидает': 'bg-warning/15 text-warning border-warning/30',
  'Просрочен': 'bg-destructive/15 text-destructive border-destructive/30',
  'Черновик': 'bg-muted/50 text-muted-foreground border-border',
  'Оплачен': 'bg-primary/15 text-primary border-primary/30',
};

const Finance = () => {
  const [txFilter, setTxFilter] = useState<'all' | 'income' | 'expense'>('all');
  const maxBar = Math.max(...REVENUE_DATA);

  const filtered = TRANSACTIONS.filter(t => txFilter === 'all' || t.type === txFilter);

  const totalIncome = TRANSACTIONS.filter(t => t.type === 'income').reduce((a, t) => a + t.sum, 0);
  const totalExpense = TRANSACTIONS.filter(t => t.type === 'expense').reduce((a, t) => a + t.sum, 0);
  const totalDebt = INVOICES.filter(i => i.status !== 'Оплачен' && i.status !== 'Черновик').reduce((a, i) => a + i.sum, 0);

  return (
    <DashboardLayout
      title="Финансы"
      subtitle="Июнь 2026 · учёт доходов и расходов"
      action={
        <button className="flex items-center gap-2 h-9 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity">
          <Icon name="Plus" size={16} /> Транзакция
        </button>
      }
    >
      <div className="space-y-4">
        {/* KPI */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label: 'Выручка (июнь)', value: '345 000 ₽', delta: '+12%', icon: 'TrendingUp', tone: 'primary' },
            { label: 'Расходы (июнь)', value: '118 000 ₽', delta: '+5%', icon: 'TrendingDown', tone: 'destructive' },
            { label: 'Прибыль', value: '227 000 ₽', delta: '66%', icon: 'Wallet', tone: 'primary' },
            { label: 'К получению', value: `${totalDebt.toLocaleString('ru')} ₽`, delta: `${INVOICES.filter(i => i.status === 'Ожидает' || i.status === 'Просрочен').length} счёта`, icon: 'Clock', tone: 'warning' },
          ].map((k, i) => (
            <div key={k.label} className="animate-fade-in rounded-xl border border-border bg-card p-4" style={{ animationDelay: `${i * 60}ms` }}>
              <div className="flex items-center justify-between mb-3">
                <Icon name={k.icon} size={18} className={`text-${k.tone}`} />
                <span className={`text-[11px] font-semibold text-${k.tone}`}>{k.delta}</span>
              </div>
              <div className="text-xl font-extrabold font-mono-num">{k.value}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{k.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          {/* Chart */}
          <div className="xl:col-span-2 rounded-xl border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="font-bold">Динамика за 6 месяцев</h2>
                <p className="text-[11px] text-muted-foreground">выручка vs расходы, тыс. ₽</p>
              </div>
              <div className="flex items-center gap-4 text-[11px]">
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-primary inline-block" />Выручка</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-destructive/60 inline-block" />Расходы</span>
              </div>
            </div>
            <div className="flex gap-2 items-end h-44 grid-bg rounded-lg p-3">
              {MONTHS.map((m, i) => (
                <div key={m} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                  <div className="w-full flex gap-0.5 items-end" style={{ height: '100%' }}>
                    <div
                      className="flex-1 rounded-t bg-primary/80 animate-bar origin-bottom"
                      style={{ height: `${(REVENUE_DATA[i] / maxBar) * 100}%`, animationDelay: `${i * 80}ms` }}
                    />
                    <div
                      className="flex-1 rounded-t bg-destructive/50 animate-bar origin-bottom"
                      style={{ height: `${(EXPENSE_DATA[i] / maxBar) * 100}%`, animationDelay: `${i * 80 + 40}ms` }}
                    />
                  </div>
                  <span className="text-[11px] text-muted-foreground">{m}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Invoices */}
          <div className="rounded-xl border border-border bg-card p-5">
            <h2 className="font-bold mb-1">Счета к оплате</h2>
            <p className="text-[11px] text-muted-foreground mb-3">{INVOICES.filter(i => i.status !== 'Черновик').length} активных счёта</p>
            <div className="space-y-2">
              {INVOICES.map(inv => (
                <div key={inv.id} className="flex items-center justify-between rounded-lg bg-secondary p-2.5">
                  <div>
                    <div className="text-xs font-semibold font-mono-num">{inv.id}</div>
                    <div className="text-[11px] text-muted-foreground">{inv.client}</div>
                    <div className="text-[10px] text-muted-foreground">до {inv.due}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-mono-num font-bold">{inv.sum.toLocaleString('ru')} ₽</div>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${INV_TONE[inv.status]}`}>{inv.status}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-border flex justify-between text-sm">
              <span className="text-muted-foreground">Итого к получению</span>
              <span className="font-bold font-mono-num text-warning">{totalDebt.toLocaleString('ru')} ₽</span>
            </div>
          </div>
        </div>

        {/* Transactions */}
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h2 className="font-bold">Транзакции</h2>
            <div className="flex gap-1">
              {([['all', 'Все'], ['income', 'Доходы'], ['expense', 'Расходы']] as const).map(([v, l]) => (
                <button
                  key={v}
                  onClick={() => setTxFilter(v)}
                  className={`h-7 px-3 rounded-md text-xs font-semibold transition-colors ${
                    txFilter === v ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-secondary'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
          <div className="divide-y divide-border/60">
            {filtered.map((t, i) => (
              <div key={t.id} className="animate-fade-in flex items-center justify-between px-5 py-3 hover:bg-secondary/30 transition-colors" style={{ animationDelay: `${i * 30}ms` }}>
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${t.type === 'income' ? 'bg-primary/15' : 'bg-destructive/15'}`}>
                    <Icon name={t.type === 'income' ? 'ArrowDownLeft' : 'ArrowUpRight'} size={16} className={t.type === 'income' ? 'text-primary' : 'text-destructive'} />
                  </div>
                  <div>
                    <div className="text-sm font-medium">{t.desc}</div>
                    <div className="text-[11px] text-muted-foreground">{t.date} · {t.method}</div>
                  </div>
                </div>
                <div className={`text-base font-extrabold font-mono-num ${t.type === 'income' ? 'text-primary' : 'text-destructive'}`}>
                  {t.type === 'income' ? '+' : '−'}{t.sum.toLocaleString('ru')} ₽
                </div>
              </div>
            ))}
          </div>
          <div className="px-5 py-3 border-t border-border bg-secondary/30 flex justify-between text-sm">
            <span className="text-muted-foreground">Баланс за период</span>
            <span className="font-bold font-mono-num text-primary">+{(totalIncome - totalExpense).toLocaleString('ru')} ₽</span>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Finance;
