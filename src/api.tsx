export const IP = "http://217.16.21.64";
export const PORT = "8080";

export interface Course {
  id: number;
  price: number;
  purchases_amount: number;
  creator_id: number;
  time_to_pass: number;
  title: string;
  description: string;
  src_image: string;
}

async function apiFetch(url: string, options = {}) {
  try {
    const response = await fetch(`${IP}:${PORT}/api${url}`, {
      credentials: "include",
      ...options,
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || `Ошибка: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error(`Ошибка запроса к ${url}:`, error);
    return null;
  }
}

export async function checkAuth() {
  const data = await apiFetch("/isAuthorized");
  if (data && !data.error) {
    console.log("✅ Пользователь авторизован");
    return data.user.name;
  }
  console.log("❌ Пользователь НЕ авторизован");
  return "";
}

export async function getCourses() {
  const data = await apiFetch("/getCourses");
  return data?.bucket_courses || [];
}

export async function fetchLogout() {
  return (await apiFetch("/logout")) !== null;
}

export async function loginUser(email: string, password: string) {
  const data = await apiFetch("/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return data ? true : "Ошибка авторизации";
}

export async function registerUser(
  email: string,
  name: string,
  password: string
) {
  const data = await apiFetch("/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, name, password }),
  });
  return data ? true : "Ошибка регистрации";
}
