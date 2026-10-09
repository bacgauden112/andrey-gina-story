"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { logout } from "./auth-actions";
import { GUEST_TYPES, INVITE_PREFIXES, DEFAULT_INVITE_PREFIX, type GuestType } from "@/lib/guest-types";

type Guest = {
  id: string;
  code?: string | null;
  guestType?: GuestType;
  invitePrefix?: string;
  name: string;
  status: string;
  guestCount: number;
  attendBride?: boolean;
  attendGroom?: boolean;
  needShuttle?: boolean;
  shuttleCount?: number;
  message?: string | null;
};

type Wish = {
  id: string;
  name: string;
  content: string;
  createdAt: string;
};

type StatusFilter = "ALL" | "THAM_GIA" | "KHONG_THAM_GIA" | "CHUA_XAC_NHAN";

const CUSTOM = "__custom__";

const STATUS: Record<string, { label: string; className: string }> = {
  THAM_GIA: { label: "Tham gia", className: "bg-green-100 text-green-700" },
  KHONG_THAM_GIA: { label: "Từ chối", className: "bg-red-100 text-red-700" },
  CHUA_XAC_NHAN: { label: "Chưa trả lời", className: "bg-gray-100 text-gray-500" },
};

const TYPE_SHORT: Record<GuestType, string> = { BOTH: "Cả 2 lễ", GROOM: "Nhà trai", BRIDE: "Nhà gái" };

const FIELD = "h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-base focus:outline-none focus:ring-2 focus:ring-pink-500";

// Lowercase + strip Vietnamese diacritics so "nga" finds "Ngà".
const fold = (s: string) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/g, "d").toLowerCase();

function StatusPill({ status }: { status: string }) {
  const s = STATUS[status] || STATUS.CHUA_XAC_NHAN;
  return <span className={`inline-block whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-semibold ${s.className}`}>{s.label}</span>;
}

// Bottom sheet on phones, centered dialog on larger screens.
function Sheet({ title, subtitle, onClose, children }: { title: string; subtitle?: string; onClose: () => void; children: React.ReactNode }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center bg-black/50 md:items-center md:p-4" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        className="flex max-h-[92dvh] w-full flex-col rounded-t-2xl bg-white shadow-xl md:max-w-lg md:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3 border-b border-gray-200 px-4 py-3">
          <div className="min-w-0">
            <h3 className="truncate text-lg font-bold text-gray-900">{title}</h3>
            {subtitle && <p className="truncate font-mono text-xs text-gray-500">{subtitle}</p>}
          </div>
          <button onClick={onClose} aria-label="Đóng" className="-mr-2 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-2xl leading-none text-gray-500 hover:bg-gray-100">
            ×
          </button>
        </div>
        <div className="overflow-y-auto px-4 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">{children}</div>
      </div>
    </div>
  );
}

// Preset forms of address (Thân mời / Kính mời / ...) plus any custom text, e.g. "Trân trọng kính mời".
function PrefixSelect({ value, onChange, className }: { value: string; onChange: (v: string) => void; className?: string }) {
  const options = INVITE_PREFIXES.includes(value) ? INVITE_PREFIXES : [...INVITE_PREFIXES, value];
  return (
    <select
      value={value}
      className={className}
      onChange={(e) => {
        if (e.target.value !== CUSTOM) return onChange(e.target.value);
        const custom = prompt("Nhập cách xưng hô khi mời (ví dụ: Kính gửi, Trân trọng kính mời):", value)?.trim();
        if (custom) onChange(custom);
      }}
    >
      {options.map((o) => <option key={o} value={o}>{o}</option>)}
      <option value={CUSTOM}>Khác…</option>
    </select>
  );
}

