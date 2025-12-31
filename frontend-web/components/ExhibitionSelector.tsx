"use client";

import { useEffect, useState } from "react";
import { fetchExhibitions } from "@/lib/api";
import { Exhibition } from "@/lib/types";

type Props = {
  galleryId: number | null;
  onChange: (id: number | null) => void;
};

export default function ExhibitionSelector({
  galleryId,
  onChange,
}: Props) {
  const [exhibitions, setExhibitions] = useState<Exhibition[]>([]);

  useEffect(() => {
    if (!galleryId) {
      setExhibitions([]);
      return;
    }
    fetchExhibitions(galleryId).then(setExhibitions);
  }, [galleryId]);

  return (
    <select
      className="w-full p-2 border rounded mt-2"
      disabled={!galleryId}
      onChange={(e) =>
        onChange(e.target.value ? Number(e.target.value) : null)
      }
    >
      <option value="">전시 선택</option>
      {exhibitions.map((e) => (
        <option key={e.id} value={e.id}>
          {e.name}
        </option>
      ))}
    </select>
  );
}