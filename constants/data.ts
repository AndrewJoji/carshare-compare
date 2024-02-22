import { Icons } from "@/components/icons";
import { NavItem, SidebarNavItem } from "@/types";

export type Result = {
  evo: {
    days?: number;
    hours?: number;
    minutes?: number;
    duration?: number;
    distanceKilometers?: number;
    baseCharge?: number;
    timeCharge?: number;
    tax?: number;
    totalCost?: number;
  };
  modo: {
    days?: number;
    hours?: number;
    minutes?: number;
    duration?: number;
    distanceKilometers?: number;
    baseCharge?: number;
    timeCharge?: number;
    distanceCharge?: number;
    tax?: number;
    totalCost?: number;
  };
};

export const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: "dashboard",
    label: "Dashboard",
  },
  {
    title: "Login",
    href: "/",
    icon: "login",
    label: "login",
  },
];
