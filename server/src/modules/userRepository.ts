import databaseClient from "../../database/client";

import type { Result, Rows } from "../../database/client";

type Users = {
  id: number;
  Nom: string;
  Prenom: string;
  Email: string;
  hashed_password: string;
  is_admin: boolean;
};

class UsersRepository {
  read(userId: number) {
    throw new Error("Method not implemented.");
  }
  async create(users: Users) {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO users (Nom, Prenom, Email, hashed_password, is_admin) VALUES (?, ?, ?, ?, ?)",
      [
        users.Nom,
        users.Prenom,
        users.Email,
        users.hashed_password,
        users.is_admin,
      ],
    );

    return result.insertId;
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>("SELECT * FROM users");
    return rows as Users[];
  }

  async update(user: Omit<Users, "email" | "hashed_password" | "is_admin">) {
    const [result] = await databaseClient.query<Result>(
      "UPDATE users SET Nom = ?, Prenom = ?, Email = ? WHERE id = ?",
      [user.Nom, user.Prenom, user.Email, user.id],
    );
    return result.affectedRows;
  }

  async delete(id: number) {
    const [result] = await databaseClient.query<Result>(
      "DELETE FROM users WHERE id = ?",
      [id],
    );
    return result.affectedRows;
  }

  async readByEmailWithPassword(email: string) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM users WHERE Email = ?",
      [email],
    );

    return rows[0];
  }
}

export default new UsersRepository();
