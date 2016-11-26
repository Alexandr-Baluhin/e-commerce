USE `mydb`;

--
-- Dumping data for table `Locations`
--

INSERT INTO `Locations` (name) VALUES ('Rīgas pašvaldība'),('Latgales pašvaldība');

--
-- Dumping data for table `Employees`
--

INSERT INTO `Employees` (email, password, salt, location_id) VALUES 
('baluhins@test.ru','29c39ddb11cd6a9ac41cbc8345c1c7dee274afa4044cc86b17ed29a5a5c65b73','e01d05d44a0e582298b91059be3cef5775171e16593465e8693bf128da5c5115',1),
('victor@test.ru','1d38a16acc29bf8e9d353e61bac4a56d23a47888d347ff10c779eb2a4b63349d','c43781cf500cd9e882cdd4fc839aec23c87eb7e39ac33f935f8a3b6fc4a83b38',1);

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
