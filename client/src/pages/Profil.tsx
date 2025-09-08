import { useEffect, useState } from "react";
import SupporterPhotos from "../components/SupporterPhotos";

type SupporterPhoto = {
  id: number;
  title: string;
  description?: string;
  picture: string;
};

export default function Profil() {
  const [photos, setPhotos] = useState<SupporterPhoto[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/supporter-photos`)
      .then((res) => res.json())
      .then((data) => setPhotos(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>Galerie supporters</h1>
      <SupporterPhotos photos={photos} />
    </div>
  );
}
