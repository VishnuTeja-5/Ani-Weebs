-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 21, 2024 at 10:54 AM
-- Server version: 8.0.17
-- PHP Version: 7.3.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ani_weebs`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `aid` int(11) NOT NULL,
  `username` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`aid`, `username`, `password`) VALUES
(1, 'vishnu@gmail.com', 'vishnu@1290');

-- --------------------------------------------------------

--
-- Table structure for table `anime`
--

CREATE TABLE `anime` (
  `anime_id` int(11) NOT NULL,
  `anime_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `arc_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `season` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '0',
  `cover_img` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cloud_id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `genres` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `rating` float NOT NULL,
  `type` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `story_line` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `anime`
--

INSERT INTO `anime` (`anime_id`, `anime_name`, `arc_name`, `season`, `cover_img`, `cloud_id`, `genres`, `rating`, `type`, `story_line`) VALUES
(1, 'One Piece', '-', '1', 'https://res.cloudinary.com/delv0907j/image/upload/v1719997043/coverImg_1719997040166_one-piece-cover.jpg', 'coverImg_1719997040166_one-piece-cover', 'Action, Adventure, Comedy', 9, 'Anime', 'Monkey D. Luffy sets off on an adventure with his pirate crew in hopes of finding the greatest treasure ever, known as the \"One Piece.\"'),
(2, 'Demon Slayer', 'Hashira Training Arc', '4', 'https://res.cloudinary.com/delv0907j/image/upload/v1719997383/coverImg_1719997380220_demon_slayer.jpg', 'coverImg_1719997380220_demon_slayer', 'Action, Adventure, Demons', 6.7, 'Anime', 'Tanjiro undergoes rigorous training with the Stone Hashira, Himejima, in his quest to become a Hashira. Meanwhile, Muzan continues to search for Nezuko and Ubuyashiki.'),
(3, 'Attack on Titan', '-', '1', 'https://res.cloudinary.com/delv0907j/image/upload/v1719997586/coverImg_1719997583649_aot-poster.jpg', 'coverImg_1719997583649_aot-poster', 'Action, Adventure, Violence, Super Powers', 9.1, 'Anime', 'After his hometown is destroyed, young Eren Jaeger vows to cleanse the earth of the giant humanoid Titans that have brought humanity to the brink of extinction.'),
(4, 'Jujutsu Kaisen', '-', '1', 'https://res.cloudinary.com/delv0907j/image/upload/v1719997929/coverImg_1719997926047_jjk.jpg', 'coverImg_1719997926047_jjk', 'Action, Demons, Super Natural', 8.6, 'Anime', 'A boy swallows a cursed talisman - the finger of a demon - and becomes cursed himself. He enters a shaman\'s school to be able to locate the demon\'s other body parts and thus exorcise himself.'),
(5, 'Naruto: Shippuden', '-', '2', 'https://res.cloudinary.com/delv0907j/image/upload/v1719998290/coverImg_1719998286633_naruto_shippuden.jpg', 'coverImg_1719998286633_naruto_shippuden', 'Action, Adventure, Comedy, Super Power', 8.7, 'Anime', 'Naruto Uzumaki, is a loud, hyperactive, adolescent ninja who constantly searches for approval and recognition, as well as to become Hokage, who is acknowledged as the leader and strongest of all ninja in the village.'),
(6, 'Jujutsu Kaisen', 'Hidden Inventory', '2', 'https://res.cloudinary.com/delv0907j/image/upload/v1719998990/coverImg_1719998984363_jjk_s2.png', 'coverImg_1719998984363_jjk_s2', 'Action, Demons, Super Natural', 9, 'Anime', 'The year is 2006, and the halls of Tokyo Prefectural Jujutsu High School echo with the endless bickering and intense debate between two inseparable best friends. Exuding unshakeable confidence, Satoru Gojou and Suguru Getou believe there is no challenge too great for young and powerful Special Grade sorcerers such as themselves. They are tasked with safely delivering a sensible girl named Riko Amanai to the entity whose existence is the very essence of the jujutsu world. However, the mission plu'),
(10, 'Your Name', 'Kimi no na wa', '0', 'https://res.cloudinary.com/delv0907j/image/upload/v1720166288/movieFile_1720166286672_Your_Name.jpg', 'movieFile_1720166286672_Your_Name', 'Drama, Romance', 8.4, 'Movie', 'Two teenagers share a profound, magical connection upon discovering they are swapping bodies. Things manage to become even more complicated when the boy and girl decide to meet in person.'),
(11, 'Chainsaw Man', '-', '1', 'https://res.cloudinary.com/delv0907j/image/upload/v1720159571/coverImg_1720159567435_chainsaw_man.jpg', 'coverImg_1720159567435_chainsaw_man', 'Action, Violence, Demons', 8.4, 'Anime', 'Following a betrayal, a young man left for dead is reborn as a powerful devil-human hybrid after merging with his pet devil and is soon enlisted into an organization dedicated to hunting devils.'),
(12, 'Bleach', '-', '1', 'https://res.cloudinary.com/delv0907j/image/upload/v1720159813/coverImg_1720159811858_bleach.jpg', 'coverImg_1720159811858_bleach', 'Action, Super Natural, Shounen', 8.2, 'Anime', 'High school student Ichigo Kurosaki, who has the ability to see ghosts, gains soul reaper powers from Rukia Kuchiki and sets out to save the world from \"Hollows\".'),
(13, 'Naruto', '-', '1', 'https://res.cloudinary.com/delv0907j/image/upload/v1720159972/coverImg_1720159968922_naruto.jpg', 'coverImg_1720159968922_naruto', 'Action, Adventure, Comedy, Shounen', 8.4, 'Anime', 'Naruto Uzumaki, a mischievous adolescent ninja, struggles as he searches for recognition and dreams of becoming the Hokage, the village\'s leader and strongest ninja'),
(14, 'Hell\'s Paradise', 'Jigokuraku', '1', 'https://res.cloudinary.com/delv0907j/image/upload/v1720160154/coverImg_1720160151631_Hell_s_paradise.png', 'coverImg_1720160151631_Hell_s_paradise', 'Action, Adventure, Fantasy', 8.1, 'Anime', 'A squad of prisoners and their guards are sent to investigate a mysterious island. They get stranded there and must rely on each other to survive the island\'s mysterious and monstrous residents.'),
(15, 'Spy x Family', '-', '1', 'https://res.cloudinary.com/delv0907j/image/upload/v1720160338/coverImg_1720160336574_Spy_x_Family.jpg', 'coverImg_1720160336574_Spy_x_Family', 'Action, Comedy, Shounen', 8.3, 'Anime', 'A spy on an undercover mission gets married and adopts a child as part of his cover. His wife and daughter have secrets of their own, and all three must strive to keep together.'),
(16, 'Blue Lock', '-', '1', 'https://res.cloudinary.com/delv0907j/image/upload/v1720160480/coverImg_1720160478382_Blue_Lock.jpg', 'coverImg_1720160478382_Blue_Lock', 'Shounen, Sport', 8.2, 'Anime', 'High school soccer players from across Japan gather for a controversial project designed to create the best and most egoistic striker in the world.'),
(17, 'Death Note', '-', '1', 'https://res.cloudinary.com/delv0907j/image/upload/v1720160609/coverImg_1720160607932_Death_Note.jpg', 'coverImg_1720160607932_Death_Note', 'Crime, Drama, Thriller', 8.9, 'Anime', 'An intelligent high school student goes on a secret crusade to eliminate criminals from the world after discovering a notebook capable of killing anyone whose name is written into it.'),
(18, 'Solo Leveling', '-', '1', 'https://res.cloudinary.com/delv0907j/image/upload/v1720160717/coverImg_1720160711435_Solo_Leveling.png', 'coverImg_1720160711435_Solo_Leveling', 'Action, Adventure, Fantasy, Super Natural, Demons', 8.3, 'Anime', 'Follows the adventures Sung Jinwoo in a world that is constantly threatened by monsters and the evil forces. In his battles Sung transforms himself from weakest hunter of all mankind to one of the strongest hunters in existence.'),
(19, 'One Punch Man', '-', '1', 'https://res.cloudinary.com/delv0907j/image/upload/v1720160910/coverImg_1720160907442_One_Punch_Man.jpg', 'coverImg_1720160907442_One_Punch_Man', 'Action, Comedy, Demons, Sci-Fi, Super Natural', 8.7, 'Anime', 'The story of Saitama, a hero that does it just for fun & can defeat his enemies with a single punch.'),
(20, 'Horimiya', '-', '1', 'https://res.cloudinary.com/delv0907j/image/upload/v1720161723/coverImg_1720161720077_Horimiya.jpg', 'coverImg_1720161720077_Horimiya', 'Comedy, Drama, Romanace, Shounen', 8.1, 'Anime', 'Two very different people - an academically successful schoolgirl and a quiet loser schoolboy - meet and develop a friendship.'),
(21, 'Classroom of the Elite', '-', '1', 'https://res.cloudinary.com/delv0907j/image/upload/v1720161866/coverImg_1720161863527_Classroom_of_the_Elite.png', 'coverImg_1720161863527_Classroom_of_the_Elite', 'Drama, Thriller', 7.7, 'Anime', 'When Kiyotaka enters government-sponsored elite high school, he finds out just how merit-based this education system is.'),
(22, 'Loving Yamada at Lv999', '-', '1', 'https://res.cloudinary.com/delv0907j/image/upload/v1720161985/coverImg_1720161981842_Loving_Yamada_at_Lv999.png', 'coverImg_1720161981842_Loving_Yamada_at_Lv999', 'Comedy, Drama, Romanace', 7.6, 'Anime', 'After her boyfriend breaks up with her for another girl, Akane Kinoshita decides she is going to make him regret his decision. Unexpectedly, however, she meets a socially awkward gamer who might just solve all of her problems.'),
(23, 'My Oni Girl', '-', '0', 'https://res.cloudinary.com/delv0907j/image/upload/v1720162361/movieFile_1720162358921_My_Oni_Girl.jpg', 'movieFile_1720162358921_My_Oni_Girl', 'Adventure, Drama', 6, 'Movie', 'A high school student\'s life takes an unexpected turn when he meets an oni (demon) girl on a quest in the human world.'),
(24, 'Spirited Away', '-', '0', 'https://res.cloudinary.com/delv0907j/image/upload/v1720166172/movieFile_1720166169208_Spirited_Away.jpg', 'movieFile_1720166169208_Spirited_Away', 'Adventure, Drama, Fantasy', 8.6, 'Movie', 'During her family\'s move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches and spirits, and where humans are changed into beasts.'),
(25, 'Grave of the Fireflies', '-', '0', 'https://res.cloudinary.com/delv0907j/image/upload/v1720166021/movieFile_1720166018673_Grave_of_the_Fireflies.jpg', 'movieFile_1720166018673_Grave_of_the_Fireflies', 'Drama, War', 8.5, 'Movie', 'A young boy and his little sister struggle to survive in Japan during World War II.'),
(26, 'Princess Mononoke', '-', '0', 'https://res.cloudinary.com/delv0907j/image/upload/v1720183662/movieFile_1720183659416_Princess_Mononoke.jpg', 'movieFile_1720183659416_Princess_Mononoke', 'Action, Adventure, Fantasy', 8.3, 'Movie', 'On a journey to find the cure for a Tatarigami\'s curse, Ashitaka finds himself in the middle of a war between the forest gods and Tatara, a mining colony. In this quest he also meets San, the Mononoke Hime.'),
(27, 'A Silent Voice: The Movie', '-', '0', 'https://res.cloudinary.com/delv0907j/image/upload/v1720184157/movieFile_1720184154270_A_Silent_Voice.jpg', 'movieFile_1720184154270_A_Silent_Voice', 'Drama, Shounen', 8.1, 'Movie', 'A young man is ostracized by his classmates after he bullies a deaf girl to the point where she moves away. Years later, he sets off on a path for redemption'),
(28, 'Gintama the Movie', 'The Final Chapter - Be Forever Yorozuya', '0', 'https://res.cloudinary.com/delv0907j/image/upload/v1720184423/movieFile_1720184421709_Gintama_the_Movie.jpg', 'movieFile_1720184421709_Gintama_the_Movie', 'Action,Comedy, Shounen', 8.3, 'Movie', 'Gintoki travels into the future and discovers it to be a wasteland with his friends fallen apart. He reunites them to find out what went wrong and how to fix things.'),
(29, 'Howl\'s Moving Castle', '-', '0', 'https://res.cloudinary.com/delv0907j/image/upload/v1720184970/movieFile_1720184966935_Howl_s_Moving_Castle.jpg', 'movieFile_1720184966935_Howl_s_Moving_Castle', 'Adventure, Fantasy, Romance', 8.2, 'Movie', 'When an unconfident young woman is cursed with an old body by a spiteful witch, her only chance of breaking the spell lies with a self-indulgent yet insecure young wizard and his companions in his legged, walking castle.'),
(30, 'My Neighbor Totoro', '-', '0', 'https://res.cloudinary.com/delv0907j/image/upload/v1720185072/movieFile_1720185069932_My_Neighbor_Totoro.jpg', 'movieFile_1720185069932_My_Neighbor_Totoro', 'Adventure, Comedy', 8.1, 'Movie', 'When two girls move to the country to be near their ailing mother, they have adventures with the wondrous forest spirits who live nearby.'),
(31, 'Neon Genesis Evangelion', 'The End of Evangelion', '0', 'https://res.cloudinary.com/delv0907j/image/upload/v1720185747/movieFile_1720185744754_Neon_Genesis_Evangelion_Movie.jpg', 'movieFile_1720185744754_Neon_Genesis_Evangelion_Movie', 'Action, Drama, Sci-Fi', 8.1, 'Movie', 'Concurrent theatrical ending of the TV series Neon Genesis Evangelion (1995).');

-- --------------------------------------------------------

--
-- Table structure for table `episode`
--

CREATE TABLE `episode` (
  `episode_id` int(11) NOT NULL,
  `anime_id` int(11) NOT NULL,
  `episode_number` int(11) NOT NULL,
  `episode_title` varchar(300) COLLATE utf8mb4_unicode_ci NOT NULL,
  `episode_path` varchar(300) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cloud_id` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `duration` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `episode`
