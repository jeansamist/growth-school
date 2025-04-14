import { PrismaClient, Prisma } from "@/app/generated/prisma";
const prisma = new PrismaClient();
const categoryData: Prisma.CategoryCreateInput[] = [
  {
    name: "Formation",
    cover:
      "https://images.pexels.com/photos/8472795/pexels-photo-8472795.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    name: "Ebook",
    cover:
      "https://images.pexels.com/photos/1329571/pexels-photo-1329571.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    name: "Template",
    cover:
      "https://images.pexels.com/photos/7428859/pexels-photo-7428859.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
];
export async function main() {
  for (const category of categoryData) {
    await prisma.category.create({ data: category });
  }
}

main();
