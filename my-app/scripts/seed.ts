import { PrismaClient } from "@prisma/client";
const database = new PrismaClient();
async function main() {
  try {
    await database.category.createMany({
      data: [
        { name: "Computer Science" },
        { name: "Music" },
        { name: "Fitness" },
        { name: "Photography" },
        { name: "Accounting" },
        { name: "Engineering" },
        { name: "Filming" },
      ],
    });
    console.log("Succes from script root folder in seeding the db");
  } catch (error) {
    console.log("error in script root folder in seeding the db", error);
  } finally {
    await database.$disconnect();
  }
}
main();
