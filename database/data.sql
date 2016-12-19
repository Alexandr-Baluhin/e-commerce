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
('rigas.pasvaldiba@gmail.com', '1d3c466a81b9661010b6767b3d8f7dad2bb9d2612322e559748dc366e89d7b85', 'd93bf207fcb1086455b852ab77e0f5ad5c8a63c2b74df0909985ad1b5e2c184a', 1),
('jurmala.pasvaldiba@gmail.com', '648f57bd0e380e253c9c4720310510e195af246d460f9f4652ecf6d1c965cd50', 'f686d6fc61bac4320908b434ddf5b30b6f07fc7dcca60d6a22e8334633eec8b8', 2),
('bauskas.pasvaldiba@gmail.com', 'a89879879e3054cf9c6f6e5e41f7bc8b59a8de182f2929b0301eee7fb0f7b84e', '0044a4eb660fd3e7421a92a50716d78bc94b97b292633111c022c76ac12eec6e', 3),
('smiltenes.pasvaldiba@gmail.com', 'af239e5d082ba985dac2b258d2808ae707a384d6e2933b4e8f072a36f388bbc5', '40762a22ab66ad8aa40d299d5b2b803ce866eb3139c6efa686437bc9be1d14bb', 4),
('liepajas.pasvaldiba@gmail.com', 'c2573df03e658d776bdf314e27e261e11cbf9e684fd874ec419e66fdef5d0da1', '984b65b1b7742b4a6eb90623b42c7f0923c9eec2007b3aaa5aa46a9a709a41be', 5);
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
