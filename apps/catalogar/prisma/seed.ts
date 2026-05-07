import fs from "node:fs";
import path from "node:path";
import { parse } from "csv-parse/sync";
import prisma from "@/lib/prisma";

type User = {
  id: string; // uuid
  created_at: string; // 2025-08-09 17:16:03.144 -0300 -> 2026-05-06T13:56:32.053Z
  email: string;
  name: string;
  phoneNumber?: string;
  updated_at: string; // 2025-08-09 17:16:03.144 -0300
  current_catalog_id?: string; // uuid
};

type Catalog = {
  id: string; // uuid
  created_at: string; // 2025-10-29 08:20:45.276 -0300 -> 2026-05-06T13:56:32.053Z
  name: string;
  published_at?: string; // 2025-10-29 08:20:45.276 -0300
  slug?: string;
  updated_at: string; // 2025-10-29 08:20:45.276 -0300
  user_id: string; // uuid
};

type ProductType = {
  id: string;
  created_at: string;
  disabled_at?: string;
  name: string;
  slug: string;
  updated_at: string;
  catalog_id: string;
};

type Category = {
  id: string;
  background_color: string;
  created_at: string;
  disabled_at?: string;
  name: string;
  slug: string;
  text_color: string;
  updated_at: string;
  catalog_id: string;
};

type CatalogItem = {
  id: string;
  caption?: string;
  created_at: string;
  disabled_at?: string;
  price?: string;
  reference: string;
  title: string;
  updated_at: string;
  catalog_id: string;
  product_type_id: string;
};

type CatalogItemCategory = {
  catalog_item_id: string;
  category_id: string;
};

type CatalogItemImage = {
  id: string;
  image_id: string;
  position: string;
};

type Image = {
  id: string;
  alt_text?: string;
  height: string;
  width: string;
};

type File = {
  id: string;
  created_at: string;
  name: string;
  size: string;
  url: string;
  catalog_id: string;
};

type Company = {
  id: string;
  business_type_description: string;
  created_at: string;
  description?: string;
  main_site_url?: string;
  name: string;
  phone_number?: string;
  updated_at: string;
  catalog_id: string;
};

type Theme = {
  id: string;
  created_at: string;
  primary_color: string;
  secondary_color: string;
  updated_at: string;
  catalog_id: string;
  image_id?: string;
};

function loadCsv<T>(filePath: string): T[] {
  const content = fs.readFileSync(filePath, "utf-8");
  return parse(content, {
    columns: true,
    on_record: (record: T) => record,
  }) as T[];
}

