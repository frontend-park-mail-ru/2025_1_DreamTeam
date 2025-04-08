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
  rating: number;
  src_image: string;
  tags: string[];
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

export async function updateProfile(
  image: string,
  bio: string,
  email: string,
  hide_email: boolean,
  name: string
) {
  const data = await apiFetch("/updateProfile", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ image, bio, email, hide_email, name }), // Преобразуем объект в JSON строку
  });
  return data ? true : "Ошибка запроса";
}

export async function getAuthorizedUser() {
  const data = await apiFetch("/isAuthorized", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return data ? data.user : "Ошибка запроса";
}

export async function uploadProfilePhoto(file: File) {
  console.log("ok");
  const formData = new FormData();

  console.log(file);

  formData.append("avatar", file);

  const jsonData = JSON.stringify({ avatar: file.name });
  formData.append("data", jsonData);

  try {
    const response = await fetch(`${IP}:${PORT}/api/updateProfilePhoto`, {
      method: "POST",
      body: formData,
      credentials: "include",
    });
    const responseData = await response.json();
    if (responseData) {
      return true;
    }
  } catch (error) {
    console.error("Ошибка при загрузке фото", error);
    return false;
  }
}
