insert into public.books (id,title,author,description,genre,published_year,pages,quote) values
('atomic','Atomic Habits','James Clear','Tiny changes. Remarkable results.','Self-growth',2018,320,'Small habits can create remarkable results.'),
('things','Things Fall Apart','Chinua Achebe','Culture, identity and the cost of pride.','African literature',1958,209,'The world has no end, and what is good among one people is an abomination with others.'),
('deep','Deep Work','Cal Newport','Focused success in a distracted world.','Productivity',2016,304,'A deep life is a meaningful life.'),
('alchemist','The Alchemist','Paulo Coelho','Follow the dream. Listen to your heart.','Fiction',1988,208,'When you want something, all the universe conspires in helping you to achieve it.'),
('design','The Design of Everyday Things','Don Norman','A classic guide to human-centered design.','Design',1988,368,'Design is really an act of communication.'),
('money','The Psychology of Money','Morgan Housel','Timeless lessons on wealth and behavior.','Business',2020,256,'Doing well with money has little to do with how smart you are.'),
('start','Start With Why','Simon Sinek','Find the purpose behind meaningful work.','Business',2009,256,'People don''t buy what you do; they buy why you do it.'),
('now','The Power of Now','Eckhart Tolle','Presence, awareness and a quieter mind.','Mindfulness',1997,236,'Realize deeply that the present moment is all you have.')
on conflict (id) do update set title=excluded.title,author=excluded.author,description=excluded.description,genre=excluded.genre,published_year=excluded.published_year,pages=excluded.pages,quote=excluded.quote;
