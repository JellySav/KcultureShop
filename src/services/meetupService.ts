import { Meetup, MeetupStatus, MeetupType } from "../models/meetup";

const MOCK_MEETUPS: Meetup[] = [
  {
    id: "m1",
    title: "Watch Party: Maratón Final K-Drama Dear X",
    category: "WATCH_PARTY",
    type: MeetupType.VIRTUAL,
    countryOrPlatform: "Discord / Teleparty",
    date: "2026-09-15 20:00 hrs",
    spotsAvailable: 50,
    status: MeetupStatus.PROGRAMADO,
    imageUrl: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "m2",
    title: "Club de Lectura & Análisis: Novela C-Pop / Manhwa",
    category: "CHARLA_LIBRO",
    type: MeetupType.VIRTUAL,
    countryOrPlatform: "Google Meet",
    date: "2026-08-20 18:30 hrs",
    spotsAvailable: 15,
    status: MeetupStatus.EN_VIVO,
    imageUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "m3",
    title: "Encuentro Presencial Chinzillas — Santiago",
    category: "FANMEETING",
    type: MeetupType.PRESENCIAL,
    countryOrPlatform: "Chile (Café K-Culture)",
    date: "2026-10-05 16:00 hrs",
    spotsAvailable: 20,
    status: MeetupStatus.PROGRAMADO,
    imageUrl: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "m4",
    title: "Encuentro Presencial Chinzillas — Nuevo Mexico",
    category: "FANMEETING",
    type: MeetupType.PRESENCIAL,
    countryOrPlatform: "Mexico (Café La Roma)",
    date: "2026-10-05 14:00 hrs",
    spotsAvailable: 20,
    status: MeetupStatus.PROGRAMADO,
    imageUrl: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "m5",
    title: "Aniversario SuperSentai",
    category: "WATCH_PARTY",
    type: MeetupType.VIRTUAL,
    countryOrPlatform: "Online",
    date: "2026-10-12 18:00 hrs",
    spotsAvailable: 30,
    status: MeetupStatus.PROGRAMADO,
    imageUrl: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "m6",
    title: "Especial Lanzamiento Inazuma Eleven Heroes",
    category: "VIDEOJUEGOS",
    type: MeetupType.PRESENCIAL,
    countryOrPlatform: "Argentina (Club Latam)",
    date: "2026-11-03 16:30 hrs",
    spotsAvailable: 30,
    status: MeetupStatus.PROGRAMADO,
    imageUrl: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=500&auto=format&fit=crop&q=60"
  }
];

export async function fetchMeetups(): Promise<Meetup[]> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return MOCK_MEETUPS;
}