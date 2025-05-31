import { apiFetchPOST, FetchResponse } from "@/api/apiFetch";

export async function createCourse(courseData: {
  price: number;
  time_to_pass: number;
  title: string;
  description: string;
  parts: any[];
}): Promise<FetchResponse<null>> {
  const res = await apiFetchPOST<null>("/createCourse", courseData);
  return {
    ok: res.ok,
    status: res.status,
    data: res.data,
    error: res.error,
  };
}
