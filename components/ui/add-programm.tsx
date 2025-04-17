"use client";
import { Label } from "@radix-ui/react-label";
import { FunctionComponent, useEffect, useState } from "react";
import { Input } from "./input";
import { Button } from "./button";

export type ProgrammProps = {};

export const Programm: FunctionComponent<ProgrammProps> = () => {
  const [value, setValue] = useState<string>("");
  const [modulesTable, setModulesTable] = useState<string[]>([]);

  return (
    <>
      <div>
        <h1 className="font-bold text-xl">Liste des modules</h1>
        <ul>
          {modulesTable.map((module, index) => (
            <li key={index}>
              <b>Module {index + 1} - </b>
              {module}{" "}
              <span
                className="text-red-500 underline"
                onClick={(e) => {
                  const newModules = [...modulesTable];
                  newModules.splice(index, 1);
                  setModulesTable(newModules);
                }}
              >
                Supp
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="space-y-2">
        <Label>Module</Label>
        <div className="flex gap-4">
          <Input
            type="hidden"
            name="modules"
            value={modulesTable.join(",")}
            className="w-full"
          />
          <Input
            type="text"
            name="_"
            className="w-full"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Button
            type="button"
            onClick={() => {
              setModulesTable([...modulesTable, value]);
              setValue("" as string);
            }}
          >
            Ajouter
          </Button>
        </div>
      </div>
    </>
  );
};