// Edit a guest's name; remounted (via key) when another guest or a new saved name arrives.
function NameEditor({ name, onSave }: { name: string; onSave: (name: string) => Promise<void> }) {
  const [value, setValue] = useState(name);
  const [busy, setBusy] = useState(false);
  const changed = value.trim() !== name && value.trim() !== "";
  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!changed || busy) return;
    setBusy(true);
    await onSave(value.trim());
    setBusy(false);
  };
  return (
    <form onSubmit={save}>
      <span className="mb-1 block text-sm font-medium text-gray-700">Tên khách</span>
      <div className="flex gap-2">
        <input value={value} onChange={(e) => setValue(e.target.value)} maxLength={100} className={`${FIELD} flex-1`} />
        <button type="submit" disabled={!changed || busy} className="h-11 shrink-0 rounded-lg bg-pink-500 px-4 font-semibold text-white disabled:opacity-40">
          {busy ? "…" : "Lưu"}
        </button>
      </div>
    </form>
  );
}

function Detail({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2 text-sm">
      <span className="shrink-0 text-gray-500">{label}</span>
      <span className="text-right font-medium text-gray-900">{children}</span>
    </div>
  );
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"guests" | "wishes">("guests");

  const [guests, setGuests] = useState<Guest[]>([]);
  const [loadingGuests, setLoadingGuests] = useState(true);
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [loadingWishes, setLoadingWishes] = useState(true);

  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<StatusFilter>("ALL");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);

  const [newName, setNewName] = useState("");
  const [newType, setNewType] = useState<GuestType>("BOTH");
  const [newPrefix, setNewPrefix] = useState(DEFAULT_INVITE_PREFIX);
  const [saving, setSaving] = useState(false);

  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = (message: string) => {
    setToast(message);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2500);
  };

  // Refreshes quietly after the first load so the list does not flash while editing.
  const fetchGuests = useCallback(async () => {
    const res = await fetch("/api/guests");
    if (res.ok) setGuests(await res.json());
    setLoadingGuests(false);
  }, []);

  const fetchWishes = useCallback(async () => {
    const res = await fetch("/api/wishes");
    if (res.ok) setWishes(await res.json());
    setLoadingWishes(false);
  }, []);

  useEffect(() => {
    let alive = true;
    (async () => {
      const [g, w] = await Promise.all([fetch("/api/guests"), fetch("/api/wishes")]);
      if (!alive) return;
      if (g.ok) setGuests(await g.json());
      if (w.ok) setWishes(await w.json());
      setLoadingGuests(false);
      setLoadingWishes(false);
    })();
    return () => {
      alive = false;
    };
  }, []);

  const selected = guests.find((g) => g.id === selectedId) || null;

  const handleAddGuest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || saving) return;
    setSaving(true);
    const res = await fetch("/api/guests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName.trim(), guestType: newType, invitePrefix: newPrefix }),
    });
    setSaving(false);
    if (res.ok) {
      const g: Guest = await res.json();
      setNewName("");
      setAdding(false);
      showToast(`Đã thêm ${g.name} (${g.code})`);
      fetchGuests();
    } else {
      showToast("Không thêm được khách, vui lòng thử lại");
    }
  };

  const handleRename = async (g: Guest, name: string) => {
    const res = await fetch(`/api/guests/${g.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    showToast(res.ok ? "Đã đổi tên khách" : "Không đổi được tên, vui lòng thử lại");
    await fetchGuests();
  };

  const handleChangePrefix = async (g: Guest, invitePrefix: string) => {
    const res = await fetch(`/api/guests/${g.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ invitePrefix }),
    });
    showToast(res.ok ? "Đã cập nhật cách xưng hô" : "Không đổi được cách xưng hô");
    fetchGuests();
  };

  const handleChangeType = async (g: Guest, guestType: GuestType) => {
    const send = (resetRsvp: boolean) =>
      fetch(`/api/guests/${g.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ guestType, resetRsvp }),
      });
    let res = await send(false);
    if (res.status === 409) {
      const label = GUEST_TYPES.find((t) => t.value === guestType)?.label;
      if (!confirm(`${g.name} đã trả lời RSVP. Đổi sang "${label}" sẽ đặt lại câu trả lời RSVP của khách này (trạng thái, tiệc đã chọn, xe đưa đón, số người; lời nhắn được giữ lại). Tiếp tục?`)) {
        fetchGuests();
        return;
      }
      res = await send(true);
    }
    showToast(res.ok ? "Đã đổi loại thiệp" : "Không đổi được loại thiệp");
    fetchGuests();
  };

  const handleDeleteGuest = async (g: Guest) => {
    if (!confirm(`Xóa khách "${g.name}"? Không thể hoàn tác.`)) return;
    await fetch(`/api/guests/${g.id}`, { method: "DELETE" });
    setSelectedId(null);
    showToast(`Đã xóa ${g.name}`);
    fetchGuests();
  };

  const handleDeleteWish = async (w: Wish) => {
    if (!confirm(`Xóa lời chúc của "${w.name}"? Không thể hoàn tác.`)) return;
    const res = await fetch(`/api/wishes/${w.id}`, { method: "DELETE" });
    showToast(res.ok ? "Đã xóa lời chúc" : "Không xóa được lời chúc, vui lòng thử lại");
    // An RSVP message is also stored on the guest, so refresh both lists.
    fetchWishes();
    fetchGuests();
  };

  const handleLogout = async () => {
    await logout();
    window.location.reload();
  };

  const copyLink = async (g: Guest) => {
    const url = `${window.location.origin}/?id=${g.code || g.id}`;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // Clipboard API needs a secure context / focus; fall back to the old way.
      const ta = document.createElement("textarea");
      ta.value = url;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(ta);
      if (!ok) return showToast("Không copy được link, vui lòng thử lại");
    }
    showToast(`Đã copy link của ${g.name}`);
  };

  const counts = useMemo(() => {
    const c = { ALL: guests.length, THAM_GIA: 0, KHONG_THAM_GIA: 0, CHUA_XAC_NHAN: 0 };
    for (const g of guests) if (g.status in c) c[g.status as keyof typeof c]++;
    return c;
  }, [guests]);

  const attendingPeople = guests.filter((g) => g.status === "THAM_GIA").reduce((acc, cur) => acc + cur.guestCount, 0);

  const visible = useMemo(() => {
    const q = fold(query.trim());
    return guests.filter(
      (g) => (filter === "ALL" || g.status === filter) && (!q || fold(g.name).includes(q) || fold(g.code || "").includes(q))
    );
  }, [guests, query, filter]);

  const filters: { value: StatusFilter; label: string }[] = [
    { value: "ALL", label: "Tất cả" },
    { value: "THAM_GIA", label: "Tham gia" },
    { value: "KHONG_THAM_GIA", label: "Từ chối" },
    { value: "CHUA_XAC_NHAN", label: "Chưa trả lời" },
  ];

  const partiesOf = (g: Guest) =>
    g.status === "THAM_GIA" ? [g.attendBride && "Nhà gái", g.attendGroom && "Nhà trai"].filter(Boolean).join(" + ") || "-" : "-";

  return (
    <div className="pb-24 md:pb-8">
      <div className="mb-4 flex items-center justify-between md:mb-6">
        <h2 className="text-xl font-bold text-gray-800 md:text-2xl">Quản trị</h2>
        <button onClick={handleLogout} className="rounded-lg px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-800">Đăng xuất</button>
      </div>

      <div className="mb-4 grid grid-cols-2 rounded-xl bg-gray-200 p-1 text-sm font-semibold md:inline-grid md:grid-cols-[auto_auto]">
        {([
          ["guests", `Khách mời (${guests.length})`],
          ["wishes", `Sổ lưu bút (${wishes.length})`],
        ] as const).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`h-10 rounded-lg px-4 transition ${activeTab === key ? "bg-white text-pink-600 shadow" : "text-gray-600"}`}
          >
            {label}
          </button>
        ))}
      </div>

      {activeTab === "guests" && (
        <>
          <div className="mb-4 grid grid-cols-3 gap-2 md:gap-4">
            <div className="rounded-xl bg-green-50 p-3 text-center">
              <div className="text-2xl font-bold text-green-700">{attendingPeople}</div>
              <div className="text-xs text-green-800">người tham gia</div>
            </div>
            <div className="rounded-xl bg-red-50 p-3 text-center">
              <div className="text-2xl font-bold text-red-700">{counts.KHONG_THAM_GIA}</div>
              <div className="text-xs text-red-800">từ chối</div>
            </div>
            <div className="rounded-xl bg-gray-100 p-3 text-center">
              <div className="text-2xl font-bold text-gray-700">{counts.CHUA_XAC_NHAN}</div>
              <div className="text-xs text-gray-600">chưa trả lời</div>
            </div>
          </div>

          <div className="mb-3 flex gap-2">
            <input
              type="search"
              placeholder="Tìm tên hoặc mã khách…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className={`${FIELD} flex-1`}
            />
            <button
              onClick={() => setAdding(true)}
              className="hidden h-11 shrink-0 rounded-lg bg-pink-500 px-5 font-bold text-white hover:bg-pink-600 md:block"
            >
              + Thêm khách
            </button>
          </div>

          <div className="-mx-4 mb-4 flex gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:px-0">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={`h-9 shrink-0 rounded-full border px-4 text-sm font-medium ${filter === f.value ? "border-pink-500 bg-pink-500 text-white" : "border-gray-300 bg-white text-gray-600"}`}
              >
                {f.label} <span className="opacity-70">{counts[f.value]}</span>
              </button>
            ))}
          </div>

          {loadingGuests ? (
            <p className="py-10 text-center text-gray-500">Đang tải...</p>
          ) : visible.length === 0 ? (
            <p className="py-10 text-center text-gray-500">{guests.length === 0 ? "Chưa có khách mời nào" : "Không có khách nào khớp"}</p>
          ) : (
            <>
              {/* Phones: compact cards, tap for details */}
              <ul className="space-y-2 md:hidden">
                {visible.map((g) => (
                  <li key={g.id}>
                    <button
                      onClick={() => setSelectedId(g.id)}
                      className="flex w-full items-center gap-3 rounded-xl bg-white p-3 text-left shadow-sm active:bg-gray-50"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="truncate font-semibold text-gray-900">{g.name}</div>
                        <div className="mt-0.5 truncate text-xs text-gray-500">
                          <span className="font-mono">{g.code || "-"}</span> · {TYPE_SHORT[g.guestType || "BOTH"]}
                          {g.status === "THAM_GIA" && ` · ${g.guestCount} người`}
                        </div>
                      </div>
                      <StatusPill status={g.status} />
                      <span className="text-gray-300" aria-hidden>›</span>
                    </button>
                  </li>
                ))}
              </ul>

              {/* Larger screens: table */}
              <div className="hidden overflow-hidden rounded-xl bg-white shadow-md md:block">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="bg-gray-100 text-sm uppercase text-gray-600">
                      <th className="px-4 py-3">Mã</th>
                      <th className="px-4 py-3">Tên khách</th>
                      <th className="px-4 py-3">Loại thiệp</th>
                      <th className="px-4 py-3">RSVP</th>
                      <th className="px-4 py-3">Số người</th>
                      <th className="px-4 py-3 text-right">Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visible.map((g) => (
                      <tr key={g.id} className="border-t border-gray-200 hover:bg-gray-50">
                        <td className="px-4 py-3 font-mono text-sm text-gray-500">{g.code || "-"}</td>
                        <td className="px-4 py-3 font-medium">{g.name}</td>
                        <td className="px-4 py-3 text-sm">{TYPE_SHORT[g.guestType || "BOTH"]}</td>
                        <td className="px-4 py-3"><StatusPill status={g.status} /></td>
                        <td className="px-4 py-3">{g.guestCount}</td>
                        <td className="px-4 py-3 text-right">
                          <button onClick={() => copyLink(g)} className="mr-4 text-sm text-blue-600 hover:underline">Copy link</button>
                          <button onClick={() => setSelectedId(g.id)} className="text-sm font-medium text-pink-600 hover:underline">Chi tiết</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          <button
            onClick={() => setAdding(true)}
            aria-label="Thêm khách mời"
            className="fixed bottom-5 right-4 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-pink-500 text-3xl leading-none text-white shadow-lg active:bg-pink-600 md:hidden"
          >
            +
          </button>
        </>
      )}

      {activeTab === "wishes" && (
        <>
          {loadingWishes ? (
            <p className="py-10 text-center text-gray-500">Đang tải...</p>
          ) : wishes.length === 0 ? (
            <p className="py-10 text-center text-gray-500">Chưa có lời chúc nào</p>
          ) : (
            <ul className="space-y-2">
              {wishes.map((w) => (
                <li key={w.id} className="rounded-xl bg-white p-4 shadow-sm">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="font-semibold text-gray-900">{w.name}</div>
                      <div className="text-xs text-gray-400">{new Date(w.createdAt).toLocaleString("vi-VN")}</div>
                    </div>
                    <button onClick={() => handleDeleteWish(w)} className="-mr-2 h-9 shrink-0 rounded-lg px-3 text-sm text-red-500 hover:bg-red-50">
                      Xóa
                    </button>
                  </div>
                  <p className="mt-2 whitespace-pre-wrap break-words text-gray-700">{w.content}</p>
                </li>
              ))}
            </ul>
          )}
        </>
      )}

      {adding && (
        <Sheet title="Thêm khách mời" onClose={() => setAdding(false)}>
          <form onSubmit={handleAddGuest} className="space-y-4">
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-gray-700">Tên khách</span>
              <input
                autoFocus
                type="text"
                placeholder="Ví dụ: cô giáo Nga, anh Tuấn…"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className={FIELD}
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-gray-700">Xưng hô khi mời</span>
              <PrefixSelect value={newPrefix} onChange={setNewPrefix} className={FIELD} />
            </label>
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-gray-700">Loại thiệp</span>
              <select value={newType} onChange={(e) => setNewType(e.target.value as GuestType)} className={FIELD}>
                {GUEST_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
            </label>
            <button
              type="submit"
              disabled={!newName.trim() || saving}
              className="h-12 w-full rounded-lg bg-pink-500 text-base font-bold text-white disabled:opacity-50"
            >
              {saving ? "Đang thêm…" : "Thêm khách"}
            </button>
          </form>
        </Sheet>
      )}

      {selected && (
        <Sheet title={selected.name} subtitle={selected.code || undefined} onClose={() => setSelectedId(null)}>
          <button
            onClick={() => copyLink(selected)}
            className="mb-4 flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-pink-500 text-base font-bold text-white active:bg-pink-600"
          >
            Copy link mời
          </button>

          <div className="space-y-3">
            <NameEditor key={`${selected.id}:${selected.name}`} name={selected.name} onSave={(n) => handleRename(selected, n)} />
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-gray-700">Xưng hô khi mời</span>
              <PrefixSelect
                value={selected.invitePrefix || DEFAULT_INVITE_PREFIX}
                onChange={(v) => handleChangePrefix(selected, v)}
                className={FIELD}
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-gray-700">Loại thiệp</span>
              <select
                value={selected.guestType || "BOTH"}
                onChange={(e) => handleChangeType(selected, e.target.value as GuestType)}
                className={FIELD}
              >
                {GUEST_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
            </label>
          </div>

          <div className="mt-5 divide-y divide-gray-200 rounded-xl border border-gray-200 px-3">
            <Detail label="Trạng thái RSVP"><StatusPill status={selected.status} /></Detail>
            <Detail label="Số người">{selected.guestCount}</Detail>
            <Detail label="Tiệc tham dự">{partiesOf(selected)}</Detail>
            <Detail label="Xe đưa đón">{selected.needShuttle ? `Cần xe (${selected.shuttleCount} người)` : "-"}</Detail>
          </div>

          <div className="mt-4">
            <div className="mb-1 text-sm font-medium text-gray-700">Lời nhắn</div>
            <div className="min-h-12 whitespace-pre-wrap break-words rounded-xl bg-gray-50 p-3 text-sm text-gray-800">
              {selected.message || <span className="text-gray-400">Không có lời nhắn</span>}
            </div>
          </div>

          <button
            onClick={() => handleDeleteGuest(selected)}
            className="mt-6 h-11 w-full rounded-lg border border-red-200 text-sm font-semibold text-red-600 active:bg-red-50"
          >
            Xóa khách này
          </button>
        </Sheet>
      )}

      {toast && (
        <div
          role="status"
          className="fixed bottom-24 right-4 z-50 max-w-[calc(100vw-2rem)] rounded-lg bg-gray-900 px-4 py-3 text-sm text-white shadow-lg md:bottom-6 md:right-6"
        >
          {toast}
        </div>
      )}
    </div>
  );
}