--

INSERT INTO `episode` (`episode_id`, `anime_id`, `episode_number`, `episode_title`, `episode_path`, `cloud_id`, `duration`) VALUES
(1, 1, 1, 'I\'m Luffy! The Man Who\'s gonna be a King of Pirate', 'https://res.cloudinary.com/delv0907j/video/upload/v1720012872/episodeFile_1720012858936_One_Piece_-_1_360p.mp4', 'episodeFile_1720012858936_One_Piece_-_1_360p', '24 min'),
(2, 1, 2, 'Pirate Hunter Roronoa Zoro', 'https://res.cloudinary.com/delv0907j/video/upload/v1720017088/episodeFile_1720017068670_One_Piece_-_2_360p.mp4', 'episodeFile_1720017068670_One_Piece_-_2_360p', '24 min'),
(3, 1, 3, 'Morry vs Luffy', 'https://res.cloudinary.com/delv0907j/video/upload/v1720080163/episodeFile_1720079059685_One_Piece_-_3_360p.mp4', 'episodeFile_1720079059685_One_Piece_-_3_360p', '24 min'),
(5, 1, 1071, 'Luffy\'s peak. Attained! Gear Five', 'https://res.cloudinary.com/delv0907j/video/upload/v1721136099/episodeFile_1721136075750_One_Piece_-_1071_360p.mp4', 'episodeFile_1721136075750_One_Piece_-_1071_360p', '24 min');

