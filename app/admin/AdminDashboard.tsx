"use client";

import { useEffect, useState } from "react";
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

const CUSTOM = "__custom__";

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

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"guests" | "wishes">("guests");
  
  const [guests, setGuests] = useState<Guest[]>([]);
  const [newName, setNewName] = useState("");
  const [newType, setNewType] = useState<GuestType>("BOTH");
  const [newPrefix, setNewPrefix] = useState(DEFAULT_INVITE_PREFIX);
  const [loadingGuests, setLoadingGuests] = useState(true);

  const [wishes, setWishes] = useState<Wish[]>([]);
  const [loadingWishes, setLoadingWishes] = useState(true);

  const fetchGuests = async () => {
    setLoadingGuests(true);
    const res = await fetch("/api/guests");
    if (res.ok) {
      setGuests(await res.json());
    }
    setLoadingGuests(false);
  };

  const fetchWishes = async () => {
    setLoadingWishes(true);
    const res = await fetch("/api/wishes");
    if (res.ok) {
      setWishes(await res.json());
    }
    setLoadingWishes(false);
  };

  useEffect(() => {
    if (activeTab === "guests") {
      fetchGuests();
    } else {
      fetchWishes();
    }
  }, [activeTab]);

  const handleAddGuest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    const res = await fetch("/api/guests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName, guestType: newType, invitePrefix: newPrefix }),
    });
    if (res.ok) {
      setNewName("");
      fetchGuests();
    }
  };

  const handleChangePrefix = async (g: Guest, invitePrefix: string) => {
    const res = await fetch(`/api/guests/${g.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ invitePrefix }),
    });
    if (!res.ok) alert("Không đổi được cách xưng hô, vui lòng thử lại.");
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
    if (!res.ok) alert("Không đổi được loại khách, vui lòng thử lại.");
    fetchGuests();
  };

  const handleDeleteGuest = async (id: string) => {
    if (!confirm("Bạn có chắc muốn xóa khách mời này?")) return;
    await fetch(`/api/guests/${id}`, { method: "DELETE" });
    fetchGuests();
  };

  const handleDeleteWish = async (id: string) => {
    if (!confirm("Bạn có chắc muốn xóa lời chúc này?")) return;
    await fetch(`/api/wishes/${id}`, { method: "DELETE" });
    fetchWishes();
  };

  const handleLogout = async () => {
    await logout();
    window.location.reload();
  };

  const copyLink = (g: Guest) => {
    const url = `${window.location.origin}/?id=${g.code || g.id}`;
    navigator.clipboard.writeText(url);
    alert("Đã copy link: " + url);
  };

  const attendingCount = guests.filter((g) => g.status === "THAM_GIA").reduce((acc, cur) => acc + cur.guestCount, 0);
  const declinedCount = guests.filter((g) => g.status === "KHONG_THAM_GIA").length;

  return (
    <div>
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Quản trị</h2>
        </div>
        <button onClick={handleLogout} className="text-sm text-gray-500 hover:text-gray-800 underline">Đăng xuất</button>
      </div>

      <div className="flex space-x-4 mb-6 border-b">
        <button
          className={`pb-2 px-4 font-semibold ${activeTab === "guests" ? "border-b-2 border-pink-500 text-pink-600" : "text-gray-500"}`}
          onClick={() => setActiveTab("guests")}
        >
          Khách mời
        </button>
        <button
          className={`pb-2 px-4 font-semibold ${activeTab === "wishes" ? "border-b-2 border-pink-500 text-pink-600" : "text-gray-500"}`}
          onClick={() => setActiveTab("wishes")}
        >
          Sổ lưu bút
        </button>
      </div>

      {activeTab === "guests" && (
        <>
          <div className="mb-6">
            <div className="flex gap-4 mt-2">
              <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg font-medium">Tham gia: {attendingCount} người</div>
              <div className="bg-red-100 text-red-800 px-4 py-2 rounded-lg font-medium">Không tham gia: {declinedCount} người</div>
              <div className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-medium">Chưa xác nhận: {guests.filter(g => g.status === "CHUA_XAC_NHAN").length} thiệp</div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h3 className="text-xl font-bold mb-4">Thêm khách mời</h3>
            <form onSubmit={handleAddGuest} className="flex gap-2">
              <input
                type="text"
                placeholder="Tên khách mời (Ví dụ: Bạn Nam)"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <PrefixSelect value={newPrefix} onChange={setNewPrefix} className="px-3 py-2 border rounded-lg bg-white" />
              <select
                value={newType}
                onChange={(e) => setNewType(e.target.value as GuestType)}
                className="px-3 py-2 border rounded-lg bg-white"
              >
                {GUEST_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
              <button type="submit" className="bg-pink-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-pink-600">Thêm</button>
            </form>
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-600 text-sm uppercase">
                  <th className="py-3 px-4">Mã</th>
                  <th className="py-3 px-4">Tên khách</th>
                  <th className="py-3 px-4">Xưng hô</th>
                  <th className="py-3 px-4">Loại thiệp</th>
                  <th className="py-3 px-4">Trạng thái RSVP</th>
                  <th className="py-3 px-4">Số người</th>
                  <th className="py-3 px-4">Tiệc</th>
                  <th className="py-3 px-4">Xe đưa đón</th>
                  <th className="py-3 px-4">Lời nhắn</th>
                  <th className="py-3 px-4 text-right">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {loadingGuests ? (
                  <tr><td colSpan={10} className="text-center py-8">Đang tải...</td></tr>
                ) : guests.length === 0 ? (
                  <tr><td colSpan={10} className="text-center py-8 text-gray-500">Chưa có khách mời nào</td></tr>
                ) : (
                  guests.map((g) => (
                    <tr key={g.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm font-mono text-gray-500">{g.code || "-"}</td>
                      <td className="py-3 px-4 font-medium">{g.name}</td>
                      <td className="py-3 px-4">
                        <PrefixSelect
                          value={g.invitePrefix || DEFAULT_INVITE_PREFIX}
                          onChange={(v) => handleChangePrefix(g, v)}
                          className="px-2 py-1 border rounded bg-white text-sm"
                        />
                      </td>
                      <td className="py-3 px-4">
                        <select
                          value={g.guestType || "BOTH"}
                          onChange={(e) => handleChangeType(g, e.target.value as GuestType)}
                          className="px-2 py-1 border rounded bg-white text-sm"
                        >
                          {GUEST_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                        </select>
                      </td>
                      <td className="py-3 px-4">
                        {g.status === "THAM_GIA" && <span className="text-green-600 font-medium">Tham gia</span>}
                        {g.status === "KHONG_THAM_GIA" && <span className="text-red-600 font-medium">Không tham gia</span>}
                        {g.status === "CHUA_XAC_NHAN" && <span className="text-gray-400">Chưa xác nhận</span>}
                      </td>
                      <td className="py-3 px-4">{g.guestCount}</td>
                      <td className="py-3 px-4 text-sm">
                        {g.status === "THAM_GIA" ? ([g.attendBride && "Nhà gái", g.attendGroom && "Nhà trai"].filter(Boolean).join(" + ") || "-") : "-"}
                      </td>
                      <td className="py-3 px-4 text-sm">{g.needShuttle ? `Cần xe (${g.shuttleCount} người)` : "-"}</td>
                      <td className="py-3 px-4 text-sm max-w-xs whitespace-pre-wrap">{g.message || "-"}</td>
                      <td className="py-3 px-4 flex justify-end gap-2">
                        <button onClick={() => copyLink(g)} className="text-blue-500 hover:underline text-sm">Copy Link</button>
                        <button onClick={() => handleDeleteGuest(g.id)} className="text-red-500 hover:underline text-sm ml-4">Xóa</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      )}

      {activeTab === "wishes" && (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-600 text-sm uppercase">
                <th className="py-3 px-4">Tên</th>
                <th className="py-3 px-4">Lời chúc</th>
                <th className="py-3 px-4">Thời gian</th>
                <th className="py-3 px-4 text-right">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {loadingWishes ? (
                <tr><td colSpan={4} className="text-center py-8">Đang tải...</td></tr>
              ) : wishes.length === 0 ? (
                <tr><td colSpan={4} className="text-center py-8 text-gray-500">Chưa có lời chúc nào</td></tr>
              ) : (
                wishes.map((w) => (
                  <tr key={w.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium whitespace-nowrap">{w.name}</td>
                    <td className="py-3 px-4">{w.content}</td>
                    <td className="py-3 px-4 text-sm text-gray-500 whitespace-nowrap">
                      {new Date(w.createdAt).toLocaleString("vi-VN")}
                    </td>
                    <td className="py-3 px-4 flex justify-end gap-2">
                      <button onClick={() => handleDeleteWish(w.id)} className="text-red-500 hover:underline text-sm ml-4">Xóa</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
