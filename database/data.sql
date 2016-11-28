USE `mydb`;

--
-- Dumping data for table `Locations`
--

INSERT INTO `Locations` (name, address, city_loc, email, phone, zip) VALUES 
('Rīgas pilsētas dome', 'Rātslaukums 1, Rīga', 'Rīgā', 'riga@riga.lv', '67026101', 'LV-1539'),
('Jūrmalas pilsētas dome', 'Jomas ielā 1/5, Jūrmala', 'Jūrmalā', 'pasts@jurmala.lv', '67093816', 'LV-2015'),
('Bauskas novada pašvaldība', 'Uzvaras ielā 1, Bauska, Bauskas novads', 'Bauskā', 'dome@bauska.lv', '63922238', 'LV-3901'),
('Smiltenes novada pašvaldība', 'Dārza ielā 3, Smiltene, Smiltenes novads', 'Smiltenē', 'dome@smiltene.lv', '64774844', 'LV-4729'),
('Liepājas pilsētas dome', 'Rožu ielā 6, Liepāja', 'Liepājā', 'edoc@dome.liepaja.lv', '63404750', 'LV-3401');
--
-- Dumping data for table `Employees`
--

INSERT INTO `Employees` (email, password, salt, location_id) VALUES 
('jn.riekp@gmail.com', '98475bf2acf4afd89fb58429e10d1f1ae7ad783e7589e0a362384f5e203eaad5', '631215350ba97b8fbd396d4c202742ded21b5a777c808271bf8bd65cbfbe18d9', 1);
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

-- INSERT INTO `Users` (email, password, salt) VALUES ('anna@test.ru','annasPass','annasSalt');

--
-- Dumping data for table `Requests`
--
