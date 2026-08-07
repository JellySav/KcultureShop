export enum MeetupStatus {
  PROGRAMADO = "PROGRAMADO",
  EN_VIVO = "EN_VIVO",
  FINALIZADO = "FINALIZADO"
}

export enum MeetupType {
  PRESENCIAL = "PRESENCIAL",
  VIRTUAL = "VIRTUAL"
}

export interface Meetup {
  id: string;
  title: string;
  category: "WATCH_PARTY" | "CHARLA_LIBRO" | "FANMEETING" | "DEBATE_SERIE" | "ANIVERSARIO_PARTY" | "CUMPLE_SPECIAL";
  type: MeetupType;
  countryOrPlatform: string; // Ejemplo tipo Chile, Mexico, Discord,Zoom 
  date: string;
  spotsAvailable: number;
  status: MeetupStatus;
}

export interface ReservationPayload {
  fullName: string;
  email: string;
  meetupId: string;
  attendees: number;
}