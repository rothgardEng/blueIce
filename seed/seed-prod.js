const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { hashPassword } = require("../Lib/auth/auth.js");

async function main() {
  const samplePassword = await hashPassword(process.env.USER_SECRET);

  const superUser = await prisma.admin.upsert({
    where: { email: process.env.USER_NAME },
    update: {},
    create: {
      firstName: "hiCoders",
      lastName: "howsitgoing",
      hashedPassword: samplePassword,
      email: process.env.USER_NAME,
      isOverlord: true
    }
  });
  console.log({ superUser });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
