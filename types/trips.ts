export type Location = {
  state_abbr: string;
  state: string;
  city: string;
  latitude: string;
  longitude: string;
  zip: string;
};

export type Trip = {
  id?: string;
  company: string;
  origin: Partial<Location>;
  destination: Partial<Location>;
  dateRange: any;
  miles: number;
  note?: string;
  status: string;
  payment: number;
  paid: boolean;
  timestamp?: number;
};
