export enum MeetupStatus {
  PROGRAMADO = "PROGRAMADO",
  EN_VIVO = "EN_VIVO",
  FINALIZADO = "FINALIZADO"
}

export interface Meetup {
  id: string;
  title: string;
  country: string;
  date: string;
  spotsAvailable: number;
  status: MeetupStatus;
}

export interface ReservationPayload {
  fullName: string;
  email: string;
  country: string;
  attendees: number;
}