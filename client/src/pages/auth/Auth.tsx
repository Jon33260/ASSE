import axios from "axios";
import { useState } from "react";

export default function Auth() {
  const [credentials, setCredentials] = useState({
    // comment sauvegarder dans un state les différents champs du formulaire
    email: "",
    password: "",
  });

  const handleChangeCredentials = (e: React.ChangeEvent<HTMLInputElement>) => {
    // pour typer le "e"
    setCredentials({
      ...credentials,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const login = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // pour éviter que ça refresh la page
    axios
      .post("http://localhost:3310/api/login", credentials, {
        withCredentials: true, // pour que le navigateur accepte les cookies venant du serveur
      })
      .then((response) => console.info(response))
      .catch((error) => console.error(error));
  };

  return (
    <form onSubmit={login}>
      <p>Email</p>
      <input
        type="email"
        name="email"
        onChange={handleChangeCredentials}
        value={credentials.email}
      />
      <p>Password</p>
      <input
        type="password"
        name="password"
        onChange={handleChangeCredentials}
        value={credentials.password}
      />
      <input type="submit" />
    </form>
  );
}
