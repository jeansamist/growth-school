import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function page() {
  const dbItems = await prisma.item.findMany({ include: { tags: true } });
  const action = async (formData: FormData) => {
    "use server";
    const id = parseInt(formData.get("id") as string, 10);

    if (isNaN(id)) {
      console.error("Invalid ID");
      return;
    }

    try {
      // Supprimer les fichiers liés
      await prisma.file.deleteMany({
        where: { itemId: id },
      });

      // Supprimer les tags liés (via la table de liaison)
      await prisma.tagOnItem.deleteMany({
        where: { itemId: id },
      });

      // Supprimer les témoignages liés
      await prisma.testimonial.deleteMany({
        where: { itemId: id },
      });

      // Supprimer l'ebook lié (relation one-to-one)
      await prisma.ebook.deleteMany({
        where: { itemId: id },
      });

      // Supprimer la formation liée (relation one-to-one)
      await prisma.training.deleteMany({
        where: { itemId: id },
      });

      // Enfin, supprimer l'item
      const deletedItem = await prisma.item.delete({
        where: { id },
      });
      console.log(
        "Item and all related records deleted successfully:",
        deletedItem
      );
      redirect("/admin/items");
    } catch (error) {
      console.error("Error deleting item and related data:", error);
    }
  };

  return (
    <div className="container mx-auto px-6 space-y-12">
      {dbItems.map((item) => (
        <form
          key={item.id}
          action={action}
          method="POST"
          className="w-full flex flex-col items-center justify-center bg-white p-4 rounded-lg shadow-md mb-4"
        >
          <input type="hidden" name="id" value={item.id} />
          <div>
            <p className="font-bold text-2xl">{item.title}</p>
            <p className="text-right text-secondary">{item.price}</p>
            <p className="line-clamp-3">{item.description}</p>
          </div>
          <Button type="submit" className="w-full mt-4">
            Delete
          </Button>
        </form>
      ))}
    </div>
  );
}
