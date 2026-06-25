import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Icon from '@/components/ui/icon';

const STATUS_TONE: Record<string, string> = {
  'Принят':    'bg-primary/15 text-primary border-primary/30',
  'На проверке': 'bg-warning/15 text-warning border-warning/30',
  'Отклонён':  'bg-destructive/15 text-destructive border-destructive/30',
};

const REPORTS = [
  {
    orderId: '#1042', client: 'ТЦ «Галерея»', type: 'Генеральная', date: '25.06',
    staff: 'Анна Котова', status: 'На проверке', photos: 8,
    checklist: [
      { item: 'Полы вымыты', done: true },
      { item: 'Витрины протёрты', done: true },
      { item: 'Санузлы убраны', done: true },
      { item: 'Мусор вывезен', done: true },
      { item: 'Двери и поручни', done: false },
    ],
    thumbs: ['#1e2a1e', '#1a2a22', '#162618', '#1e2e1e', '#182418', '#1a2a1a', '#142014', '#1c281c'],
  },
  {
    orderId: '#1038', client: 'Бизнес-центр «Сфера»', type: 'Генеральная', date: '25.06',
    staff: 'Анна Котова', status: 'Принят', photos: 12,
    checklist: [
      { item: 'Полы вымыты', done: true },
      { item: 'Окна протёрты', done: true },
      { item: 'Санузлы убраны', done: true },
      { item: 'Переговорные убраны', done: true },
      { item: 'Мусор вывезен', done: true },
    ],
    thumbs: ['#1e2820', '#1a2422', '#162018', '#1e2820', '#182218', '#1a2420', '#142018', '#1c2820', '#1e2420', '#18201a', '#1a2620', '#1c2218'],
  },
  {
    orderId: '#1037', client: 'Ресторан «Пальма»', type: 'После ремонта', date: '24.06',
    staff: 'Олег Титов', status: 'Принят', photos: 6,
    checklist: [
      { item: 'Строительная пыль убрана', done: true },
      { item: 'Полы вымыты', done: true },
      { item: 'Кухня убрана', done: true },
      { item: 'Сантехника', done: true },
      { item: 'Окна помыты', done: true },
    ],
    thumbs: ['#1a2418', '#1e2a1a', '#162018', '#1c2818', '#182218', '#1a2618'],
  },
  {
    orderId: '#1035', client: 'Частный дом Сидорова', type: 'Генеральная', date: '24.06',
    staff: 'Игорь Лебедев', status: 'На проверке', photos: 5,
    checklist: [
      { item: 'Полы вымыты', done: true },
      { item: 'Окна протёрты', done: true },
      { item: 'Ванная убрана', done: true },
      { item: 'Кухня убрана', done: false },
      { item: 'Мусор вывезен', done: true },
    ],
    thumbs: ['#1e2820', '#1a2418', '#162018', '#1c2820', '#182018'],
  },
  {
    orderId: '#1036', client: 'Отель «Северный»', type: 'Поддерживающая', date: '24.06',
    staff: 'Мария Седова', status: 'Принят', photos: 9,
    checklist: [
      { item: 'Номера убраны', done: true },
      { item: 'Коридоры', done: true },
      { item: 'Ресепшн', done: true },
      { item: 'Санузлы', done: true },
    ],
    thumbs: ['#1e2820', '#1a2422', '#162018', '#1e2820', '#182218', '#1a2420', '#142018', '#1c2820', '#1e2420'],
  },
];

