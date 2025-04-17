"use client";
import { FunctionComponent, useState } from "react";
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
  const [categoryId, setCategoryId] = useState<number>(categories[0].id);

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
            onChange={(e) => {
              setCategoryId(parseInt(e.target.value));
            }}
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
            Chaques tag doit être séparé du suivant par une virgule. Exemple:
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
        {categoryId === 1 ? (
          <div className="space-y-2">
            <Label>
              Lien(s) vers les videos<span className="text-red-500">*</span>
            </Label>
            <Textarea
              name="files_links"
              placeholder="https://"
              className="w-full"
            />
            <div className="text-right">
              Chaques lien doit être séparé du suivant par une virgule. Exemple:
              javascript,react,nodejs
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <Label>Lien vers l'ebook ou le template</Label>
            <Input
              type="texte"
              name="file_link"
              placeholder="https://"
              className="w-full"
            />
          </div>
        )}
        <Button className="w-full">Ajouter</Button>
      </form>
    </>
  );
};
