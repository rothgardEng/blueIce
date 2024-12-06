const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function unseedDatabase() {
  try {
    // cart
    await prisma.news.deleteMany();

    // orginization
    await prisma.orginization.deleteMany();

    // reccomendatation
    await prisma.recommendation.deleteMany();

    // joinUs
    await prisma.joinUs.deleteMany();

    // admin
    await prisma.admin.deleteMany();

    console.log("UNSEEDED ALL DATA SUCCESS");
  } catch (e) {
    console.log("ERROR WHILE UNSEEDING DATA: ", e);
  } finally {
    await prisma.$disconnect();
  }
}

unseedDatabase();
