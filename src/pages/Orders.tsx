import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Icon from '@/components/ui/icon';

type Status = 'Все' | 'Новая' | 'Назначен' | 'Выполнение' | 'Фотоотчёт' | 'Проверка' | 'Оплачено' | 'Просрочен';

const STATUS_FLOW: Status[] = ['Новая', 'Назначен', 'Выполнение', 'Фотоотчёт', 'Проверка', 'Оплачено'];

const toneBg: Record<string, string> = {
  'Новая':      'bg-warning/15 text-warning border-warning/30',
  'Назначен':   'bg-accent/15 text-accent border-accent/30',
  'Выполнение': 'bg-info/15 text-info border-info/30',
  'Фотоотчёт':  'bg-info/10 text-info border-info/20',
  'Проверка':   'bg-primary/15 text-primary border-primary/30',
  'Оплачено':   'bg-primary/20 text-primary border-primary/40',
  'Просрочен':  'bg-destructive/15 text-destructive border-destructive/30',
};

const STAFF_LIST = ['Анна Котова', 'Игорь Лебедев', 'Мария Седова', 'Олег Титов'];

const INITIAL_ORDERS = [
  { id: '#1042', client: 'ТЦ «Галерея»',          address: 'ул. Садовая, 42',   type: 'Генеральная',      date: '25.06', time: '09:00', status: 'Выполнение' as Status, staff: 'Анна Котова',   sum: 8200,  paid: false, comment: 'Мойка витрин входит в стоимость' },
  { id: '#1041', client: 'Офис «Атлант»',          address: 'пр. Невский, 110',  type: 'Поддерживающая',   date: '25.06', time: '10:30', status: 'Назначен'   as Status, staff: 'Мария Седова',  sum: 4500,  paid: false, comment: '' },
  { id: '#1040', client: 'Квартира, Невский 28',   address: 'пр. Невский, 28',   type: 'Мойка окон',       date: '25.06', time: '08:00', status: 'Просрочен'  as Status, staff: 'Игорь Лебедев', sum: 3100,  paid: false, comment: 'Клиент просил перезвонить перед выездом' },
  { id: '#1039', client: 'Салон «Вита»',           address: 'ул. Пушкина, 7',    type: 'Химчистка мебели', date: '25.06', time: '12:00', status: 'Новая'      as Status, staff: '',             sum: 6700,  paid: false, comment: '' },
  { id: '#1038', client: 'Бизнес-центр «Сфера»',  address: 'пл. Победы, 1',     type: 'Генеральная',      date: '25.06', time: '14:00', status: 'Оплачено'   as Status, staff: 'Анна Котова',   sum: 11900, paid: true,  comment: '' },
  { id: '#1037', client: 'Ресторан «Пальма»',      address: 'ул. Рубинштейна, 3',type: 'После ремонта',    date: '24.06', time: '18:00', status: 'Оплачено'   as Status, staff: 'Олег Титов',    sum: 14500, paid: true,  comment: '' },
  { id: '#1036', client: 'Отель «Северный»',       address: 'Лиговский пр., 44', type: 'Поддерживающая',   date: '24.06', time: '07:00', status: 'Оплачено'   as Status, staff: 'Мария Седова',  sum: 7800,  paid: true,  comment: '' },
  { id: '#1035', client: 'Частный дом Сидорова',   address: 'Петергоф, ул. Садовая', type: 'Генеральная',  date: '24.06', time: '10:00', status: 'Проверка'   as Status, staff: 'Игорь Лебедев', sum: 9200,  paid: false, comment: 'Нужна проверка фотоотчёта' },
];

const FILTERS: Status[] = ['Все', 'Новая', 'Назначен', 'Выполнение', 'Просрочен', 'Проверка', 'Оплачено'];

