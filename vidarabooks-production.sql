-- MySQL dump 10.13  Distrib 8.4.11, for Linux (aarch64)
--
-- Host: localhost    Database: toko_buku
-- ------------------------------------------------------
-- Server version	8.4.11

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
-- Table structure for table `activity_logs`
--

DROP TABLE IF EXISTS `activity_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `activity_logs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned DEFAULT NULL,
  `action` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `subject_type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `subject_id` bigint unsigned DEFAULT NULL,
  `old_values` json DEFAULT NULL,
  `new_values` json DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `activity_logs_user_id_foreign` (`user_id`),
  KEY `activity_logs_subject_type_subject_id_index` (`subject_type`,`subject_id`),
  KEY `activity_logs_action_index` (`action`),
  CONSTRAINT `activity_logs_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activity_logs`
--

LOCK TABLES `activity_logs` WRITE;
/*!40000 ALTER TABLE `activity_logs` DISABLE KEYS */;
/*!40000 ALTER TABLE `activity_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `addresses`
--

DROP TABLE IF EXISTS `addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `addresses` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `label` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `recipient_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address_line_1` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address_line_2` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `subdistrict` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `district` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `province` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `postal_code` varchar(16) COLLATE utf8mb4_unicode_ci NOT NULL,
  `biteship_area_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_default` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `addresses_user_id_is_default_index` (`user_id`,`is_default`),
  KEY `addresses_city_province_index` (`city`,`province`),
  KEY `addresses_biteship_area_id_index` (`biteship_area_id`),
  CONSTRAINT `addresses_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `addresses`
--

LOCK TABLES `addresses` WRITE;
/*!40000 ALTER TABLE `addresses` DISABLE KEYS */;
INSERT INTO `addresses` VALUES (7,8,'rumah','yayat supriady','085271524200','DUSUN I DESA BATU BELAH',NULL,'batu belah','Kampar','Kampar','Riau','28461','IDNP26IDNC160IDND1072IDZ28461',1,'2026-09-17 16:38:59','2026-09-17 16:38:59');
/*!40000 ALTER TABLE `addresses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `banners`
--

DROP TABLE IF EXISTS `banners`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `banners` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `subtitle` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `link` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sort_order` int unsigned NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `banners`
--

LOCK TABLES `banners` WRITE;
/*!40000 ALTER TABLE `banners` DISABLE KEYS */;
/*!40000 ALTER TABLE `banners` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `book_images`
--

DROP TABLE IF EXISTS `book_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `book_images` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `book_id` bigint unsigned NOT NULL,
  `image_path` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `alt_text` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sort_order` smallint unsigned NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `book_images_book_id_sort_order_index` (`book_id`,`sort_order`),
  CONSTRAINT `book_images_book_id_foreign` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book_images`
--

