import api from "./api";

export async function getLectures(params = {}) {
  const searchParams = new URLSearchParams(params).toString();
  const url = searchParams ? `/lectures?${searchParams}` : "/lectures";
  const { data } = await api.get(url);
  return data;
}

export async function getTodayLectures(studentId) {
  const { data } = await api.get(`/lectures/today?student=${studentId}`);
  return data;
}

export async function getLectureById(id) {
  const { data } = await api.get(`/lectures/${id}`);
  return data.lecture;
}

export async function getDiscussions(lectureId) {
  const { data } = await api.get(`/lectures/${lectureId}/discussions`);
  return data.discussions;
}

export async function createDiscussion(lectureId, text) {
  const { data } = await api.post(`/lectures/${lectureId}/discussions`, { text });
  return data.discussion;
}
