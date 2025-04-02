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

export async function checkAuth() {
  try {
    const response = await fetch(`${IP}:${PORT}/api/isAuthorized`, {
      method: "GET",
      credentials: "include",
    });

    const data = await response.json();

    if (response.ok && !data.error) {
      console.log("✅ Пользователь авторизован");
      return data.user.name;
    } else {
      console.log("❌ Пользователь НЕ авторизован");
      return "";
    }
  } catch (error) {
    console.error("Ошибка проверки авторизации:", error);
    return "";
  }
}

export async function getCourses(): Promise<Course[]> {
  try {
    const response = await fetch(`${IP}:${PORT}/api/getCourses`);
    if (!response.ok) {
      throw new Error(`Ошибка: ${response.status}`);
    }
    const data = await response.json();
    console.log("Данные:", data);
    return data.bucket_courses || [];
  } catch (error) {
    console.error("Ошибка запроса:", error);
    return [];
  }
}

export async function fetchLogout() {
  try {
    const response = await fetch(`${IP}:${PORT}/api/logout`, {
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`Ошибка выхода: ${response.status}`);
    }

    console.log("✅ Успешный выход");
    return true;
  } catch (error) {
    console.error("Ошибка запроса:", error);
    return [];
  }
}

export async function loginUser(email: string, password: string) {
  try {
    const response = await fetch(`${IP}:${PORT}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      return true;
    } else {
      return data.error;
    }
  } catch (err) {
    console.error("Ошибка сети:", err);
    return "Ошибка сети:";
  }
}

export async function registerUser(
  email: string,
  name: string,
  password: string
) {
  try {
    const response = await fetch(`${IP}:${PORT}/api/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, name, password }),
    });

    const data = await response.json();
    if (response.ok) {
      return true;
    } else {
      return data.error;
    }
  } catch (err) {
    console.error("Ошибка сети:", err);
    return "Ошибка сети:";
  }
}
