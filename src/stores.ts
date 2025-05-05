import { defineStore } from "@/ourReact/jsx-runtime";
import { UserProfile } from "@/types/users";
import { CourseOpen } from "@/types/courseMenu";
import { Toast } from "@/types/notifications";

export const [useCourseOpen, setCourseOpen] = defineStore(
  "CourseOpen",
  {} as CourseOpen
);
export const [useLessonID, setLessonID] = defineStore<number | false>(
  "LessonData",
  false
);
export const [usePage, setPage] = defineStore("Page", "MainMenu");
export const [useMenu, setMenu] = defineStore("menu", false);
export const [useUser, setUser] = defineStore("auth", false as UserProfile);
export const [useLoginWindow, setLoginWindow] = defineStore(
  "loginWindow",
  false
);
export const [useToast, setToast] = defineStore("toast", {
  data: [] as Toast,
  count: 0 as number,
});
export const [isSearch, setSearch] = defineStore("search", "");
