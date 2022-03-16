import axios from "axios";
import { apiUrl } from "../config";
import { getUserInfo } from "../localStorage";

// Envia request para o server e recebe o id do produto
export const getProduct = async (id) => {
  try {
    const response = await axios({
      url: `${apiUrl}/api/products/${id}`,
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (response.statusText !== "OK") {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (err) {
    console.log(err);
    return { error: err.response.data.message || err.message };
  }
};

// verifica se o usuário já está cadastrado
export const signin = async ({ email, password }) => {
  try {
    const response = await axios({
      url: `${apiUrl}/api/users/signin`,
      method: "POST",
      header: { "Content-Type": "application/json" },
      data: { email, password },
    });

    if (response.statusText !== "OK") {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (err) {
    console.log(err);
    return { error: err.response.data.message || err.message };
  }
};

// faz o cadastro do usuário
export const signup = async ({ name, email, password }) => {
  try {
    const response = await axios({
      url: `${apiUrl}/api/users/signup`,
      method: "POST",
      header: { "Content-Type": "application/json" },
      data: { name, email, password },
    });

    if (response.statusText !== "OK") {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (err) {
    console.log(err);
    return { error: err.response.data.message || err.message };
  }
};

// faz a atualização cadastro do usuário
export const update = async ({ name, email, password }) => {
  try {
    const { _id, token } = getUserInfo();

    const response = await axios({
      url: `${apiUrl}/api/users/${_id}`,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: { name, email, password },
    });

    if (response.statusText !== "OK") {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (err) {
    console.log(err);
    return { error: err.response.data.message || err.message };
  }
};
