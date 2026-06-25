import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Icon from '@/components/ui/icon';

const TABS = [
  { id: 'company', label: 'Компания', icon: 'Building2' },
  { id: 'users', label: 'Пользователи', icon: 'Users' },
  { id: 'notifications', label: 'Уведомления', icon: 'Bell' },
  { id: 'tariff', label: 'Тариф', icon: 'CreditCard' },
];

const USERS = [
  { id: 1, name: 'Александр Иванов', role: 'Владелец', email: 'ivanov@cleanservice.ru', active: true },
  { id: 2, name: 'Елена Смирнова', role: 'Диспетчер', email: 'smirnova@cleanservice.ru', active: true },
  { id: 3, name: 'Пётр Николаев', role: 'Диспетчер', email: 'nikolaev@cleanservice.ru', active: false },
];

const ROLES = ['Владелец', 'Диспетчер', 'Менеджер'];

const Toggle = ({ value, onChange }: { value: boolean; onChange: () => void }) => (
  <button
    onClick={onChange}
    className={`relative w-10 h-6 rounded-full transition-colors ${value ? 'bg-primary' : 'bg-secondary border border-border'}`}
  >
    <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${value ? 'translate-x-5' : 'translate-x-1'}`} />
  </button>
);

const Settings = () => {
  const [tab, setTab] = useState('company');
  const [notifs, setNotifs] = useState({
    newOrder: true, overdueOrder: true, paymentReceived: true,
    staffAssigned: false, dailyReport: true, weeklyReport: false,
  });

  return (
    <DashboardLayout title="Настройки" subtitle="Управление компанией и системой">
      <div className="flex gap-6">
        {/* Sidebar tabs */}
        <div className="w-48 shrink-0 space-y-1">
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                tab === t.id
                  ? 'bg-primary/15 text-primary'
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
              }`}
            >
              <Icon name={t.icon} size={16} />
              {t.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 space-y-4">

          {/* Company */}
          {tab === 'company' && (
            <div className="space-y-4 animate-fade-in">
              <div className="rounded-xl border border-border bg-card p-5">
                <h2 className="font-bold mb-4">Данные компании</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { label: 'Название компании', value: 'ООО «Клин-Сервис»' },
                    { label: 'ИНН', value: '7812345678' },
                    { label: 'Телефон', value: '+7 812 333-44-55' },
                    { label: 'Email', value: 'info@cleanservice.ru' },
                    { label: 'Адрес офиса', value: 'Санкт-Петербург, ул. Чайковского, 15' },
                    { label: 'Сайт', value: 'cleanservice.ru' },
                  ].map(f => (
                    <div key={f.label}>
                      <label className="text-xs text-muted-foreground block mb-1">{f.label}</label>
                      <input
                        defaultValue={f.value}
                        className="w-full h-10 px-3 rounded-lg border border-border bg-secondary text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-border bg-card p-5">
                <h2 className="font-bold mb-4">Типы услуг</h2>
                <div className="flex flex-wrap gap-2 mb-3">
                  {['Генеральная уборка', 'Поддерживающая', 'Мойка окон', 'Химчистка мебели', 'После ремонта'].map(s => (
                    <span key={s} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary border border-border text-sm">
                      {s}
                      <button className="text-muted-foreground hover:text-destructive transition-colors">
                        <Icon name="X" size={12} />
                      </button>
                    </span>
                  ))}
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-dashed border-border text-sm text-muted-foreground hover:border-primary hover:text-primary transition-colors">
                    <Icon name="Plus" size={14} /> Добавить
                  </button>
                </div>
              </div>

              <div className="flex justify-end">
                <button className="h-10 px-6 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity">
                  Сохранить изменения
                </button>
              </div>
            </div>
          )}

          {/* Users */}
          {tab === 'users' && (
            <div className="space-y-4 animate-fade-in">
              <div className="rounded-xl border border-border bg-card overflow-hidden">
                <div className="flex items-center justify-between p-4 border-b border-border">
                  <h2 className="font-bold">Пользователи системы</h2>
                  <button className="flex items-center gap-2 h-8 px-3 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90">
                    <Icon name="UserPlus" size={14} /> Пригласить
                  </button>
                </div>
                <div className="divide-y divide-border/60">
                  {USERS.map(u => (
                    <div key={u.id} className="flex items-center justify-between px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center text-sm font-bold">
                          {u.name.split(' ').map(p => p[0]).join('')}
                        </div>
                        <div>
                          <div className="text-sm font-semibold flex items-center gap-2">
                            {u.name}
                            {!u.active && <span className="text-[10px] bg-secondary text-muted-foreground px-2 py-0.5 rounded">Неактивен</span>}
                          </div>
                          <div className="text-xs text-muted-foreground">{u.email}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <select
                          defaultValue={u.role}
                          className="h-8 px-2 rounded-lg border border-border bg-secondary text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                        >
                          {ROLES.map(r => <option key={r}>{r}</option>)}
                        </select>
                        <button className="w-8 h-8 rounded-lg hover:bg-destructive/10 flex items-center justify-center text-muted-foreground hover:text-destructive transition-colors">
                          <Icon name="Trash2" size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-border bg-card p-5">
                <h2 className="font-bold mb-3">Права доступа</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="text-muted-foreground border-b border-border">
                        <th className="text-left font-medium py-2 pr-4">Раздел</th>
                        {ROLES.map(r => <th key={r} className="text-center font-medium py-2 px-3">{r}</th>)}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/40">
                      {[
                        ['Заказы', true, true, true],
                        ['Сотрудники', true, false, false],
                        ['Финансы', true, false, false],
                        ['Отчёты', true, true, false],
                        ['Клиенты', true, true, true],
                        ['Настройки', true, false, false],
                      ].map(([section, ...perms]) => (
                        <tr key={String(section)}>
                          <td className="py-2 pr-4 text-foreground/80 font-medium">{section}</td>
                          {perms.map((p, i) => (
                            <td key={i} className="text-center py-2 px-3">
                              <Icon name={p ? 'Check' : 'Minus'} size={14} className={p ? 'text-primary mx-auto' : 'text-muted-foreground mx-auto'} />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Notifications */}
          {tab === 'notifications' && (
            <div className="rounded-xl border border-border bg-card p-5 animate-fade-in space-y-1">
              <h2 className="font-bold mb-4">Уведомления</h2>
              {([
                ['newOrder', 'Новая заявка', 'При поступлении нового заказа'],
                ['overdueOrder', 'Просроченный заказ', 'Когда заказ не выполнен в срок'],
                ['paymentReceived', 'Оплата получена', 'При фиксации оплаты'],
                ['staffAssigned', 'Назначен сотрудник', 'При ручном назначении исполнителя'],
                ['dailyReport', 'Ежедневный отчёт', 'Сводка в конце рабочего дня'],
                ['weeklyReport', 'Еженедельный отчёт', 'Сводка по итогам недели'],
              ] as [keyof typeof notifs, string, string][]).map(([key, title, desc]) => (
                <div key={key} className="flex items-center justify-between py-3 border-b border-border/60 last:border-0">
                  <div>
                    <div className="text-sm font-medium">{title}</div>
                    <div className="text-xs text-muted-foreground">{desc}</div>
                  </div>
                  <Toggle
                    value={notifs[key]}
                    onChange={() => setNotifs(n => ({ ...n, [key]: !n[key] }))}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Tariff */}
          {tab === 'tariff' && (
            <div className="space-y-4 animate-fade-in">
              <div className="rounded-xl border border-primary/40 bg-primary/5 p-5">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="font-bold text-lg">Тариф «Команда»</h2>
                      <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-primary/20 text-primary border border-primary/30">Активен</span>
                    </div>
                    <div className="text-sm text-muted-foreground mt-0.5">Следующее списание: 25 июля 2026</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-extrabold font-mono-num">4 900 ₽</div>
                    <div className="text-xs text-muted-foreground">в месяц</div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 mt-4">
                  {[
                    { label: 'Сотрудников', used: 4, max: 15 },
                    { label: 'Заказов/мес', used: 94, max: 500 },
                    { label: 'ГБ хранилища', used: 2.1, max: 20 },
                  ].map(u => (
                    <div key={u.label} className="bg-card rounded-lg p-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-muted-foreground">{u.label}</span>
                        <span className="font-mono-num font-semibold">{u.used}/{u.max}</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${(u.used / u.max) * 100}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { name: 'Старт', price: '1 900 ₽', features: ['До 3 сотрудников', 'До 100 заказов/мес', '5 ГБ хранилища'], current: false },
                  { name: 'Команда', price: '4 900 ₽', features: ['До 15 сотрудников', 'До 500 заказов/мес', '20 ГБ хранилища', 'Автоназначение', 'Аналитика'], current: true },
                  { name: 'Бизнес', price: '9 900 ₽', features: ['Без ограничений', 'Белый лейбл', 'API доступ', 'Приоритетная поддержка'], current: false },
                ].map(t => (
                  <div
                    key={t.name}
                    className={`rounded-xl border p-4 ${t.current ? 'border-primary bg-primary/5' : 'border-border bg-card'}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-bold">{t.name}</div>
                      {t.current && <span className="text-[10px] font-semibold text-primary">Текущий</span>}
                    </div>
                    <div className="text-xl font-extrabold font-mono-num mb-3">{t.price}<span className="text-sm font-normal text-muted-foreground">/мес</span></div>
                    <ul className="space-y-1.5 mb-4">
                      {t.features.map(f => (
                        <li key={f} className="flex items-center gap-2 text-xs text-foreground/80">
                          <Icon name="Check" size={12} className="text-primary shrink-0" /> {f}
                        </li>
                      ))}
                    </ul>
                    {!t.current && (
                      <button className="w-full h-8 rounded-lg border border-border text-xs font-semibold text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
                        Перейти
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