const Orders = () => {
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [filter, setFilter] = useState<Status>('Все');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<string | null>(null);
  const [showNewOrder, setShowNewOrder] = useState(false);

  const filtered = orders.filter((o) => {
    const matchStatus = filter === 'Все' || o.status === filter;
    const matchSearch = !search || o.client.toLowerCase().includes(search.toLowerCase()) || o.id.includes(search);
    return matchStatus && matchSearch;
  });

  const selectedOrder = orders.find((o) => o.id === selected);

  const advanceStatus = (id: string) => {
    setOrders((prev) => prev.map((o) => {
      if (o.id !== id) return o;
      const idx = STATUS_FLOW.indexOf(o.status as Status);
      const next = idx < STATUS_FLOW.length - 1 ? STATUS_FLOW[idx + 1] : o.status;
      return { ...o, status: next };
    }));
  };

  const assignStaff = (id: string, staff: string) => {
    setOrders((prev) => prev.map((o) => o.id === id ? { ...o, staff, status: o.status === 'Новая' ? 'Назначен' : o.status } : o));
  };

  const markPaid = (id: string) => {
    setOrders((prev) => prev.map((o) => o.id === id ? { ...o, paid: true, status: 'Оплачено' } : o));
  };

  const counts: Record<string, number> = { Все: orders.length };
  orders.forEach((o) => { counts[o.status] = (counts[o.status] || 0) + 1; });

  return (
    <DashboardLayout
      title="Заказы"
      subtitle={`${orders.length} заказов · ${orders.filter(o => o.status === 'Просрочен').length} просрочены`}
      action={
        <button
          onClick={() => setShowNewOrder(true)}
          className="flex items-center gap-2 h-9 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          <Icon name="Plus" size={16} /> Новый заказ
        </button>
      }
    >
      <div className="flex gap-4 h-[calc(100vh-8rem)]">
        {/* Left — list */}
        <div className="flex flex-col flex-1 min-w-0">
          {/* Filters + search */}
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <div className="relative flex-1 max-w-xs">
              <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Поиск клиента или №..."
                className="w-full h-9 pl-9 pr-3 rounded-lg border border-border bg-card text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div className="flex gap-1.5 flex-wrap">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`h-9 px-3 rounded-lg text-xs font-semibold transition-colors border ${
                    filter === f
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'border-border text-muted-foreground hover:text-foreground hover:bg-secondary'
                  }`}
                >
                  {f} {counts[f] ? <span className="opacity-60 ml-0.5">{counts[f]}</span> : null}
                </button>
              ))}
            </div>
          </div>

          {/* Orders list */}
          <div className="flex-1 overflow-y-auto space-y-2 pr-1">
            {filtered.length === 0 && (
              <div className="flex flex-col items-center justify-center h-40 text-muted-foreground gap-2">
                <Icon name="Inbox" size={32} />
                <span className="text-sm">Нет заказов</span>
              </div>
            )}
            {filtered.map((o, i) => (
              <div
                key={o.id}
                onClick={() => setSelected(o.id === selected ? null : o.id)}
                className={`animate-fade-in rounded-xl border transition-all cursor-pointer p-4 ${
                  selected === o.id
                    ? 'border-primary bg-primary/5'
                    : 'border-border bg-card hover:border-primary/40 hover:bg-secondary/30'
                }`}
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[11px] font-mono-num text-muted-foreground">{o.id}</span>
                      <span className="text-[11px] text-muted-foreground">·</span>
                      <span className="text-[11px] text-muted-foreground">{o.date} {o.time}</span>
                    </div>
                    <div className="font-semibold text-sm truncate">{o.client}</div>
                    <div className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                      <Icon name="MapPin" size={11} />
                      <span className="truncate">{o.address}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-[11px] text-muted-foreground bg-secondary px-2 py-0.5 rounded">{o.type}</span>
                      {o.staff ? (
                        <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                          <Icon name="User" size={11} />{o.staff}
                        </span>
                      ) : (
                        <span className="text-[11px] text-destructive flex items-center gap-1">
                          <Icon name="UserX" size={11} />не назначен
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-md border ${toneBg[o.status]}`}>{o.status}</span>
                    <span className="text-sm font-extrabold font-mono-num">{o.sum.toLocaleString('ru')} ₽</span>
                    {!o.paid && o.status !== 'Оплачено' && o.status !== 'Новая' && o.status !== 'Назначен' && (
                      <span className="text-[10px] text-warning">ожидает оплаты</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — detail panel */}
        {selectedOrder && (
          <div className="w-80 shrink-0 rounded-xl border border-border bg-card flex flex-col animate-fade-in overflow-hidden">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <div>
                <div className="font-mono-num text-xs text-muted-foreground">{selectedOrder.id}</div>
                <div className="font-bold">{selectedOrder.client}</div>
              </div>
              <button onClick={() => setSelected(null)} className="w-8 h-8 rounded-lg hover:bg-secondary flex items-center justify-center text-muted-foreground">
                <Icon name="X" size={16} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Status pipeline */}
              <div>
                <div className="text-[11px] uppercase tracking-wide text-muted-foreground mb-2">Статус</div>
                <div className="flex flex-col gap-1">
                  {STATUS_FLOW.map((s, i) => {
                    const cur = STATUS_FLOW.indexOf(selectedOrder.status as Status);
                    const done = i < cur;
                    const active = i === cur;
                    return (
                      <div key={s} className="flex items-center gap-2">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] shrink-0 border ${
                          done ? 'bg-primary border-primary text-primary-foreground' :
                          active ? 'border-primary text-primary' :
                          'border-border text-muted-foreground'
                        }`}>
                          {done ? <Icon name="Check" size={10} /> : i + 1}
                        </div>
                        <span className={`text-xs ${active ? 'text-foreground font-semibold' : done ? 'text-muted-foreground line-through' : 'text-muted-foreground'}`}>{s}</span>
                      </div>
                    );
                  })}
                </div>
                {selectedOrder.status !== 'Оплачено' && selectedOrder.status !== 'Просрочен' && (
                  <button
                    onClick={() => advanceStatus(selectedOrder.id)}
                    className="mt-3 w-full h-9 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-1.5"
                  >
                    <Icon name="ArrowRight" size={14} />
                    Перевести: {STATUS_FLOW[STATUS_FLOW.indexOf(selectedOrder.status as Status) + 1] ?? '—'}
                  </button>
                )}
              </div>

              {/* Info */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Тип</span>
                  <span className="font-medium">{selectedOrder.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Адрес</span>
                  <span className="font-medium text-right max-w-[160px]">{selectedOrder.address}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Дата</span>
                  <span className="font-mono-num font-medium">{selectedOrder.date} · {selectedOrder.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Сумма</span>
                  <span className="font-mono-num font-extrabold text-primary">{selectedOrder.sum.toLocaleString('ru')} ₽</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Оплата</span>
                  <span className={selectedOrder.paid ? 'text-primary font-semibold' : 'text-warning font-semibold'}>
                    {selectedOrder.paid ? 'Оплачено' : 'Не оплачено'}
                  </span>
                </div>
              </div>

              {/* Assign staff */}
              <div>
                <div className="text-[11px] uppercase tracking-wide text-muted-foreground mb-2">Исполнитель</div>
                <div className="space-y-1">
                  {STAFF_LIST.map((s) => (
                    <button
                      key={s}
                      onClick={() => assignStaff(selectedOrder.id, s)}
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedOrder.staff === s
                          ? 'bg-primary/15 text-primary border border-primary/30'
                          : 'hover:bg-secondary text-muted-foreground hover:text-foreground border border-transparent'
                      }`}
                    >
                      <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-[10px] font-bold">
                        {s.split(' ').map(p => p[0]).join('')}
                      </div>
                      {s}
                      {selectedOrder.staff === s && <Icon name="Check" size={14} className="ml-auto" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Comment */}
              {selectedOrder.comment && (
                <div>
                  <div className="text-[11px] uppercase tracking-wide text-muted-foreground mb-1">Комментарий</div>
                  <div className="text-xs text-foreground/80 bg-secondary rounded-lg p-3">{selectedOrder.comment}</div>
                </div>
              )}
            </div>

            {/* Footer actions */}
            <div className="p-4 border-t border-border space-y-2">
              {!selectedOrder.paid && (
                <button
                  onClick={() => markPaid(selectedOrder.id)}
                  className="w-full h-9 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                  <Icon name="CheckCircle" size={16} /> Отметить оплаченным
                </button>
              )}
              <button className="w-full h-9 rounded-lg border border-border text-sm text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors flex items-center justify-center gap-2">
                <Icon name="Camera" size={16} /> Фотоотчёт
              </button>
            </div>
          </div>
        )}
      </div>

      {/* New order modal */}
      {showNewOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setShowNewOrder(false)} />
          <div className="relative w-full max-w-md rounded-2xl border border-border bg-card p-6 animate-fade-in space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">Новый заказ</h2>
              <button onClick={() => setShowNewOrder(false)} className="w-8 h-8 rounded-lg hover:bg-secondary flex items-center justify-center text-muted-foreground">
                <Icon name="X" size={16} />
              </button>
            </div>
            {[
              { label: 'Клиент / Организация', placeholder: 'ООО «Название» или ФИО' },
              { label: 'Адрес объекта', placeholder: 'ул. Пушкина, д. 10' },
              { label: 'Тип услуги', placeholder: 'Генеральная, поддерживающая...' },
              { label: 'Дата и время', placeholder: '25.06.2026 · 10:00' },
              { label: 'Стоимость, ₽', placeholder: '0' },
            ].map((f) => (
              <div key={f.label}>
                <label className="text-xs text-muted-foreground block mb-1">{f.label}</label>
                <input
                  placeholder={f.placeholder}
                  className="w-full h-10 px-3 rounded-lg border border-border bg-secondary text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            ))}
            <button className="w-full h-10 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity">
              Создать заказ
            </button>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Orders;