-- --------------------------------------------------------

--
-- Table structure for table `movie`
--

CREATE TABLE `movie` (
  `movie_id` int(11) NOT NULL,
  `anime_id` int(11) DEFAULT NULL,
  `movie_name` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `movie_path` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `cloud_id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `duration` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `movie`
--

INSERT INTO `movie` (`movie_id`, `anime_id`, `movie_name`, `movie_path`, `cloud_id`, `duration`) VALUES
(1, 10, 'Your Name', 'https://res.cloudinary.com/delv0907j/video/upload/v1720098370/movieFile_1720098365686_Your_Name_trailer.mp4', 'movieFile_1720098365686_Your_Name_trailer', '1h 46min'),
(2, 24, 'Spirited Away', 'https://res.cloudinary.com/delv0907j/video/upload/v1720164575/movieFile_1720163858160_Spirited_Away.mp4', 'movieFile_1720163858160_Spirited_Away', '2h 5min'),
(3, 25, 'Grave of the Fireflies', 'https://res.cloudinary.com/delv0907j/video/upload/v1720163566/movieFile_1720163149135_Grave_of_the_Fireflies.mp4', 'movieFile_1720163149135_Grave_of_the_Fireflies', '1h 29min'),
(4, 23, 'My Oni Girl', 'https://res.cloudinary.com/delv0907j/video/upload/v1720181796/movieFile_1720181786266_sample2.mp4', 'movieFile_1720181786266_sample2', '45 sec');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`aid`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `anime`
--
ALTER TABLE `anime`
  ADD PRIMARY KEY (`anime_id`),
  ADD UNIQUE KEY `cover_img` (`cover_img`);

--
-- Indexes for table `episode`
--
ALTER TABLE `episode`
  ADD PRIMARY KEY (`episode_id`),
  ADD KEY `anime_id` (`anime_id`);

--
-- Indexes for table `movie`
--
ALTER TABLE `movie`
  ADD PRIMARY KEY (`movie_id`),
  ADD KEY `anime_id` (`anime_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `anime`
--
ALTER TABLE `anime`
  MODIFY `anime_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `episode`
--
ALTER TABLE `episode`
  MODIFY `episode_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `movie`
--
ALTER TABLE `movie`
  MODIFY `movie_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `episode`
--
ALTER TABLE `episode`
  ADD CONSTRAINT `episode_ibfk_1` FOREIGN KEY (`anime_id`) REFERENCES `anime` (`anime_id`);

--
-- Constraints for table `movie`
--
ALTER TABLE `movie`
  ADD CONSTRAINT `movie_ibfk_1` FOREIGN KEY (`anime_id`) REFERENCES `anime` (`anime_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
