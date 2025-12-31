"use client";

import { useRouter } from "next/navigation";

export default function BottomNav() {
  const router = useRouter();

  return (
    <nav className="h-14 border-t flex justify-around items-center bg-white sticky bottom-0">
      <button onClick={() => router.push("/")}>🏠 홈</button>
      <button onClick={() => router.push("/search")}>📷 검색</button>
      <button onClick={() => router.push("/info")}>ℹ️ 정보</button>
    </nav>
  );
}