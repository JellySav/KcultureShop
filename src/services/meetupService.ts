import { Meetup, MeetupStatus, MeetupType } from "../models/meetup";

const MOCK_MEETUPS: Meetup[] = [
  {
    id: "m1",
    title: "Watch Party: Maratón Final K-Drama Dear X",
    category: "WATCH_PARTY",
    type: MeetupType.VIRTUAL,
    countryOrPlatform: "Discord / Zoom",
    date: "2026-08-15 20:00 hrs",
    spotsAvailable: 0,
    status: MeetupStatus.PROGRAMADO,
    imageUrl: "https://cdn.narasi.tv/files/2025/12/03/image/drama-dear-x_ratio-16x9-1764710317.webp"
  },
  {
    id: "m2",
    title: "Club de Lectura & Análisis: Novela C-Pop / Manhwa",
    category: "CHARLA_LIBRO",
    type: MeetupType.VIRTUAL,
    countryOrPlatform: "Google Meet",
    date: "2026-08-07 18:30 hrs",
    spotsAvailable: 5,
    status: MeetupStatus.EN_VIVO,
    imageUrl: "https://tse2.mm.bing.net/th/id/OIP.vlbPvRKgOyH2yUFFXFdu8wHaEK?r=0&w=2560&h=1440&rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: "m3",
    title: "Encuentro Presencial Chinzillas — Santiago",
    category: "FANMEETING",
    type: MeetupType.PRESENCIAL,
    countryOrPlatform: "Chile (Café K-Culture)",
    date: "2026-11-02 16:00 hrs",
    spotsAvailable: 13,
    status: MeetupStatus.PROGRAMADO,
    imageUrl: "https://tse1.mm.bing.net/th/id/OIP.eieIoxj-6cXcCbk2mDPpHAHaE8?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: "m4",
    title: "Encuentro Presencial Chinzillas — Nuevo Mexico",
    category: "FANMEETING",
    type: MeetupType.PRESENCIAL,
    countryOrPlatform: "Mexico (Café La Roma)",
    date: "2026-11-05 14:00 hrs",
    spotsAvailable: 21,
    status: MeetupStatus.PROGRAMADO,
    imageUrl: "https://tse2.mm.bing.net/th/id/OIP.OI392FIpzwJ0IhdyVOxcDwHaE8?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: "m5",
    title: "Evento Aniversario - SuperSentai",
    category: "WATCH_PARTY",
    type: MeetupType.VIRTUAL,
    countryOrPlatform: "Online",
    date: "2026-10-12 18:00 hrs",
    spotsAvailable: 17,
    status: MeetupStatus.PROGRAMADO,
    imageUrl: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/0e76fb25-d8c8-48ac-baeb-acb0003aa5f1/ditpgks-ead9a940-8872-4f08-835a-26f3c0695cbf.png/v1/fill/w_1192,h_670,q_70,strp/super_sentai_50th_by_egallardo26_ditpgks-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MjE2MCIsInBhdGgiOiJcL2ZcLzBlNzZmYjI1LWQ4YzgtNDhhYy1iYWViLWFjYjAwMDNhYTVmMVwvZGl0cGdrcy1lYWQ5YTk0MC04ODcyLTRmMDgtODM1YS0yNmYzYzA2OTVjYmYucG5nIiwid2lkdGgiOiI8PTM4NDAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.3ZgCX8sml6cxhUAzxSW72vQ0OwJwerlQ5Uvdzopvtzs"
  },
  {
    id: "m6",
    title: "Evento Game -Lanzamiento Especial Inazuma Eleven Victory Road",
    category: "VIDEOJUEGOS",
    type: MeetupType.PRESENCIAL,
    countryOrPlatform: "Argentina (Club Latam)",
    date: "2026-10-13 16:30 hrs",
    spotsAvailable: 23,
    status: MeetupStatus.PROGRAMADO,
    imageUrl: "https://tse2.mm.bing.net/th/id/OIP.K3soBrgs7TXVYRQdd0bV6QHaEK?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: "m7",
    title: "Evento Game - Pokemon Black & White",
    category: "VIDEOJUEGOS",
    type: MeetupType.VIRTUAL,
    countryOrPlatform: "Peru (Club Pokemon)",
    date: "2026-10-21 12:30 hrs",
    spotsAvailable: 7,
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
    spotsAvailable: 12,
    status: MeetupStatus.PROGRAMADO,
    imageUrl: "https://tse1.mm.bing.net/th/id/OIP.PBXandU4zbrXco_7PRM06gAAAA?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: "m9",
    title: "Watch Party: Maraton Extreno Mystic Nine Season2",
    category: "WATCH_PARTY",
    type: MeetupType.VIRTUAL,
    countryOrPlatform: "Google Meet",
    date: "2026-06-21 18:30 hrs",
    spotsAvailable: 0,
    status: MeetupStatus.FINALIZADO,
    imageUrl: "https://michelletopham.com/wp-content/uploads/2026/05/the-mystic-nine-against-the-coming-storm-full-main-cast-poster.jpg"
  },
  {
    id: "m10",
    title: "Watch Party: Especial Temp 1 Supernatural",
    category: "WATCH_PARTY",
    type: MeetupType.VIRTUAL,
    countryOrPlatform: "Google Meet",
    date: "2026-05-20 16:00 hrs",
    spotsAvailable: 0,
    status: MeetupStatus.FINALIZADO,
    imageUrl: "https://tse4.mm.bing.net/th/id/OIP.lDUakWXVR6eiR0TZpIBJ2AHaEo?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: "m11",
    title: "Watch Party: Especial Regreso Teen Wolf",
    category: "WATCH_PARTY",
    type: MeetupType.VIRTUAL,
    countryOrPlatform: "Google Meet",
    date: "2026-04-12 16:00 hrs",
    spotsAvailable: 1,
    status: MeetupStatus.FINALIZADO,
    imageUrl: "https://static3.srcdn.com/wordpress/wp-content/uploads/2017/09/Teen-Wolf-Series-Finale-Tyler-Posey-Scott-McCall.jpg"
  },
  {
    id: "m12",
    title: "Midnight Game: Especial Dangarompa",
    category: "VIDEOJUEGOS",
    type: MeetupType.PRESENCIAL,
    countryOrPlatform: "Chile - Valparaiso",
    date: "2026-08-22 15:00 hrs",
    spotsAvailable: 4,
    status: MeetupStatus.PROGRAMADO,
    imageUrl: "https://images7.alphacoders.com/897/thumb-1920-897945.jpg"
  },
  {
    id: "m13",
    title: "Watch Party: Estreno 911 Season 7",
    category: "WATCH_PARTY",
    type: MeetupType.VIRTUAL,
    countryOrPlatform: "Zoom / GoogleMeet",
    date: "2026-08-14 16:00 hrs",
    spotsAvailable: 7,
    status: MeetupStatus.PROGRAMADO,
    imageUrl: "https://tse1.mm.bing.net/th/id/OIP.Wnn5zArTphZqZctWCEX_AQHaEK?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: "m14",
    title: "Watch Party: Chicago Crossover",
    category: "WATCH_PARTY",
    type: MeetupType.VIRTUAL,
    countryOrPlatform: "Zoom / GoogleMeet",
    date: "2026-09-20 16:00 hrs",
    spotsAvailable: 0,
    status: MeetupStatus.PROGRAMADO,
    imageUrl: "https://static1.cbrimages.com/wordpress/wp-content/uploads/2024/11/one-chicago-header.jpg"
  },
  {
    id: "m15",
    title: "Watch Party: Maraton Final The Hotel Of Secrets 88",
    category: "WATCH_PARTY",
    type: MeetupType.VIRTUAL,
    countryOrPlatform: "Zoom / GoogleMeet",
    date: "2026-08-14 17:00 hrs",
    spotsAvailable: 2,
    status: MeetupStatus.PROGRAMADO,
    imageUrl: "https://tse3.mm.bing.net/th/id/OIP.CcQVGsJaREDzsVrEAXmLOAHaEK?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: "m16",
    title: "New Reality: Street Dance Fighter China Season 4",
    category: "WATCH_PARTY",
    type: MeetupType.VIRTUAL,
    countryOrPlatform: "Zoom / GoogleMeet",
    date: "2026-07-30 18:30 hrs",
    spotsAvailable: 0,
    status: MeetupStatus.FINALIZADO,
    imageUrl: "https://th.bing.com/th/id/R.d46ff0b0a4d21506ef4c2017ca7936bd?rik=jA7FLuTpf3WTeQ&pid=ImgRaw&r=0"
  },
];

export async function fetchMeetups(): Promise<Meetup[]> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return MOCK_MEETUPS;
}