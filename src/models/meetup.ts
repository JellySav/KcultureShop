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
  category: "WATCH_PARTY" | "CHARLA_LIBRO" | "FANMEETING" | "DEBATE_SERIE" | "ANIVERSARIO"  | "VIDEOJUEGOS";
  type: MeetupType;
  countryOrPlatform: string;
  date: string;
  spotsAvailable: number;
  status: MeetupStatus;
  imageUrl: string; // Nueva propiedad para la imagen de portada
}