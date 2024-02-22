"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Result } from "@/constants/data";

export const columns: ColumnDef<Result>[] = [
  {
    accessorKey: "parameter", // Assuming you add a 'parameter' field to each row to describe it
    header: "Parameter",
  },
  {
    accessorKey: "evoDetails", // This will be used to display combined evo details
    header: "EVO",
  },
  {
    accessorKey: "modoDetails", // This will be used to display combined modo details
    header: "Modo",
  },
];
