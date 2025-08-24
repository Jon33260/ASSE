import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

type Post = {
  id: number;
  title: string;
  content?: string;
  picture?: string;
  category: string;
  user_id: number;
};

class PostRepository {
  // Créer un nouveau post
  async create(post: Omit<Post, "id">) {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO post (title, content, picture, category, user_id) VALUES (?, ?, ?, ?, ?)",
      [post.title, post.content, post.picture, post.category, post.user_id],
    );

    return result.insertId;
  }

  // Lire un post par ID
  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM post WHERE id = ?",
      [id],
    );

    return rows[0] as Post;
  }

  // Lire tous les posts
  async readAll() {
    const [rows] = await databaseClient.query<Rows>("SELECT * FROM post");
    return rows as Post[];
  }

  // Mettre à jour un post
  async update(post: Post) {
    const [result] = await databaseClient.query<Result>(
      "UPDATE post SET title = ?, content = ?, picture = ?, category = ?, user_id = ? WHERE id = ?",
      [
        post.title,
        post.content,
        post.picture,
        post.category,
        post.user_id,
        post.id,
      ],
    );
    return result.affectedRows;
  }

  // Supprimer un post
  async delete(id: number) {
    const [result] = await databaseClient.query<Result>(
      "DELETE FROM post WHERE id = ?",
      [id],
    );
    return result.affectedRows;
  }
}

export default new PostRepository();
