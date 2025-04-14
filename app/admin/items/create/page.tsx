import { PrismaClient } from "@/app/generated/prisma";
import { CreateItem } from "@/components/forms/create-item";
// import {  } from '@adonisjs/'

const AddItem = async () => {
  const getCategories = async () => {
    const prisma = new PrismaClient();
    try {
      return await prisma.category.findMany();
    } catch (error) {
      console.log(error);
      return [];
    }
  };
  const categories = await getCategories();

  return (
    <div className="container mx-auto px-6 space-y-12">
      <div className="space-y-4">
        <h1 className=" font-bold text-4xl sm:text-5xl lg:text-6xl text-balance">
          Ajoutez votre livre
        </h1>
        <p className=" leading-normal lg:w-3/5 text-xl">
          Entrez les informations de votre livre et cliquez sur ajouter
        </p>
      </div>
      <CreateItem categories={categories} />
    </div>
  );
};
export default AddItem;
