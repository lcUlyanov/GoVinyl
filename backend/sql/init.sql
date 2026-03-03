CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    artist VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    release_date DATE NOT NULL,
    condition VARCHAR(50) NOT NULL,
    availability BOOLEAN NOT NULL DEFAULT TRUE,
    genre VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    image_url TEXT NOT NULL
);

INSERT INTO products (title, artist, description, release_date, condition, availability, genre, price, image_url) VALUES
('Abbey Road', 'The Beatles', 'The Beatles iconic album released in 1969.', '1969-09-26', 'Mint', true, 'Rock', 29.99, '../static/images/abbey_road.jpg'),
('Dark Side of the Moon', 'Pink Floyd', 'A progressive rock masterpiece released in 1973.', '1973-03-01', 'Good', true, 'Progressive Rock', 24.99, '../static/images/dark_side_of_the_moon.jpg'),
('Thriller', 'Michael Jackson', 'The best-selling album of all time released in 1982.', '1982-11-30', 'Fair', true, 'Pop', 19.99, '../static/images/thriller.jpg'),
('Back in Black', 'AC/DC', 'A hard rock classic released in 1980.', '1980-07-25', 'Mint', true, 'Hard Rock', 27.99, '../static/images/back_in_black.png'),
('Rumours', 'Fleetwood Mac', 'A critically acclaimed album released in 1977.', '1977-02-04', 'Good', true, 'Rock', 22.99, '../static/images/rumours.jpg'),
('Hotel California', 'Eagles', 'A rock classic released in 1976.', '1976-12-08', 'Fair', true, 'Rock', 18.99, '../static/images/hotel_california.jpg'),
('Led Zeppelin IV', 'Led Zeppelin', 'A legendary album released in 1971.', '1971-11-08', 'Mint', true, 'Rock', 26.99, '../static/images/led_zeppelin_iv.jpg'),
('The Wall', 'Pink Floyd', 'A concept album released in 1979.', '1979-11-30', 'Good', true, 'Progressive Rock', 23.99, '../static/images/the_wall.jpg'),
('Born to Run', 'Bruce Springsteen', 'A classic rock album released in 1975.', '1975-08-25', 'Fair', true, 'Rock', 17.99, '../static/images/born_to_run.jpg'),
('Sgt. Pepper''s Lonely Hearts Club Band', 'The Beatles', 'A groundbreaking album released in 1967.', '1967-06-01', 'Mint', true, 'Rock', 28.99, '../static/images/sgt_pepper.jpg'),
('Nevermind', 'Nirvana', 'A grunge classic released in 1991.', '1991-09-24', 'Good', true, 'Grunge', 21.99, '../static/images/nevermind.jpg'),
('The Joshua Tree', 'U2', 'A critically acclaimed album released in 1987.', '1987-03-09', 'Fair', true, 'Rock', 19.99, '../static/images/joshua_tree.jpg'),
('Purple Rain', 'Prince', 'A pop and rock masterpiece released in 1984.', '1984-06-25', 'Mint', true, 'Pop/Rock', 25.99, '../static/images/purple_rain.jpg'),
('The Beatles (White Album)', 'The Beatles', 'A double album released in 1968.', '1968-11-22', 'Good', true, 'Rock', 27.99, '../static/images/white_album.jpg'),
('Appetite for Destruction', 'Guns N'' Roses', 'A hard rock classic released in 1987.', '1987-07-21', 'Fair', true, 'Hard Rock', 18.99, '../static/images/appetite_for_destruction.jpg');