async function main() {
  const dir = __dirname;

  const users = loadCsv<User>(path.join(dir, "catalog-current/users.csv"));
  const catalogs = loadCsv<Catalog>(
    path.join(dir, "catalog-current/catalogs.csv"),
  );
  const productTypes = loadCsv<ProductType>(
    path.join(dir, "catalog-current/product_types.csv"),
  );
  const categories = loadCsv<Category>(
    path.join(dir, "catalog-current/categories.csv"),
  );
  const catalogItems = loadCsv<CatalogItem>(
    path.join(dir, "catalog-current/catalog_items.csv"),
  );
  const catalogItemCategories = loadCsv<CatalogItemCategory>(
    path.join(dir, "catalog-current/catalog_item_categories.csv"),
  );
  const catalogItemImages = loadCsv<CatalogItemImage>(
    path.join(dir, "catalog-current/catalog_item_images.csv"),
  );
  const images = loadCsv<Image>(path.join(dir, "catalog-current/images.csv"));
  const files = loadCsv<File>(path.join(dir, "catalog-current/files.csv"));
  const companies = loadCsv<Company>(
    path.join(dir, "catalog-current/companies.csv"),
  );
  const themes = loadCsv<Theme>(path.join(dir, "catalog-current/themes.csv"));

  for (const user of users) {
    await prisma.user.create({
      data: {
        id: user.id,
        email: user.email,
        name: user.name,
        phoneNumber: user.phoneNumber || null,
        createdAt: new Date(user.created_at).toISOString(),
        updatedAt: new Date(user.updated_at).toISOString(),
      },
    });
  }

  for (const catalog of catalogs) {
    await prisma.catalog.create({
      data: {
        id: catalog.id,
        name: catalog.name,
        slug: catalog.slug || null,
        publishedAt: catalog.published_at
          ? new Date(catalog.published_at).toISOString()
          : null,
        createdAt: new Date(catalog.created_at).toISOString(),
        updatedAt: new Date(catalog.updated_at).toISOString(),
        userId: catalog.user_id,
      },
    });
  }

  // createCatalog if user has no catalogs
  for (const user of users) {
    const userCatalogs = catalogs.filter(
      (catalog) => catalog.user_id === user.id,
    );

    if (userCatalogs.length === 0) {
      const newCatalog = await prisma.catalog.create({
        data: {
          name: `${user.name}'s Catalog`,
          userId: user.id,
        },
      });

      await prisma.user.update({
        where: { id: user.id },
        data: { currentCatalogId: newCatalog.id },
      });
    }
  }

  // setFirst catalog as current for each user
  for (const user of users) {
    const firstCatalog = catalogs.find(
      (catalog) => catalog.user_id === user.id,
    );

    if (firstCatalog) {
      await prisma.user.update({
        where: { id: user.id },
        data: { currentCatalogId: user.current_catalog_id || firstCatalog.id },
      });
    }
  }

  for (const productType of productTypes) {
    await prisma.productType.create({
      data: {
        id: productType.id,
        name: productType.name,
        slug: productType.slug,
        createdAt: new Date(productType.created_at).toISOString(),
        updatedAt: new Date(productType.updated_at).toISOString(),
        disabledAt: productType.disabled_at
          ? new Date(productType.disabled_at).toISOString()
          : null,
        catalogId: productType.catalog_id,
      },
    });
  }

  for (const category of categories) {
    await prisma.category.create({
      data: {
        id: category.id,
        backgroundColor: category.background_color,
        createdAt: new Date(category.created_at).toISOString(),
        disabledAt: category.disabled_at
          ? new Date(category.disabled_at).toISOString()
          : null,
        name: category.name,
        slug: category.slug,
        textColor: category.text_color,
        updatedAt: new Date(category.updated_at).toISOString(),
        catalogId: category.catalog_id,
      },
    });
  }

  for (const catalogItem of catalogItems) {
    await prisma.catalogItem.create({
      data: {
        id: catalogItem.id,
        caption: catalogItem.caption || null,
        reference: parseInt(catalogItem.reference, 10),
        catalogId: catalogItem.catalog_id,
        productTypeId: catalogItem.product_type_id,
        createdAt: new Date(catalogItem.created_at).toISOString(),
        disabledAt: catalogItem.disabled_at
          ? new Date(catalogItem.disabled_at).toISOString()
          : null,
        price: catalogItem.price || null,
        title: catalogItem.title,
        updatedAt: new Date(catalogItem.updated_at).toISOString(),
        categories: {
          connect: catalogItemCategories
            .filter((cic) => cic.catalog_item_id === catalogItem.id)
            .map((cic) => ({ id: cic.category_id })),
        },
        // Before: File -> Image -> CatalogItemImage -> CatalogItem
        // Now: CatalogItemImage -> CatalogItem
        images: {
          createMany: {
            data: catalogItemImages
              .filter(
                (catalogItemImage) =>
                  catalogItemImage.image_id === catalogItem.id,
              )
              .map((catalogItemImage) => {
                const image = images.find(
                  (img) => img.id === catalogItemImage.id,
                );

                if (!image) throw new Error("No Image", image);

                const file = files.find((f) => f.id === image.id);

                if (!file) throw new Error("No File", file);

                return {
                  id: catalogItemImage.image_id,
                  catalogId: catalogItem.catalog_id,
                  position: parseInt(catalogItemImage.position, 10),
                  name: file.name,
                  size: parseInt(file.size, 10),
                  width: parseInt(image.width, 10),
                  height: parseInt(image.height, 10),
                  altText: image.alt_text || "",
                  url: file.url,
                };
              }),
          },
        },
      },
    });
  }

  for (const company of companies) {
    await prisma.company.create({
      data: {
        id: company.id,
        name: company.name,
        description: company.description || null,
        mainSiteUrl: company.main_site_url || null,
        phoneNumber: company.phone_number || null,
        businessTypeDescription: company.business_type_description,
        catalogId: company.catalog_id,
        createdAt: new Date(company.created_at).toISOString(),
        updatedAt: new Date(company.updated_at).toISOString(),
      },
    });
  }

  for (const theme of themes) {
    const file = files.find((f) => f.id === theme.image_id);
    const image = images.find((img) => img.id === theme.image_id);

    await prisma.theme.create({
      data: {
        id: theme.id,
        primaryColor: theme.primary_color,
        secondaryColor: theme.secondary_color,
        catalogId: theme.catalog_id,
        createdAt: new Date(theme.created_at).toISOString(),
        updatedAt: new Date(theme.updated_at).toISOString(),
        logo:
          file && image
            ? {
                create: {
                  name: file.name || "logo",
                  url: file.url || "",
                  width: parseInt(image.width, 10),
                  height: parseInt(image.height, 10),
                  altText: image.alt_text || "",
                  size: parseInt(file.size, 10),
                  catalogId: theme.catalog_id,
                  createdAt: new Date(theme.created_at).toISOString(),
                },
              }
            : undefined,
      },
    });
  }
}

main().catch((e) => {
  console.error("❌ Seed failed:", e);
  process.exit(1);
});
