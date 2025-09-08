import { Link } from "react-router-dom";
import "../styles/supporterphotos.css";

const baseUrl = import.meta.env.VITE_API_URL;

type SupporterPhoto = {
  id: number;
  title: string;
  description?: string;
  picture: string;
};

export default function SupporterPhotos({
  photos,
}: { photos: SupporterPhoto[] }) {
  if (!Array.isArray(photos) || photos.length === 0) {
    return <p>Aucune photo publiée</p>;
  }

  return (
    <section className="supporter-gallery">
      {photos.map((photo) => (
        <Link
          to={`/supporter-photos/${photo.id}`}
          key={photo.id}
          className="supporter-item"
        >
          <img
            src={`${baseUrl}/uploads/${photo.picture}`}
            alt={photo.description || photo.title}
          />
          <p>{photo.title}</p>
        </Link>
      ))}
    </section>
  );
}
