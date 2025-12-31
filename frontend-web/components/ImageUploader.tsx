"use client";

import { useState } from "react";
import { searchByImage } from "@/lib/api";
import ArtworkCard from "@/components/ArtworkCard";
import { ImageSearchResult } from "@/lib/types";

export default function ImageUploader() {
  const [results, setResults] = useState<ImageSearchResult[]>([]);

  async function onUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files?.[0]) return;

    const data = await searchByImage(
      e.target.files[0],
      7 // TODO: 실제 선택된 exhibitionId
    );

    // 🔥 핵심: data 자체가 배열
    setResults(data);
  }

  return (
    <>
      <input type="file" accept="image/*" onChange={onUpload} />

      <div className="mt-4 space-y-2">
        {results.map((r) => (
          <ArtworkCard
            key={r.artwork.id}
            artwork={r.artwork}
            score={r.score}
          />
        ))}
      </div>
    </>
  );
}