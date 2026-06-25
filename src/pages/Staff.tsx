import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Icon from '@/components/ui/icon';

const SPECS = ['Все', 'Генеральная', 'Поддерживающая', 'Мойка окон', 'Химчистка', 'После ремонта'];

const INITIAL_STAFF = [
  {
    id: 1, name: 'Анна Котова', phone: '+7 921 111-22-33', spec: 'Генеральная',
    load: 92, tasks: 4, done: 148, rating: 4.9, status: 'busy' as const,
    joined: 'март 2023', salary: 65000,
    schedule: [
      { day: 'Пн', orders: 3 }, { day: 'Вт', orders: 4 }, { day: 'Ср', orders: 4 },
      { day: 'Чт', orders: 2 }, { day: 'Пт', orders: 3 }, { day: 'Сб', orders: 2 }, { day: 'Вс', orders: 0 },
    ],
  },
  {
    id: 2, name: 'Игорь Лебедев', phone: '+7 921 444-55-66', spec: 'Мойка окон',
    load: 60, tasks: 2, done: 93, rating: 4.7, status: 'busy' as const,
    joined: 'июнь 2023', salary: 55000,
    schedule: [
      { day: 'Пн', orders: 2 }, { day: 'Вт', orders: 2 }, { day: 'Ср', orders: 2 },
      { day: 'Чт', orders: 3 }, { day: 'Пт', orders: 1 }, { day: 'Сб', orders: 2 }, { day: 'Вс', orders: 0 },
    ],
  },
  {
    id: 3, name: 'Мария Седова', phone: '+7 921 777-88-99', spec: 'Поддерживающая',
    load: 35, tasks: 1, done: 72, rating: 4.8, status: 'free' as const,
    joined: 'январь 2024', salary: 50000,
    schedule: [
      { day: 'Пн', orders: 1 }, { day: 'Вт', orders: 2 }, { day: 'Ср', orders: 1 },
      { day: 'Чт', orders: 1 }, { day: 'Пт', orders: 2 }, { day: 'Сб', orders: 1 }, { day: 'Вс', orders: 0 },
    ],
  },
  {
    id: 4, name: 'Олег Титов', phone: '+7 921 000-11-22', spec: 'Химчистка',
    load: 0, tasks: 0, done: 41, rating: 4.6, status: 'free' as const,
    joined: 'апрель 2024', salary: 48000,
    schedule: [
      { day: 'Пн', orders: 0 }, { day: 'Вт', orders: 1 }, { day: 'Ср', orders: 0 },
      { day: 'Чт', orders: 2 }, { day: 'Пт', orders: 0 }, { day: 'Сб', orders: 1 }, { day: 'Вс', orders: 0 },
    ],
  },
];

