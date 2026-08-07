import { Meetup, MeetupStatus, MeetupType } from "../models/meetup";

export function generateMeetupCardHtml(meetup: Meetup): string {
  const isLive = meetup.status === MeetupStatus.EN_VIVO;
  const statusBadge = isLive 
    ? `<span class="badge badge-live">🔴 En Vivo</span>` 
    : `<span class="badge badge-status">${meetup.status}</span>`;

  const typeBadge = meetup.type === MeetupType.VIRTUAL 
    ? `<span class="badge badge-virtual">💻 Virtual</span>` 
    : `<span class="badge badge-physical">📍 Presencial</span>`;

  return `
    <article class="card-meetup" data-id="${meetup.id}">
      <img src="${meetup.imageUrl}" alt="${meetup.title}" class="card-image-wrapper" />
      <div class="card-content">
        <div class="card-badges">
          ${typeBadge}
          ${statusBadge}
        </div>
        <h3 class="card-title">${meetup.title}</h3>
        <div class="card-info">
          <span> <strong>Tipo:</strong> ${meetup.category.replace("_", " ")}</span>
          <span> <strong>Ubicación:</strong> ${meetup.countryOrPlatform}</span>
          <span> <strong>Fecha:</strong> ${meetup.date}</span>
          <span> <strong>Cupos disponibles:</strong> ${meetup.spotsAvailable}</span>
        </div>
      </div>
    </article>
  `;
}