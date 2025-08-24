CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT not null,
    Nom VARCHAR(255) NOT NULL,
    Prenom VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL UNIQUE,
    Password VARCHAR(255) NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE
);

INSERT INTO users (Nom, Prenom, Email, Password, is_admin) VALUES ('Admin', 'toto', 'test@test.fr', 'coucou', TRUE);