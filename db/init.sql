CREATE TABLE IF NOT EXISTS authors (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(40),
  last_name VARCHAR(40)
);

CREATE TABLE IF NOT EXISTS books (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  quantity INT NOT NULL,
  genre VARCHAR(100) NOT NULL,
  olid VARCHAR(50),
  cover TEXT
);

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userid INT,
  `order-date` DATETIME NOT NULL,
  quantity INT,
  book_id INT,
  purchased BOOLEAN,
  FOREIGN KEY (userid) REFERENCES users(id),
  FOREIGN KEY (book_id) REFERENCES books(id)
);

CREATE TABLE IF NOT EXISTS orderitems (
  id INT AUTO_INCREMENT PRIMARY KEY,
  bookId INT,
  orderId INT,
  quantity INT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (bookId) REFERENCES books(id),
  FOREIGN KEY (orderId) REFERENCES orders(id)
);





INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (1, 'Fred Orr', 'https://covers.openlibrary.org/b/olid/OL8907763M-M.jpg', 'self_help', 'OL8907763M', 11.26, 8, 'How to pass exams');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (2, 'Rhonda Byrne', 'https://covers.openlibrary.org/b/olid/OL8788357M-M.jpg', 'self_help', 'OL8788357M', 24.35, 10, 'The Secret');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (3, 'Allan Pease', NULL, 'self_help', NULL, 13.98, 5, 'The Definitive Book of Body Language');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (4, 'James Redfield', 'https://covers.openlibrary.org/b/olid/OL26642218M-M.jpg', 'self_help', 'OL26642218M', 16.52, 13, 'God and the evolving universe');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (5, 'Edward de Bono', 'https://covers.openlibrary.org/b/olid/OL2560191M-M.jpg', 'self_help', 'OL2560191M', 15.97, 13, 'The Power of Focused Thinking');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (6, 'Anthea Paul', 'https://covers.openlibrary.org/b/olid/OL24752502M-M.jpg', 'self_help', 'OL24752502M', 18.68, 7, 'Girlosophy');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (7, 'James Redfield', 'https://covers.openlibrary.org/b/olid/OL24599172M-M.jpg', 'self_help', 'OL24599172M', 13.18, 7, 'The Twelfth Insight');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (8, 'Tony Buzan', 'https://covers.openlibrary.org/b/olid/OL9142788M-M.jpg', 'self_help', 'OL9142788M', 17.19, 15, 'Como Crear Mapas Mentales');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (9, 'Geneen Roth', 'https://covers.openlibrary.org/b/olid/OL1404860M-M.jpg', 'self_help', 'OL1404860M', 12.83, 14, 'Feeding the Hungry Heart');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (10, 'Iyanla Vanzant', 'https://covers.openlibrary.org/b/olid/OL7722756M-M.jpg', 'self_help', 'OL7722756M', 14.97, 9, 'Yesterday I Cried');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (11, 'Kerry Gleeson', 'https://covers.openlibrary.org/b/olid/OL6779271M-M.jpg', 'self_help', 'OL6779271M', 25.31, 10, 'The personal efficiency program');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (12, 'Meg-John Barker', 'https://covers.openlibrary.org/b/olid/OL27841502M-M.jpg', 'self_help', 'OL27841502M', 19.28, 6, 'Rewriting the Rules');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (13, 'Cate Howell', NULL, 'self_help', NULL, 23.79, 11, 'Intuition');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (14, 'Nicholas Perricone', 'https://covers.openlibrary.org/b/olid/OL8137014M-M.jpg', 'self_help', 'OL8137014M', 11.24, 15, 'The Perricone Promise');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (15, 'David Keefe', NULL, 'self_help', NULL, 25.78, 9, 'Coolmind');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (16, 'John Boyne', NULL, 'world_war_ii', NULL, 16.31, 5, 'The Boy in the Striped Pyjamas');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (17, 'Kurt Vonnegut', 'https://covers.openlibrary.org/b/olid/OL13788314M-M.jpg', 'world_war_ii', 'OL13788314M', 18.43, 13, 'Slaughterhouse-Five');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (18, 'Markus Zusak', 'https://covers.openlibrary.org/b/olid/OL24297182M-M.jpg', 'world_war_ii', 'OL24297182M', 11.85, 14, 'The Book Thief');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (19, 'Art Spiegelman', 'https://covers.openlibrary.org/b/olid/OL10487209M-M.jpg', 'world_war_ii', 'OL10487209M', 11.82, 9, 'Maus I');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (20, 'Charles de Gaulle', 'https://covers.openlibrary.org/b/olid/OL22886850M-M.jpg', 'world_war_ii', 'OL22886850M', 16.66, 10, 'Meḿoires de guerre');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (21, 'Stephen King', 'https://covers.openlibrary.org/b/olid/OL33965435M-M.jpg', 'world_war_ii', 'OL33965435M', 18.92, 11, 'Pet Sematary');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (22, 'Stephen King', 'https://covers.openlibrary.org/b/olid/OL49825722M-M.jpg', 'world_war_ii', 'OL49825722M', 17.9, 13, 'Different Seasons');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (23, 'Antony Beevor', NULL, 'world_war_ii', NULL, 10.05, 13, 'The Fall of Berlin, 1945');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (24, 'E. H. Carr', 'https://covers.openlibrary.org/b/olid/OL9244450M-M.jpg', 'world_war_ii', 'OL9244450M', 15.26, 9, 'The Twenty Years'' Crisis, 1919-1939');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (25, 'Laura Hillenbrand', 'https://covers.openlibrary.org/b/olid/OL24422943M-M.jpg', 'world_war_ii', 'OL24422943M', 23.02, 13, 'Unbroken');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (26, 'Ira Levin', 'https://covers.openlibrary.org/b/olid/OL2608945M-M.jpg', 'world_war_ii', 'OL2608945M', 21.85, 7, 'The Boys from Brazil');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (27, 'John Richard Hersey', 'https://covers.openlibrary.org/b/olid/OL2060639M-M.jpg', 'world_war_ii', 'OL2060639M', 14.29, 5, 'Hiroshima');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (28, 'Primo Levi', 'https://covers.openlibrary.org/b/olid/OL35431907M-M.jpg', 'world_war_ii', 'OL35431907M', 19.58, 15, 'I sommersi e i salvati');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (29, 'Stephen E. Ambrose', 'https://covers.openlibrary.org/b/olid/OL12463208M-M.jpg', 'world_war_ii', 'OL12463208M', 19.62, 5, 'Band of Brothers');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (30, 'B. H. Liddell Hart', 'https://covers.openlibrary.org/b/olid/OL5691359M-M.jpg', 'world_war_ii', 'OL5691359M', 17.78, 7, 'History of the Second World War');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (31, 'Mary Shelley', 'https://covers.openlibrary.org/b/olid/OL35649409M-M.jpg', 'horror', 'OL35649409M', 17.56, 8, 'Frankenstein or The Modern Prometheus');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (32, 'Oscar Wilde', NULL, 'horror', NULL, 11.98, 6, 'The Picture of Dorian Gray');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (33, 'Bram Stoker', 'https://covers.openlibrary.org/b/olid/OL35373336M-M.jpg', 'horror', 'OL35373336M', 15.7, 5, 'Dracula');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (34, 'Sheridan Le Fanu', 'https://covers.openlibrary.org/b/olid/OL8864633M-M.jpg', 'horror', 'OL8864633M', 23.79, 11, 'Carmilla');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (35, 'Bram Stoker', 'https://covers.openlibrary.org/b/olid/OL11684364M-M.jpg', 'horror', 'OL11684364M', 22.64, 11, 'The Jewel of Seven Stars');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (36, 'Henry James', 'https://covers.openlibrary.org/b/olid/OL9492220M-M.jpg', 'horror', 'OL9492220M', 22.36, 5, 'The Turn of the Screw');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (37, 'Charlotte Perkins Gilman', 'https://covers.openlibrary.org/b/olid/OL7775518M-M.jpg', 'horror', 'OL7775518M', 20.4, 11, 'Herland');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (38, 'Robert Louis Stevenson', 'https://covers.openlibrary.org/b/olid/OL3682767M-M.jpg', 'horror', 'OL3682767M', 21.93, 14, 'The Strange Case of Dr. Jekyll and Mr. Hyde');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (39, 'Arthur Machen', 'https://covers.openlibrary.org/b/olid/OL8651720M-M.jpg', 'horror', 'OL8651720M', 12.91, 7, 'The Great God Pan');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (40, 'Arthur Machen', 'https://covers.openlibrary.org/b/olid/OL9716480M-M.jpg', 'horror', 'OL9716480M', 12.76, 5, 'The White People');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (41, 'Stephen King', 'https://covers.openlibrary.org/b/olid/OL27902097M-M.jpg', 'horror', 'OL27902097M', 15.55, 10, 'Carrie');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (42, 'Arthur Conan Doyle', 'https://covers.openlibrary.org/b/olid/OL24221283M-M.jpg', 'horror', 'OL24221283M', 13.87, 6, 'Tales of Terror and Mystery');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (43, 'Stephen King', NULL, 'horror', NULL, 23.72, 15, 'Misery');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (44, 'Algernon Blackwood', 'https://covers.openlibrary.org/b/olid/OL11824017M-M.jpg', 'horror', 'OL11824017M', 15.48, 8, 'The Damned');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (45, 'Lewis Carroll', 'https://covers.openlibrary.org/b/olid/OL31754751M-M.jpg', 'science_fiction', 'OL31754751M', 21.86, 10, 'Alice''s Adventures in Wonderland');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (46, 'Sax Rohmer', 'https://covers.openlibrary.org/b/olid/OL9761880M-M.jpg', 'horror', 'OL9761880M', 10.9, 5, 'Brood of the Witch-Queen');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (47, 'L. Frank Baum', 'https://covers.openlibrary.org/b/olid/OL8155451M-M.jpg', 'science_fiction', 'OL8155451M', 25.47, 14, 'The Wonderful Wizard of Oz');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (48, 'Arthur Conan Doyle', 'https://covers.openlibrary.org/b/olid/OL22885694M-M.jpg', 'science_fiction', 'OL22885694M', 23.77, 5, 'The Lost World');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (49, 'Jack London', 'https://covers.openlibrary.org/b/olid/OL6994295M-M.jpg', 'science_fiction', 'OL6994295M', 13.26, 7, 'The Iron Heel');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (50, 'H. G. Wells', 'https://covers.openlibrary.org/b/olid/OL27553880M-M.jpg', 'science_fiction', 'OL27553880M', 11.92, 12, 'The Time Machine');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (51, 'Aldous Huxley', 'https://covers.openlibrary.org/b/olid/OL6504102M-M.jpg', 'science_fiction', 'OL6504102M', 11.28, 13, 'Brave New World');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (52, 'Edwin Abbott Abbott', 'https://covers.openlibrary.org/b/olid/OL23189553M-M.jpg', 'science_fiction', 'OL23189553M', 10.69, 9, 'Flatland');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (53, 'Gilbert Keith Chesterton', 'https://covers.openlibrary.org/b/olid/OL23365952M-M.jpg', 'science_fiction', 'OL23365952M', 11.86, 5, 'The Napoleon of Notting Hill');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (54, 'H. G. Wells', 'https://covers.openlibrary.org/b/olid/OL9236546M-M.jpg', 'science_fiction', 'OL9236546M', 24.34, 9, 'The War of the Worlds');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (55, 'H. G. Wells', 'https://covers.openlibrary.org/b/olid/OL24269941M-M.jpg', 'science_fiction', 'OL24269941M', 10.45, 11, 'The Invisible Man');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (56, 'George Orwell', 'https://covers.openlibrary.org/b/olid/OL21733390M-M.jpg', 'science_fiction', 'OL21733390M', 18.13, 10, 'Nineteen Eighty-Four');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (57, 'Jules Verne', 'https://covers.openlibrary.org/b/olid/OL7050533M-M.jpg', 'science_fiction', 'OL7050533M', 11.95, 12, 'Le Tour du Monde en Quatre-Vingts Jours');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (58, 'George MacDonald', 'https://covers.openlibrary.org/b/olid/OL7066792M-M.jpg', 'science_fiction', 'OL7066792M', 16.86, 12, 'The Princess and Curdie');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (59, 'Jonathan Swift', 'https://covers.openlibrary.org/b/olid/OL26445784M-M.jpg', 'fantasy', 'OL26445784M', 16.17, 13, 'Gulliver''s Travels');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (60, 'Robert Louis Stevenson', 'https://covers.openlibrary.org/b/olid/OL40812029M-M.jpg', 'fantasy', 'OL40812029M', 13.57, 15, 'Treasure Island');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (61, 'Niccolò Machiavelli', 'https://covers.openlibrary.org/b/olid/OL37826838M-M.jpg', 'fantasy', 'OL37826838M', 20.67, 10, 'The Prince');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (62, 'Lewis Carroll', 'https://covers.openlibrary.org/b/olid/OL21298716M-M.jpg', 'fantasy', 'OL21298716M', 15.62, 5, 'Through the Looking-Glass');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (63, 'Kenneth Grahame', 'https://covers.openlibrary.org/b/olid/OL40046991M-M.jpg', 'fantasy', 'OL40046991M', 12.61, 10, 'Wind in the Willows');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (64, 'Edith Nesbit', 'https://covers.openlibrary.org/b/olid/OL9232844M-M.jpg', 'fantasy', 'OL9232844M', 24.17, 14, 'Five Children and It');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (65, 'L. Frank Baum', 'https://covers.openlibrary.org/b/olid/OL7244470M-M.jpg', 'fantasy', 'OL7244470M', 20.41, 13, 'The Marvelous Land of Oz');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (66, 'William Shakespeare', 'https://covers.openlibrary.org/b/olid/OL24594641M-M.jpg', 'fantasy', 'OL24594641M', 10.43, 11, 'A Midsummer Night''s Dream');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (67, 'L. Frank Baum', 'https://covers.openlibrary.org/b/olid/OL23416104M-M.jpg', 'fantasy', 'OL23416104M', 19.79, 15, 'Ozma of Oz');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (68, 'L. Frank Baum', 'https://covers.openlibrary.org/b/olid/OL7207092M-M.jpg', 'fantasy', 'OL7207092M', 21.3, 15, 'Dorothy and the Wizard in Oz');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (69, 'L. Frank Baum', 'https://covers.openlibrary.org/b/olid/OL3417469M-M.jpg', 'fantasy', 'OL3417469M', 18.24, 12, 'The Emerald City of Oz');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (70, 'L. Frank Baum', 'https://covers.openlibrary.org/b/olid/OL3584291M-M.jpg', 'fantasy', 'OL3584291M', 14.98, 10, 'The Lost Princess of Oz');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (71, 'Fannie Merritt Farmer', 'https://covers.openlibrary.org/b/olid/OL6774762M-M.jpg', 'cooking', 'OL6774762M', 22.57, 11, 'Boston Cooking-School cook book');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (72, 'Kokuritsu Kokkai Toshokan (Japan)', NULL, 'cooking', NULL, 25.09, 6, 'Kokuritsu Kokkai Toshokan shozō Meijiki kankō tosho maikuro-ban shūsei');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (73, 'Laura Esquivel', 'https://covers.openlibrary.org/b/olid/OL24974997M-M.jpg', 'cooking', 'OL24974997M', 23.93, 10, 'Como agua para chocolate');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (74, 'Mary Randolph', 'https://covers.openlibrary.org/b/olid/OL1422523M-M.jpg', 'cooking', 'OL1422523M', 12.89, 7, 'The Virginia house-wife');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (75, 'Irma S. Rombauer', 'https://covers.openlibrary.org/b/olid/OL7948689M-M.jpg', 'cooking', 'OL7948689M', 22.24, 11, 'Joy of Cooking');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (76, 'Kokuritsu Kokkai Toshokan (Japan)', NULL, 'cooking', NULL, 12.82, 8, '国立 国会 図書館 所蔵 明治期 刋行 図書 マイクロ版 集成');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (77, 'Jerry Thomas', 'https://covers.openlibrary.org/b/olid/OL8582014M-M.jpg', 'cooking', 'OL8582014M', 12.08, 13, 'The Bartender''s Guide');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (78, 'Jean Anthelme Brillat-Savarin', 'https://covers.openlibrary.org/b/olid/OL2605253M-M.jpg', 'cooking', 'OL2605253M', 17.18, 5, 'Physiologie du goût');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (79, 'Sir Henry Thompson', 'https://covers.openlibrary.org/b/olid/OL23663165M-M.jpg', 'cooking', 'OL23663165M', 23.74, 9, 'Food and feeding');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (80, 'Mrs. Beeton', 'https://covers.openlibrary.org/b/olid/OL21295888M-M.jpg', 'cooking', 'OL21295888M', 13.51, 10, 'The Book of Household Management');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (81, 'Hannah Glasse', 'https://covers.openlibrary.org/b/olid/OL5240094M-M.jpg', 'cooking', 'OL5240094M', 19.66, 5, 'The art of cookery, made plain and easy');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (82, 'Hugo Ziemann', 'https://covers.openlibrary.org/b/olid/OL3498148M-M.jpg', 'cooking', 'OL3498148M', 22.64, 8, 'Original White House Cookbook');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (83, 'Catharine Esther Beecher', 'https://covers.openlibrary.org/b/olid/OL23333697M-M.jpg', 'cooking', 'OL23333697M', 25.58, 15, 'Miss Beecher''s domestic receipt book');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (84, 'Eric Schlosser', 'https://covers.openlibrary.org/b/olid/OL7469003M-M.jpg', 'cooking', 'OL7469003M', 22.68, 15, 'Fast Food Nation');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (85, 'Arthur Conan Doyle', 'https://covers.openlibrary.org/b/olid/OL47068254M-M.jpg', 'mystery_and_detective_stories', 'OL47068254M', 10.96, 6, 'A Study in Scarlet');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (86, 'Arthur Conan Doyle', 'https://covers.openlibrary.org/b/olid/OL24349267M-M.jpg', 'mystery_and_detective_stories', 'OL24349267M', 10.5, 8, 'The Adventures of Sherlock Holmes [12 stories]');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (87, 'Frances Hodgson Burnett', 'https://covers.openlibrary.org/b/olid/OL37044748M-M.jpg', 'mystery_and_detective_stories', 'OL37044748M', 25.39, 10, 'The Secret Garden');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (88, 'Arthur Conan Doyle', NULL, 'mystery_and_detective_stories', NULL, 19.4, 5, 'The Hound of the Baskervilles');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (89, 'Arthur Conan Doyle', 'https://covers.openlibrary.org/b/olid/OL13492734M-M.jpg', 'mystery_and_detective_stories', 'OL13492734M', 14.6, 5, 'The Sign of Four');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (90, 'Wilkie Collins', 'https://covers.openlibrary.org/b/olid/OL11424127M-M.jpg', 'mystery_and_detective_stories', 'OL11424127M', 18.14, 7, 'The Moonstone');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (91, 'Edith Nesbit', 'https://covers.openlibrary.org/b/olid/OL17139068M-M.jpg', 'mystery_and_detective_stories', 'OL17139068M', 24.65, 11, 'The Story of the Amulet');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (92, 'Arthur Conan Doyle', 'https://covers.openlibrary.org/b/olid/OL7173235M-M.jpg', 'mystery_and_detective_stories', 'OL7173235M', 14.5, 11, 'The Return of Sherlock Holmes');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (93, 'Arthur Conan Doyle', 'https://covers.openlibrary.org/b/olid/OL7058607M-M.jpg', 'mystery_and_detective_stories', 'OL7058607M', 12.17, 8, 'Memoirs of Sherlock Holmes [11 stories]');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (94, 'Wilkie Collins', 'https://covers.openlibrary.org/b/olid/OL7881235M-M.jpg', 'mystery_and_detective_stories', 'OL7881235M', 20.74, 7, 'The Woman in White');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (95, 'Mark Twain', 'https://covers.openlibrary.org/b/olid/OL27465153M-M.jpg', 'mystery_and_detective_stories', 'OL27465153M', 21.06, 7, 'Tom Sawyer, Detective');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (96, 'Arthur Conan Doyle', NULL, 'mystery_and_detective_stories', NULL, 19.95, 8, 'The Case-Book of Sherlock Holmes');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (97, 'Joseph Conrad', 'https://covers.openlibrary.org/b/olid/OL2640257M-M.jpg', 'mystery_and_detective_stories', 'OL2640257M', 23.29, 14, 'The Secret Agent');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (98, 'Emily Brontë', 'https://covers.openlibrary.org/b/olid/OL38586477M-M.jpg', 'romance', 'OL38586477M', 16.11, 15, 'Wuthering Heights');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (99, 'Jane Austen', 'https://covers.openlibrary.org/b/olid/OL13573615M-M.jpg', 'romance', 'OL13573615M', 18.24, 15, 'Emma');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (100, 'Louisa May Alcott', 'https://covers.openlibrary.org/b/olid/OL27300715M-M.jpg', 'romance', 'OL27300715M', 17.64, 6, 'Little Women');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (101, 'Jane Austen', 'https://covers.openlibrary.org/b/olid/OL14041582M-M.jpg', 'romance', 'OL14041582M', 24.03, 9, 'Sense and Sensibility');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (102, 'Charlotte Brontë', 'https://covers.openlibrary.org/b/olid/OL6969829M-M.jpg', 'romance', 'OL6969829M', 22.96, 11, 'Jane Eyre');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (103, 'Jane Austen', 'https://covers.openlibrary.org/b/olid/OL36684152M-M.jpg', 'romance', 'OL36684152M', 25.61, 9, 'Northanger Abbey');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (104, 'Leo Tolstoy', 'https://covers.openlibrary.org/b/olid/OL10601812M-M.jpg', 'romance', 'OL10601812M', 17.7, 9, 'Anna Karenina');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (105, 'Edith Wharton', 'https://covers.openlibrary.org/b/olid/OL7215847M-M.jpg', 'romance', 'OL7215847M', 18.91, 7, 'Ethan Frome');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (106, 'Harriet Beecher Stowe', 'https://covers.openlibrary.org/b/olid/OL26244385M-M.jpg', 'romance', 'OL26244385M', 17.04, 9, 'Uncle Tom''s Cabin');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (107, 'Alexandre Dumas', 'https://covers.openlibrary.org/b/olid/OL46867087M-M.jpg', 'romance', 'OL46867087M', 22.61, 6, 'El Conde de Montecristo');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (108, 'D. H. Lawrence', 'https://covers.openlibrary.org/b/olid/OL14048584M-M.jpg', 'romance', 'OL14048584M', 13.22, 5, 'Women in Love');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (109, 'Arnold Hauser', 'https://covers.openlibrary.org/b/olid/OL4825088M-M.jpg', 'art_history', 'OL4825088M', 25.84, 15, 'Sozialgeschichte der Kunst und Literatur');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (110, 'F. Scott Fitzgerald', 'https://covers.openlibrary.org/b/olid/OL7230180M-M.jpg', 'romance', 'OL7230180M', 11.47, 12, 'This Side of Paradise');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (111, 'Elizabeth Cleghorn Gaskell', 'https://covers.openlibrary.org/b/olid/OL12286492M-M.jpg', 'romance', 'OL12286492M', 24.87, 9, 'Cranford');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (112, 'Pliny the Elder', 'https://covers.openlibrary.org/b/olid/OL23321225M-M.jpg', 'art_history', 'OL23321225M', 11.14, 9, 'Naturalis historia');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (113, 'John Ruskin', 'https://covers.openlibrary.org/b/olid/OL24197185M-M.jpg', 'art_history', 'OL24197185M', 19.19, 15, 'The Stones of Venice');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (114, 'Helen Gardner', 'https://covers.openlibrary.org/b/olid/OL6798546M-M.jpg', 'art_history', 'OL6798546M', 17.33, 15, 'Art Through the Ages');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (115, 'H. W. Janson', 'https://covers.openlibrary.org/b/olid/OL2531764M-M.jpg', 'art_history', 'OL2531764M', 12.37, 9, 'History of art');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (116, 'Marilyn Stokstad', 'https://covers.openlibrary.org/b/olid/OL781489M-M.jpg', 'art_history', 'OL781489M', 19.51, 5, 'Art history');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (117, 'E. H. Gombrich', 'https://covers.openlibrary.org/b/olid/OL8102525M-M.jpg', 'art_history', 'OL8102525M', 11.77, 7, 'The story of art');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (118, 'Fred S. Kleiner', 'https://covers.openlibrary.org/b/olid/OL27262487M-M.jpg', 'art_history', 'OL27262487M', 19.92, 13, 'Gardner''s Art Through the Ages');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (119, 'Fred S. Kleiner', 'https://covers.openlibrary.org/b/olid/OL35956585M-M.jpg', 'art_history', 'OL35956585M', 17.14, 11, 'Bundle : Gardner''s Art Through the Ages');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (120, 'Frederick Litchfield', 'https://covers.openlibrary.org/b/olid/OL6905848M-M.jpg', 'art_history', 'OL6905848M', 20.25, 13, 'Pottery and porcelain');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (121, 'Kenneth Clark', 'https://covers.openlibrary.org/b/olid/OL5217369M-M.jpg', 'art_history', 'OL5217369M', 17.34, 13, 'Civilisation');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (122, 'Desiderius Erasmus', 'https://covers.openlibrary.org/b/olid/OL5754426M-M.jpg', 'art_history', 'OL5754426M', 23.12, 10, 'Desiderii Erasmi Roterodami opera omnia');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (123, 'Roberto Sebastián Matta Echaurren', 'https://covers.openlibrary.org/b/olid/OL3698559M-M.jpg', 'art_history', 'OL3698559M', 20.84, 5, 'Matta');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (124, 'Marvin V. Zelkowitz', 'https://covers.openlibrary.org/b/olid/OL9455977M-M.jpg', 'computer_science', 'OL9455977M', 20.12, 6, 'Advances in Computers, Volume 49 (Advances in Computers)');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (125, 'Kevin Beaver', 'https://covers.openlibrary.org/b/olid/OL7595409M-M.jpg', 'computer_science', 'OL7595409M', 16.29, 13, 'Hacking for Dummies');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (126, 'Helen Gardner', 'https://covers.openlibrary.org/b/olid/OL22719441M-M.jpg', 'art_history', 'OL22719441M', 18.57, 6, 'Renaissance and Modern Art');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (127, 'Sio-Iong Ao', 'https://covers.openlibrary.org/b/olid/OL27946824M-M.jpg', 'computer_science', 'OL27946824M', 15.49, 15, 'Transactions on Engineering Technologies');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (128, 'Alexander Gelbukh', 'https://covers.openlibrary.org/b/olid/OL27025828M-M.jpg', 'computer_science', 'OL27025828M', 10.46, 6, 'Computational Linguistics and Intelligent Text Processing');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (129, 'Leszek Rutkowski', 'https://covers.openlibrary.org/b/olid/OL27018239M-M.jpg', 'computer_science', 'OL27018239M', 20.71, 14, 'Artificial Intelligence and Soft Computing');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (130, 'Honghai Liu', 'https://covers.openlibrary.org/b/olid/OL25538986M-M.jpg', 'computer_science', 'OL25538986M', 21.9, 10, 'Intelligent Robotics and Applications');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (131, 'Lazaros S. Iliadis', 'https://covers.openlibrary.org/b/olid/OL27948483M-M.jpg', 'computer_science', 'OL27948483M', 20.54, 6, 'Artificial Intelligence Applications and Innovations');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (132, 'Cheng-Lin Liu', 'https://covers.openlibrary.org/b/olid/OL27080015M-M.jpg', 'computer_science', 'OL27080015M', 14.78, 11, 'Pattern Recognition');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (133, 'June Jamrich Parsons', 'https://covers.openlibrary.org/b/olid/OL11853115M-M.jpg', 'computer_science', 'OL11853115M', 12.32, 10, 'Computer Concepts');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (134, 'Alan Dennis', 'https://covers.openlibrary.org/b/olid/OL3583497M-M.jpg', 'computer_science', 'OL3583497M', 21.35, 12, 'Systems Analysis and Design');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (135, 'Ying Tan', 'https://covers.openlibrary.org/b/olid/OL27015327M-M.jpg', 'computer_science', 'OL27015327M', 24.23, 6, 'Advances in Swarm Intelligence');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (136, 'Sharon Yull', 'https://covers.openlibrary.org/b/olid/OL28743475M-M.jpg', 'computer_science', 'OL28743475M', 16.5, 6, 'BTEC National for IT Practitioners');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (137, 'George Bebis', 'https://covers.openlibrary.org/b/olid/OL9056158M-M.jpg', 'computer_science', 'OL9056158M', 22.56, 5, 'Advances in visual computing');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (138, 'Yuhua Luo', 'https://covers.openlibrary.org/b/olid/OL27027411M-M.jpg', 'computer_science', 'OL27027411M', 20.42, 8, 'Cooperative Design, Visualization, and Engineering');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (139, 'Bible', NULL, 'biography', NULL, 19.14, 9, 'Bible');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (140, 'Miguel de Cervantes Saavedra', NULL, 'biography', NULL, 18.03, 15, 'Don Quijote de la Mancha');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (141, 'Dante Alighieri', 'https://covers.openlibrary.org/b/olid/OL14081259M-M.jpg', 'biography', 'OL14081259M', 14.45, 9, 'Divina Commedia');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (142, 'Frederick Douglass', 'https://covers.openlibrary.org/b/olid/OL6564860M-M.jpg', 'biography', 'OL6564860M', 12.35, 7, 'Narrative of the life of Frederick Douglass');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (143, 'Lucy Maud Montgomery', NULL, 'biography', NULL, 23.29, 15, 'Anne of Green Gables');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (144, 'Solomon Northup', 'https://covers.openlibrary.org/b/olid/OL22322986M-M.jpg', 'biography', 'OL22322986M', 18.41, 12, 'Twelve years a slave');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (145, 'Rudyard Kipling', 'https://covers.openlibrary.org/b/olid/OL13447930M-M.jpg', 'biography', 'OL13447930M', 24.11, 14, 'Captains Courageous');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (146, 'Walt Whitman', NULL, 'biography', NULL, 24.33, 7, 'Leaves of Grass');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (147, 'Geoffrey Chaucer', 'https://covers.openlibrary.org/b/olid/OL7146598M-M.jpg', 'biography', 'OL7146598M', 18.93, 7, 'The Canterbury Tales');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (148, 'William Shakespeare', 'https://covers.openlibrary.org/b/olid/OL26229526M-M.jpg', 'biography', 'OL26229526M', 21.48, 10, 'Julius Caesar');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (149, 'James Joyce', 'https://covers.openlibrary.org/b/olid/OL14005342M-M.jpg', 'biography', 'OL14005342M', 18.29, 8, 'Dubliners');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (150, 'John Bunyan', NULL, 'biography', NULL, 24.87, 15, 'The Pilgrim''s Progress');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (151, 'Benjamin Franklin', 'https://covers.openlibrary.org/b/olid/OL7134689M-M.jpg', 'biography', 'OL7134689M', 19.41, 9, 'The Autobiography of Benjamin Franklin');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (152, 'Rudyard Kipling', 'https://covers.openlibrary.org/b/olid/OL9323782M-M.jpg', 'biography', 'OL9323782M', 18.06, 11, 'The Second Jungle Book');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (153, 'Jane Austen', 'https://covers.openlibrary.org/b/olid/OL47044678M-M.jpg', 'historical_fiction', 'OL47044678M', 21.33, 7, 'Pride and Prejudice');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (154, 'Mark Twain', 'https://covers.openlibrary.org/b/olid/OL7062714M-M.jpg', 'historical_fiction', 'OL7062714M', 10.57, 9, 'Adventures of Huckleberry Finn');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (155, 'Charles Dickens', NULL, 'historical_fiction', NULL, 14.01, 15, 'Oliver Twist');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (156, 'Charles Dickens', NULL, 'historical_fiction', NULL, 22.19, 12, 'A Tale of Two Cities');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (157, 'Charles Dickens', 'https://covers.openlibrary.org/b/olid/OL9170447M-M.jpg', 'historical_fiction', 'OL9170447M', 10.57, 7, 'David Copperfield');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (158, 'Alexandre Dumas', 'https://covers.openlibrary.org/b/olid/OL33218710M-M.jpg', 'historical_fiction', 'OL33218710M', 10.5, 13, 'Les Trois Mousquetaires');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (159, 'Mark Twain', 'https://covers.openlibrary.org/b/olid/OL34596309M-M.jpg', 'historical_fiction', 'OL34596309M', 18.95, 7, 'The Adventures of Tom Sawyer');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (160, 'Mark Twain', 'https://covers.openlibrary.org/b/olid/OL7025266M-M.jpg', 'historical_fiction', 'OL7025266M', 13.11, 6, 'The Prince and the Pauper');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (161, 'James Fenimore Cooper', 'https://covers.openlibrary.org/b/olid/OL7165874M-M.jpg', 'historical_fiction', 'OL7165874M', 23.71, 15, 'The Last of the Mohicans');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (162, 'Raymond Pettibon', 'https://covers.openlibrary.org/b/olid/OL8715828M-M.jpg', 'graphic_design', 'OL8715828M', 22.3, 7, 'Raymond Pettibon');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (163, 'Philip B. Meggs', 'https://covers.openlibrary.org/b/olid/OL1531731M-M.jpg', 'graphic_design', 'OL1531731M', 13.32, 13, 'A history of graphic design');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (164, 'Gail Honeyman', 'https://covers.openlibrary.org/b/olid/OL26765745M-M.jpg', 'graphic_design', 'OL26765745M', 15.7, 11, 'Eleanor Oliphant is Completely Fine');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (165, 'Alan Pipes', 'https://covers.openlibrary.org/b/olid/OL3421876M-M.jpg', 'graphic_design', 'OL3421876M', 11.84, 14, 'Production for graphic designers');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (166, 'Mel Ramos', 'https://covers.openlibrary.org/b/olid/OL19752483M-M.jpg', 'graphic_design', 'OL19752483M', 16.95, 14, 'Mel Ramos');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (167, 'David McCandless', 'https://covers.openlibrary.org/b/olid/OL24329231M-M.jpg', 'graphic_design', 'OL24329231M', 11.1, 13, 'Information is Beautiful');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (168, 'Linda Candy', 'https://covers.openlibrary.org/b/olid/OL8974253M-M.jpg', 'graphic_design', 'OL8974253M', 17.8, 9, 'Explorations in art and technology');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (169, 'Ikuyoshi Shibukawa', 'https://covers.openlibrary.org/b/olid/OL8003256M-M.jpg', 'graphic_design', 'OL8003256M', 22.67, 6, 'Designer''s guide to color');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (170, 'Lewis Blackwell', 'https://covers.openlibrary.org/b/olid/OL6789925M-M.jpg', 'graphic_design', 'OL6789925M', 20.2, 13, 'The end of print');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (171, 'George Bickham', 'https://covers.openlibrary.org/b/olid/OL15055395M-M.jpg', 'graphic_design', 'OL15055395M', 22.46, 10, 'The universal penman');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (172, 'Luis Seoane', NULL, 'graphic_design', NULL, 23.36, 15, 'Luis Seoane');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (173, 'Richard Brath', 'https://covers.openlibrary.org/b/olid/OL30170565M-M.jpg', 'graphic_design', 'OL30170565M', 19.42, 6, 'Visualizing with Text');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (174, 'Matthew David Lickiss', NULL, 'graphic_design', NULL, 25.73, 12, 'Design Perspectives on Multimodal Documents');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (175, 'Done, Ken.', 'https://covers.openlibrary.org/b/olid/OL6885830M-M.jpg', 'graphic_design', 'OL6885830M', 21.14, 13, 'Ken Done');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (176, 'Ian Noble', 'https://covers.openlibrary.org/b/olid/OL9006162M-M.jpg', 'graphic_design', 'OL9006162M', 23.25, 7, 'Visual research');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (177, 'Roald Dahl', 'https://covers.openlibrary.org/b/olid/OL11948467M-M.jpg', 'young_adult', 'OL11948467M', 24.77, 5, 'The BFG');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (178, 'Suzanne Collins', NULL, 'young_adult', NULL, 21.5, 6, 'Mockingjay');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (179, 'J. K. Rowling', 'https://covers.openlibrary.org/b/olid/OL28172760M-M.jpg', 'young_adult', 'OL28172760M', 25.11, 11, 'Harry Potter and the Deathly Hallows');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (180, 'Veronica Roth', 'https://covers.openlibrary.org/b/olid/OL26223598M-M.jpg', 'young_adult', 'OL26223598M', 11.26, 15, 'Divergent');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (181, 'Laura Lee Hope', NULL, 'young_adult', NULL, 25.62, 14, 'The Bobbsey Twins');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (182, 'Gary Paulsen', 'https://covers.openlibrary.org/b/olid/OL32602987M-M.jpg', 'young_adult', 'OL32602987M', 20.35, 12, 'Hatchet');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (183, 'Veronica Roth', 'https://covers.openlibrary.org/b/olid/OL25432922M-M.jpg', 'young_adult', 'OL25432922M', 10.23, 8, 'Allegiant');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (184, 'Angie Thomas', 'https://covers.openlibrary.org/b/olid/OL26246256M-M.jpg', 'young_adult', 'OL26246256M', 15.94, 13, 'The Hate U Give');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (185, 'Garth Nix', 'https://covers.openlibrary.org/b/olid/OL33932917M-M.jpg', 'young_adult', 'OL33932917M', 14.4, 15, 'Sabriel');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (186, 'Neil Gaiman', 'https://covers.openlibrary.org/b/olid/OL19429647M-M.jpg', 'young_adult', 'OL19429647M', 14.54, 15, 'The Graveyard Book');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (187, 'Sam Youd', 'https://covers.openlibrary.org/b/olid/OL6803322M-M.jpg', 'young_adult', 'OL6803322M', 15.44, 6, 'The White Mountains (The Tripods #1)');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (188, 'Charles Dickens', 'https://covers.openlibrary.org/b/olid/OL13713582M-M.jpg', 'children', 'OL13713582M', 21.76, 9, 'The Old Curiosity Shop');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (189, 'Edith Nesbit', 'https://covers.openlibrary.org/b/olid/OL43818814M-M.jpg', 'children', 'OL43818814M', 10.98, 10, 'The Story of the Treasure Seekers');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (190, 'Louisa May Alcott', 'https://covers.openlibrary.org/b/olid/OL26358706M-M.jpg', 'children', 'OL26358706M', 19.06, 10, 'Little men');
INSERT INTO books (id, author, cover, genre, olid, price, quantity, title) VALUES (191, 'Lewis Carroll', 'https://covers.openlibrary.org/b/olid/OL25129289M-M.jpg', 'children', 'OL25129289M', 18.35, 11, 'Alice''s Adventures in Wonderland / Through the Looking Glass');