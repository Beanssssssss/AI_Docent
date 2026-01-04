import { getApiBaseUrl } from "./api";

export type Gallery = {
  id: number;
  name: string;
};

export async function fetchGalleries() {
    const API_BASE = getApiBaseUrl();
    console.log("API_BASE =", API_BASE);
    const url = `${API_BASE}/galleries`;
    console.log("fetching:", url);
  
    const res = await fetch(url);
    console.log("status:", res.status);
  
    if (!res.ok) {
      throw new Error("Failed to fetch galleries");
    }
    return res.json();
  }