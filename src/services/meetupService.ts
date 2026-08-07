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
    imageUrl: "https://cdn.narasi.tv/files/2025/12/03/image/drama-dear-x_ratio-16x9-1764710317.webp"
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
    imageUrl: "https://tse2.mm.bing.net/th/id/OIP.vlbPvRKgOyH2yUFFXFdu8wHaEK?r=0&w=2560&h=1440&rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: "m3",
    title: "Encuentro Presencial Chinzillas — Santiago",
    category: "FANMEETING",
    type: MeetupType.PRESENCIAL,
    countryOrPlatform: "Chile (Café K-Culture)",
    date: "2026-10-05 16:00 hrs",
    spotsAvailable: 25,
    status: MeetupStatus.PROGRAMADO,
    imageUrl: "https://tse1.mm.bing.net/th/id/OIP.eieIoxj-6cXcCbk2mDPpHAHaE8?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: "m4",
    title: "Encuentro Presencial Chinzillas — Nuevo Mexico",
    category: "FANMEETING",
    type: MeetupType.PRESENCIAL,
    countryOrPlatform: "Mexico (Café La Roma)",
    date: "2026-10-05 14:00 hrs",
    spotsAvailable: 30,
    status: MeetupStatus.PROGRAMADO,
    imageUrl: "https://tse2.mm.bing.net/th/id/OIP.OI392FIpzwJ0IhdyVOxcDwHaE8?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
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
    imageUrl: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/0e76fb25-d8c8-48ac-baeb-acb0003aa5f1/ditpgks-ead9a940-8872-4f08-835a-26f3c0695cbf.png/v1/fill/w_1192,h_670,q_70,strp/super_sentai_50th_by_egallardo26_ditpgks-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MjE2MCIsInBhdGgiOiJcL2ZcLzBlNzZmYjI1LWQ4YzgtNDhhYy1iYWViLWFjYjAwMDNhYTVmMVwvZGl0cGdrcy1lYWQ5YTk0MC04ODcyLTRmMDgtODM1YS0yNmYzYzA2OTVjYmYucG5nIiwid2lkdGgiOiI8PTM4NDAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.3ZgCX8sml6cxhUAzxSW72vQ0OwJwerlQ5Uvdzopvtzs"
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
    imageUrl: "https://tse2.mm.bing.net/th/id/OIP.K3soBrgs7TXVYRQdd0bV6QHaEK?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: "m7",
    title: "Evento Game - Pokemon Black & White",
    category: "VIDEOJUEGOS",
    type: MeetupType.VIRTUAL,
    countryOrPlatform: "Peru (Club Pokemon)",
    date: "2026-10-13 12:30 hrs",
    spotsAvailable: 30,
    status: MeetupStatus.PROGRAMADO,
    imageUrl: "https://tse4.mm.bing.net/th/id/OIP.YBbPEjd0nhsgK9KmqB8GAQHaEK?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: "m8",
    title: "Maraton C-drama - Nirvana in Fire",
    category: "WATCH_PARTY",
    type: MeetupType.VIRTUAL,
    countryOrPlatform: "Online",
    date: "2026-11-21 16:30 hrs",
    spotsAvailable: 40,
    status: MeetupStatus.PROGRAMADO,
    imageUrl: "https://th.bing.com/th/id/R.d20f86a19e12ec1f0d84251e39225655?rik=7yLtkiEvAL34SQ&riu=http%3a%2f%2fdramaslot.com%2fwp-content%2fuploads%2f2021%2f11%2fNirvana-In-Fire-2.png&ehk=4q85yOmfhsNvXTHmHCjs8jQuhs%2foJ22I1hZiZWCia4I%3d&risl=&pid=ImgRaw&r=0"
  }
];

export async function fetchMeetups(): Promise<Meetup[]> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return MOCK_MEETUPS;
}