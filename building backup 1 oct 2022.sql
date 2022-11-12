-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: us-cdbr-east-06.cleardb.net    Database: heroku_231d0204ca36e60
-- ------------------------------------------------------
-- Server version	5.6.50-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `earnings`
--

DROP TABLE IF EXISTS `earnings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `earnings` (
  `earning_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `earning_month` varchar(15) NOT NULL,
  `earning_title` text NOT NULL,
  `earning_amount` int(10) unsigned NOT NULL,
  `earning_date` datetime NOT NULL,
  `earning_photo` varchar(50) NOT NULL,
  PRIMARY KEY (`earning_id`),
  KEY `earning_month` (`earning_month`),
  CONSTRAINT `earnings_ibfk_1` FOREIGN KEY (`earning_month`) REFERENCES `months` (`month_id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `earnings`
--

LOCK TABLES `earnings` WRITE;
/*!40000 ALTER TABLE `earnings` DISABLE KEYS */;
INSERT INTO `earnings` VALUES (4,'june2022','Sold Parking Scrap',1000,'2022-06-05 00:00:00','na'),(14,'july2022','Deshmukh Kaka Remaining Amount',1840,'2022-07-10 00:00:00','na'),(24,'july2022','Withdrawn From Bank',1200,'2022-07-22 00:00:00','na');
/*!40000 ALTER TABLE `earnings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `expenses`
--

DROP TABLE IF EXISTS `expenses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `expenses` (
  `expense_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `expense_month` varchar(15) NOT NULL,
  `expense_title` text NOT NULL,
  `expense_amount` int(10) unsigned NOT NULL,
  `expense_date` datetime NOT NULL,
  `expense_photo` varchar(50) NOT NULL,
  PRIMARY KEY (`expense_id`),
  KEY `expense_month` (`expense_month`),
  CONSTRAINT `expenses_ibfk_1` FOREIGN KEY (`expense_month`) REFERENCES `months` (`month_id`)
) ENGINE=InnoDB AUTO_INCREMENT=315 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `expenses`
--

