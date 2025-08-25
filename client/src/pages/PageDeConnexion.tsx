import { useState } from "react";
import LoginForm from "../components/FormulaireConnexion";
import SignupForm from "..//components/FormulaireInscription";
import "../styles/pagedeconnexion.css";
import chaudronImg from "../assets/chaudron.jpg";

export default function PageDeConnexion() {
  // État pour savoir quel formulaire afficher
  const [isSignup, setIsSignup] = useState(false);

  const toggleForm = () => setIsSignup(!isSignup);

  // État pour gérer les champs du formulaire d'inscription
  const [user, setUser] = useState({
    username: "",
    email: "",
    motDePasse: "",
    confirmerMotDePasse: "",
  });

  const handleChangeForm = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  return (
    <div className="page-connexion-container">
      {/* Section formulaire + titre */}
      <section className="form-section">
        <div className="visual-title">
          <h1>Bienvenue sur</h1>
          <h2>votre espace membre</h2>
        </div>

        {/* Toggle entre login et signup */}
        {isSignup ? (
          <SignupForm user={user} handleChangeForm={handleChangeForm} />
        ) : (
          <LoginForm />
        )}

        {/* Bouton pour passer de login à signup */}
        <button type="button" className="login-link" onClick={toggleForm}>
          {isSignup ? "Déjà un compte ?" : "Pas encore de compte ?"}
        </button>
      </section>

      {/* Section visuelle / image */}
      <section className="img-section">
        <div className="visual-image">
          <img src={chaudronImg} alt="Le chaudron" />
        </div>
      </section>
    </div>
  );
}
