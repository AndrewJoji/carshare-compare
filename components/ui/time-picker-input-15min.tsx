import React from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  TimePickerType,
  getArrowByType,
  getDateByType,
  setDateByType,
} from "./time-picker-utils";

export interface TimePickerInput15MinProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  picker: TimePickerType;
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  onRightFocus?: () => void;
  onLeftFocus?: () => void;
}

const TimePickerInput15Min = React.forwardRef<
  HTMLInputElement,
  TimePickerInput15MinProps
>(
  (
    {
      className,
      type = "tel",
      value,
      id,
      name,
      date = new Date(new Date().setHours(0, 0, 0, 0)),
      setDate,
      picker,
      onLeftFocus,
      onRightFocus,
      ...props
    },
    ref,
  ) => {
    const calculatedValue = React.useMemo(
      () => getDateByType(date, picker),
      [date, picker],
    );

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Tab") return;
      e.preventDefault();
      if (e.key === "ArrowRight") onRightFocus?.();
      if (e.key === "ArrowLeft") onLeftFocus?.();
      if (["ArrowUp", "ArrowDown"].includes(e.key)) {
        const increment = picker === "minutes" ? 15 : 1; // Adjust increment based on picker type
        const step = e.key === "ArrowUp" ? increment : -increment;
        let newValue = getArrowByType(calculatedValue, step, picker);
        // Ensure minutes adjust in 15-minute increments
        if (picker === "minutes") {
          newValue = (
            ((Math.round(parseInt(calculatedValue) / 15) +
              (step > 0 ? 1 : -1)) *
              15) %
            60
          ).toString();
          newValue = newValue.toString().padStart(2, "0"); // Pad single digits for consistency
        }
        const tempDate = new Date(date);
        setDate(setDateByType(tempDate, newValue, picker));
      }
    };

    return (
      <Input
        ref={ref}
        id={id || picker}
        name={name || picker}
        className={cn(
          "w-[48px] text-center font-mono text-base tabular-nums caret-transparent focus:bg-accent focus:text-accent-foreground [&::-webkit-inner-spin-button]:appearance-none",
          className,
        )}
        value={value || calculatedValue}
        type={type}
        inputMode="decimal"
        onKeyDown={handleKeyDown}
        {...props}
      />
    );
  },
);

TimePickerInput15Min.displayName = "TimePickerInput15Min";

export { TimePickerInput15Min };
