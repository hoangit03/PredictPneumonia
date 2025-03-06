import axios, { AxiosResponse } from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const postAxios = async <T>(
  endpoint: string,
  data: T,
): Promise<AxiosResponse<T>> => {
  try {
    const response = await axios.post(`${API_URL}/${endpoint}`, data);

    return response;
  } catch (error) {
    throw error;
  }
};

export const postformDataAxios = async <T>(
  endpoint: string,
  data: FormData,
): Promise<AxiosResponse<T>> => {
  try {
    const response = await axios.post<T>(`${API_URL}/${endpoint}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      timeout: 10000,
    });

    return response;
  } catch (error) {
    throw error;
  }
};

export const getAxios = async <T>(
  endpoint: string,
  id: string,
): Promise<AxiosResponse<T>> => {
  try {
    const response = await axios.get(`${API_URL}/${endpoint}/${id}`);

    return response;
  } catch (error) {
    throw error;
  }
};

export const putAxios = async <T>(
  endpoint: string,
  id: string,
  data: T,
): Promise<AxiosResponse<T>> => {
  try {
    const response = await axios.put(`${API_URL}/${endpoint}/${id}`, data);

    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteAxios = async <T>(
  endpoint: string,
  id: string,
): Promise<AxiosResponse<T>> => {
  try {
    const response = await axios.delete(`${API_URL}/${endpoint}/${id}`);

    return response;
  } catch (error) {
    throw error;
  }
};
