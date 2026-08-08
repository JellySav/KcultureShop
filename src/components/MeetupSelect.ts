import { Meetup, MeetupStatus } from "../models/meetup";
import { sortMeetups } from "../services/meetupService";

/**
 * Genera el HTML de las opciones (<option>) para el desplegable (<select>) del formulario.
 * Excluye automáticamente los eventos FINALIZADO y deshabilita los AGOTADOS.
 */
export function generateMeetupSelectOptionsHtml(
  meetups: Meetup[],
  includeSoldOut: boolean = true
): string {
  // 1. Excluir eventos con estado FINALIZADO
  let activeMeetups = meetups.filter(
    (m) => m.status !== MeetupStatus.FINALIZADO
  );

  // 2. Opcional: filtrar eventos sin cupos
  if (!includeSoldOut) {
    activeMeetups = activeMeetups.filter((m) => m.spotsAvailable > 0);
  }

  // 3. Ordenar eventos activos por fecha más cercana ('PROXIMOS')
  const sortedMeetups = sortMeetups(activeMeetups, "PROXIMOS");

  // 4. Opción por defecto (placeholder)
  const defaultOption = `<option value="" disabled selected>Selecciona un evento...</option>`;

  // 5. Generar las etiquetas <option>
  const optionsHtml = sortedMeetups
    .map((meetup) => {
      const isSoldOut = meetup.spotsAvailable <= 0;
      const disabledAttr = isSoldOut ? "disabled" : "";
      const statusSuffix = isSoldOut ? " (AGOTADO)" : "";

      return `<option value="${meetup.id}" ${disabledAttr}>
        ${meetup.title}${statusSuffix} — ${meetup.date}
      </option>`;
    })
    .join("\n");

  return `${defaultOption}\n${optionsHtml}`;
}