import { PrismaClient, ProductCategory } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.promotion.deleteMany();

  await prisma.product.createMany({
    data: [
      {
        name: "Parure Satin Blanc",
        description:
          "Parure de lit en satin doux, incluant housse de couette et taies d'oreiller.",
        category: ProductCategory.PARURE,
        price: 120,
        promoPrice: 99,
        imageUrl: "/images/placeholder-parure.svg",
      },
      {
        name: "Matla Couette Coton",
        description: "Housse de couette 100% coton, respirante et confortable.",
        category: ProductCategory.COUETTE,
        price: 75,
        imageUrl: "/images/placeholder-couette.svg",
      },
      {
        name: "Drap de Lit Microfibre",
        description: "Drap housse microfibre anti-acariens, plusieurs tailles disponibles.",
        category: ProductCategory.DRAP,
        price: 45,
        promoPrice: 38,
        imageUrl: "/images/placeholder-drap.svg",
      },
    ],
  });

  await prisma.promotion.create({
    data: {
      title: "Promo Printemps",
      description: "Réduction sur toutes les parures jusqu'à fin du mois.",
      discountPct: 15,
      active: true,
    },
  });

  console.log("Base de données initialisée avec succès.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
