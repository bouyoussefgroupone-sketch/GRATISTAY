export function PuzzleWidget({
  progress,
  unlocked,
  imageUrl,
}: {
  progress: number;
  unlocked: boolean;
  imageUrl: string;
}) {
  const safeProgress = Math.max(0, Math.min(100, progress));

  return (
    <div className="rounded-[28px] border border-[var(--line)] bg-[var(--surface-muted)] p-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold text-[var(--ink-950)]">Revelation hotel</div>
          <div className="mt-1 text-xs text-[var(--ink-600)]">Photo revelee de haut en bas</div>
        </div>
        <div className="text-right">
          <div className="text-xl font-semibold text-[var(--ink-950)]">{safeProgress}%</div>
          <div className="text-xs text-[var(--ink-600)]">
            {unlocked ? "Debloque" : "En cours"}
          </div>
        </div>
      </div>

      <div className="relative mt-4 overflow-hidden rounded-[26px] border border-white/55 bg-[var(--surface-strong)]">
        <div
          className="aspect-square w-full scale-[1.06] bg-cover bg-center blur-md"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
        <div className="absolute inset-0 bg-[rgba(10,18,31,0.34)]" />

        <div
          className="absolute inset-x-0 top-0 overflow-hidden transition-[height] duration-300 ease-out"
          style={{ height: `${safeProgress}%` }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${imageUrl})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-transparent" />
        </div>

        <div
          className="absolute inset-x-0 z-10 transition-[top] duration-300 ease-out"
          style={{ top: `calc(${safeProgress}% - 2px)` }}
        >
          <div className="h-1 bg-white/90 shadow-[0_0_18px_rgba(255,255,255,0.85)]" />
        </div>

        <div className="pointer-events-none absolute inset-x-4 bottom-4 rounded-2xl bg-[rgba(15,23,40,0.52)] px-4 py-3 text-white backdrop-blur-sm">
          <div className="flex items-end justify-between gap-4">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/72">
                Image hotel
              </div>
              <div className="mt-1 text-sm text-white/88">
                {unlocked ? "Photo totalement revelee" : "Revelation progressive"}
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-semibold">{safeProgress}%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
