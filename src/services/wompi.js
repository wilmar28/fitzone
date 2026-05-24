import api from "./api";

export const generarFirma = async (data) => {
  const response = await api.post("/wompi/signature", data);
  return response.data;
};