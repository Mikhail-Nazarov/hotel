import { $host } from "../../index.http";

export const signInApi = async (email: string, password: string) => {
  try {
    const { data, status } = await $host.post("/auth/login", {
      email,
      password,
    });
    return { status, data };
  } catch (error: any) {
    return {
      status: error.response.status,
      message: error.response.data.message,
    };
  }
};

export const signUpApi = async (
  email: string,
  password: string,
  name: string,
  phone: string
) => {
  const { data, status } = await $host.post("/auth/registration", {
    email,
    password,
    name,
    phone,
  });
  return { status, data };
};

export const logout = async () => {
  const { data } = await $host.get("/users/logout");
  return data;
};
