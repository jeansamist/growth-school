"use client";
import { Label } from "@radix-ui/react-label";
import { FunctionComponent, useEffect, useState } from "react";
import { Input } from "./input";
import { Button } from "./button";
import { Textarea } from "./textarea";

export type AddTestimonialsProps = {};

export const AddTestimonials: FunctionComponent<AddTestimonialsProps> = () => {
  const [value, setValue] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [testimonialTable, setTestimonialTable] = useState<string[]>([]);
  const [nameTable, setNameTable] = useState<string[]>([]);

  return (
    <>
      <div>
        <h1 className="font-bold text-xl">Liste des Temoignages</h1>
        <ul>
          {testimonialTable.map((t, index) => (
            <li key={index} className="py-2">
              <b>{nameTable[index]} : </b>
              {t}
              {"   "}
              <span
                className="text-red-500 underline cursor-pointer"
                onClick={(e) => {
                  const newTestimonial = [...testimonialTable];
                  newTestimonial.splice(index, 1);
                  setTestimonialTable(newTestimonial);
                }}
              >
                Supprimer
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="space-y-2">
        <Label>Entrez le Temoignage</Label>
        <div className="space-y-4">
          <Input
            type="hidden"
            name="testimonials"
            value={testimonialTable.join(",")}
            className="w-full"
          />
          <Input
            type="hidden"
            name="names"
            value={nameTable.join(",")}
            className="w-full"
          />
          <Input
            type="text"
            name="__"
            placeholder="Nom"
            className="w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Textarea
            name="_"
            className="w-full"
            value={value}
            placeholder="Temoignage"
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <Button
          type="button"
          onClick={() => {
            setTestimonialTable([...testimonialTable, value]);
            setNameTable([...nameTable, name]);
            setName("" as string);
            setValue("" as string);
          }}
        >
          Ajouter
        </Button>
      </div>
    </>
  );
};
