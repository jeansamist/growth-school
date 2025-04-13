import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
// import {  } from '@adonisjs/'

const AddBook = () => {
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
      <form
        method="POST"
        action="/admin/book/store"
        className="space-y-4 pb-12"
      >
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
          <Input type="file" name="file" className="w-full" />
        </div>
        <Button className="w-full">Ajouter</Button>
      </form>
    </div>
  );
};
export default AddBook;
