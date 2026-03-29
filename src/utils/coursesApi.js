import api from "./api";

export async function getCourses(params = {}) {
  const searchParams = new URLSearchParams(params).toString();
  const url = searchParams ? `/courses?${searchParams}` : "/courses";
  const { data } = await api.get(url);
  return data;
}

export async function getCourseById(id) {
  const { data } = await api.get(`/courses/${id}`);
  return data.course;
}