LOCK TABLES `book_images` WRITE;
/*!40000 ALTER TABLE `book_images` DISABLE KEYS */;
INSERT INTO `book_images` VALUES (4,6,'books/demo-nietzsche-cover.jpg','Demikianlah Sabda Zarathustra',0,'2026-09-17 03:00:48','2026-09-17 03:00:48');
/*!40000 ALTER TABLE `book_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `books`
--

DROP TABLE IF EXISTS `books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `books` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `category_id` bigint unsigned NOT NULL,
  `sku` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `author` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `publisher` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `publication_year` smallint unsigned DEFAULT NULL,
  `isbn` varchar(32) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pages` int unsigned DEFAULT NULL,
  `short_description` text COLLATE utf8mb4_unicode_ci,
  `description` longtext COLLATE utf8mb4_unicode_ci,
  `cost_price` decimal(15,2) NOT NULL DEFAULT '0.00',
  `price` decimal(15,2) NOT NULL,
  `discount_type` varchar(16) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `discount_value` decimal(15,2) DEFAULT NULL,
  `discount_start_at` timestamp NULL DEFAULT NULL,
  `discount_end_at` timestamp NULL DEFAULT NULL,
  `weight` decimal(10,2) DEFAULT NULL,
  `length` decimal(10,2) DEFAULT NULL,
  `width` decimal(10,2) DEFAULT NULL,
  `height` decimal(10,2) DEFAULT NULL,
  `stock` int unsigned NOT NULL DEFAULT '0',
  `minimum_stock` int unsigned NOT NULL DEFAULT '0',
  `cover_image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_featured` tinyint(1) NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `views_count` bigint unsigned NOT NULL DEFAULT '0',
  `sold_count` bigint unsigned NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `books_sku_unique` (`sku`),
  UNIQUE KEY `books_slug_unique` (`slug`),
  KEY `books_category_id_is_active_index` (`category_id`,`is_active`),
  KEY `books_is_featured_is_active_index` (`is_featured`,`is_active`),
  KEY `books_publication_year_is_active_index` (`publication_year`,`is_active`),
  KEY `books_stock_is_active_index` (`stock`,`is_active`),
  KEY `books_isbn_index` (`isbn`),
  KEY `books_is_active_created_at_index` (`is_active`,`created_at`),
  CONSTRAINT `books_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `books`
--

LOCK TABLES `books` WRITE;
/*!40000 ALTER TABLE `books` DISABLE KEYS */;
INSERT INTO `books` VALUES (6,6,'BK-NIETZSCHE-001','demikianlah-sabda-zarathustra','Demikianlah Sabda Zarathustra','Friedrich Wilhelm Nietzsche','basabasi',2026,NULL,206,'Karya filsafat Friedrich Wilhelm Nietzsche.',NULL,50000.00,75000.00,NULL,NULL,NULL,NULL,300.00,NULL,NULL,NULL,20,3,NULL,1,1,0,0,'2026-09-17 03:00:48','2026-09-17 03:00:48',NULL),(7,7,'BK-DEMO-LAUT-BERCERITA','laut-bercerita','Laut Bercerita','Leila S. Chudori','Bukupagi Demo',2024,NULL,200,'Edisi demo Laut Bercerita untuk pengujian katalog.',NULL,69000.00,115000.00,'percentage',20.00,'2026-09-18 12:21:00','2026-09-19 12:21:00',350.00,NULL,NULL,NULL,20,3,'books/covers/9zSMtUqqGMCsXRrVsJE4C1mk2yUFs3u0ItXHh13U.jpg',1,1,0,0,'2026-09-17 09:13:03','2026-09-18 08:00:03',NULL),(8,7,'BK-DEMO-BUMI-MANUSIA','bumi-manusia','Bumi Manusia','Pramoedya A. Toer','Bukupagi Demo',2024,NULL,200,'Edisi demo Bumi Manusia untuk pengujian katalog.',NULL,57000.00,95000.00,NULL,NULL,NULL,NULL,350.00,NULL,NULL,NULL,18,3,NULL,1,1,0,0,'2026-09-17 09:13:03','2026-09-17 09:13:03',NULL),(9,8,'BK-DEMO-ATOMIC-HABITS','atomic-habits','Atomic Habits','James Clear','Bukupagi Demo',2024,NULL,200,'Edisi demo Atomic Habits untuk pengujian katalog.',NULL,64800.00,108000.00,NULL,NULL,NULL,NULL,350.00,NULL,NULL,NULL,30,3,NULL,1,1,0,0,'2026-09-17 09:13:03','2026-09-17 09:13:03',NULL),(10,8,'BK-DEMO-FILOSOFI-TERAS','filosofi-teras','Filosofi Teras','Henry Manampiring','Bukupagi Demo',2024,NULL,200,'Edisi demo Filosofi Teras untuk pengujian katalog.',NULL,58800.00,98000.00,NULL,NULL,NULL,NULL,350.00,NULL,NULL,NULL,22,3,NULL,1,1,0,0,'2026-09-17 09:13:03','2026-09-17 09:13:03',NULL),(11,10,'BK-DEMO-SAPIENS','sapiens','Sapiens','Yuval Noah Harari','Bukupagi Demo',2024,NULL,200,'Edisi demo Sapiens untuk pengujian katalog.',NULL,87000.00,145000.00,NULL,NULL,NULL,NULL,350.00,NULL,NULL,NULL,15,3,NULL,1,1,0,0,'2026-09-17 09:13:03','2026-09-17 09:13:03',NULL),(12,7,'BK-DEMO-THE-MIDNIGHT-LIBRARY','the-midnight-library','The Midnight Library','Matt Haig','Bukupagi Demo',2024,NULL,200,'Edisi demo The Midnight Library untuk pengujian katalog.',NULL,54600.00,91000.00,'percentage',12.00,NULL,NULL,350.00,NULL,NULL,NULL,19,3,NULL,1,1,0,0,'2026-09-17 09:13:03','2026-09-18 06:50:12',NULL),(13,9,'BK-DEMO-RICH-DAD-POOR-DAD','rich-dad-poor-dad','Rich Dad Poor Dad','Robert T. Kiyosaki','Bukupagi Demo',2024,NULL,200,'Edisi demo Rich Dad Poor Dad untuk pengujian katalog.',NULL,67200.00,112000.00,NULL,NULL,NULL,NULL,350.00,NULL,NULL,NULL,17,3,NULL,1,1,0,0,'2026-09-17 09:13:03','2026-09-17 09:13:03',NULL),(14,11,'BK-DEMO-KOSAKATA-ANAK-HEBAT','kosakata-anak-hebat','Kosakata Anak Hebat','Fran Bromage','Bukupagi Demo',2024,NULL,200,'Edisi demo Kosakata Anak Hebat untuk pengujian katalog.',NULL,52200.00,87000.00,NULL,NULL,NULL,NULL,350.00,NULL,NULL,NULL,25,3,NULL,1,1,0,0,'2026-09-17 09:13:03','2026-09-17 09:13:03',NULL);
/*!40000 ALTER TABLE `books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cache`
--

DROP TABLE IF EXISTS `cache`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`),
  KEY `cache_expiration_index` (`expiration`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache`
--

LOCK TABLES `cache` WRITE;
/*!40000 ALTER TABLE `cache` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cache_locks`
--

DROP TABLE IF EXISTS `cache_locks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache_locks` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`),
  KEY `cache_locks_expiration_index` (`expiration`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache_locks`
--

LOCK TABLES `cache_locks` WRITE;
/*!40000 ALTER TABLE `cache_locks` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache_locks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart_items`
--

DROP TABLE IF EXISTS `cart_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_items` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `cart_id` bigint unsigned NOT NULL,
  `book_id` bigint unsigned NOT NULL,
  `quantity` int unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `cart_items_cart_id_book_id_unique` (`cart_id`,`book_id`),
  KEY `cart_items_book_id_foreign` (`book_id`),
  CONSTRAINT `cart_items_book_id_foreign` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`) ON DELETE RESTRICT,
  CONSTRAINT `cart_items_cart_id_foreign` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_items`
--

LOCK TABLES `cart_items` WRITE;
/*!40000 ALTER TABLE `cart_items` DISABLE KEYS */;
INSERT INTO `cart_items` VALUES (1,2,7,2,'2026-09-17 09:13:18','2026-09-17 09:14:53'),(10,16,7,1,'2026-09-18 02:03:01','2026-09-18 02:03:01'),(11,3,12,1,'2026-09-18 07:17:05','2026-09-18 07:17:05');
/*!40000 ALTER TABLE `cart_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carts`
--

DROP TABLE IF EXISTS `carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carts` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned DEFAULT NULL,
  `guest_token` char(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `carts_user_id_unique` (`user_id`),
  UNIQUE KEY `carts_guest_token_unique` (`guest_token`),
  CONSTRAINT `carts_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carts`
--

LOCK TABLES `carts` WRITE;
/*!40000 ALTER TABLE `carts` DISABLE KEYS */;
INSERT INTO `carts` VALUES (1,NULL,'11111111-1111-4111-8111-111111111111','2026-09-17 03:59:50','2026-09-17 03:59:50'),(2,NULL,'local-stock-check-20260917','2026-09-17 09:13:18','2026-09-17 09:13:18'),(3,NULL,'050b68df-fdc1-4b9d-ab49-cf9464d4dd88','2026-09-17 09:15:07','2026-09-17 09:15:07'),(4,8,NULL,'2026-09-17 09:19:02','2026-09-17 09:19:02'),(5,9,NULL,'2026-09-17 09:33:47','2026-09-17 09:33:47'),(6,NULL,'a1877bc7-e1f9-4365-9c48-c32e43b635f5','2026-09-17 10:12:10','2026-09-17 10:12:10'),(7,NULL,'e25ed949-ed9a-4998-ac68-0c041dd311db','2026-09-17 10:12:10','2026-09-17 10:12:10'),(8,NULL,'a3bb0552-c29b-45ef-a7e1-541997a854fc','2026-09-17 18:49:02','2026-09-17 18:49:02'),(9,NULL,'639fa8ef-6f47-4996-a652-9a38ef8b90bd','2026-09-17 18:49:02','2026-09-17 18:49:02'),(10,NULL,'a1287397-cc43-4c36-9466-eb8431366521','2026-09-18 00:34:16','2026-09-18 00:34:16'),(11,NULL,'c2077eb5-f876-4a9c-8203-5cecab47086e','2026-09-18 00:34:16','2026-09-18 00:34:16'),(12,NULL,'0d0d5c42-f756-49a1-b4e4-05eabbc28931','2026-09-18 01:01:51','2026-09-18 01:01:51'),(13,NULL,'b924e379-95d9-4e01-b4cd-3bda9c26242b','2026-09-18 01:01:51','2026-09-18 01:01:51'),(14,NULL,'0e610045-82c6-4bad-adf2-6668c91846d9','2026-09-18 01:05:26','2026-09-18 01:05:26'),(15,NULL,'1c163774-5ee0-4955-836d-446cf70bffc6','2026-09-18 01:05:26','2026-09-18 01:05:26'),(16,10,NULL,'2026-09-18 02:02:38','2026-09-18 02:02:38');
/*!40000 ALTER TABLE `carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `parent_id` bigint unsigned DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `image_path` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `sort_order` smallint unsigned NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `categories_slug_unique` (`slug`),
  KEY `categories_parent_id_is_active_sort_order_index` (`parent_id`,`is_active`,`sort_order`),
  CONSTRAINT `categories_parent_id_foreign` FOREIGN KEY (`parent_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (6,NULL,'Filsafat','filsafat','Buku pemikiran dan filsafat.',NULL,1,0,'2026-09-17 03:00:48','2026-09-17 03:00:48',NULL),(7,NULL,'Fiksi & Sastra','fiksi-sastra',NULL,NULL,1,0,'2026-09-17 09:13:03','2026-09-17 09:13:03',NULL),(8,NULL,'Pengembangan Diri','pengembangan-diri',NULL,NULL,1,0,'2026-09-17 09:13:03','2026-09-17 09:13:03',NULL),(9,NULL,'Bisnis & Finansial','bisnis-finansial',NULL,NULL,1,0,'2026-09-17 09:13:03','2026-09-17 09:13:03',NULL),(10,NULL,'Sains & Sejarah','sains-sejarah',NULL,NULL,1,0,'2026-09-17 09:13:03','2026-09-17 09:13:03',NULL),(11,NULL,'Anak & Remaja','anak-remaja',NULL,NULL,1,0,'2026-09-17 09:13:03','2026-09-17 09:13:03',NULL);
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `coupon_usages`
--

DROP TABLE IF EXISTS `coupon_usages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `coupon_usages` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `coupon_id` bigint unsigned NOT NULL,
  `user_id` bigint unsigned DEFAULT NULL,
  `order_id` bigint unsigned DEFAULT NULL,
  `discount_amount` decimal(15,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `coupon_usages_user_id_foreign` (`user_id`),
  KEY `coupon_usages_order_id_foreign` (`order_id`),
  KEY `coupon_usages_coupon_id_user_id_index` (`coupon_id`,`user_id`),
  CONSTRAINT `coupon_usages_coupon_id_foreign` FOREIGN KEY (`coupon_id`) REFERENCES `coupons` (`id`) ON DELETE CASCADE,
  CONSTRAINT `coupon_usages_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE SET NULL,
  CONSTRAINT `coupon_usages_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coupon_usages`
--

LOCK TABLES `coupon_usages` WRITE;
/*!40000 ALTER TABLE `coupon_usages` DISABLE KEYS */;
/*!40000 ALTER TABLE `coupon_usages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `coupons`
--

DROP TABLE IF EXISTS `coupons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `coupons` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `discount_type` enum('percentage','fixed') COLLATE utf8mb4_unicode_ci NOT NULL,
  `discount_value` decimal(15,2) NOT NULL,
  `minimum_purchase` decimal(15,2) NOT NULL DEFAULT '0.00',
  `maximum_discount` decimal(15,2) DEFAULT NULL,
  `usage_limit` int unsigned DEFAULT NULL,
  `per_user_limit` int unsigned DEFAULT NULL,
  `usage_count` int unsigned NOT NULL DEFAULT '0',
  `starts_at` timestamp NULL DEFAULT NULL,
  `ends_at` timestamp NULL DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `coupons_code_unique` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coupons`
--

LOCK TABLES `coupons` WRITE;
/*!40000 ALTER TABLE `coupons` DISABLE KEYS */;
/*!40000 ALTER TABLE `coupons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `failed_jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `financial_transactions`
--

DROP TABLE IF EXISTS `financial_transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `financial_transactions` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `order_id` bigint unsigned DEFAULT NULL,
  `type` enum('income','expense','refund') COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `amount` decimal(15,2) NOT NULL,
  `reference` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `occurred_at` timestamp NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `financial_transactions_reference_unique` (`reference`),
  KEY `financial_transactions_order_id_foreign` (`order_id`),
  KEY `financial_transactions_category_index` (`category`),
  KEY `financial_transactions_occurred_at_index` (`occurred_at`),
  CONSTRAINT `financial_transactions_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `financial_transactions`
--

LOCK TABLES `financial_transactions` WRITE;
/*!40000 ALTER TABLE `financial_transactions` DISABLE KEYS */;
/*!40000 ALTER TABLE `financial_transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_batches`
--

DROP TABLE IF EXISTS `job_batches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_batches` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_batches`
--

LOCK TABLES `job_batches` WRITE;
/*!40000 ALTER TABLE `job_batches` DISABLE KEYS */;
/*!40000 ALTER TABLE `job_batches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint unsigned NOT NULL,
  `reserved_at` int unsigned DEFAULT NULL,
  `available_at` int unsigned NOT NULL,
  `created_at` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'0001_01_01_000000_create_users_table',1),(2,'0001_01_01_000001_create_cache_table',1),(3,'0001_01_01_000002_create_jobs_table',1),(4,'2026_09_17_000001_create_roles_and_permissions_tables',1),(5,'2026_09_17_000002_create_addresses_table',1),(6,'2026_09_17_000003_create_catalog_tables',1),(7,'2026_09_17_000004_add_status_to_users_table',1),(8,'2026_09_17_024448_create_personal_access_tokens_table',1),(9,'2026_09_17_000005_create_carts_tables',2),(10,'2026_09_17_000006_create_orders_tables',3),(11,'2026_09_17_000007_create_stock_movements_table',4),(12,'2026_09_17_000008_create_payments_table',5),(13,'2026_09_17_000009_create_whatsapp_clicks_table',6),(14,'2026_09_17_000010_create_wishlists_table',7),(15,'2026_09_17_000011_create_promotions_tables',8),(16,'2026_09_17_000012_create_coupons_tables',9),(17,'2026_09_17_000013_create_shipments_table',10),(18,'2026_09_17_000014_create_analytics_tables',11),(19,'2026_09_17_000015_create_financial_transactions_table',12),(20,'2026_09_17_000016_add_cost_price_snapshot_to_order_items',13),(21,'2026_09_17_000017_create_reviews_table',14),(22,'2026_09_17_000018_create_cms_tables',15),(23,'2026_09_17_000019_create_settings_table',16),(24,'2026_09_17_000020_create_activity_logs_table',17),(25,'2026_09_17_000021_add_performance_indexes',18),(26,'2026_09_17_000020_add_biteship_fields_to_addresses_table',19);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_items` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `order_id` bigint unsigned NOT NULL,
  `book_id` bigint unsigned DEFAULT NULL,
  `sku` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `author` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `unit_price` decimal(15,2) NOT NULL,
  `cost_price_snapshot` decimal(15,2) NOT NULL DEFAULT '0.00',
  `quantity` int unsigned NOT NULL,
  `subtotal` decimal(15,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `order_items_order_id_foreign` (`order_id`),
  KEY `order_items_book_id_foreign` (`book_id`),
  CONSTRAINT `order_items_book_id_foreign` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`) ON DELETE SET NULL,
  CONSTRAINT `order_items_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_status_histories`
--

DROP TABLE IF EXISTS `order_status_histories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_status_histories` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `order_id` bigint unsigned NOT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `note` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `order_status_histories_order_id_foreign` (`order_id`),
  CONSTRAINT `order_status_histories_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_status_histories`
--

LOCK TABLES `order_status_histories` WRITE;
/*!40000 ALTER TABLE `order_status_histories` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_status_histories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `number` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint unsigned DEFAULT NULL,
  `guest_token` char(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `recipient_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address_line_1` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `city` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `province` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `postal_code` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `subtotal` decimal(15,2) NOT NULL,
  `discount_total` decimal(15,2) NOT NULL DEFAULT '0.00',
  `shipping_total` decimal(15,2) NOT NULL DEFAULT '0.00',
  `grand_total` decimal(15,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `orders_number_unique` (`number`),
  KEY `orders_guest_token_index` (`guest_token`),
  KEY `orders_status_index` (`status`),
  KEY `orders_user_id_created_at_index` (`user_id`,`created_at`),
  KEY `orders_status_created_at_index` (`status`,`created_at`),
  CONSTRAINT `orders_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `page_views`
--

DROP TABLE IF EXISTS `page_views`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `page_views` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `visitor_session_id` bigint unsigned NOT NULL,
  `path` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `event_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'page_view',
  `metadata` json DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `page_views_visitor_session_id_foreign` (`visitor_session_id`),
  KEY `page_views_event_type_created_at_index` (`event_type`,`created_at`),
  CONSTRAINT `page_views_visitor_session_id_foreign` FOREIGN KEY (`visitor_session_id`) REFERENCES `visitor_sessions` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `page_views`
--

LOCK TABLES `page_views` WRITE;
/*!40000 ALTER TABLE `page_views` DISABLE KEYS */;
/*!40000 ALTER TABLE `page_views` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pages`
--

DROP TABLE IF EXISTS `pages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pages` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_published` tinyint(1) NOT NULL DEFAULT '0',
  `published_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `pages_slug_unique` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pages`
--

LOCK TABLES `pages` WRITE;
/*!40000 ALTER TABLE `pages` DISABLE KEYS */;
/*!40000 ALTER TABLE `pages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_reset_tokens`
--

LOCK TABLES `password_reset_tokens` WRITE;
/*!40000 ALTER TABLE `password_reset_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_reset_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payments` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `order_id` bigint unsigned NOT NULL,
  `provider` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `reference` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `amount` decimal(15,2) NOT NULL,
  `payload` json DEFAULT NULL,
  `paid_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `payments_reference_unique` (`reference`),
  KEY `payments_order_id_foreign` (`order_id`),
  KEY `payments_status_index` (`status`),
  CONSTRAINT `payments_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permission_role`
--

DROP TABLE IF EXISTS `permission_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permission_role` (
  `permission_id` bigint unsigned NOT NULL,
  `role_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`permission_id`,`role_id`),
  KEY `permission_role_role_id_permission_id_index` (`role_id`,`permission_id`),
  CONSTRAINT `permission_role_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  CONSTRAINT `permission_role_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permission_role`
--

LOCK TABLES `permission_role` WRITE;
/*!40000 ALTER TABLE `permission_role` DISABLE KEYS */;
INSERT INTO `permission_role` VALUES (1,11,'2026-09-17 03:05:09','2026-09-17 03:05:09'),(1,12,'2026-09-17 03:05:09','2026-09-17 03:05:09'),(1,14,'2026-09-17 03:05:09','2026-09-17 03:05:09'),(2,11,'2026-09-17 03:05:09','2026-09-17 03:05:09'),(2,12,'2026-09-17 03:05:09','2026-09-17 03:05:09'),(3,11,'2026-09-17 03:05:09','2026-09-17 03:05:09'),(3,12,'2026-09-17 03:05:09','2026-09-17 03:05:09'),(3,14,'2026-09-17 03:05:09','2026-09-17 03:05:09'),(4,11,'2026-09-17 03:05:09','2026-09-17 03:05:09'),(4,12,'2026-09-17 03:05:09','2026-09-17 03:05:09'),(5,11,'2026-09-17 03:05:09','2026-09-17 03:05:09'),(5,12,'2026-09-17 03:05:09','2026-09-17 03:05:09'),(6,11,'2026-09-17 03:05:09','2026-09-17 03:05:09'),(6,12,'2026-09-17 03:05:09','2026-09-17 03:05:09'),(6,13,'2026-09-17 03:05:09','2026-09-17 03:05:09'),(6,14,'2026-09-17 03:05:09','2026-09-17 03:05:09'),(6,15,'2026-09-17 03:05:09','2026-09-17 03:05:09'),(6,16,'2026-09-17 03:05:09','2026-09-17 03:05:09'),(7,11,'2026-09-17 03:05:09','2026-09-17 03:05:09'),(7,12,'2026-09-17 03:05:09','2026-09-17 03:05:09'),(7,13,'2026-09-17 03:05:09','2026-09-17 03:05:09'),(7,16,'2026-09-17 03:05:09','2026-09-17 03:05:09'),(8,11,'2026-09-17 03:05:09','2026-09-17 03:05:09'),(8,12,'2026-09-17 03:05:09','2026-09-17 03:05:09'),(8,13,'2026-09-17 03:05:09','2026-09-17 03:05:09'),(8,16,'2026-09-17 03:05:09','2026-09-17 03:05:09'),(9,11,'2026-09-17 03:05:09','2026-09-17 03:05:09'),(9,12,'2026-09-17 03:05:09','2026-09-17 03:05:09'),(9,16,'2026-09-17 03:05:09','2026-09-17 03:05:09'),(10,11,'2026-09-17 03:05:09','2026-09-17 03:05:09'),(10,15,'2026-09-17 03:05:09','2026-09-17 03:05:09'),(11,11,'2026-09-17 03:05:09','2026-09-17 03:05:09'),(11,12,'2026-09-17 03:05:09','2026-09-17 03:05:09'),(12,11,'2026-09-17 03:05:09','2026-09-17 03:05:09'),(12,12,'2026-09-17 03:05:09','2026-09-17 03:05:09');
/*!40000 ALTER TABLE `permission_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permissions` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `display_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `group` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `permissions_name_unique` (`name`),
  KEY `permissions_group_index` (`group`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permissions`
--

LOCK TABLES `permissions` WRITE;
/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;
INSERT INTO `permissions` VALUES (1,'catalog.view','Lihat katalog','catalog',NULL,'2026-09-17 03:05:09','2026-09-17 03:05:09'),(2,'catalog.create','Buat buku','catalog',NULL,'2026-09-17 03:05:09','2026-09-17 03:05:09'),(3,'catalog.update','Ubah buku','catalog',NULL,'2026-09-17 03:05:09','2026-09-17 03:05:09'),(4,'catalog.delete','Hapus buku','catalog',NULL,'2026-09-17 03:05:09','2026-09-17 03:05:09'),(5,'catalog.restore','Pulihkan buku','catalog',NULL,'2026-09-17 03:05:09','2026-09-17 03:05:09'),(6,'order.view','Lihat pesanan','order',NULL,'2026-09-17 03:05:09','2026-09-17 03:05:09'),(7,'order.update','Ubah pesanan','order',NULL,'2026-09-17 03:05:09','2026-09-17 03:05:09'),(8,'customer.view','Lihat pelanggan','customer',NULL,'2026-09-17 03:05:09','2026-09-17 03:05:09'),(9,'customer.update','Ubah pelanggan','customer',NULL,'2026-09-17 03:05:09','2026-09-17 03:05:09'),(10,'finance.view','Lihat keuangan','finance',NULL,'2026-09-17 03:05:09','2026-09-17 03:05:09'),(11,'settings.view','Lihat pengaturan','settings',NULL,'2026-09-17 03:05:09','2026-09-17 03:05:09'),(12,'settings.update','Ubah pengaturan','settings',NULL,'2026-09-17 03:05:09','2026-09-17 03:05:09');
/*!40000 ALTER TABLE `permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personal_access_tokens` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint unsigned NOT NULL,
  `name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`),
  KEY `personal_access_tokens_expires_at_index` (`expires_at`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_access_tokens`
--

LOCK TABLES `personal_access_tokens` WRITE;
/*!40000 ALTER TABLE `personal_access_tokens` DISABLE KEYS */;
INSERT INTO `personal_access_tokens` VALUES (7,'App\\Models\\User',8,'api','e763723f0c7815f8e810817c702b5dde2da287eeec9c934aa50dd0895d58dd6f','[\"*\"]',NULL,NULL,'2026-09-17 08:35:33','2026-09-17 08:35:33'),(8,'App\\Models\\User',8,'api','c984f769e60fad803a70ed13037d8b00ae3157acc395e81bea4210ca16ad1a11','[\"*\"]',NULL,NULL,'2026-09-17 08:35:37','2026-09-17 08:35:37'),(9,'App\\Models\\User',8,'api','d24d0e3c401e7d419442eb286c1f2c3d6c5828399946d2af4c3a92db07b28cff','[\"*\"]',NULL,NULL,'2026-09-17 08:35:38','2026-09-17 08:35:38'),(10,'App\\Models\\User',8,'api','82212f81c3faf39c8dda4522a9e9eb827aaa5057d3e9693434b95619f25388a2','[\"*\"]',NULL,NULL,'2026-09-17 08:36:01','2026-09-17 08:36:01'),(11,'App\\Models\\User',8,'api','a66939e6be91561773549e8b2fc19c88de3ba926ba5a082c09ac8d1d0680aca2','[\"*\"]',NULL,NULL,'2026-09-17 08:37:34','2026-09-17 08:37:34'),(12,'App\\Models\\User',8,'api','804d4633cbbe118c408e86e008d8647927e1beee5128c6b986335c5f007c3df9','[\"*\"]',NULL,NULL,'2026-09-17 08:37:36','2026-09-17 08:37:36'),(13,'App\\Models\\User',8,'api','b792702dbcaa635aeb93c246f2929a652757cd94766674b759cb0f7baa4383e2','[\"*\"]',NULL,NULL,'2026-09-17 08:37:38','2026-09-17 08:37:38'),(14,'App\\Models\\User',9,'api','febdb445b56eafb372e3764b2bda2a4aa6ff21fe08d9a8ad5d2d907b29ddd66d','[\"*\"]',NULL,NULL,'2026-09-17 08:37:47','2026-09-17 08:37:47'),(15,'App\\Models\\User',9,'api','a176f5f3d0bba18fbda75429a40f27ad96002b62b53955d7988f882c06938980','[\"*\"]',NULL,NULL,'2026-09-17 08:37:48','2026-09-17 08:37:48'),(16,'App\\Models\\User',9,'api','af047efa989e11759711e5c7a2cb64f13a80e61fd9880ef36e40e90e3d9963ef','[\"*\"]',NULL,NULL,'2026-09-17 08:37:57','2026-09-17 08:37:57'),(17,'App\\Models\\User',8,'api','c7190e61e2c691239640282de5ed41a1f99939ce2fc62b6526666195d06369d0','[\"*\"]','2026-09-17 08:39:12',NULL,'2026-09-17 08:39:12','2026-09-17 08:39:12'),(18,'App\\Models\\User',9,'api','000a0e1e60aeec539d5b455312a390e92520586c8605263887ffe39ef1ee5043','[\"*\"]','2026-09-17 08:41:04',NULL,'2026-09-17 08:39:32','2026-09-17 08:41:04'),(19,'App\\Models\\User',8,'dashboard-check','51465f86c86175da10e6d395162a8a48936d0d2815acbf1dcf01d3e4252ea8fe','[\"*\"]','2026-09-17 08:40:33',NULL,'2026-09-17 08:40:33','2026-09-17 08:40:33'),(20,'App\\Models\\User',8,'api','ac33bba38fadc112cf88ca469d04b0a4d9173b973cd07d3fd952e32a78eebe7b','[\"*\"]','2026-09-17 08:47:13',NULL,'2026-09-17 08:47:13','2026-09-17 08:47:13'),(21,'App\\Models\\User',9,'api','cb033241edca2009cf3047fff265eba49db47a7949ca117de96a511d798e3127','[\"*\"]','2026-09-17 08:48:05',NULL,'2026-09-17 08:48:04','2026-09-17 08:48:05'),(22,'App\\Models\\User',9,'api','548fac3e1fa1b6a786480c75ba9f5b4711244aa7ce385476ea97aa73ca6635ed','[\"*\"]','2026-09-17 08:51:40',NULL,'2026-09-17 08:51:39','2026-09-17 08:51:40'),(23,'App\\Models\\User',8,'api','e1493b3f63886fdab3e7620198b2d0bda073ac75ecef03078001eab8c4df3e77','[\"*\"]','2026-09-17 08:56:13',NULL,'2026-09-17 08:53:04','2026-09-17 08:56:13'),(24,'App\\Models\\User',8,'api','42699f3e5c2b2533e042298e50959b89e84beb9981dcfe43f10d9272f17197b7','[\"*\"]','2026-09-17 08:59:17',NULL,'2026-09-17 08:57:18','2026-09-17 08:59:17'),(25,'App\\Models\\User',9,'api','e1b46a418313e82856a7aafe3eaf67e0688059b901d4208b0c5591cd7dba4130','[\"*\"]',NULL,NULL,'2026-09-17 09:09:13','2026-09-17 09:09:13'),(26,'App\\Models\\User',9,'api','46fabd772a0dd5b3db32185aac7b90cc6ab6245d0bd4f24fea2f7acc31afb366','[\"*\"]','2026-09-17 09:09:16',NULL,'2026-09-17 09:09:15','2026-09-17 09:09:16'),(27,'App\\Models\\User',9,'api','a5e4b75a0649ec909641ce709372c634249c12e8ae96d477bbe01fc0e6686ca4','[\"*\"]','2026-09-17 09:09:30',NULL,'2026-09-17 09:09:30','2026-09-17 09:09:30'),(28,'App\\Models\\User',8,'api','dfeb40046f0bc31e30a4301f2672dc31ca1dc7144feb935db508ff793a12bc5e','[\"*\"]','2026-09-17 09:09:57',NULL,'2026-09-17 09:09:44','2026-09-17 09:09:57'),(29,'App\\Models\\User',8,'api','ee0b062a86f6680e6c82a09b23fa53d3825385a4087f0c22b6eba606cd10acba','[\"*\"]','2026-09-17 09:31:00',NULL,'2026-09-17 09:18:50','2026-09-17 09:31:00'),(30,'App\\Models\\User',8,'api','1960c4059cdcbf96f1c855cc884ad18a47b05528fea5809067c2fbe63f85cfba','[\"*\"]','2026-09-17 09:33:22',NULL,'2026-09-17 09:31:50','2026-09-17 09:33:22'),(31,'App\\Models\\User',9,'api','cb97b1e0db1c108b18076a35b6a80ceb5713d825a5208bf773a57228f66cb24f','[\"*\"]','2026-09-17 09:33:56',NULL,'2026-09-17 09:33:36','2026-09-17 09:33:56'),(32,'App\\Models\\User',8,'api','c21c6f5b4b1d157a6ffc24499a226ba6308198578bb16ca6496e5ff6f8cc9b27','[\"*\"]','2026-09-17 10:23:13',NULL,'2026-09-17 09:34:21','2026-09-17 10:23:13'),(33,'App\\Models\\User',8,'api','31624b3dfba8c123fbe3d02acd702f103d3a6b48a0a9d5b51285ef8006643a8d','[\"*\"]','2026-09-17 11:25:22',NULL,'2026-09-17 11:13:29','2026-09-17 11:25:22'),(34,'App\\Models\\User',9,'api','4d98e71d5340668461d58727e84ec72cfbea2e5dbf3a8edf8f35e16ec1cb2852','[\"*\"]','2026-09-17 16:13:23',NULL,'2026-09-17 16:13:23','2026-09-17 16:13:23'),(35,'App\\Models\\User',8,'api','14fc3a6ee50d848bcd6f156609685015a81696abeb5eed3238d76704eed34ab6','[\"*\"]','2026-09-17 16:19:25',NULL,'2026-09-17 16:13:37','2026-09-17 16:19:25'),(36,'App\\Models\\User',8,'api','fd5e025ab48b150972e0d04dfd89c88e4e0a99e762c21c010ea2ec57af876f12','[\"*\"]','2026-09-17 17:01:39',NULL,'2026-09-17 16:23:38','2026-09-17 17:01:39'),(37,'App\\Models\\User',8,'api','56a45d7fd6b01095ad9929a28cc2b17672b927232d03906f1b5eefb68647d4c5','[\"*\"]','2026-09-17 16:36:59',NULL,'2026-09-17 16:36:59','2026-09-17 16:36:59'),(38,'App\\Models\\User',8,'api','5c725f98acfc40cd746e2d22d444296421a07d1723246de3a2f5bef5d9eeb4d4','[\"*\"]','2026-09-17 16:54:37',NULL,'2026-09-17 16:54:37','2026-09-17 16:54:37'),(39,'App\\Models\\User',8,'api','fbacf86b40984d4cebb77172564e0d8f9e9ed017d3e58aeee04a074d38005414','[\"*\"]','2026-09-17 17:07:09',NULL,'2026-09-17 17:07:09','2026-09-17 17:07:09'),(40,'App\\Models\\User',8,'api','d6938282589e247585ce6b565b0541e89ee271a10ee5aa72e5daec6f32b9b2bc','[\"*\"]','2026-09-17 17:35:38',NULL,'2026-09-17 17:07:49','2026-09-17 17:35:38'),(41,'App\\Models\\User',9,'api','32b21ce52c76c9622b11eb41957070097cc3ff172f0523d787257f1648f55e98','[\"*\"]','2026-09-18 01:23:13',NULL,'2026-09-18 00:36:20','2026-09-18 01:23:13'),(42,'App\\Models\\User',8,'api','dfadc2c889aee906e7d08e7a70eb83b68c02cf1366505144aa5bddb4229016b0','[\"*\"]','2026-09-18 10:18:29',NULL,'2026-09-18 01:05:43','2026-09-18 10:18:29'),(43,'App\\Models\\User',9,'api','20a5137e121a9408ffe727d4eac076c4b08c9f06f7c48f420f28ba4f8d266556','[\"*\"]',NULL,NULL,'2026-09-18 01:24:17','2026-09-18 01:24:17'),(44,'App\\Models\\User',9,'api','302863eb54be2665335acce0415b9f2da9d52c9ede05ce1f432174c2aa269890','[\"*\"]','2026-09-18 01:53:32',NULL,'2026-09-18 01:24:18','2026-09-18 01:53:32'),(45,'App\\Models\\User',9,'api','dd44383acee0ba9b14281448cccf53890ba4557442e6a84560958e9fe8718179','[\"*\"]',NULL,NULL,'2026-09-18 01:57:28','2026-09-18 01:57:28'),(46,'App\\Models\\User',8,'api','97310ee4b413530bb26d73acc509c99f800a0f1762da73fadf634a532da8a2eb','[\"*\"]','2026-09-18 01:59:31',NULL,'2026-09-18 01:57:59','2026-09-18 01:59:31'),(47,'App\\Models\\User',10,'api','6406e7609c1a85debf3df97de4424d4915fc71567753690ce79657525943ce6a','[\"*\"]','2026-09-18 02:22:33',NULL,'2026-09-18 02:02:13','2026-09-18 02:22:33'),(48,'App\\Models\\User',9,'api','399e53d0fe22b21b9ee2ea47e89e27cad1ebe08ac164191ffa408b09034d77b1','[\"*\"]','2026-09-18 09:19:34',NULL,'2026-09-18 02:14:40','2026-09-18 09:19:34'),(49,'App\\Models\\User',9,'api','c81a7bd0e8595abe2fda159dbdf4600379c2a94f02e15e650306ee4fbbc46be4','[\"*\"]','2026-09-18 03:39:41',NULL,'2026-09-18 03:36:50','2026-09-18 03:39:41'),(50,'App\\Models\\User',8,'api','7269f4e22f48d2476cfd1f9d6d2385f81332a6108b51f4cdb07fda1294c2fa60','[\"*\"]','2026-09-18 03:49:46',NULL,'2026-09-18 03:43:29','2026-09-18 03:49:46'),(51,'App\\Models\\User',9,'api','de143f64e25bf81ca5c26a9054644c84a10d0a41bc280458c959038f16ef4792','[\"*\"]','2026-09-18 04:28:07',NULL,'2026-09-18 03:50:06','2026-09-18 04:28:07'),(52,'App\\Models\\User',9,'api','2f3c9b65f24fd106ee26de63d0a9818a21978ca72fef4847e5632422ab6383ce','[\"*\"]','2026-09-18 05:16:32',NULL,'2026-09-18 04:29:11','2026-09-18 05:16:32'),(53,'App\\Models\\User',9,'api','b41031fc16661d93e7ba88088d679cf7ec75f0253dc2db76e4592bd1828c05cd','[\"*\"]','2026-09-18 06:29:04',NULL,'2026-09-18 05:20:35','2026-09-18 06:29:04'),(54,'App\\Models\\User',9,'api','89d71849f696c89edea7cefc1c2da3ac444434a66f08a87a3360655fc5a00418','[\"*\"]','2026-09-18 06:51:55',NULL,'2026-09-18 06:48:42','2026-09-18 06:51:55'),(55,'App\\Models\\User',9,'api','5b179feea368a6112be940aa7e3cc6b5e36fa2dd4d1cb837ffec9cf28f7b7432','[\"*\"]','2026-09-18 07:59:31',NULL,'2026-09-18 07:55:47','2026-09-18 07:59:31'),(56,'App\\Models\\User',9,'api','5a55ef78b94cfa2c4378419658776d69a81658a6bfa43bcf841b6d50e88f929c','[\"*\"]','2026-09-18 08:02:20',NULL,'2026-09-18 07:59:48','2026-09-18 08:02:20');
/*!40000 ALTER TABLE `personal_access_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `promotion_books`
--

DROP TABLE IF EXISTS `promotion_books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `promotion_books` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `promotion_id` bigint unsigned NOT NULL,
  `book_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `promotion_books_promotion_id_book_id_unique` (`promotion_id`,`book_id`),
  KEY `promotion_books_book_id_foreign` (`book_id`),
  CONSTRAINT `promotion_books_book_id_foreign` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`) ON DELETE CASCADE,
  CONSTRAINT `promotion_books_promotion_id_foreign` FOREIGN KEY (`promotion_id`) REFERENCES `promotions` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `promotion_books`
--

LOCK TABLES `promotion_books` WRITE;
/*!40000 ALTER TABLE `promotion_books` DISABLE KEYS */;
/*!40000 ALTER TABLE `promotion_books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `promotion_categories`
--

DROP TABLE IF EXISTS `promotion_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `promotion_categories` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `promotion_id` bigint unsigned NOT NULL,
  `category_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `promotion_categories_promotion_id_category_id_unique` (`promotion_id`,`category_id`),
  KEY `promotion_categories_category_id_foreign` (`category_id`),
  CONSTRAINT `promotion_categories_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE,
  CONSTRAINT `promotion_categories_promotion_id_foreign` FOREIGN KEY (`promotion_id`) REFERENCES `promotions` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `promotion_categories`
--

LOCK TABLES `promotion_categories` WRITE;
/*!40000 ALTER TABLE `promotion_categories` DISABLE KEYS */;
/*!40000 ALTER TABLE `promotion_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `promotions`
--

DROP TABLE IF EXISTS `promotions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `promotions` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `discount_type` enum('percentage','fixed') COLLATE utf8mb4_unicode_ci NOT NULL,
  `discount_value` decimal(15,2) NOT NULL,
  `minimum_purchase` decimal(15,2) NOT NULL DEFAULT '0.00',
  `maximum_discount` decimal(15,2) DEFAULT NULL,
  `usage_limit` int unsigned DEFAULT NULL,
  `usage_count` int unsigned NOT NULL DEFAULT '0',
  `starts_at` timestamp NULL DEFAULT NULL,
  `ends_at` timestamp NULL DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `promotions_code_unique` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `promotions`
--

LOCK TABLES `promotions` WRITE;
/*!40000 ALTER TABLE `promotions` DISABLE KEYS */;
/*!40000 ALTER TABLE `promotions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `book_id` bigint unsigned NOT NULL,
  `rating` tinyint unsigned NOT NULL,
  `review` text COLLATE utf8mb4_unicode_ci,
  `status` enum('pending','approved','rejected') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `reviews_user_id_book_id_unique` (`user_id`,`book_id`),
  KEY `reviews_book_id_foreign` (`book_id`),
  CONSTRAINT `reviews_book_id_foreign` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`) ON DELETE CASCADE,
  CONSTRAINT `reviews_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role_user`
--

DROP TABLE IF EXISTS `role_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role_user` (
  `role_id` bigint unsigned NOT NULL,
  `user_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`role_id`,`user_id`),
  KEY `role_user_user_id_role_id_index` (`user_id`,`role_id`),
  CONSTRAINT `role_user_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE,
  CONSTRAINT `role_user_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_user`
--

LOCK TABLES `role_user` WRITE;
/*!40000 ALTER TABLE `role_user` DISABLE KEYS */;
INSERT INTO `role_user` VALUES (12,9,'2026-09-17 03:09:25','2026-09-17 03:09:25'),(17,8,'2026-09-17 03:00:48','2026-09-17 03:00:48');
/*!40000 ALTER TABLE `role_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `display_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `roles_name_unique` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (11,'super-admin','Super Admin',NULL,'2026-09-17 03:00:48','2026-09-17 03:00:48'),(12,'admin','Admin',NULL,'2026-09-17 03:00:48','2026-09-17 03:00:48'),(13,'cashier','Kasir',NULL,'2026-09-17 03:00:48','2026-09-17 03:00:48'),(14,'warehouse','Warehouse',NULL,'2026-09-17 03:00:48','2026-09-17 03:00:48'),(15,'finance','Finance',NULL,'2026-09-17 03:00:48','2026-09-17 03:00:48'),(16,'customer-service','Customer Service',NULL,'2026-09-17 03:00:48','2026-09-17 03:00:48'),(17,'customer','Customer',NULL,'2026-09-17 03:00:48','2026-09-17 03:00:48');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint unsigned DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `settings`
--

DROP TABLE IF EXISTS `settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `settings` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` text COLLATE utf8mb4_unicode_ci,
  `is_secret` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `settings_key_unique` (`key`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `settings`
--

LOCK TABLES `settings` WRITE;
/*!40000 ALTER TABLE `settings` DISABLE KEYS */;
INSERT INTO `settings` VALUES (1,'app_name','BukuPagi',0,'2026-09-18 01:36:46','2026-09-18 01:36:46'),(2,'about_us',NULL,0,'2026-09-18 01:36:46','2026-09-18 01:36:46'),(3,'shopping_guide','test belanja',0,'2026-09-18 01:36:46','2026-09-18 01:37:19'),(4,'shipping_info','tes pengiriman',0,'2026-09-18 01:36:46','2026-09-18 01:37:13'),(5,'contact_us',NULL,0,'2026-09-18 01:36:46','2026-09-18 01:37:13'),(6,'store_address','jl tes. no tes\r\nkec. tes desa tes',0,'2026-09-18 01:51:09','2026-09-18 01:51:09'),(7,'shopee_url',NULL,0,'2026-09-18 01:51:10','2026-09-18 01:51:10'),(8,'tokopedia_url',NULL,0,'2026-09-18 01:51:10','2026-09-18 01:51:10'),(9,'youtube_url',NULL,0,'2026-09-18 01:51:10','2026-09-18 01:51:10'),(10,'whatsapp_url',NULL,0,'2026-09-18 01:51:10','2026-09-18 01:51:10'),(11,'facebook_url',NULL,0,'2026-09-18 01:51:10','2026-09-18 01:51:10'),(12,'instagram_url',NULL,0,'2026-09-18 01:51:10','2026-09-18 01:51:10');
/*!40000 ALTER TABLE `settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shipments`
--

DROP TABLE IF EXISTS `shipments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shipments` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `order_id` bigint unsigned NOT NULL,
  `provider` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `courier` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `service` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cost` decimal(15,2) NOT NULL DEFAULT '0.00',
  `tracking_number` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('pending','packed','shipped','delivered') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `snapshot` json DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `shipments_order_id_unique` (`order_id`),
  UNIQUE KEY `shipments_tracking_number_unique` (`tracking_number`),
  CONSTRAINT `shipments_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shipments`
--

LOCK TABLES `shipments` WRITE;
/*!40000 ALTER TABLE `shipments` DISABLE KEYS */;
/*!40000 ALTER TABLE `shipments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stock_movements`
--

DROP TABLE IF EXISTS `stock_movements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stock_movements` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `book_id` bigint unsigned NOT NULL,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `quantity` int NOT NULL,
  `stock_before` int unsigned NOT NULL,
  `stock_after` int unsigned NOT NULL,
  `reference_type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `reference_id` bigint unsigned DEFAULT NULL,
  `note` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `stock_movements_book_id_foreign` (`book_id`),
  KEY `stock_movements_reference_type_reference_id_index` (`reference_type`,`reference_id`),
  KEY `stock_movements_type_index` (`type`),
  CONSTRAINT `stock_movements_book_id_foreign` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stock_movements`
--

LOCK TABLES `stock_movements` WRITE;
/*!40000 ALTER TABLE `stock_movements` DISABLE KEYS */;
/*!40000 ALTER TABLE `stock_movements` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(32) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'active',
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`),
  UNIQUE KEY `users_phone_unique` (`phone`),
  KEY `users_status_index` (`status`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (8,'Pelanggan Demo','pelanggan@example.test','081234567890',NULL,'$2y$12$Z868tZd29BlTtaw4qZCQf.7UWZ0gr7QJNyv1uncYbhvk3LjMB4ZVm','active',NULL,'2026-09-17 03:00:48','2026-09-17 03:00:48'),(9,'Admin Demo','admin@example.test','081234567899',NULL,'$2y$12$oUXIe9IxOxFdXRtkYYTZ2.KO2YMaqOSxO0GZV8dr45BhfA5nXVTdu','active',NULL,'2026-09-17 03:09:25','2026-09-17 03:09:25'),(10,'yayat supriady','delkano.sains@gmail.com',NULL,NULL,'$2y$12$gyhqfv46lj3HhIsM51IWa.j3Lhd1NjewpH4eARW2QkWLlzmmto6tC','active',NULL,'2026-09-18 02:02:12','2026-09-18 02:02:12');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `visitor_sessions`
--

DROP TABLE IF EXISTS `visitor_sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `visitor_sessions` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `token` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `referrer` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent_hash` varchar(64) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_seen_at` timestamp NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `visitor_sessions_token_unique` (`token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `visitor_sessions`
--

LOCK TABLES `visitor_sessions` WRITE;
/*!40000 ALTER TABLE `visitor_sessions` DISABLE KEYS */;
/*!40000 ALTER TABLE `visitor_sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `whatsapp_clicks`
--

DROP TABLE IF EXISTS `whatsapp_clicks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `whatsapp_clicks` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `order_id` bigint unsigned DEFAULT NULL,
  `book_id` bigint unsigned DEFAULT NULL,
  `guest_token` char(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `whatsapp_clicks_order_id_foreign` (`order_id`),
  KEY `whatsapp_clicks_book_id_foreign` (`book_id`),
  KEY `whatsapp_clicks_guest_token_index` (`guest_token`),
  CONSTRAINT `whatsapp_clicks_book_id_foreign` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`) ON DELETE SET NULL,
  CONSTRAINT `whatsapp_clicks_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `whatsapp_clicks`
--

LOCK TABLES `whatsapp_clicks` WRITE;
/*!40000 ALTER TABLE `whatsapp_clicks` DISABLE KEYS */;
/*!40000 ALTER TABLE `whatsapp_clicks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wishlists`
--

DROP TABLE IF EXISTS `wishlists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wishlists` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `book_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `wishlists_user_id_book_id_unique` (`user_id`,`book_id`),
  KEY `wishlists_book_id_foreign` (`book_id`),
  CONSTRAINT `wishlists_book_id_foreign` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`) ON DELETE CASCADE,
  CONSTRAINT `wishlists_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wishlists`
--

LOCK TABLES `wishlists` WRITE;
/*!40000 ALTER TABLE `wishlists` DISABLE KEYS */;
/*!40000 ALTER TABLE `wishlists` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'toko_buku'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-09-18 12:12:27
