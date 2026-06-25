import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Icon from '@/components/ui/icon';

const CLIENTS = [
  {
    id: 1, name: 'ТЦ «Галерея»', type: 'Юридическое', contact: 'Алина Сорокина', phone: '+7 812 310-20-30',
    address: 'ул. Садовая, 42', orders: 18, lastOrder: '25.06', totalSum: 148600, debt: 8200, tag: 'VIP',
    history: [
      { id: '#1042', date: '25.06', type: 'Генеральная', sum: 8200, status: 'Выполнение' },
      { id: '#1021', date: '10.06', type: 'Поддерживающая', sum: 4500, status: 'Оплачено' },
      { id: '#1008', date: '28.05', type: 'Генеральная', sum: 8200, status: 'Оплачено' },
    ],
  },
  {
    id: 2, name: 'Офис «Атлант»', type: 'Юридическое', contact: 'Дмитрий Козлов', phone: '+7 812 222-33-44',
    address: 'пр. Невский, 110', orders: 12, lastOrder: '25.06', totalSum: 54000, debt: 4500, tag: 'Постоянный',
    history: [
      { id: '#1041', date: '25.06', type: 'Поддерживающая', sum: 4500, status: 'Назначен' },
      { id: '#1019', date: '11.06', type: 'Поддерживающая', sum: 4500, status: 'Оплачено' },
    ],
  },
  {
    id: 3, name: 'Бизнес-центр «Сфера»', type: 'Юридическое', contact: 'Ольга Кравцова', phone: '+7 812 500-60-70',
    address: 'пл. Победы, 1', orders: 9, lastOrder: '25.06', totalSum: 107100, debt: 0, tag: 'VIP',
    history: [
      { id: '#1038', date: '25.06', type: 'Генеральная', sum: 11900, status: 'Оплачено' },
      { id: '#1020', date: '10.06', type: 'Генеральная', sum: 11900, status: 'Оплачено' },
    ],
  },
  {
    id: 4, name: 'Ресторан «Пальма»', type: 'Юридическое', contact: 'Семён Орлов', phone: '+7 921 100-20-30',
    address: 'ул. Рубинштейна, 3', orders: 6, lastOrder: '24.06', totalSum: 87000, debt: 0, tag: 'Постоянный',
    history: [
      { id: '#1037', date: '24.06', type: 'После ремонта', sum: 14500, status: 'Оплачено' },
    ],
  },
  {
    id: 5, name: 'Квартира, Невский 28', type: 'Физическое', contact: 'Наталья Фёдорова', phone: '+7 921 555-44-33',
    address: 'пр. Невский, 28', orders: 4, lastOrder: '25.06', totalSum: 12400, debt: 3100, tag: 'Проблемный',
    history: [
      { id: '#1040', date: '25.06', type: 'Мойка окон', sum: 3100, status: 'Просрочен' },
      { id: '#1015', date: '01.06', type: 'Генеральная', sum: 6200, status: 'Оплачено' },
    ],
  },
  {
    id: 6, name: 'Салон «Вита»', type: 'Юридическое', contact: 'Виктор Петров', phone: '+7 921 888-77-66',
    address: 'ул. Пушкина, 7', orders: 2, lastOrder: '25.06', totalSum: 6700, debt: 6700, tag: 'Новый',
    history: [
      { id: '#1039', date: '25.06', type: 'Химчистка мебели', sum: 6700, status: 'Новая' },
    ],
  },
];

const TAG_COLORS: Record<string, string> = {
  'VIP': 'bg-warning/15 text-warning border-warning/30',
  'Постоянный': 'bg-primary/15 text-primary border-primary/30',
  'Новый': 'bg-accent/15 text-accent border-accent/30',
  'Проблемный': 'bg-destructive/15 text-destructive border-destructive/30',
};

const STATUS_TONE: Record<string, string> = {
  'Оплачено': 'text-primary', 'Выполнение': 'text-info', 'Новая': 'text-warning',
  'Назначен': 'text-accent', 'Просрочен': 'text-destructive', 'Проверка': 'text-primary',
};

