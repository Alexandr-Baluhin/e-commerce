USE `mydb`;

--
-- Dumping data for table `Locations`
--

INSERT INTO `Locations` (name) VALUES ('Rīgas pašvaldība'),('Latgales pašvaldība');

--
-- Dumping data for table `Employees`
--

INSERT INTO `Employees` (email, password, salt, location_id) VALUES ('baluhins@test.ru','someHash','someSalt',1),('victor@test.ru','anotherHash','anotherSalt',1);

--
-- Dumping data for table `LegalPersons`
--

--
-- Dumping data for table `PhysicalPersons`
--

--
-- Dumping data for table `Persons`
--

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (email, password, salt) VALUES ('anna@test.ru','annasPass','annasSalt');

--
-- Dumping data for table `Requests`
--