LOCK TABLES `expenses` WRITE;
/*!40000 ALTER TABLE `expenses` DISABLE KEYS */;
INSERT INTO `expenses` VALUES (4,'june2022','Bhaiya Salary - 24 April to  31 May',2960,'2022-06-04 00:00:00','na'),(14,'contrib2000','Cable Digging Labour Charge',4500,'2022-05-12 00:00:00','na'),(24,'contrib2000','MSEB Wireman',500,'2022-05-13 00:00:00','na'),(34,'contrib2000','Chamber Cleaning',4500,'2022-05-15 00:00:00','na'),(44,'contrib2000','Cable Bill',14642,'2022-05-18 00:00:00','na'),(54,'may2022','Society Register',240,'2022-05-14 00:00:00','na'),(64,'may2022','Cleaning Mop, Viper, Finayel',570,'2022-05-19 00:00:00','na'),(74,'may2022','File',20,'2022-05-19 00:00:00','na'),(84,'may2022','10 Litre Plastic Canister',80,'2022-05-22 00:00:00','na'),(94,'may2022','Light Bill',1420,'2022-05-22 00:00:00','na'),(104,'may2022','Bill Book',650,'2022-05-23 00:00:00','na'),(114,'may2022','Carbon Paper',10,'2022-05-23 00:00:00','na'),(124,'may2022','Phavda, Thapi',240,'2022-05-26 00:00:00','na'),(134,'june2022','Parking Cleaning',200,'2022-06-09 00:00:00','na'),(144,'june2022','Ghamela',110,'2022-06-09 00:00:00','na'),(154,'june2022','Light Bill',2600,'2022-06-19 00:00:00','na'),(164,'june2022','Information Board',600,'2022-06-10 00:00:00','na'),(174,'june2022','Info. Board Fitting Material',90,'2022-06-11 00:00:00','na'),(184,'june2022','Info. Board Fitting Labour Charge',100,'2022-06-11 00:00:00','na'),(194,'june2022','Tap Lock',50,'2022-06-23 00:00:00','na'),(204,'july2022','Bhaiya Salary Duration - 1 June to 30 June',2400,'2022-07-01 00:00:00','na'),(214,'july2022','Tap Lock',70,'2022-07-10 00:00:00','na'),(224,'july2022','Broom - Kharata',60,'2022-07-17 00:00:00','na'),(234,'july2022','Light Bill',1830,'2022-07-21 00:00:00','na'),(244,'july2022','1 Piaggio Crush (वाळू )',1000,'2022-07-22 00:00:00','na'),(254,'july2022','Bricks',1425,'2022-07-22 00:00:00','na'),(264,'july2022','2 Sack JK Cement',650,'2022-07-22 00:00:00','na'),(274,'july2022','Labour Charge - Wall + Water filling space + e.t.c',1300,'2022-07-22 00:00:00','na'),(284,'august2022','Bhaiya Salary Duration - 1 July to 31 July',2400,'2022-08-01 00:00:00','na'),(294,'august2022','Light Bill',1690,'2022-08-22 00:00:00','na'),(304,'sept2022','Bhaiya Salary - Duration - 1 August to 31 August',2400,'2022-09-01 00:00:00','na'),(314,'sept2022','Light Bill',1900,'2022-09-18 00:00:00','na');
/*!40000 ALTER TABLE `expenses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fine`
--

DROP TABLE IF EXISTS `fine`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fine` (
  `fine_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `fine_flat_no` int(10) unsigned NOT NULL,
  `fine_month_id` varchar(15) NOT NULL,
  `fine_status` tinyint(1) unsigned NOT NULL,
  `fine_amount` int(10) unsigned NOT NULL,
  `fine_date` datetime NOT NULL,
  PRIMARY KEY (`fine_id`),
  KEY `fine_flat_no` (`fine_flat_no`),
  KEY `fine_month_id` (`fine_month_id`),
  CONSTRAINT `fine_ibfk_1` FOREIGN KEY (`fine_flat_no`) REFERENCES `members` (`flat_no`),
  CONSTRAINT `fine_ibfk_2` FOREIGN KEY (`fine_month_id`) REFERENCES `months` (`month_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fine`
--

LOCK TABLES `fine` WRITE;
/*!40000 ALTER TABLE `fine` DISABLE KEYS */;
/*!40000 ALTER TABLE `fine` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `maintenance`
--

DROP TABLE IF EXISTS `maintenance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `maintenance` (
  `maintenance_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `maintenance_flat_no` int(10) unsigned NOT NULL,
  `maintenance_month_id` varchar(15) NOT NULL,
  `maintenance_status` tinyint(1) unsigned NOT NULL,
  `maintenance_amount` int(10) unsigned NOT NULL,
  `maintenance_date` datetime NOT NULL,
  PRIMARY KEY (`maintenance_id`),
  KEY `maintenance_flat_no` (`maintenance_flat_no`),
  KEY `maintenance_month_id` (`maintenance_month_id`),
  CONSTRAINT `maintenance_ibfk_1` FOREIGN KEY (`maintenance_flat_no`) REFERENCES `members` (`flat_no`),
  CONSTRAINT `maintenance_ibfk_2` FOREIGN KEY (`maintenance_month_id`) REFERENCES `months` (`month_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2354 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `maintenance`
--

LOCK TABLES `maintenance` WRITE;
/*!40000 ALTER TABLE `maintenance` DISABLE KEYS */;
INSERT INTO `maintenance` VALUES (4,1,'contrib2000',1,2000,'2022-05-12 00:00:00'),(14,2,'contrib2000',1,2000,'2022-05-12 00:00:00'),(24,3,'contrib2000',1,2000,'2022-05-12 00:00:00'),(34,4,'contrib2000',1,2000,'2022-05-12 00:00:00'),(44,5,'contrib2000',1,2000,'2022-05-12 00:00:00'),(54,6,'contrib2000',1,2000,'2022-05-12 00:00:00'),(64,7,'contrib2000',1,2000,'2022-05-12 00:00:00'),(74,8,'contrib2000',1,2000,'2022-05-12 00:00:00'),(84,9,'contrib2000',1,2000,'2022-05-12 00:00:00'),(94,10,'contrib2000',0,0,'2022-08-05 14:17:54'),(104,11,'contrib2000',1,2000,'2022-05-12 00:00:00'),(114,12,'contrib2000',1,2000,'2022-05-12 00:00:00'),(124,13,'contrib2000',1,2000,'2022-05-12 00:00:00'),(134,14,'contrib2000',1,2000,'2022-05-12 00:00:00'),(144,15,'contrib2000',1,2000,'2022-05-12 00:00:00'),(154,16,'contrib2000',1,2000,'2022-05-12 00:00:00'),(164,17,'contrib2000',1,2000,'2022-05-12 00:00:00'),(174,18,'contrib2000',1,2000,'2022-05-12 00:00:00'),(314,1,'may2022',1,500,'2022-05-09 00:00:00'),(324,2,'may2022',1,400,'2022-05-18 00:00:00'),(334,3,'may2022',1,500,'2022-05-09 00:00:00'),(344,4,'may2022',1,400,'2022-08-09 00:00:00'),(354,5,'may2022',1,400,'2022-06-10 00:00:00'),(364,6,'may2022',0,0,'2022-08-05 14:21:07'),(374,7,'may2022',1,400,'2022-05-09 00:00:00'),(384,8,'may2022',1,400,'2022-05-09 00:00:00'),(394,9,'may2022',1,400,'2022-05-09 00:00:00'),(404,10,'may2022',0,0,'2022-08-05 14:21:07'),(414,11,'may2022',1,400,'2022-06-05 00:00:00'),(424,12,'may2022',1,500,'2022-05-09 00:00:00'),(434,13,'may2022',1,400,'2022-05-09 00:00:00'),(444,14,'may2022',1,500,'2022-05-09 00:00:00'),(454,15,'may2022',0,0,'2022-08-05 14:21:07'),(464,16,'may2022',1,400,'2022-05-09 00:00:00'),(474,17,'may2022',0,0,'2022-08-05 14:21:07'),(484,18,'may2022',0,0,'2022-08-05 14:21:07'),(624,1,'june2022',1,500,'2022-06-01 00:00:00'),(634,2,'june2022',1,400,'2022-06-10 00:00:00'),(644,3,'june2022',1,500,'2022-06-10 00:00:00'),(654,4,'june2022',1,400,'2022-06-02 00:00:00'),(664,5,'june2022',1,400,'2022-06-10 00:00:00'),(674,6,'june2022',1,400,'2022-08-16 00:00:00'),(684,7,'june2022',1,400,'2022-06-04 00:00:00'),(694,8,'june2022',1,400,'2022-06-04 00:00:00'),(704,9,'june2022',1,400,'2022-06-02 00:00:00'),(714,10,'june2022',0,0,'2022-08-05 14:24:14'),(724,11,'june2022',1,400,'2022-06-05 00:00:00'),(734,12,'june2022',1,500,'2022-06-09 00:00:00'),(744,13,'june2022',1,400,'2022-06-07 00:00:00'),(754,14,'june2022',1,500,'2022-06-06 00:00:00'),(764,15,'june2022',1,500,'2022-06-06 00:00:00'),(774,16,'june2022',1,400,'2022-08-09 00:00:00'),(784,17,'june2022',0,0,'2022-08-05 14:24:14'),(794,18,'june2022',0,0,'2022-08-05 14:24:14'),(934,1,'july2022',1,500,'2022-07-09 00:00:00'),(944,2,'july2022',1,400,'2022-07-10 00:00:00'),(954,3,'july2022',1,500,'2022-07-09 00:00:00'),(964,4,'july2022',1,400,'2022-07-09 00:00:00'),(974,5,'july2022',1,400,'2022-07-01 00:00:00'),(984,6,'july2022',1,400,'2022-08-16 00:00:00'),(994,7,'july2022',1,400,'2022-07-04 00:00:00'),(1004,8,'july2022',1,400,'2022-07-04 00:00:00'),(1014,9,'july2022',1,400,'2022-07-01 00:00:00'),(1024,10,'july2022',0,0,'2022-08-05 14:25:32'),(1034,11,'july2022',1,400,'2022-07-06 00:00:00'),(1044,12,'july2022',1,500,'2022-07-10 00:00:00'),(1054,13,'july2022',1,400,'2022-07-09 00:00:00'),(1064,14,'july2022',1,500,'2022-07-07 00:00:00'),(1074,15,'july2022',1,500,'2022-07-08 00:00:00'),(1084,16,'july2022',1,400,'2022-07-10 00:00:00'),(1094,17,'july2022',0,0,'2022-08-05 14:25:32'),(1104,18,'july2022',0,0,'2022-08-05 14:25:32'),(1244,1,'august2022',1,500,'2022-08-01 00:00:00'),(1254,2,'august2022',1,400,'2022-08-10 00:00:00'),(1264,3,'august2022',1,500,'2022-08-09 00:00:00'),(1274,4,'august2022',1,400,'2022-08-04 00:00:00'),(1284,5,'august2022',1,400,'2022-08-10 00:00:00'),(1294,6,'august2022',1,400,'2022-08-16 00:00:00'),(1304,7,'august2022',1,400,'2022-08-07 00:00:00'),(1314,8,'august2022',1,400,'2022-08-07 00:00:00'),(1324,9,'august2022',1,400,'2022-08-01 00:00:00'),(1334,10,'august2022',1,400,'2022-08-08 00:00:00'),(1344,11,'august2022',1,400,'2022-08-10 00:00:00'),(1354,12,'august2022',1,500,'2022-08-09 00:00:00'),(1364,13,'august2022',1,400,'2022-08-10 00:00:00'),(1374,14,'august2022',1,500,'2022-08-10 00:00:00'),(1384,15,'august2022',1,500,'2022-08-03 00:00:00'),(1394,16,'august2022',1,400,'2022-08-09 00:00:00'),(1404,17,'august2022',1,500,'2022-08-07 00:00:00'),(1414,18,'august2022',1,500,'2022-08-07 00:00:00'),(1554,1,'sept2022',1,500,'2022-09-07 00:00:00'),(1564,2,'sept2022',0,0,'2022-08-29 02:53:47'),(1574,3,'sept2022',1,500,'2022-09-09 00:00:00'),(1584,4,'sept2022',1,400,'2022-09-04 00:00:00'),(1594,5,'sept2022',1,400,'2022-09-11 00:00:00'),(1604,6,'sept2022',1,400,'2022-09-16 00:00:00'),(1614,7,'sept2022',1,400,'2022-09-06 00:00:00'),(1624,8,'sept2022',1,400,'2022-09-06 00:00:00'),(1634,9,'sept2022',1,400,'2022-09-01 00:00:00'),(1644,10,'sept2022',1,400,'2022-09-09 00:00:00'),(1654,11,'sept2022',1,400,'2022-09-08 00:00:00'),(1664,12,'sept2022',1,500,'2022-09-07 00:00:00'),(1674,13,'sept2022',1,400,'2022-09-10 00:00:00'),(1684,14,'sept2022',1,500,'2022-09-01 00:00:00'),(1694,15,'sept2022',1,500,'2022-09-02 00:00:00'),(1704,16,'sept2022',1,400,'2022-09-07 00:00:00'),(1714,17,'sept2022',1,500,'2022-09-09 00:00:00'),(1724,18,'sept2022',1,500,'2022-09-09 00:00:00'),(1734,1,'oct2022',0,0,'2022-10-01 04:38:57'),(1744,2,'oct2022',0,0,'2022-10-01 04:38:57'),(1754,3,'oct2022',0,0,'2022-10-01 04:38:57'),(1764,4,'oct2022',0,0,'2022-10-01 04:38:57'),(1774,5,'oct2022',0,0,'2022-10-01 04:38:57'),(1784,6,'oct2022',0,0,'2022-10-01 04:38:57'),(1794,7,'oct2022',0,0,'2022-10-01 04:38:57'),(1804,8,'oct2022',0,0,'2022-10-01 04:38:57'),(1814,9,'oct2022',0,0,'2022-10-01 04:38:57'),(1824,10,'oct2022',0,0,'2022-10-01 04:38:57'),(1834,11,'oct2022',0,0,'2022-10-01 04:38:57'),(1844,12,'oct2022',0,0,'2022-10-01 04:38:57'),(1854,13,'oct2022',0,0,'2022-10-01 04:38:57'),(1864,14,'oct2022',0,0,'2022-10-01 04:38:57'),(1874,15,'oct2022',0,0,'2022-10-01 04:38:57'),(1884,16,'oct2022',0,0,'2022-10-01 04:38:57'),(1894,17,'oct2022',0,0,'2022-10-01 04:38:57'),(1904,18,'oct2022',0,0,'2022-10-01 04:38:57'),(2044,1,'nov2022',0,0,'2022-10-01 04:47:13'),(2054,2,'nov2022',0,0,'2022-10-01 04:47:13'),(2064,3,'nov2022',0,0,'2022-10-01 04:47:13'),(2074,4,'nov2022',0,0,'2022-10-01 04:47:13'),(2084,5,'nov2022',0,0,'2022-10-01 04:47:13'),(2094,6,'nov2022',0,0,'2022-10-01 04:47:13'),(2104,7,'nov2022',0,0,'2022-10-01 04:47:13'),(2114,8,'nov2022',0,0,'2022-10-01 04:47:13'),(2124,9,'nov2022',0,0,'2022-10-01 04:47:13'),(2134,10,'nov2022',0,0,'2022-10-01 04:47:13'),(2144,11,'nov2022',0,0,'2022-10-01 04:47:13'),(2154,12,'nov2022',0,0,'2022-10-01 04:47:13'),(2164,13,'nov2022',0,0,'2022-10-01 04:47:13'),(2174,14,'nov2022',0,0,'2022-10-01 04:47:13'),(2184,15,'nov2022',0,0,'2022-10-01 04:47:13'),(2194,16,'nov2022',0,0,'2022-10-01 04:47:13'),(2204,17,'nov2022',0,0,'2022-10-01 04:47:13'),(2214,18,'nov2022',0,0,'2022-10-01 04:47:13');
/*!40000 ALTER TABLE `maintenance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `members`
--

DROP TABLE IF EXISTS `members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `members` (
  `flat_no` int(10) unsigned NOT NULL,
  `name` varchar(25) NOT NULL,
  `mobile_number` varchar(12) NOT NULL,
  PRIMARY KEY (`flat_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `members`
--

LOCK TABLES `members` WRITE;
/*!40000 ALTER TABLE `members` DISABLE KEYS */;
INSERT INTO `members` VALUES (1,'Pramila Bhor',''),(2,'Akshay Jaygude','7276728747'),(3,'Rajesh Ghule','7350424293'),(4,'Jayram Poojari','9356225756'),(5,'Chandrakant Joshi','9890644038'),(6,'M.R Kashyap','9158683545'),(7,'Kalpana Kulkarni','9370210740'),(8,'Kalpana Kulkarni','9370210740'),(9,'Sanjay Jawale','9923897154'),(10,'Rajendra Pawar',''),(11,'Suhas Dhumal','9689838547'),(12,'Umesh Prajapati','9049004225'),(13,'Sudhakar Shetty','9823307790'),(14,'Shubhangi Sonawane','9762051999'),(15,'Shubhangi Sonawane','9762051999'),(16,'Anuja Joshi','90288759593'),(17,'Suresh Chaudhari','9850948283'),(18,'Suresh Chaudhari','9850948283');
/*!40000 ALTER TABLE `members` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `months`
--

DROP TABLE IF EXISTS `months`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `months` (
  `month_id` varchar(15) NOT NULL,
  `month_name` varchar(20) NOT NULL,
  `previous_month_id` varchar(15) NOT NULL,
  `created_date` datetime NOT NULL,
  `latest` tinyint(1) NOT NULL,
  PRIMARY KEY (`month_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `months`
--

LOCK TABLES `months` WRITE;
/*!40000 ALTER TABLE `months` DISABLE KEYS */;
INSERT INTO `months` VALUES ('august2022','August 2022','july2022','2022-08-05 14:26:06',0),('contrib2000','Contribution 2000','none','2022-08-05 14:17:54',0),('july2022','July 2022','june2022','2022-08-05 14:25:32',0),('june2022','June 2022','may2022','2022-08-05 14:24:14',0),('may2022','May 2022','none','2022-08-05 14:21:07',0),('nov2022','November 2022','oct2022','2022-10-01 04:47:13',1),('oct2022','October 2022','sept2022','2022-10-01 04:38:57',0),('sept2022','September 2022','august2022','2022-08-29 02:53:47',0);
/*!40000 ALTER TABLE `months` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `savings`
--

DROP TABLE IF EXISTS `savings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `savings` (
  `saving_month_id` varchar(15) NOT NULL,
  `maintenance_total` int(11) NOT NULL,
  `fine_total` int(11) NOT NULL,
  `previous_month_total` int(11) NOT NULL,
  `expenses_total` int(11) NOT NULL,
  `earnings_total` int(11) NOT NULL,
  `total` int(11) NOT NULL,
  `note` text,
  KEY `saving_month_id` (`saving_month_id`),
  CONSTRAINT `savings_ibfk_1` FOREIGN KEY (`saving_month_id`) REFERENCES `months` (`month_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `savings`
--

LOCK TABLES `savings` WRITE;
/*!40000 ALTER TABLE `savings` DISABLE KEYS */;
INSERT INTO `savings` VALUES ('contrib2000',34000,0,0,24142,0,9858,' Money deposited  in building bank account by Ajinkya Kulkarni'),('may2022',5600,0,0,3230,0,2370,'None'),('june2022',6500,0,2370,6710,1000,3160,'None'),('july2022',6500,0,3160,8735,3040,3965,'None'),('august2022',7900,0,3965,4090,0,7775,'None'),('sept2022',7500,0,7775,4300,0,10975,'None'),('oct2022',0,0,10975,0,0,10975,'None'),('nov2022',0,0,10975,0,0,10975,'None');
/*!40000 ALTER TABLE `savings` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-10-01 10:49:54
