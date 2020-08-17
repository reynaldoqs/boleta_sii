import axios from "axios";
import { SII_API } from "../config/sii";

export const login = (rut, clave_sii) => {
  return axios.post(SII_API + "/emisiones/login", {
    rut,
    clave_sii,
  });
};

export const genBoleta = (data) => {
  return axios.post(SII_API + "/emisiones/boleta", data, {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
    },
  });
};
