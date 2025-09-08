import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type SupporterPhoto = {
  id: number;
  title: string;
  description: string | null;
  picture: string;
  category_id: number;
  user_id: number;
  created_at: string;
};

class SupporterPhotoRepository {
  async create(photo: Omit<SupporterPhoto, "id" | "created_at">) {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO supporter_photo (title, description, picture, category_id, user_id) VALUES (?, ?, ?, ?, ?)",
      [
        photo.title,
        photo.description,
        photo.picture,
        photo.category_id,
        photo.user_id,
      ],
    );

    return result.insertId;
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT sp.*, u.Nom, u.Prenom, c.name as category
       FROM supporter_photo sp
       JOIN users u ON sp.user_id = u.id
       JOIN category c ON sp.category_id = c.id
       ORDER BY sp.created_at DESC`,
    );
    return rows as SupporterPhoto[];
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT sp.*, u.Nom, u.Prenom, c.name as category
       FROM supporter_photo sp
       JOIN users u ON sp.user_id = u.id
       JOIN category c ON sp.category_id = c.id
       WHERE sp.id = ?`,
      [id],
    );
    return (rows as SupporterPhoto[])[0];
  }

  async update(photo: SupporterPhoto) {
    const [result] = await databaseClient.query<Result>(
      `UPDATE supporter_photo 
       SET title = ?, description = ?, picture = ?, category_id = ?, user_id = ? 
       WHERE id = ?`,
      [
        photo.title,
        photo.description,
        photo.picture,
        photo.category_id,
        photo.user_id,
        photo.id,
      ],
    );
    return result.affectedRows;
  }

  async delete(id: number) {
    const [result] = await databaseClient.query<Result>(
      "DELETE FROM supporter_photo WHERE id = ?",
      [id],
    );
    return result.affectedRows;
  }
}

export default new SupporterPhotoRepository();
