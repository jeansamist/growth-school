"use client";
import { Label } from "@radix-ui/react-label";
import { FunctionComponent, useEffect, useState } from "react";
import { Input } from "./input";
import { Button } from "./button";
import { Textarea } from "./textarea";

export type AddTestimonialsProps = {};

export const AddTestimonials: FunctionComponent<AddTestimonialsProps> = () => {
  const [value, setValue] = useState<string>("");
  const [testimonialTable, setTestimonialTable] = useState<string[]>([]);

  return (
    <>
      <div>
        <h1 className="font-bold text-xl">Liste des Temoignages</h1>
        <ul>
          {testimonialTable.map((module, index) => (
            <li key={index}>
              {module}{" "}
              <span
                className="text-red-500 underline"
                onClick={(e) => {
                  const newTestimonial = [...testimonialTable];
                  newTestimonial.splice(index, 1);
                  setTestimonialTable(newTestimonial);
                }}
              >
                Supp
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="space-y-2">
        <Label>Entrez le Temoignage</Label>
        <div className="flex gap-4">
          <Input
            type="hidden"
            name="testimonials"
            value={testimonialTable.join(",")}
            className="w-full"
          />
          <Input
            type="text"
            name="__"
            placeholder="Nom"
            value={testimonialTable.join(",")}
            className="w-full"
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
            setValue("" as string);
          }}
        >
          Ajouter
        </Button>
      </div>
    </>
  );
};
