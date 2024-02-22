export class Trip {
  start_location: string;
  end_location: string;
  stops: string[];
  start_date_time: Date;
  end_date_time: Date;
  modo_plan: string;
  end_evo_at_dest: boolean;
  modo_ev: boolean;

  constructor(
    start_location: string,
    end_location: string,
    stops: string[],
    start_date_time: Date,
    end_date_time: Date,
    modo_plan: string,
    end_evo_at_dest: boolean,
    modo_ev: boolean,
  ) {
    this.start_location = start_location;
    this.end_location = end_location;
    this.stops = stops;
    this.start_date_time = start_date_time;
    this.end_date_time = end_date_time;
    this.modo_plan = modo_plan;
    this.end_evo_at_dest = end_evo_at_dest;
    this.modo_ev = modo_ev;
  }

  addStop(stop: string): void {
    this.stops.push(stop);
  }
}
