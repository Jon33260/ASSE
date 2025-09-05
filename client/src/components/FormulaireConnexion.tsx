import { useState } from "react";
import { toast } from "react-toastify";
import "../styles/formulaireconnexion.css";

export default function FormulaireConnexion() {
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.info("Connexion avec :", { email, motDePasse });

    toast.success("Connexion réussie 🌿", {
      position: "top-center",
    });
  };

  return (
    <div className="form-connexion-container">
      <form className="formulaire-connexion" onSubmit={handleSubmit}>
        <h3>Connexion</h3>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Mot de passe
          <input
            type="password"
            value={motDePasse}
            onChange={(e) => setMotDePasse(e.target.value)}
            required
          />
        </label>
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
}
