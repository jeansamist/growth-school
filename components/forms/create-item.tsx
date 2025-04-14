"use client";
import { FunctionComponent } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { createItem } from "@/services/item/actions";
import { Prisma } from "@/app/generated/prisma";
import { useActionState } from "react";
export type CreateItemProps = {
  categories: Prisma.CategoryGetPayload<{}>[];
};

export const CreateItem: FunctionComponent<CreateItemProps> = ({
  categories,
}) => {
  const initialFormState: { errors: string[] } = {
    errors: [],
  };

  const [formState, formAction] = useActionState<
    { errors: string[] },
    FormData
  >(createItem, initialFormState);
  return (
    <>
      {formState.errors.length !== 0 && (
        <div className="p-6 rounded-xl bg-red-100">
          {formState.errors.map((error) => (
            <div key={error} className="text-red-500">
              {error}
            </div>
          ))}
        </div>
      )}
      <form method="POST" action={formAction} className="space-y-4 pb-12">
        {/* {{ csrfField() }} */}
        <div className="space-y-2">
          <Label>
            Titre<span className="text-red-500">*</span>
          </Label>
          <Input type="text" name="title" className="w-full" />
        </div>
        <div className="space-y-2">
          <Label>
            Description<span className="text-red-500">*</span>
          </Label>
          <Textarea name="description" className="w-full" />
        </div>
        <div className="space-y-2">
          <Label>
            Prix<span className="text-red-500">*</span>
          </Label>
          <Input type="number" name="price" className="w-full" />
        </div>
        <div className="space-y-2">
          <Label>Prix promotionel</Label>
          <Input type="number" name="discount" className="w-full" />
        </div>
        <div className="space-y-2">
          <Label>
            Categorie<span className="text-red-500">*</span>
          </Label>
          <select
            name="category_id"
            className="w-full h-12 border shadow-sm border-primary-soft rounded-md px-6 py-1 outline-none focus:outline-none focus:border-primary transition-colors font-medium placeholder:transition-colors"
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <Label>
            Tags<span className="text-red-500">*</span>
          </Label>
          <Input type="text" name="tags" className="w-full" />
          <div className="text-right">
            Chaques tags doivent être séparés par une virgule. Exemple:
            javascript,react,nodejs
          </div>
        </div>
        <div className="space-y-2">
          <Label>Nom de l'autheur</Label>
          <Input type="text" name="author" className="w-full" />
        </div>
        <div className="space-y-2">
          <Label>ISBN</Label>
          <Input type="text" name="isbn" className="w-full" />
        </div>
        <div className="space-y-2">
          <Label>Langue</Label>
          <Input type="text" name="language" className="w-full" />
        </div>
        <div className="space-y-2">
          <Label>Nombre de pages</Label>
          <Input type="number" name="pages" className="w-full" />
        </div>
        <div className="space-y-2">
          <Label>Edition</Label>
          <Input type="text" name="edition" className="w-full" />
        </div>
        <div className="space-y-2">
          <Label>Date de publication</Label>
          <Input type="date" name="date" className="w-full" />
        </div>
        {/* <div className="space-y-2">
            <Label>
              Description<span className="text-red-500">*</span>
            </Label>
            <Textarea name="description" className="w-full" />
          </div> */}
        <div className="space-y-2">
          <Label>
            Couverture<span className="text-red-500">*</span>
          </Label>
          <Input type="file" name="cover" className="w-full" />
        </div>
        <div className="space-y-2">
          <Label>
            Fichier PDF du livre<span className="text-red-500">*</span>
          </Label>
          <Input type="file" name="files" className="w-full" multiple />
        </div>
        <Button className="w-full">Ajouter</Button>
      </form>
    </>
  );
};
