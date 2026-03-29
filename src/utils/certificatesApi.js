import api from "./api";

export async function getCertificates() {
  const { data } = await api.get("/certificates");
  return data.certificates || [];
}

export async function downloadCertificate(certId) {
  const { data } = await api.get(`/certificates/${certId}/download`, {
    responseType: "blob",
  });
  return data;
}
