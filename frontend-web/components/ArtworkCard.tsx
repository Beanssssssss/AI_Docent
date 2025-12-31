import Link from "next/link";

export default function ArtworkCard({ artwork }: any) {
  return (
    <Link href={`/artworks/${artwork.id}`}>
      <div className="border rounded p-2 flex gap-3 bg-white">
        <img
          src={artwork.image_url}
          className="w-16 h-16 object-cover rounded"
        />
        <div>
          <div className="font-bold">{artwork.title}</div>
          <div className="text-sm text-gray-500">
            유사도 {Math.round((1 - artwork.score) * 100)}%
          </div>
        </div>
      </div>
    </Link>
  );
}