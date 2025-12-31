import { fetchArtworkDetail } from "@/lib/api";

export default async function ArtworkDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const artwork = await fetchArtworkDetail(params.id);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">{artwork.title}</h2>
      <p className="text-gray-600">{artwork.artist}</p>

      <img
        src={artwork.image_url}
        className="w-full mt-4 rounded"
      />

      <p className="mt-4">{artwork.description}</p>
    </div>
  );
}