const Staff = () => {
  const [specFilter, setSpecFilter] = useState('Все');
  const [selected, setSelected] = useState<number | null>(null);
  const [showAdd, setShowAdd] = useState(false);

  const filtered = INITIAL_STAFF.filter(s => specFilter === 'Все' || s.spec === specFilter);
  const selectedStaff = INITIAL_STAFF.find(s => s.id === selected);

  const loadColor = (load: number) =>
    load > 80 ? 'bg-destructive' : load > 50 ? 'bg-warning' : load > 0 ? 'bg-primary' : 'bg-muted';

  const maxSched = Math.max(...(selectedStaff?.schedule.map(s => s.orders) ?? [1]), 1);

  return (
    <DashboardLayout
      title="Сотрудники"
      subtitle={`${INITIAL_STAFF.length} чел. · ${INITIAL_STAFF.filter(s => s.status === 'busy').length} заняты сейчас`}
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
        {/* Left */}
        <div className="flex flex-col flex-1 min-w-0">
          {/* Spec filter */}
          <div className="flex gap-1.5 flex-wrap mb-4">
            {SPECS.map((s) => (
              <button
                key={s}
                onClick={() => setSpecFilter(s)}
                className={`h-9 px-3 rounded-lg text-xs font-semibold transition-colors border ${
                  specFilter === s
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'border-border text-muted-foreground hover:text-foreground hover:bg-secondary'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Summary row */}
          <div className="grid grid-cols-4 gap-3 mb-4">
            {[
              { label: 'Заняты', value: INITIAL_STAFF.filter(s => s.status === 'busy').length, icon: 'Activity', color: 'text-info' },
              { label: 'Свободны', value: INITIAL_STAFF.filter(s => s.status === 'free').length, icon: 'UserCheck', color: 'text-primary' },
              { label: 'Заказов сегодня', value: INITIAL_STAFF.reduce((a, s) => a + s.tasks, 0), icon: 'ClipboardList', color: 'text-accent' },
              { label: 'Ср. загрузка', value: `${Math.round(INITIAL_STAFF.reduce((a, s) => a + s.load, 0) / INITIAL_STAFF.length)}%`, icon: 'BarChart2', color: 'text-warning' },
            ].map((k) => (
              <div key={k.label} className="rounded-xl border border-border bg-card p-3 flex items-center gap-3">
                <Icon name={k.icon} size={20} className={k.color} />
                <div>
                  <div className="text-xl font-extrabold font-mono-num">{k.value}</div>
                  <div className="text-[11px] text-muted-foreground">{k.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Cards grid */}
          <div className="flex-1 overflow-y-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filtered.map((s, i) => (
                <div
                  key={s.id}
                  onClick={() => setSelected(s.id === selected ? null : s.id)}
                  className={`animate-fade-in rounded-xl border cursor-pointer transition-all p-4 ${
                    selected === s.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border bg-card hover:border-primary/40'
                  }`}
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="relative shrink-0">
                      <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-base font-extrabold">
                        {s.name.split(' ').map(p => p[0]).join('')}
                      </div>
                      <span className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-card ${s.status === 'busy' ? 'bg-warning' : 'bg-primary'}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold truncate">{s.name}</div>
                      <div className="text-xs text-muted-foreground">{s.spec}</div>
                      <div className="text-[11px] text-muted-foreground">{s.phone}</div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="flex items-center gap-1 text-xs font-semibold text-warning">
                        <Icon name="Star" size={12} /> {s.rating}
                      </div>
                      <div className="text-[11px] text-muted-foreground mt-0.5">{s.done} выполнено</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-muted-foreground">Загрузка сегодня</span>
                    <span className={`font-mono-num font-semibold ${s.load > 80 ? 'text-destructive' : s.load > 50 ? 'text-warning' : 'text-primary'}`}>{s.load}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-secondary overflow-hidden mb-3">
                    <div className={`h-full rounded-full transition-all ${loadColor(s.load)}`} style={{ width: `${s.load}%` }} />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-md border ${
                      s.status === 'busy' ? 'bg-warning/15 text-warning border-warning/30' : 'bg-primary/15 text-primary border-primary/30'
                    }`}>
                      {s.status === 'busy' ? `В работе · ${s.tasks} задач` : 'Свободен'}
                    </span>
                    <span className="text-[11px] text-muted-foreground">с {s.joined}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Detail panel */}
        {selectedStaff && (
          <div className="w-72 shrink-0 rounded-xl border border-border bg-card flex flex-col animate-fade-in overflow-hidden">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <div className="font-bold">{selectedStaff.name}</div>
              <button onClick={() => setSelected(null)} className="w-8 h-8 rounded-lg hover:bg-secondary flex items-center justify-center text-muted-foreground">
                <Icon name="X" size={16} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-5">
              {/* Avatar + status */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center text-2xl font-extrabold">
                  {selectedStaff.name.split(' ').map(p => p[0]).join('')}
                </div>
                <div className={`text-[11px] font-semibold px-3 py-1 rounded-full border ${
                  selectedStaff.status === 'busy' ? 'bg-warning/15 text-warning border-warning/30' : 'bg-primary/15 text-primary border-primary/30'
                }`}>
                  {selectedStaff.status === 'busy' ? 'В работе' : 'Свободен'}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: 'Выполнено', value: selectedStaff.done },
                  { label: 'Рейтинг', value: `★ ${selectedStaff.rating}` },
                  { label: 'Оклад', value: `${selectedStaff.salary.toLocaleString('ru')} ₽` },
                  { label: 'В команде с', value: selectedStaff.joined },
                ].map(k => (
                  <div key={k.label} className="bg-secondary rounded-lg p-2.5">
                    <div className="text-[11px] text-muted-foreground">{k.label}</div>
                    <div className="text-sm font-bold font-mono-num">{k.value}</div>
                  </div>
                ))}
              </div>

              {/* Week schedule */}
              <div>
                <div className="text-[11px] uppercase tracking-wide text-muted-foreground mb-2">Загрузка по дням</div>
                <div className="flex gap-1 items-end h-16">
                  {selectedStaff.schedule.map((d) => (
                    <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                      <div
                        className="w-full rounded-t bg-primary/70"
                        style={{ height: `${d.orders ? (d.orders / maxSched) * 48 : 4}px`, opacity: d.orders ? 1 : 0.2 }}
                      />
                      <span className="text-[10px] text-muted-foreground">{d.day}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Info */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Специализация</span>
                  <span className="font-medium">{selectedStaff.spec}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Телефон</span>
                  <span className="font-mono-num text-primary">{selectedStaff.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Заданий сегодня</span>
                  <span className="font-mono-num font-bold">{selectedStaff.tasks}</span>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-border space-y-2">
              <button className="w-full h-9 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                <Icon name="ClipboardList" size={16} /> Назначить заказ
              </button>
              <button className="w-full h-9 rounded-lg border border-border text-sm text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors flex items-center justify-center gap-2">
                <Icon name="Phone" size={16} /> Позвонить
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add modal */}
      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setShowAdd(false)} />
          <div className="relative w-full max-w-md rounded-2xl border border-border bg-card p-6 animate-fade-in space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">Новый сотрудник</h2>
              <button onClick={() => setShowAdd(false)} className="w-8 h-8 rounded-lg hover:bg-secondary flex items-center justify-center text-muted-foreground">
                <Icon name="X" size={16} />
              </button>
            </div>
            {[
              { label: 'ФИО', placeholder: 'Иванова Мария Сергеевна' },
              { label: 'Телефон', placeholder: '+7 921 000-00-00' },
              { label: 'Специализация', placeholder: 'Генеральная, мойка окон...' },
              { label: 'Оклад, ₽', placeholder: '50000' },
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
              Добавить сотрудника
            </button>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Staff;
