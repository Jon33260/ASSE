import { useLoaderData } from "react-router-dom";

export default function Members() {
  const members = useLoaderData() as any[];
  console.info("Membres récupérés via loader :", members);

  return (
    <div>
      <h1>Liste des membres</h1>
      {members.length > 0 ? (
        <ul>
          {members.map((user) => (
            <li key={user.id}>
              {user.Nom} {user.Prenom} — {user.Email}
            </li>
          ))}
        </ul>
      ) : (
        <p>Aucun utilisateur trouvé</p>
      )}
    </div>
  );
}
