import api from "./api";

export async function getAnnouncements(params = {}) {
  const searchParams = new URLSearchParams(params).toString();
  const url = searchParams ? `/announcements?${searchParams}` : "/announcements";
  const { data } = await api.get(url);
  return {
    announcements: data.announcements || [],
    unreadCount: data.unreadCount ?? 0,
  };
}

export async function getUnreadAnnouncementsCount() {
  const { data } = await api.get("/announcements/unread-count");
  return data.unreadCount ?? 0;
}

export async function markAnnouncementsRead(announcementIds = []) {
  if (!announcementIds.length) return { marked: 0 };
  const { data } = await api.post("/announcements/mark-read", { announcementIds });
  return data;
}
