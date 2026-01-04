import { getApiBaseUrl } from "./api";

export type Exhibition = {
  id: number;
  name: string;
  description?: string;
  start_date?: string;
  end_date?: string;
};

export async function fetchExhibitions(galleryId: number): Promise<Exhibition[]> {
  const API_BASE = getApiBaseUrl();
  const url = `${API_BASE}/exhibitions?gallery_id=${galleryId}`;
  console.log("fetching exhibitions:", url);

  const res = await fetch(url);
  console.log("status:", res.status);

  if (!res.ok) {
    throw new Error("Failed to fetch exhibitions");
  }
  return res.json();
}
