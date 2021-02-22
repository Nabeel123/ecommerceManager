# Migration `20201209051210-initial`

This migration has been generated by Sohail Haider at 12/9/2020, 5:12:10 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE `WordpressStore` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `storeUrl` VARCHAR(191) NOT NULL,
    `consumerKey` VARCHAR(191) NOT NULL,
    `consumerSecret` VARCHAR(191) NOT NULL,
    `version` VARCHAR(191) NOT NULL,
    `status` INT NOT NULL,
    `userId` INT NOT NULL,
    `date` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20201209051210-initial
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,24 @@
+// This is your Prisma schema file,
+// learn more about it in the docs: https://pris.ly/d/prisma-schema
+
+datasource db {
+  provider = "mysql"
+  url = "***"
+}
+
+generator client {
+  provider = "prisma-client-js"
+}
+
+model WordpressStore {
+  id        Int      @default(autoincrement()) @id
+  createdAt DateTime @default(now())
+  updatedAt DateTime @updatedAt
+  storeUrl     String
+  consumerKey   String
+  consumerSecret    String
+  version   String
+  status    Int
+  userId    Int
+  date DateTime
+}
```

