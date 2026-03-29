import api from "./api";

export async function getAssignments(params = {}) {
  const searchParams = new URLSearchParams(params).toString();
  const url = searchParams ? `/assignments?${searchParams}` : "/assignments";
  const { data } = await api.get(url);
  return data;
}

export async function getAssignmentById(id) {
  const { data } = await api.get(`/assignments/${id}`);
  return data.assignment;
}

export async function submitAssignment(assignmentId, submissionLink) {
  const { data } = await api.post(`/assignments/${assignmentId}/submit`, {
    submissionLink,
  });
  return data.submission;
}
