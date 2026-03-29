import api from "./api";

export function formatTicketDate(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export async function fetchTickets(params = {}) {
  const searchParams = new URLSearchParams(params).toString();
  const url = searchParams ? `/tickets?${searchParams}` : "/tickets";
  const { data } = await api.get(url);
  return data.tickets || [];
}

export async function fetchTicket(id) {
  const { data } = await api.get(`/tickets/${id}`);
  return data.ticket;
}

export async function createTicket({ course, category, title, description, file }) {
  const formData = new FormData();
  formData.append("course", course);
  formData.append("category", category);
  formData.append("title", title);
  formData.append("description", description);
  if (file) {
    formData.append("file", file);
  }
  const { data } = await api.post("/tickets", formData);
  return data.ticket;
}

export async function studentReply(ticketId, body) {
  const { data } = await api.post(`/tickets/${ticketId}/student-reply`, body);
  return data.ticket;
}

export async function reopenTicket(ticketId, text = "") {
  const { data } = await api.post(`/tickets/${ticketId}/reopen`, { text });
  return data.ticket;
}
