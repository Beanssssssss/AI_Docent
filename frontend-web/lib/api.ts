export async function fetchGalleries() {
  const res = await fetch("http://localhost:8000/galleries");
  return res.json();
}

export async function fetchExhibitions(galleryId: number) {
  const res = await fetch(
    `http://localhost:8000/exhibitions?gallery_id=${galleryId}`
  );
  return res.json();
}

export async function searchByImage(file: File, exhibitionId: number) {
  const form = new FormData();
  form.append("image", file);
  form.append("exhibition_id", String(exhibitionId));

  const res = await fetch("http://localhost:8000/image-search/", {
    method: "POST",
    body: form,
  });

  // 🔥 바로 배열이 옴
  return res.json();
}

export async function fetchArtworkDetail(id: string) {
  const res = await fetch(`http://localhost:8000/artworks/${id}`);
  return res.json();
}