import { CourseOpen } from "@/App";
import { CourseStructure } from "@/CourseMenu";
import { LessonsStructure } from "@/Lesson";
import { UserProfile } from "@/types/users";

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

const apiFetch = async (url: string, options = {}) => {
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

export const checkAuth = async (): Promise<UserProfile> => {
  const data = await apiFetch("/isAuthorized");
  if (data && !data.error) {
    console.log("✅ Пользователь авторизован");
    return data.user;
  }
  console.log("❌ Пользователь НЕ авторизован");
  return false;
}

export const getCourses = async () => {
  const data = await apiFetch("/getCourses");
  return data?.bucket_courses || [];
}

export const getCourse = async (id: number): Promise<CourseOpen> => {
  const data = await apiFetch(`/getCourse?courseId=${id}`);
  return data?.course || {};
}

export const fetchLogout = async () => {
  return (await apiFetch("/logout")) !== null;
}

export const loginUser = async (email: string, password: string) =>{
  const data = await apiFetch("/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return data ? true : "Ошибка авторизации";
}

export const registerUser = async (
  email: string,
  name: string,
  password: string
) => {
  const data = await apiFetch("/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, name, password }),
  });
  return data ? true : "Ошибка регистрации";
}

export const updateProfile = async (
  image: string,
  bio: string,
  email: string,
  hide_email: boolean,
  name: string
) => {
  const data = await apiFetch("/updateProfile", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ image, bio, email, hide_email, name }), // Преобразуем объект в JSON строку
  });
  return data ? true : "Ошибка запроса";
}

export const getAuthorizedUser = async () => {
  console.log("authFetch");
  const data = await apiFetch("/isAuthorized", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return data
    ? data.user
    : {
        name: "",
        email: "",
        bio: "",
        avatar_src: "path_to_default",
        hide_email: false,
      };
}

export const uploadProfilePhoto = async (file: File) => {
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
      return responseData.url;
    }
  } catch (error) {
    console.error("Ошибка при загрузке фото", error);
    return false;
  }
}

export const getCourseRoadmap = async (
  courseId: number
): Promise<CourseStructure> => {
  const data = await apiFetch(`/getCourseRoadmap?courseId=${courseId}`);
  return data?.course_roadmap || { parts: [] };
}

export const getLessons = async (
  id: number
): Promise<LessonsStructure | undefined> => {
  const data = await apiFetch(`/getCourseLesson?courseId=${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return data ? data : undefined;
}

export const getNextLessons = async (course_id: number, lesson_id: number) => {
  const data = await apiFetch(
    `/getNextLesson?courseId=${course_id}&lessonId=${lesson_id}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );
  return data ? data : "Ошибка запроса";
}

export const notCompleted = async(lesson_id: number) => {
  const data = await apiFetch("/markLessonAsNotCompleted", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ lesson_id }), // Преобразуем объект в JSON строку
  });
  return data ? true : "Ошибка запроса";
}

export const deletePhoto = async () => {
  const data = await apiFetch("/deleteProfilePhoto", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  return data ? true : "Ошибка удаления";
}

export const validEmail = async (token: string) => {
  const data = await apiFetch(`/validEmail?token=${token}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return data ? data : undefined;
}
