import { Meetup, MeetupStatus } from "../models/meetup";

const MOCK_MEETUPS: Meetup[] = [
  {
    id: "m1",
    title: "Aniversario Chinzillas — Especial K-Drama & C-Pop",
    country: "Chile",
    date: "2026-09-15",
    spotsAvailable: 20,
    status: MeetupStatus.PROGRAMADO
  },
  {
    id: "m2",
    title: "Encuentro de Fans & Maratón Anime",
    country: "México",
    date: "2026-08-20",
    spotsAvailable: 15,
    status: MeetupStatus.EN_VIVO
  },
  {
    id: "m3",
    title: "Club de Lectura Libro Three Body",
    country: "Perú",
    date: "2026-07-10",
    spotsAvailable: 0,
    status: MeetupStatus.FINALIZADO
  },
  {
    id: "m4",
    title: "Encuentro Fans Aniversario Supernatural",
    country: "Chile",
    date: "2026-07-26",
    spotsAvailable: 0,
    status: MeetupStatus.FINALIZADO
  },
  {
    id: "m5",
    title: "Especial SuperSentai Aniversario 60",
    country: "Mexico",
    date: "2026-05-21",
    spotsAvailable: 0,
    status: MeetupStatus.FINALIZADO
  }
];

export async function fetchMeetups(): Promise<Meetup[]> {
  // Simular latencia de red (1.2 segundos) -> Investigar formato de red 
  await new Promise((resolve) => setTimeout(resolve, 1200));

  // Hacer test cambiandolo a False, para revisar el catch
  const responseOk = true;

  if (!responseOk) {
    throw new Error("HTTP Status 500: No se logró establecer conexión con el servidor.");
  }

  return MOCK_MEETUPS;
}