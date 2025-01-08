-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: TrangSuc
-- ------------------------------------------------------
-- Server version	9.0.1

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
-- Table structure for table `BLOGS`
--

DROP TABLE IF EXISTS `BLOGS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `BLOGS` (
  `BLOG_ID_` int NOT NULL AUTO_INCREMENT COMMENT 'ID cß╗ºa blog',
  `BLOG_TITLE` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Ti├¬u ─æß╗ü blog',
  `BLOG_CONTENT` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Nß╗Öi dung blog',
  `BLOG_IMAGE_URL` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'URL ß║únh cß╗ºa blog',
  `BLOG_AUTHOR` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'T├íc giß║ú blog',
  `CREATED_AT` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Thß╗Øi gian tß║ío',
  `BLOG_STAUS` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Trß║íng th├íi blog',
  PRIMARY KEY (`BLOG_ID_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BLOGS`
--

LOCK TABLES `BLOGS` WRITE;
/*!40000 ALTER TABLE `BLOGS` DISABLE KEYS */;
/*!40000 ALTER TABLE `BLOGS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CART`
--

DROP TABLE IF EXISTS `CART`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CART` (
  `CART_ID` int NOT NULL AUTO_INCREMENT COMMENT 'ID giß╗Å h├áng',
  `USER_ID` int NOT NULL COMMENT 'ID ngã░ß╗Øi d├╣ng',
  `PRODUCT_ID` int NOT NULL COMMENT 'ID sß║ún phß║®m',
  PRIMARY KEY (`CART_ID`),
  KEY `FK_CART_CO_USERS` (`USER_ID`),
  KEY `FK_CART_DUOC_PRODUCTS` (`PRODUCT_ID`),
  CONSTRAINT `FK_CART_CO_USERS` FOREIGN KEY (`USER_ID`) REFERENCES `USERS` (`USER_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FK_CART_DUOC_PRODUCTS` FOREIGN KEY (`PRODUCT_ID`) REFERENCES `PRODUCTS` (`PRODUCT_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CART`
--

LOCK TABLES `CART` WRITE;
/*!40000 ALTER TABLE `CART` DISABLE KEYS */;
/*!40000 ALTER TABLE `CART` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CATEGORIES`
--

DROP TABLE IF EXISTS `CATEGORIES`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CATEGORIES` (
  `CATEGORY_ID_` int NOT NULL AUTO_INCREMENT COMMENT 'ID danh mß╗Ñc',
  `CATEGORY_NAME` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'T├¬n danh mß╗Ñc',
  `CATEGORY_DECRIPTION` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'M├┤ tß║ú danh mß╗Ñc',
  `CATEGORY_STATUS` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`CATEGORY_ID_`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CATEGORIES`
--

LOCK TABLES `CATEGORIES` WRITE;
/*!40000 ALTER TABLE `CATEGORIES` DISABLE KEYS */;
INSERT INTO `CATEGORIES` VALUES (1,'Nhẫn','adadasd111','Đang hoạt động'),(2,'Dây chuyền','Dây chuyền trang sức cho cả nam và nữ, từ vàng, bạc đến kim cương.','Đang hoạt động'),(3,'Bông tai','Bông tai, khuyên tai với nhiều kiểu dáng từ đơn giản đến sang trọng.','Đang hoạt động'),(4,'Vòng tay','Vòng tay bằng vàng, bạc, ngọc trai hoặc đá quý.','Đang hoạt động'),(5,'Mặt dây chuyền','Mặt dây chuyền trang sức với các thiết kế phong phú, từ đơn giản đến cầu kỳ.','Ngưng hoạt động'),(6,'Lắc tay','Lắc tay nữ trang sức làm từ vàng, bạc, kim loại quý, được trang trí với đá quý hoặc kim cương.','Đang hoạt động'),(7,'Trang sức cưới','Các bộ trang sức dành riêng cho ngày cưới như nhẫn cưới, dây chuyền, bông tai, v.v.','Đang hoạt động'),(8,'Đồng hồ','Đồng hồ đeo tay sang trọng kết hợp với trang sức cho các dịp đặc biệt.','Đang hoạt động'),(9,'Nhẫn kim cương','Nhẫn đính hôn và nhẫn cưới được làm từ kim cương cao cấp.','Đang hoạt động'),(10,'Đá quý','Trang sức làm từ các loại đá quý như ruby, sapphire, ngọc bích, v.v.','Ngưng hoạt động'),(11,'Vòng cổ','Vòng cổ từ các vật liệu cao cấp như vàng, bạc, đá quý hoặc ngọc trai.','Đang hoạt động'),(12,'Tỳ hưu','Trang sức tỳ hưu – biểu tượng của tài lộc và may mắn, được chế tác tinh xảo từ các chất liệu quý.','Đang hoạt động'),(13,'Vòng chân','Vòng chân làm từ các chất liệu quý như vàng, bạc hoặc đá quý.','Ngưng hoạt động'),(14,'Trang sức ngọc trai','Các loại trang sức ngọc trai tinh tế như dây chuyền, bông tai, nhẫn ngọc trai.','Đang hoạt động'),(15,'Trang sức nam','Trang sức dành cho nam giới, bao gồm nhẫn, dây chuyền, vòng tay, đồng hồ.','Đang hoạt động'),(16,'Trang sức nữ','Trang sức dành cho nữ giới với các thiết kế hiện đại và thanh lịch.','Đang hoạt động'),(17,'Trang sức bạc','Trang sức làm từ bạc với các mẫu mã đa dạng, từ nhẫn đến bông tai, vòng cổ.','Ngưng hoạt động'),(18,'Trang sức phong thủy','Trang sức mang ý nghĩa phong thủy, giúp mang lại may mắn và bình an cho người đeo.','Đang hoạt động'),(19,'Trang sức handmade','Trang sức tự tay làm với thiết kế độc đáo, thường sử dụng vật liệu tự nhiên hoặc tái chế.','Đang hoạt động'),(20,'Trang sức vàng','Các loại trang sức vàng, từ vàng 24k đến vàng 18k, với thiết kế sang trọng và tinh xảo.','Đang hoạt động'),(22,'áda','sdadasd','active');
/*!40000 ALTER TABLE `CATEGORIES` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ORDERDETAILS`
--

DROP TABLE IF EXISTS `ORDERDETAILS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ORDERDETAILS` (
  `ORDER_DETAIL_ID` int NOT NULL AUTO_INCREMENT COMMENT 'ID chi tiß║┐t ─æãín h├áng',
  `ORDER_ID_` int NOT NULL COMMENT 'ID ─æãín h├áng',
  `PRODUCT_ID` int NOT NULL COMMENT 'ID sß║ún phß║®m',
  `QUANTITY` int DEFAULT NULL COMMENT 'Sß╗æ lã░ß╗úng sß║ún phß║®m',
  `PRICE` float DEFAULT NULL COMMENT 'Gi├í sß║ún phß║®m',
  `DISCOUNT_PRODUCT` float DEFAULT NULL COMMENT 'Chiß║┐t khß║Ñu sß║ún phß║®m',
  PRIMARY KEY (`ORDER_DETAIL_ID`),
  KEY `FK_ORDERDET_CO_O_ORDERS` (`ORDER_ID_`),
  KEY `FK_ORDERDET_DUOC_ODER_PRODUCTS` (`PRODUCT_ID`),
  CONSTRAINT `FK_ORDERDET_CO_O_ORDERS` FOREIGN KEY (`ORDER_ID_`) REFERENCES `ORDERS` (`ORDER_ID_`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FK_ORDERDET_DUOC_ODER_PRODUCTS` FOREIGN KEY (`PRODUCT_ID`) REFERENCES `PRODUCTS` (`PRODUCT_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ORDERDETAILS`
--

LOCK TABLES `ORDERDETAILS` WRITE;
/*!40000 ALTER TABLE `ORDERDETAILS` DISABLE KEYS */;
/*!40000 ALTER TABLE `ORDERDETAILS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ORDERS`
--

DROP TABLE IF EXISTS `ORDERS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ORDERS` (
  `ORDER_ID_` int NOT NULL AUTO_INCREMENT COMMENT 'ID ─æãín h├áng',
  `USER_ID` int NOT NULL COMMENT 'ID ngã░ß╗Øi d├╣ng',
  `ORDER_STATUS_` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Trß║íng th├íi ─æãín h├áng',
  `TOTAL_PRICE_` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Tß╗òng gi├í trß╗ï ─æãín h├áng',
  `PAYMENT_METHOD_` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Phã░ãíng thß╗®c thanh to├ín',
  `CREATED_AT_` datetime DEFAULT NULL COMMENT 'Ng├áy tß║ío ─æãín h├áng',
  `UPDATED_AT_` datetime DEFAULT NULL COMMENT 'Ng├áy cß║¡p nhß║¡t ─æãín h├áng',
  `ADDRESS_ODER` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '─Éß╗ïa chß╗ë giao h├áng',
  `PHONE_ODER` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Sß╗æ ─æiß╗çn thoß║íi giao h├áng',
  PRIMARY KEY (`ORDER_ID_`),
  KEY `FK_ORDERS_MUA_USERS` (`USER_ID`),
  CONSTRAINT `FK_ORDERS_MUA_USERS` FOREIGN KEY (`USER_ID`) REFERENCES `USERS` (`USER_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ORDERS`
--

LOCK TABLES `ORDERS` WRITE;
/*!40000 ALTER TABLE `ORDERS` DISABLE KEYS */;
/*!40000 ALTER TABLE `ORDERS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PRODUCTS`
--

DROP TABLE IF EXISTS `PRODUCTS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PRODUCTS` (
  `PRODUCT_ID` int NOT NULL AUTO_INCREMENT COMMENT 'ID sß║ún phß║®m',
  `CATEGORY_ID_` int NOT NULL COMMENT 'ID danh mß╗Ñc',
  `NAME` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'T├¬n sß║ún phß║®m',
  `PRODUCT_PRICE` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Gi├í sß║ún phß║®m',
  `MATERIAL_` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Chß║Ñt liß╗çu sß║ún phß║®m',
  `WEIGHT` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Trß╗ìng lã░ß╗úng sß║ún phß║®m',
  `SIZE_` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'K├¡ch thã░ß╗øc sß║ún phß║®m',
  `IMAGE_URL_` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'URL ß║únh sß║ún phß║®m',
  `STOCK_QUANTITY_` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Sß╗æ lã░ß╗úng tß╗ôn kho',
  `CREATED_AT_` datetime DEFAULT NULL COMMENT 'Ng├áy tß║ío sß║ún phß║®m',
  `UPDATED_AT` datetime DEFAULT NULL COMMENT 'Ng├áy cß║¡p nhß║¡t sß║ún phß║®m',
  `PRODUCT_STATUS` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`PRODUCT_ID`),
  KEY `FK_PRODUCTS_THUOC_CATEGORI` (`CATEGORY_ID_`),
  CONSTRAINT `FK_PRODUCTS_THUOC_CATEGORI` FOREIGN KEY (`CATEGORY_ID_`) REFERENCES `CATEGORIES` (`CATEGORY_ID_`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PRODUCTS`
--

LOCK TABLES `PRODUCTS` WRITE;
/*!40000 ALTER TABLE `PRODUCTS` DISABLE KEYS */;
INSERT INTO `PRODUCTS` VALUES (1,1,'Nhẫn Vàng 24K','5000000','Vàng 24K','10','Nhỏ','IMAGE_URL_-1733656912836.png','50','2024-11-30 16:31:17','2024-11-30 16:31:17','Đang hoạt động'),(2,3,'Dây Chuyền Kim Cương','10000000','Kim Cương, Vàng 18K','15','Vừa','IMAGE_URL_-1733656591717.jpg','20','2024-11-30 16:31:17','2024-11-30 16:31:17','Đang hoạt động'),(3,3,'Bông Tai Ngọc Trai','2000000','Ngọc Trai, Vàng 14K','5','Nhỏ','IMAGE_URL_-1733656908362.png','100','2024-11-30 16:31:17','2024-11-30 16:31:17','Đang hoạt động'),(4,4,'Vòng Tay Bạc','1500000','Bạc 925','12','Trung bình','IMAGE_URL_-1733656904387.png','70','2024-11-30 16:31:17','2024-11-30 16:31:17','Đang hoạt động'),(5,5,'Mặt Dây Chuyền Vàng 18K','3000000','Vàng 18K','8','Nhỏ','IMAGE_URL_-1733656917457.png','40','2024-11-30 16:31:17','2024-11-30 16:31:17','Ngưng hoạt động'),(7,7,'Trang Sức Cưới Vàng 24K','15000000','Vàng 24K, Kim Cương','25','Vừa','IMAGE_URL_-1733656900308.png','10','2024-11-30 16:31:17','2024-11-30 16:31:17','Đang hoạt động'),(8,8,'Đồng Hồ Kim Cương','20000000','Kim Cương, Thép không gỉ','50','23','IMAGE_URL_-1733656777596.png','5','2024-11-30 16:31:17','2024-11-30 16:31:17','Đang hoạt động'),(9,9,'Nhẫn Kim Cương Đính Hôn','12000000','Kim Cương, Vàng 18K','18','1','IMAGE_URL_-1733656772179.png','30','2024-11-30 16:31:17','2024-11-30 16:31:17','Đang hoạt động'),(10,10,'Vòng Cổ Ngọc Bích','4000000','Ngọc Bích','10','Trung bình','IMAGE_URL_-1733656768239.png','25','2024-11-30 16:31:17','2024-11-30 16:31:17','Ngưng hoạt động'),(11,11,'Vòng Cổ Vàng 14K','3500000','Vàng 14K','14','Trung bình','IMAGE_URL_-1733656894719.png','60','2024-11-30 16:31:17','2024-11-30 16:31:17','Đang hoạt động'),(12,12,'Tỳ Hưu Vàng','5000000','Vàng 24K','30','Nhỏ','IMAGE_URL_-1733656764056.png','40','2024-11-30 16:31:17','2024-11-30 16:31:17','Đang hoạt động'),(13,13,'Vòng Chân Ngọc Trai','2500000','Ngọc Trai, Vàng 18K','5','Nhỏ','IMAGE_URL_-1733656759656.png','80','2024-11-30 16:31:17','2024-11-30 16:31:17','Ngưng hoạt động'),(14,14,'Nhẫn Vàng 18K','4000000','Vàng 18K','8','Nhỏ','IMAGE_URL_-1733656750466.png','90','2024-11-30 16:31:17','2024-11-30 16:31:17','Đang hoạt động'),(15,15,'Vòng Tay Vàng','6000000','Vàng 24K','20','Vừa','IMAGE_URL_-1733656724128.png','50','2024-11-30 16:31:17','2024-11-30 16:31:17','Đang hoạt động'),(16,16,'Trang Sức Phong Thủy','3000000','Đá Quý','12','Trung bình','IMAGE_URL_-1733656716581.png','40','2024-11-30 16:31:17','2024-11-30 16:31:17','Đang hoạt động'),(17,17,'Trang Sức Handmade','1500000','Đá Quý, Kim Loại','8','Nhỏ','IMAGE_URL_-1733656687252.png','60','2024-11-30 16:31:17','2024-11-30 16:31:17','Đang hoạt động'),(18,18,'Nhẫn Đính Hôn Vàng 18K','8000000','Vàng 18K, Kim Cương','10','Nhỏ','IMAGE_URL_-1733656675753.png','50','2024-11-30 16:31:17','2024-11-30 16:31:17','Đang hoạt động'),(19,19,'Bông Tai Vàng 14K','2500000','Vàng 14K','6','Nhỏ','IMAGE_URL_-1733656663943.jpg','70','2024-11-30 16:31:17','2024-11-30 16:31:17','Đang hoạt động'),(20,20,'Dây Chuyền Vàng 24K','6000000','Vàng 24K','18','Trung bình','IMAGE_URL_-1733656656204.jpg','45','2024-11-30 16:31:17','2024-11-30 16:31:17','Đang hoạt động'),(21,1,'ádasdasd','22222','adasd','12','23','IMAGE_URL_-1733655741298.jpg','12',NULL,NULL,'1'),(22,2,'ádadasd','23','ádasd','23','2','IMAGE_URL_-1733655919909.jpg','23',NULL,NULL,'Đang hoạt động');
/*!40000 ALTER TABLE `PRODUCTS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PROMOTIONS`
--

DROP TABLE IF EXISTS `PROMOTIONS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PROMOTIONS` (
  `PROMOTION_ID_` int NOT NULL AUTO_INCREMENT COMMENT 'ID khuyß║┐n m├úi',
  `PRODUCT_ID` int NOT NULL COMMENT 'ID sß║ún phß║®m',
  `PROMOTION_TITLE_` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Ti├¬u ─æß╗ü khuyß║┐n m├úi',
  `PROMOTION__DECRIPTION` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci COMMENT 'M├┤ tß║ú khuyß║┐n m├úi',
  `PROMOTION_DISCOUNT` float DEFAULT NULL COMMENT 'Giß║úm gi├í khuyß║┐n m├úi',
  `PROMOTION_START_DATE` datetime DEFAULT NULL COMMENT 'Ng├áy bß║»t ─æß║ºu khuyß║┐n m├úi',
  `PROMOTION_END_DATE` datetime DEFAULT NULL COMMENT 'Ng├áy kß║┐t th├║c khuyß║┐n m├úi',
  PRIMARY KEY (`PROMOTION_ID_`),
  KEY `FK_PROMOTIO_DUOC_PRODUCTS` (`PRODUCT_ID`),
  CONSTRAINT `FK_PROMOTIO_DUOC_PRODUCTS` FOREIGN KEY (`PRODUCT_ID`) REFERENCES `PRODUCTS` (`PRODUCT_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PROMOTIONS`
--

LOCK TABLES `PROMOTIONS` WRITE;
/*!40000 ALTER TABLE `PROMOTIONS` DISABLE KEYS */;
/*!40000 ALTER TABLE `PROMOTIONS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `USERS`
--

DROP TABLE IF EXISTS `USERS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `USERS` (
  `USER_ID` int NOT NULL AUTO_INCREMENT COMMENT 'ID ngã░ß╗Øi d├╣ng',
  `USERNAME` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'T├¬n ngã░ß╗Øi d├╣ng',
  `PASSWORD` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Mß║¡t khß║®u ngã░ß╗Øi d├╣ng',
  `EMAIL` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Email ngã░ß╗Øi d├╣ng',
  `PHONE` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Sß╗æ ─æiß╗çn thoß║íi ngã░ß╗Øi d├╣ng',
  `ADDRESS_` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '─Éß╗ïa chß╗ë ngã░ß╗Øi d├╣ng',
  `CREATED_AT` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Thß╗Øi gian tß║ío t├ái khoß║ún',
  `UPDATED_AT` datetime DEFAULT NULL COMMENT 'Thß╗Øi gian cß║¡p nhß║¡t t├ái khoß║ún',
  `USER_STATUS` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Trß║íng th├íi t├ái khoß║ún',
  `AVATAR_USER` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'ß║ónh ─æß║íi diß╗çn',
  PRIMARY KEY (`USER_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `USERS`
--

LOCK TABLES `USERS` WRITE;
/*!40000 ALTER TABLE `USERS` DISABLE KEYS */;
INSERT INTO `USERS` VALUES (1,'user1','hashed_password_1','user1@example.com','0912345678','Hà Nội','2024-11-30 16:26:14','2024-11-30 16:26:14','active','avatar1.jpg'),(2,'user2','hashed_password_2','user2@example.com','0912345679','Hồ Chí Minh','2024-11-30 16:26:14','2024-11-30 16:26:14','inactive','avatar2.jpg'),(3,'user3','hashed_password_3','user3@example.com','0912345680','Đà Nẵng','2024-11-30 16:26:14','2024-11-30 16:26:14','active','avatar3.jpg'),(4,'user4','hashed_password_4','user4@example.com','0912345681','Cần Thơ','2024-11-30 16:26:14','2024-11-30 16:26:14','inactive','avatar4.jpg'),(5,'user5','hashed_password_5','user5@example.com','0912345682','Bình Dương','2024-11-30 16:26:14','2024-11-30 16:26:14','active','avatar5.jpg'),(6,'user6','hashed_password_6','user6@example.com','0912345683','Hải Phòng','2024-11-30 16:26:14','2024-11-30 16:26:14','active','avatar6.jpg'),(7,'user7','hashed_password_7','user7@example.com','0912345684','Quảng Ninh','2024-11-30 16:26:14','2024-11-30 16:26:14','inactive','avatar7.jpg'),(8,'user8','hashed_password_8','user8@example.com','0912345685','Hà Giang','2024-11-30 16:26:14','2024-11-30 16:26:14','active','avatar8.jpg'),(9,'user9','hashed_password_9','user9@example.com','0912345686','Lạng Sơn','2024-11-30 16:26:14','2024-11-30 16:26:14','inactive','avatar9.jpg'),(10,'user10','hashed_password_10','user10@example.com','0912345687','Nam Định','2024-11-30 16:26:14','2024-11-30 16:26:14','active','avatar10.jpg'),(11,'user11','hashed_password_11','user11@example.com','0912345688','Nghệ An','2024-11-30 16:26:14','2024-11-30 16:26:14','inactive','avatar11.jpg'),(12,'user12','hashed_password_12','user12@example.com','0912345689','Thanh Hóa','2024-11-30 16:26:14','2024-11-30 16:26:14','active','avatar12.jpg'),(13,'user13','hashed_password_13','user13@example.com','0912345690','Vĩnh Long','2024-11-30 16:26:14','2024-11-30 16:26:14','active','avatar13.jpg'),(14,'user14','hashed_password_14','user14@example.com','0912345691','Bắc Giang','2024-11-30 16:26:14','2024-11-30 16:26:14','inactive','avatar14.jpg'),(15,'user15','hashed_password_15','user15@example.com','0912345692','Phú Thọ','2024-11-30 16:26:14','2024-11-30 16:26:14','active','avatar15.jpg'),(16,'user16','hashed_password_16','user16@example.com','0912345693','Lào Cai','2024-11-30 16:26:14','2024-11-30 16:26:14','inactive','avatar16.jpg'),(17,'user17','hashed_password_17','user17@example.com','0912345694','Hòa Bình','2024-11-30 16:26:14','2024-11-30 16:26:14','active','avatar17.jpg'),(18,'user18','hashed_password_18','user18@example.com','0912345695','Thái Bình','2024-11-30 16:26:14','2024-11-30 16:26:14','inactive','avatar18.jpg'),(19,'user19','hashed_password_19','user19@example.com','0912345696','Vĩnh Phúc','2024-11-30 16:26:14','2024-11-30 16:26:14','active','avatar19.jpg'),(20,'user20','hashed_password_20','user20@example.com','0912345697','Hậu Giang','2024-11-30 16:26:14','2024-11-30 16:26:14','inactive','avatar20.jpg'),(21,'phucvntv159@gmail.com','$2b$10$sOt4JJWPAMwVWNrT2Pxeq.J9Zi1TUkVbjF/KcaGpb5bVM1vhYPoga','phucvntv159@gmail.com','0327434821',NULL,'2024-12-07 06:21:40','2024-12-07 06:21:40','1',NULL),(22,'hohoangphucjob@gmail.com','$2b$10$jeZFdQ4kCghPlEPnjsPVzOOWpeQBYKLiWC.om0okUMFpqCH4w0mSu','hohoangphucjob@gmail.com','0327434821',NULL,'2024-12-07 06:52:38','2024-12-07 06:52:38','1',NULL);
/*!40000 ALTER TABLE `USERS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `WISHLIST`
--

DROP TABLE IF EXISTS `WISHLIST`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `WISHLIST` (
  `WISHLIST_ID` int NOT NULL AUTO_INCREMENT COMMENT 'ID danh s├ích y├¬u th├¡ch',
  `USER_ID` int NOT NULL COMMENT 'ID ngã░ß╗Øi d├╣ng',
  `PRODUCT_ID` int NOT NULL COMMENT 'ID sß║ún phß║®m',
  PRIMARY KEY (`WISHLIST_ID`),
  KEY `FK_WISHLIST_CO_USERS` (`USER_ID`),
  KEY `FK_WISHLIST_DUOC_PRODUCTS` (`PRODUCT_ID`),
  CONSTRAINT `FK_WISHLIST_CO_USERS` FOREIGN KEY (`USER_ID`) REFERENCES `USERS` (`USER_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FK_WISHLIST_DUOC_PRODUCTS` FOREIGN KEY (`PRODUCT_ID`) REFERENCES `PRODUCTS` (`PRODUCT_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `WISHLIST`
--

LOCK TABLES `WISHLIST` WRITE;
/*!40000 ALTER TABLE `WISHLIST` DISABLE KEYS */;
/*!40000 ALTER TABLE `WISHLIST` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'TrangSuc'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-08 21:00:51
