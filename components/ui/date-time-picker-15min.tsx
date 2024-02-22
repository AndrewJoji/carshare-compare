"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "./label";
import { TimePickerInput15Min } from "./time-picker-input-15min";
import { FC, useRef } from "react";

interface DateTimePicker15MinProps {
  date: Date | undefined;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}

export const DateTimePicker15Min: FC<DateTimePicker15MinProps> = ({
  date,
  setDate,
}) => {
  const minuteRef = useRef<HTMLInputElement>(null);
  const hourRef = useRef<HTMLInputElement>(null);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP HH:mm") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
        <div className="flex items-center gap-2">
          <div className="flex h-10 items-center">
            <Clock className="ml-2 h-4 w-4" />
          </div>
          <div className="grid gap-1 text-center">
            <Label htmlFor="hours" className="text-xs">
              Hours
            </Label>
            <TimePickerInput15Min
              picker="hours"
              date={date}
              setDate={setDate}
              ref={hourRef}
              onRightFocus={() => minuteRef.current?.focus()}
              className="mb-4"
            />
          </div>
          <div className="grid gap-1 text-center">
            <Label htmlFor="minutes" className="text-xs">
              Minutes
            </Label>
            <TimePickerInput15Min
              picker="minutes"
              date={date}
              setDate={setDate}
              ref={minuteRef}
              onLeftFocus={() => hourRef.current?.focus()}
              className="mb-4"
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