const Photos = () => {
  const [selected, setSelected] = useState<string | null>(REPORTS[0].orderId);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [filterStatus, setFilterStatus] = useState('Все');

  const filtered = REPORTS.filter(r => filterStatus === 'Все' || r.status === filterStatus);
  const selectedReport = REPORTS.find(r => r.orderId === selected);

  const doneCount = selectedReport?.checklist.filter(c => c.done).length ?? 0;
  const totalCount = selectedReport?.checklist.length ?? 0;
  const checkPct = totalCount ? Math.round((doneCount / totalCount) * 100) : 0;

  return (
    <DashboardLayout
      title="Фотоотчёты"
      subtitle={`${REPORTS.length} отчётов · ${REPORTS.filter(r => r.status === 'На проверке').length} ожидают проверки`}
    >
      <div className="flex gap-4 h-[calc(100vh-8rem)]">
        {/* Left — report list */}
        <div className="flex flex-col w-72 shrink-0">
          <div className="flex gap-1 mb-3 flex-wrap">
            {['Все', 'На проверке', 'Принят', 'Отклонён'].map(s => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={`h-8 px-3 rounded-lg text-xs font-semibold transition-colors border ${
                  filterStatus === s
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'border-border text-muted-foreground hover:bg-secondary'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto space-y-2">
            {filtered.map((r, i) => (
              <div
                key={r.orderId}
                onClick={() => setSelected(r.orderId)}
                className={`animate-fade-in rounded-xl border cursor-pointer transition-all p-3 ${
                  selected === r.orderId
                    ? 'border-primary bg-primary/5'
                    : 'border-border bg-card hover:border-primary/40'
                }`}
                style={{ animationDelay: `${i * 50}ms` }}
              >
                {/* Mini photo strip */}
                <div className="flex gap-1 mb-2.5 rounded-lg overflow-hidden h-12">
                  {r.thumbs.slice(0, 4).map((color, j) => (
                    <div
                      key={j}
                      className="flex-1 relative overflow-hidden"
                      style={{ backgroundColor: color }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center opacity-20">
                        <Icon name="Image" size={14} className="text-primary" />
                      </div>
                    </div>
                  ))}
                  {r.photos > 4 && (
                    <div className="flex-1 bg-secondary flex items-center justify-center text-xs font-semibold text-muted-foreground">
                      +{r.photos - 4}
                    </div>
                  )}
                </div>

                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm truncate">{r.client}</div>
                    <div className="text-[11px] text-muted-foreground font-mono-num">{r.orderId} · {r.date}</div>
                    <div className="text-[11px] text-muted-foreground">{r.staff}</div>
                  </div>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ml-2 shrink-0 ${STATUS_TONE[r.status] ?? ''}`}>
                    {r.status}
                  </span>
                </div>

                {/* Checklist mini progress */}
                <div className="mt-2">
                  <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
                    <span>Чек-лист</span>
                    <span>{r.checklist.filter(c => c.done).length}/{r.checklist.length}</span>
                  </div>
                  <div className="h-1 rounded-full bg-secondary overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${(r.checklist.filter(c => c.done).length / r.checklist.length) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — detail */}
        {selectedReport ? (
          <div className="flex-1 min-w-0 flex flex-col rounded-xl border border-border bg-card overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-border flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold">{selectedReport.client}</span>
                  <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-md border ${STATUS_TONE[selectedReport.status] ?? ''}`}>
                    {selectedReport.status}
                  </span>
                </div>
                <div className="text-[11px] text-muted-foreground font-mono-num">
                  {selectedReport.orderId} · {selectedReport.type} · {selectedReport.date} · {selectedReport.staff}
                </div>
              </div>
              <div className="flex gap-2">
                {selectedReport.status === 'На проверке' && (
                  <>
                    <button className="h-8 px-3 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 flex items-center gap-1.5">
                      <Icon name="Check" size={14} /> Принять
                    </button>
                    <button className="h-8 px-3 rounded-lg border border-destructive/40 text-destructive text-xs font-semibold hover:bg-destructive/10 flex items-center gap-1.5">
                      <Icon name="X" size={14} /> Отклонить
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Photo grid */}
              <div>
                <div className="text-[11px] uppercase tracking-wide text-muted-foreground mb-2">
                  Фотографии · {selectedReport.photos} шт.
                </div>
                <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                  {selectedReport.thumbs.map((color, i) => (
                    <div
                      key={i}
                      onClick={() => setLightbox(i)}
                      className="aspect-square rounded-lg overflow-hidden cursor-pointer relative group border border-border/40 hover:border-primary/60 transition-colors"
                      style={{ backgroundColor: color }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center opacity-25">
                        <Icon name="Image" size={20} className="text-primary" />
                      </div>
                      <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <Icon name="ZoomIn" size={18} className="text-primary" />
                      </div>
                      <div className="absolute bottom-1 right-1 text-[9px] font-mono-num text-white/60">{i + 1}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Checklist */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-[11px] uppercase tracking-wide text-muted-foreground">Чек-лист</div>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-1.5 rounded-full bg-secondary overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: `${checkPct}%` }} />
                    </div>
                    <span className={`text-xs font-mono-num font-semibold ${checkPct === 100 ? 'text-primary' : 'text-warning'}`}>
                      {doneCount}/{totalCount}
                    </span>
                  </div>
                </div>
                <div className="space-y-1.5">
                  {selectedReport.checklist.map((c, i) => (
                    <div key={i} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg ${c.done ? 'bg-primary/10' : 'bg-secondary'}`}>
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${c.done ? 'bg-primary' : 'border border-border'}`}>
                        {c.done && <Icon name="Check" size={11} className="text-primary-foreground" />}
                      </div>
                      <span className={`text-sm ${c.done ? 'text-foreground' : 'text-muted-foreground'}`}>{c.item}</span>
                      {!c.done && <span className="ml-auto text-[11px] text-destructive font-semibold">Не выполнено</span>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <Icon name="Image" size={40} className="mx-auto mb-2 opacity-30" />
              <div className="text-sm">Выберите отчёт</div>
            </div>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox !== null && selectedReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={() => setLightbox(null)}>
          <div className="absolute inset-0 bg-background/95 backdrop-blur-md" />
          <div className="relative z-10 flex items-center gap-4">
            <button
              onClick={e => { e.stopPropagation(); setLightbox(l => l !== null && l > 0 ? l - 1 : l); }}
              className="w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground"
            >
              <Icon name="ChevronLeft" size={20} />
            </button>
            <div
              className="w-80 h-60 md:w-[600px] md:h-[400px] rounded-2xl border border-border flex items-center justify-center relative overflow-hidden"
              style={{ backgroundColor: selectedReport.thumbs[lightbox] }}
              onClick={e => e.stopPropagation()}
            >
              <Icon name="Image" size={48} className="text-primary opacity-20" />
              <div className="absolute bottom-3 right-3 bg-background/80 rounded-lg px-2.5 py-1 text-xs font-mono-num text-muted-foreground">
                {lightbox + 1} / {selectedReport.photos}
              </div>
            </div>
            <button
              onClick={e => { e.stopPropagation(); setLightbox(l => l !== null && l < selectedReport.photos - 1 ? l + 1 : l); }}
              className="w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground"
            >
              <Icon name="ChevronRight" size={20} />
            </button>
          </div>
          <button onClick={() => setLightbox(null)} className="absolute top-4 right-4 z-10 w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground">
            <Icon name="X" size={18} />
          </button>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Photos;
