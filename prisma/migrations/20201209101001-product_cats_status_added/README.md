# Migration `20201209101001-product_cats_status_added`

This migration has been generated by Sohail Haider at 12/9/2020, 10:10:01 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE `WordpressStore` MODIFY `status` ENUM('PENDING', 'ACTIVE', 'DEACTIVATED', 'DELETED') NOT NULL

CREATE TABLE `Product` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `price` DECIMAL(65,30) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `status` ENUM('PENDING', 'ACTIVE', 'DEACTIVATED', 'DELETED') NOT NULL,
    `wordpressStoreId` INT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci

CREATE TABLE `Category` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci

CREATE TABLE `_CategoryToProduct` (
    `A` INT NOT NULL,
    `B` INT NOT NULL,
UNIQUE INDEX `_CategoryToProduct_AB_unique`(`A`,
`B`),
INDEX `_CategoryToProduct_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci

ALTER TABLE `Product` ADD FOREIGN KEY (`wordpressStoreId`) REFERENCES `WordpressStore`(`id`) ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE `_CategoryToProduct` ADD FOREIGN KEY (`A`) REFERENCES `Category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE `_CategoryToProduct` ADD FOREIGN KEY (`B`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201209051210-initial..20201209101001-product_cats_status_added
--- datamodel.dml
+++ datamodel.dml
@@ -2,23 +2,48 @@
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource db {
   provider = "mysql"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
 }
 model WordpressStore {
-  id        Int      @default(autoincrement()) @id
-  createdAt DateTime @default(now())
-  updatedAt DateTime @updatedAt
-  storeUrl     String
-  consumerKey   String
-  consumerSecret    String
+  id        Int       @default(autoincrement()) @id
+  createdAt DateTime  @default(now())
+  updatedAt DateTime  @updatedAt
+  storeUrl        String
+  consumerKey     String
+  consumerSecret  String
   version   String
-  status    Int
+  status    Status
   userId    Int
-  date DateTime
+  date      DateTime
+  products  Product[]
+}
+
+model Product {
+  id    Int      @default(autoincrement()) @id
+  name  String
+  image String
+  price Float
+  description String
+  status  Status
+  categories Category[]
+  wordpressStore  WordpressStore
+}
+
+model Category {
+  id    Int     @id @default(autoincrement())
+  name  String
+  products Product[]
+}
+
+enum Status {
+  PENDING
+  ACTIVE
+  DEACTIVATED
+  DELETED
 }
```


