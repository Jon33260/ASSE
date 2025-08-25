import "../styles/Header.css";
import type { FormEvent } from "react";
import { useState } from "react";

export default function HeaderReseau() {
  const [searchValue, setSearchValue] = useState("");
  // const [selectedFilter, setSelectedFilter] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Soumission de la recherche
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchValue) {
      console.info("Recherche :", searchValue);
      // Ici tu pourras appeler ton API ou mettre à jour ton état global
    }
  };

  // Filtre choisi
  const handleChangeFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.currentTarget.value;
    // setSelectedFilter(value);
    console.info("Filtre choisi :", value);
  };

  // Catégorie cliquée
  const handleClickCategory = (categoryName: string) => {
    setSelectedCategory(categoryName);
    console.info("Catégorie choisie :", categoryName);
  };

  return (
    <section className="header-container">
      {/* Barre de recherche + filtre */}
      <div className="barre-filtre">
        <form className="barre" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Rechercher un membre, un post..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.currentTarget.value)}
          />
          <button type="submit" className="btn-search">
            🔍
          </button>
        </form>

        <div>
          <select className="filtre" onChange={handleChangeFilter}>
            <option value="">Trier par</option>
            <option value="populaire">Populaires</option>
            <option value="recent">Récents</option>
          </select>
        </div>
      </div>

      {/* Catégories */}
      <div className="categories">
        {["Amis", "Groupes", "Tendances"].map((cat) => (
          <button
            key={cat}
            className={`slide ${selectedCategory === cat ? "selected" : ""}`}
            type="button"
            onClick={() => handleClickCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
    </section>
  );
}
