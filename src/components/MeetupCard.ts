import { Meetup, MeetupStatus } from "../models/meetup";

export function generateMeetupCardHtml(meetup: Meetup): string {
  const isLive = meetup.status === MeetupStatus.EN_VIVO;
  const statusClass = isLive ? "badge badge-live" : "badge";
  const statusLabel = isLive ? "🔴 En Vivo" : meetup.status;

  return `
    <article class="card-meetup" data-id="${meetup.id}">
      <header class="card-header">
        <h3>${meetup.title}</h3>
        <span class="${statusClass}">${statusLabel}</span>
      </header>
      <div class="card-body">
        <p><strong>País:</strong> ${meetup.country}</p>
        <p><strong>Fecha:</strong> ${meetup.date}</p>
        <p><strong>Cupos disponibles:</strong> ${meetup.spotsAvailable}</p>
      </div>
    </article>
  `;
}