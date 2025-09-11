-- Table des utilisateurs
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    Nom VARCHAR(255) NOT NULL,
    Prenom VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL UNIQUE,
    hashed_password VARCHAR(255) NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE
);
-- MP : Agence@33
INSERT INTO users (Nom, Prenom, Email, hashed_password, is_admin) 
VALUES 
('Admin', 'Toto', 'test@test.fr', 'coucou', FALSE),
('Jean', 'Dupont', 'jean@gmail.com', 'toto', FALSE),
('Marie', 'Durand', 'marie@gmail.com', '1234', FALSE),
('Paul', 'Martin', 'paul@gmail.com', '$argon2id$v=19$m=19456,t=2,p=1$4K6rcqzXtfpsDyEWzDTc8w$D4eDLfhkGRGOvJPGdZc3dk6jP0u3Zu57yIxGWgDO2R4', FALSE),
('Alice', 'Leroy', 'alice@gmail.com', '$argon2id$v=19$m=19456,t=2,p=1$4K6rcqzXtfpsDyEWzDTc8w$D4eDLfhkGRGOvJPGdZc3dk6jP0u3Zu57yIxGWgDO2R4', TRUE);

-- Table des catégories pour les photos supporters
CREATE TABLE category (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    name VARCHAR(255) NOT NULL
);

INSERT INTO category(name) VALUES
('Matchs'),
('Tifos'),
('Chants'),
('Portraits supporters'),
('Ambiance stade'),
('Autres');

-- Table des posts classiques
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

-- Table des photos des supporters
CREATE TABLE supporter_photo (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    title VARCHAR(50) NOT NULL,
    description VARCHAR(255) DEFAULT NULL,
    picture VARCHAR(255) DEFAULT "default.jpg",
    category_id INT NOT NULL,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY(category_id) REFERENCES category(id) ON DELETE CASCADE
);

INSERT INTO supporter_photo(title, description, picture, category_id, user_id, created_at) VALUES
('Victoire contre Lyon', 'Photo du Kop Nord après le but', 'kopnord.jpg', 1, 2, '2025-08-20 21:00:00'),
('Tifo incroyable', 'Super tifo en tribune', 'tifo_incredible.jpg', 2, 1, '2025-08-22 19:30:00'),
('Chants des supporters', 'Fans chantant ensemble', 'chants_stade.jpg', 3, 3, '2025-08-21 20:45:00');
