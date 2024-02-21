import React, { FC, useState } from 'react';
import { Button } from '@/components/ui/button';
import GooglePlacesAutocomplete from '../google-places-autocomplete';
import { MapLocation } from "@/types";
import { Label } from '../ui/label';
import { DateTimePicker } from '../ui/date-time-picker';
import { DateTimePicker15Min } from '../ui/date-time-picker-15min';
import { Checkbox } from '../ui/checkbox';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

interface SearchFormProps {
  onSearch: (locations: MapLocation[]) => void;
}

const SearchForm: FC<SearchFormProps> = ({ onSearch }) => {
  const [startLocation, setStartLocation] = useState<MapLocation | null>(null);
  const [endLocation, setEndLocation] = useState<MapLocation | null>(null);

  const [isEndEvoTripChecked, setIsEndEvoTripChecked] = useState(false);

  const handleEndEvoTripCheckboxChange = (checked: boolean) => {
    setIsEndEvoTripChecked(checked);
  };

  const [isEVModoChecked, setIsEVModoChecked] = useState(false);

  const handleEVModoCheckboxChange = (checked: boolean) => {
    setIsEVModoChecked(checked);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!startLocation || !endLocation) {
      console.error("Start and end locations are required");
      return;
    }
    // Assuming onSearch expects an array of MapLocation objects
    onSearch([startLocation, endLocation].filter(location => location) as MapLocation[]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Label className='mb-2'>Start Location</Label>
      <GooglePlacesAutocomplete onSelect={setStartLocation} />
      <Label className='mb-2'>Destination</Label>
      <GooglePlacesAutocomplete onSelect={setEndLocation} />
      <Label className='mb-2'>Start Date/ Time</Label>
      <div>
        <DateTimePicker15Min></DateTimePicker15Min>
      </div>
      <Label className='mt-2 mb-2'>End Date/ Time </Label>
      <div>
        <DateTimePicker15Min></DateTimePicker15Min>
      </div>
      <div>
        <div className="flex items-center space-x-2 mt-2">
          <Checkbox
            id="endEvo"
            checked={isEndEvoTripChecked}
            onCheckedChange={handleEndEvoTripCheckboxChange}
            className='ml-1' />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsEndEvoTripChecked(!isEndEvoTripChecked);
                  }}
                >
                  End Evo trip at destination</Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>This will assume that you will end the Evo Trip at your Desitiantion</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Checkbox
            id="evModo"
            checked={isEVModoChecked}
            onCheckedChange={handleEVModoCheckboxChange}
            className='ml-1' />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsEVModoChecked(!isEVModoChecked);
                  }}
                >
                  Modo EV</Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Modo does not apply a Fuel Surchangre for EVs</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <div>
        <Button type="submit" className='mt-2'>Calculate Cost</Button>
      </div>
    </form>
  );
};

export default SearchForm;
