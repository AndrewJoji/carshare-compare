"use client";
import SearchForm from "@/components/forms/search-form";
import MapWithMarkers from "@/components/map-template";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { MapLocation } from "@/types";
import { Separator } from "@/components/ui/separator";

export default function Page() {
  const [locations, setLocations] = useState<MapLocation[]>([]);

  const handleSearch = (newLocations: MapLocation[]) => {
    setLocations(newLocations); // Directly pass the Location[] array
  };

  return (
    <ScrollArea className="flex flex-col h-screen">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Plan Your Trip</h2>
        </div>
        <Tabs defaultValue="compare" className="space-y-4">
          <TabsList>
            <TabsTrigger value="compare">Compare</TabsTrigger>
            <TabsTrigger value="evo" disabled>
              Evo
            </TabsTrigger>
            <TabsTrigger value="modo" disabled>
              Modo
            </TabsTrigger>
            <TabsTrigger value="results" disabled>
              Coming Soon...
            </TabsTrigger>
          </TabsList>

          <TabsContent value="compare" className="space-y-4">
            <div className="flex flex-col h-screen">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Trip Details</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <SearchForm onSearch={handleSearch} />
                  <Separator className="my-4" />
                  <MapWithMarkers locations={locations} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="results" className="space-y-4">
            <div className="flex flex-col h-screen">
              <div className="flex w-full">
                <Card className="flex flex-[1_1_40%]">
                  <CardHeader>
                    <CardTitle>Plan Your Trip</CardTitle>
                  </CardHeader>
                  <CardContent className="p-2">
                    <SearchForm onSearch={handleSearch} />
                  </CardContent>
                </Card>
                <Separator className="mx-4" orientation="vertical" />{" "}
                <Card className="flex flex-[3_1_60%]">
                  <CardHeader>
                    <CardTitle>Route Map</CardTitle>
                  </CardHeader>
                  <CardContent className="p-2">
                    <MapWithMarkers locations={locations} />
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ScrollArea>
  );
}
