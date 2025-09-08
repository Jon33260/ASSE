import "../styles/formulaireinscription.css";

type User = {
  username: string;
  email: string;
  motDePasse: string;
  confirmerMotDePasse: string;
};

type Props = {
  user: User;
  handleChangeForm: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function FormulaireInscription({
  user,
  handleChangeForm,
}: Props) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.info("Inscription avec :", user);
    // ici tu peux appeler ton API pour créer le compte
  };

  return (
    <form className="formulaire-inscription" onSubmit={handleSubmit}>
      <h3>Inscription</h3>
      <label>
        Nom d'utilisateur
        <input
          type="text"
          name="username"
          value={user.username}
          onChange={handleChangeForm}
          required
        />
      </label>
      <label>
        Email
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChangeForm}
          required
        />
      </label>
      <label>
        Mot de passe
        <input
          type="password"
          name="motDePasse"
          value={user.motDePasse}
          onChange={handleChangeForm}
          required
        />
      </label>

      <button type="submit">S'inscrire</button>
    </form>
  );
}
