CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    Nom VARCHAR(255) NOT NULL,
    Prenom VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL UNIQUE,
    Password VARCHAR(255) NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE
);

INSERT INTO users (Nom, Prenom, Email, Password, is_admin) 
VALUES 
('Admin', 'toto', 'test@test.fr', 'coucou', TRUE),
('Jean', 'Dupont', 'jean@gmail.com', 'toto', FALSE);

CREATE TABLE post (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  title VARCHAR(100) NOT NULL,
  content TEXT DEFAULT NULL,
  picture VARCHAR(255) DEFAULT NULL,
  category VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  user_id INT NOT NULL,
  FOREIGN KEY(user_id) REFERENCES users(id)
);

INSERT INTO post (title, content, picture, category, user_id) 
VALUES 
('Victoire contre Lyon 2-0', 'Superbe ambiance dans le Chaudron hier soir, doublé de Bouanga !', 'images/match-derby.jpg', 'Match', 1),
('Victoire contre Marseille 1-0', 'But de Stassin !', 'images/match-marseille.jpg', 'Match', 2);
