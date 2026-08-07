import { Meetup, MeetupStatus, MeetupType } from "../models/meetup";

export function generateMeetupCardHtml(meetup: Meetup): string {
  const isFinished = meetup.status === MeetupStatus.FINALIZADO;
  const isSoldOut = meetup.spotsAvailable <= 0 && !isFinished;
  
  let statusBadge: string;
  
  // 1. Prioridad Máxima: Evento Finalizado -> Evitar error al momento de sobrescribir en agotado
  if (isFinished) {
    statusBadge = `<span class="badge badge-status">FINALIZADO</span>`;
  } 
  // 2. Evento En Vivo
  else if (meetup.status === MeetupStatus.EN_VIVO) {
    statusBadge = `<span class="badge badge-live">En Vivo</span>`;
  } 
  // 3. Evento Agotado (solo si NO está finalizado)
  else if (isSoldOut) {
    statusBadge = `<span class="badge badge-soldout">Agotado</span>`;
  } 
  // 4. Evento Programado estándar
  else {
    statusBadge = `<span class="badge badge-status">${meetup.status}</span>`;
  }

  const typeBadge = meetup.type === MeetupType.VIRTUAL 
    ? `<span class="badge badge-virtual">VIRTUAL</span>` 
    : `<span class="badge badge-physical">PRESENCIAL</span>`;

  return `
    <article class="card-meetup ${isSoldOut || isFinished ? "card-soldout" : ""}" data-id="${meetup.id}">
      <img src="${meetup.imageUrl}" alt="${meetup.title}" class="card-image-wrapper" />
      <div class="card-content">
        <div class="card-badges">
          ${typeBadge}
          ${statusBadge}
        </div>
        <h3 class="card-title">${meetup.title}</h3>
        <div class="card-info">
          <span><strong>Tipo:</strong> ${meetup.category.replace("_", " ")}</span>
          <span><strong>Ubicación:</strong> ${meetup.countryOrPlatform}</span>
          <span><strong>Fecha:</strong> ${meetup.date}</span>
          <span><strong>Cupos disponibles:</strong> <strong class="spots-count">${meetup.spotsAvailable}</strong></span>
        </div>
      </div>
    </article>
  `;
}