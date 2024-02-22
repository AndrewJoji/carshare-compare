import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Result } from "@/constants/data";

const result: Result = {
  evo: {
    days: 0,
    hours: 0,
    minutes: 0,
    duration: 0,
    distanceKilometers: 0,
    baseCharge: 0,
    timeCharge: 0,
    tax: 0,
    totalCost: 0,
  },
  modo: {
    days: 0,
    hours: 0,
    minutes: 0,
    duration: 0,
    distanceKilometers: 0,
    baseCharge: 0,
    timeCharge: 0,
    distanceCharge: 0,
    tax: 0,
    totalCost: 0,
  },
};

const rows = [
  {
    parameter: "Days",
    evoDetails: formatDetails(result.evo.days),
    modoDetails: formatDetails(result.modo.days),
  },
  {
    parameter: "Hours",
    evoDetails: formatDetails(result.evo.hours),
    modoDetails: formatDetails(result.modo.hours),
  },
  {
    parameter: "Minutes",
    evoDetails: formatDetails(result.evo.minutes),
    modoDetails: formatDetails(result.modo.minutes),
  },
  {
    parameter: "Distance (km)",
    evoDetails: formatDetails(result.evo.distanceKilometers),
    modoDetails: formatDetails(result.modo.distanceKilometers),
  },
  {
    parameter: "Base Charge",
    evoDetails: formatDetails(result.evo.baseCharge),
    modoDetails: formatDetails(result.modo.baseCharge),
  },
  {
    parameter: "Time Charge",
    evoDetails: formatDetails(result.evo.timeCharge),
    modoDetails: formatDetails(result.modo.timeCharge),
  },
  {
    parameter: "Distance Charge",
    evoDetails: "N/A",
    modoDetails: formatDetails(result.modo.distanceCharge),
  },
  {
    parameter: "Tax",
    evoDetails: formatDetails(result.evo.tax),
    modoDetails: formatDetails(result.modo.tax),
  },
  {
    parameter: "Total Cost",
    evoDetails: formatDetails(result.evo.totalCost),
    modoDetails: formatDetails(result.modo.totalCost),
  },
  // Add more categories as needed
];

function formatDetails(detail: any) {
  return `$${detail?.toFixed(2) || "0.00"}`;
}
const columns = [
  {
    accessorKey: "parameter",
    header: "Parameter",
  },
  {
    accessorKey: "evoDetails",
    header: "EVO",
  },
  {
    accessorKey: "modoDetails",
    header: "Modo",
  },
];

export function ResultsTable() {
  return (
    <Table>
      <TableCaption>Cost breakdown of your trip</TableCaption>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead key={column.accessorKey}>{column.header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((item, index) => (
          <TableRow key={index}>
            <TableCell>{item.parameter}</TableCell>
            <TableCell>{item.evoDetails}</TableCell>
            <TableCell>{item.modoDetails}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
