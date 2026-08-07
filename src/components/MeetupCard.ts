import { Meetup, MeetupStatus, MeetupType } from "../models/meetup";

export function generateMeetupCardHtml(meetup: Meetup): string {
  const isLive = meetup.status === MeetupStatus.EN_VIVO;
  const statusClass = isLive ? "badge badge-live" : "badge";
  const statusLabel = isLive ? "🔴 En Vivo" : meetup.status;

  const typeBadgeClass = meetup.type === MeetupType.VIRTUAL ? "badge badge-virtual" : "badge badge-physical";
  const typeLabel = meetup.type === MeetupType.VIRTUAL ? "Virtual" : "Presencial";

  return `
    <article class="card-meetup" data-id="${meetup.id}">
      <header class="card-header">
        <div>
          <span class="${typeBadgeClass}">${typeLabel}</span>
          <span class="${statusClass}">${statusLabel}</span>
        </div>
        <h3>${meetup.title}</h3>
      </header>
      <div class="card-body">
        <p><strong>Tipo:</strong> ${meetup.category.replace("_", " ")}</p>
        <p><strong>Ubicación/Plataforma:</strong> ${meetup.countryOrPlatform}</p>
        <p><strong>Fecha y Hora:</strong> ${meetup.date}</p>
        <p><strong>Cupos disponibles:</strong> ${meetup.spotsAvailable}</p>
      </div>
    </article>
  `;
}