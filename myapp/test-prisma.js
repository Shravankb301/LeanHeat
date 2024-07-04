const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const allWebsites = await prisma.website.findMany();
  console.log(allWebsites);
}

main()
  .catch(e => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
