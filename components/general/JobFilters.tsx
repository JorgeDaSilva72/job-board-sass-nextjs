"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { XIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { Checkbox } from "../ui/checkbox";
import { countryList } from "@/app/utils/countriesList";
import { Separator } from "../ui/separator";
// import { Input } from "@/components/ui/input";

export function JobFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const jobTypes = ["full-time", "part-time", "contract", "internship"];
  const currentJobTypes = searchParams.get("jobTypes")?.split(",") || [];
  const currentLocation = searchParams.get("location") || "";
  // const currentMinSalary = searchParams.get("minSalary") || "";
  // const currentMaxSalary = searchParams.get("maxSalary") || "";

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      return params.toString();
    },
    [searchParams]
  );

  const handleJobTypeChange = (type: string, checked: boolean) => {
    const current = new Set(currentJobTypes);
    if (checked) {
      current.add(type);
    } else {
      current.delete(type);
    }
    const newValue = Array.from(current).join(",");
    router.push(`?${createQueryString("jobTypes", newValue)}`);
  };

  const handleLocationChange = (location: string) => {
    router.push(`?${createQueryString("location", location)}`);
  };

  // const handleMinSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   router.push(`?${createQueryString("minSalary", e.target.value)}`);
  // };

  // const handleMaxSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   router.push(`?${createQueryString("maxSalary", e.target.value)}`);
  // };

  const clearFilters = () => {
    router.push("/");
  };

  return (
    <Card className="col-span-1 h-fit w-full lg:w-auto">
      <CardHeader className="space-y-4 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <CardTitle className="text-xl sm:text-2xl font-semibold">
            Filters
          </CardTitle>
          <Button
            variant="destructive"
            size="sm"
            className="h-8 w-full sm:w-auto"
            onClick={clearFilters}
          >
            <span className="mr-2">Clear all</span>
            <XIcon className="h-4 w-4" />
          </Button>
        </div>
        <Separator />
      </CardHeader>
      <CardContent className="space-y-6 p-4 sm:p-6">
        <div className="space-y-4">
          <Label className="text-base sm:text-lg font-semibold">Job Type</Label>
          <div className="grid grid-cols-1 xs:grid-cols-2 gap-3">
            {jobTypes.map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox
                  id={type.toLowerCase()}
                  checked={currentJobTypes.includes(type)}
                  onCheckedChange={(checked) =>
                    handleJobTypeChange(type, checked as boolean)
                  }
                />
                <Label
                  htmlFor={type.toLowerCase()}
                  className="text-sm font-medium"
                >
                  {type}
                </Label>
              </div>
            ))}
          </div>
        </div>
        <Separator />
        <div className="space-y-4">
          <Label className="text-base sm:text-lg font-semibold">Location</Label>
          <Select value={currentLocation} onValueChange={handleLocationChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Worldwide</SelectLabel>
                <SelectItem value="worldwide">
                  <div className="flex items-center">
                    <span>🌍</span>
                    <span className="pl-2">Worldwide / Remote</span>
                  </div>
                </SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>Location</SelectLabel>
                {countryList.map((country) => (
                  <SelectItem value={country.name} key={country.code}>
                    <div className="flex items-center space-x-2">
                      <img
                        src={country.flagEmoji}
                        className="h-6 w-6"
                        alt={country.name}
                      />
                      <span>{country.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        {/* <Separator /> */}
        {/* <div className="space-y-4">
          <Label className="text-base sm:text-lg font-semibold">
            Salary Range
          </Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="minSalary" className="text-sm">
                Min Salary
              </Label>
              <Input
                id="minSalary"
                type="number"
                placeholder="0"
                value={currentMinSalary}
                onChange={handleMinSalaryChange}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxSalary" className="text-sm">
                Max Salary
              </Label>
              <Input
                id="maxSalary"
                type="number"
                placeholder="500,000"
                value={currentMaxSalary}
                onChange={handleMaxSalaryChange}
                className="w-full"
              />
            </div>
          </div>
        </div> */}
      </CardContent>
    </Card>
  );
}