const Clients = () => {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<number | null>(null);
  const [showAdd, setShowAdd] = useState(false);

  const filtered = CLIENTS.filter(c =>
    !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.contact.toLowerCase().includes(search.toLowerCase())
  );
  const selectedClient = CLIENTS.find(c => c.id === selected);
  const totalDebt = CLIENTS.reduce((a, c) => a + c.debt, 0);
  const totalRevenue = CLIENTS.reduce((a, c) => a + c.totalSum, 0);

  return (
    <DashboardLayout
      title="Клиенты"
      subtitle={`${CLIENTS.length} клиентов · ${CLIENTS.filter(c => c.debt > 0).length} с задолженностью`}
      action={
        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 h-9 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          <Icon name="UserPlus" size={16} /> Добавить
        </button>
      }
    >
      <div className="flex gap-4 h-[calc(100vh-8rem)]">
        <div className="flex flex-col flex-1 min-w-0">
          {/* Summary */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            {[
              { label: 'Всего клиентов', value: CLIENTS.length, icon: 'Users', color: 'text-accent' },
              { label: 'Общая выручка', value: `${(totalRevenue / 1000).toFixed(0)} тыс. ₽`, icon: 'TrendingUp', color: 'text-primary' },
              { label: 'Задолженность', value: `${totalDebt.toLocaleString('ru')} ₽`, icon: 'AlertCircle', color: 'text-destructive' },
            ].map(k => (
              <div key={k.label} className="rounded-xl border border-border bg-card p-3 flex items-center gap-3">
                <Icon name={k.icon} size={20} className={k.color} />
                <div>
                  <div className="text-lg font-extrabold font-mono-num">{k.value}</div>
                  <div className="text-[11px] text-muted-foreground">{k.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Search */}
          <div className="relative mb-4 max-w-sm">
            <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Поиск клиента..."
              className="w-full h-9 pl-9 pr-3 rounded-lg border border-border bg-card text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          {/* Table */}
          <div className="flex-1 overflow-y-auto rounded-xl border border-border bg-card overflow-hidden">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-card z-10">
                <tr className="text-left text-[11px] uppercase tracking-wide text-muted-foreground border-b border-border">
                  <th className="font-medium px-5 py-3">Клиент</th>
                  <th className="font-medium px-3 py-3">Заказов</th>
                  <th className="font-medium px-3 py-3">Последний</th>
                  <th className="font-medium px-3 py-3">Выручка</th>
                  <th className="font-medium px-3 py-3">Долг</th>
                  <th className="font-medium px-3 py-3">Тег</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c, i) => (
                  <tr
                    key={c.id}
                    onClick={() => setSelected(c.id === selected ? null : c.id)}
                    className={`animate-fade-in border-b border-border/60 last:border-0 cursor-pointer transition-colors ${
                      selected === c.id ? 'bg-primary/5' : 'hover:bg-secondary/40'
                    }`}
                    style={{ animationDelay: `${i * 40}ms` }}
                  >
                    <td className="px-5 py-3">
                      <div className="font-semibold">{c.name}</div>
                      <div className="text-[11px] text-muted-foreground">{c.contact} · {c.type === 'Юридическое' ? 'ООО' : 'Физлицо'}</div>
                    </td>
                    <td className="px-3 py-3 font-mono-num font-semibold">{c.orders}</td>
                    <td className="px-3 py-3 font-mono-num text-muted-foreground">{c.lastOrder}</td>
                    <td className="px-3 py-3 font-mono-num font-semibold">{c.totalSum.toLocaleString('ru')} ₽</td>
                    <td className="px-3 py-3 font-mono-num">
                      {c.debt > 0
                        ? <span className="text-destructive font-semibold">{c.debt.toLocaleString('ru')} ₽</span>
                        : <span className="text-primary">—</span>
                      }
                    </td>
                    <td className="px-3 py-3">
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded border ${TAG_COLORS[c.tag]}`}>{c.tag}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detail */}
        {selectedClient && (
          <div className="w-80 shrink-0 rounded-xl border border-border bg-card flex flex-col animate-fade-in overflow-hidden">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <div>
                <div className="font-bold">{selectedClient.name}</div>
                <div className="text-[11px] text-muted-foreground">{selectedClient.type} лицо</div>
              </div>
              <button onClick={() => setSelected(null)} className="w-8 h-8 rounded-lg hover:bg-secondary flex items-center justify-center text-muted-foreground">
                <Icon name="X" size={16} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div className="space-y-2 text-sm">
                {[
                  { label: 'Контакт', value: selectedClient.contact },
                  { label: 'Телефон', value: selectedClient.phone },
                  { label: 'Адрес', value: selectedClient.address },
                  { label: 'Всего заказов', value: selectedClient.orders },
                  { label: 'Выручка', value: `${selectedClient.totalSum.toLocaleString('ru')} ₽` },
                ].map(f => (
                  <div key={f.label} className="flex justify-between">
                    <span className="text-muted-foreground">{f.label}</span>
                    <span className="font-medium text-right max-w-[180px] truncate">{f.value}</span>
                  </div>
                ))}
                {selectedClient.debt > 0 && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Задолженность</span>
                    <span className="text-destructive font-bold">{selectedClient.debt.toLocaleString('ru')} ₽</span>
                  </div>
                )}
              </div>

              <div>
                <div className="text-[11px] uppercase tracking-wide text-muted-foreground mb-2">История заказов</div>
                <div className="space-y-2">
                  {selectedClient.history.map(h => (
                    <div key={h.id} className="flex items-center justify-between rounded-lg bg-secondary p-2.5">
                      <div>
                        <div className="text-xs font-semibold font-mono-num">{h.id}</div>
                        <div className="text-[11px] text-muted-foreground">{h.date} · {h.type}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-mono-num font-bold">{h.sum.toLocaleString('ru')} ₽</div>
                        <div className={`text-[10px] font-semibold ${STATUS_TONE[h.status]}`}>{h.status}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-border space-y-2">
              <button className="w-full h-9 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                <Icon name="Plus" size={16} /> Новый заказ
              </button>
              <button className="w-full h-9 rounded-lg border border-border text-sm text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors flex items-center justify-center gap-2">
                <Icon name="Phone" size={16} /> Позвонить
              </button>
            </div>
          </div>
        )}
      </div>

      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setShowAdd(false)} />
          <div className="relative w-full max-w-md rounded-2xl border border-border bg-card p-6 animate-fade-in space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">Новый клиент</h2>
              <button onClick={() => setShowAdd(false)} className="w-8 h-8 rounded-lg hover:bg-secondary flex items-center justify-center text-muted-foreground">
                <Icon name="X" size={16} />
              </button>
            </div>
            {[
              { label: 'Название / ФИО', placeholder: 'ООО «Название» или Иванов Иван' },
              { label: 'Контактное лицо', placeholder: 'Иванова Мария' },
              { label: 'Телефон', placeholder: '+7 921 000-00-00' },
              { label: 'Адрес объекта', placeholder: 'ул. Пушкина, д. 10' },
            ].map(f => (
              <div key={f.label}>
                <label className="text-xs text-muted-foreground block mb-1">{f.label}</label>
                <input placeholder={f.placeholder} className="w-full h-10 px-3 rounded-lg border border-border bg-secondary text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
              </div>
            ))}
            <button className="w-full h-10 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity">
              Добавить клиента
            </button>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Clients;
