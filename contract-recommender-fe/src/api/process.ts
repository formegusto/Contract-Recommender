import { Regist } from "../store/process/types";
import client from "../utils/client";

const BASE_PATH = "/process";

export const regist = (data: Regist) => {
  const formData: FormData = new FormData();

  Object.keys(data).forEach((k) => {
    formData.append(k, data[k]);
  });

  return client.post("/", formData);
};
export const getProcessList = () => client.get(BASE_PATH);
export const getProcess = (id: string) => client.get(`${BASE_PATH}/${id}`);
