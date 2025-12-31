"use client";

import { useEffect, useState } from "react";
import { fetchGalleries } from "@/lib/api";
import { Gallery } from "@/lib/types";

type Props = {
  onChange: (id: number | null) => void;
};

export default function GallerySelector({ onChange }: Props) {
  const [galleries, setGalleries] = useState<Gallery[]>([]);

  useEffect(() => {
    fetchGalleries().then(setGalleries);
  }, []);

  return (
    <select
      className="w-full p-2 border rounded"
      onChange={(e) =>
        onChange(e.target.value ? Number(e.target.value) : null)
      }
    >
      <option value="">갤러리 선택</option>
      {galleries.map((g) => (
        <option key={g.id} value={g.id}>
          {g.name}
        </option>
      ))}
    </select>
  );
}