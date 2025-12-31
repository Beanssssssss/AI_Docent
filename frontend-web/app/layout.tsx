"use client";

import { useState } from "react";
import GallerySelector from "@/components/GallerySelector";
import ExhibitionSelector from "@/components/ExhibitionSelector";
import BottomNav from "@/components/BottomNav";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [galleryId, setGalleryId] = useState<number | null>(null);
  const [exhibitionId, setExhibitionId] = useState<number | null>(null);

  return (
    <html>
      <body className="h-screen flex flex-col">
        <header className="p-3 border-b bg-white">
          <GallerySelector onChange={setGalleryId} />
          <ExhibitionSelector
            galleryId={galleryId}
            onChange={setExhibitionId}
          />
        </header>

        <main className="flex-1 overflow-y-auto bg-gray-50">
          {children}
        </main>

        <BottomNav />
      </body>
    </html>
  );
}