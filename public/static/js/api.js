export const ip = "http://217.16.21.64";
export const port = "8080";

export async function check_auth() {
  try {
    const response = await fetch(`${ip}:${port}/api/isAuthorized`, {
      method: "GET",
      credentials: "include",
    });

    const data = await response.json();

    if (response.ok && !data.error) {
      console.log("✅ Пользователь авторизован");
      return data.user.name;
    } else {
      console.log("❌ Пользователь НЕ авторизован");
      return false;
    }
  } catch (error) {
    console.error("Ошибка проверки авторизации:", error);
    return false;
  }
}

export async function fetch_data() {
  try {
    const response = await fetch(`${ip}:${port}/api/getCourses`);
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

export async function fetch_logout() {
  try {
      const response = await fetch(`${ip}:${port}/api/logout`, {
      credentials: "include"
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