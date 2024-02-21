export class Trip {
    start_location: string;
    end_location: string;
    stops: string[];
    start_date_time: Date;
    end_date_time: Date;
  
    constructor(start_location: string, end_location: string, stops: string[], start_date_time: Date, end_date_time: Date) {
      this.start_location = start_location;
      this.end_location = end_location;
      this.stops = stops;
      this.start_date_time = start_date_time;
      this.end_date_time = end_date_time;
    }
  
    addStop(stop: string): void {
      this.stops.push(stop);
    }
  }