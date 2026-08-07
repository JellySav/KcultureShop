import { Meetup, MeetupStatus, MeetupType } from "../models/meetup";

const MOCK_MEETUPS: Meetup[] = [
  {
    id: "m1",
    title: "Watch Party: Maratón Final de Temporada — K-Drama Dear X",
    category: "WATCH_PARTY",
    type: MeetupType.VIRTUAL,
    countryOrPlatform: "Discord / Teleparty",
    date: "2026-09-15 20:00 hrs",
    spotsAvailable: 50,
    status: MeetupStatus.PROGRAMADO
  },
  {
    id: "m2",
    title: "Club de Lectura & Análisis: Novela C-Pop / Manhwa",
    category: "CHARLA_LIBRO",
    type: MeetupType.VIRTUAL,
    countryOrPlatform: "Google Meet",
    date: "2026-08-20 18:30 hrs",
    spotsAvailable: 15,
    status: MeetupStatus.EN_VIVO
  },
  {
    id: "m3",
    title: "Encuentro Presencial Chinzillas — Santiago",
    category: "FANMEETING",
    type: MeetupType.PRESENCIAL,
    countryOrPlatform: "Chile (Café K-Culture)",
    date: "2026-10-05 16:00 hrs",
    spotsAvailable: 20,
    status: MeetupStatus.PROGRAMADO
  },
  {
    id: "m4",
    title: "Aniversario SuperSentai - Recap Best Chapters",
    category: "WATCH_PARTY",
    type: MeetupType.VIRTUAL,
    countryOrPlatform: "Google Meet",
    date: "2026-08-27 19:30 hrs",
    spotsAvailable: 30,
    status: MeetupStatus.PROGRAMADO
  },
  {
    id: "m5",
    title: "Cumpleaños Dylan Wang - Ciudad de Mexico",
    category: "FANMEETING",
    type: MeetupType.PRESENCIAL,
    countryOrPlatform: "Mexico - Universidad Panamericana",
    date: "2026-10-22 14:30 hrs",
    spotsAvailable: 25,
    status: MeetupStatus.PROGRAMADO
  },
  {
    id: "m6",
    title: "Encuentro Chinzillas - Argentina",
    category: "FANMEETING",
    type: MeetupType.PRESENCIAL,
    countryOrPlatform: "Argentina - Mar del Plata",
    date: "2026-09-23 14:30 hrs",
    spotsAvailable: 20,
    status: MeetupStatus.PROGRAMADO
  }
];

export async function fetchMeetups(): Promise<Meetup[]> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Agregar test, con false para verificar el catch
  const responseOk = true;

  if (!responseOk) {
    throw new Error("HTTP Status 500: No se logró establecer conexión con el servidor.");
  }

  return MOCK_MEETUPS;
}