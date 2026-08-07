import { Meetup } from "./models/meetup";
import { fetchMeetups } from "./services/meetupService";
import { generateMeetupCardHtml } from "./components/MeetupCard";

async function loadMeetupsCatalog(): Promise<void> {
  const container = document.getElementById("meetups-container");

  if (container === null) return;

  container.innerHTML = "<p class='loading'>Cargando eventos de la comunidad...</p>";

  try {
    const meetups: Meetup[] = await fetchMeetups();

    container.innerHTML = "";

    if (meetups.length === 0) {
      container.innerHTML = "<p>No hay encuentros disponibles en este momento.</p>";
      return;
    }

    meetups.forEach((meetup) => {
      container.innerHTML += generateMeetupCardHtml(meetup);
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Error desconocido al procesar la solicitud.";
    container.innerHTML = `
      <div class="alert-error">
        <p>No fue posible obtener los encuentros.</p>
        <small>${message}</small>
      </div>
    `;
  }
}

function setupReservationForm(): void {
  const form = document.getElementById("reservation-form") as HTMLFormElement | null;
  const feedbackBlock = document.getElementById("form-feedback");

  if (form === null) return;

  form.addEventListener("submit", async (event: Event) => {
    event.preventDefault();

    const nameInput = document.getElementById("txt-name") as HTMLInputElement;
    const emailInput = document.getElementById("txt-email") as HTMLInputElement;
    const countryInput = document.getElementById("select-country") as HTMLSelectElement;
    const attendeesInput = document.getElementById("num-attendees") as HTMLInputElement;

    const nameValue = nameInput.value.trim();
    const emailValue = emailInput.value.trim();
    const countryValue = countryInput.value;
    const attendeesValue = parseInt(attendeesInput.value, 10);

    if (!nameValue || !emailValue || !countryValue || isNaN(attendeesValue) || attendeesValue <= 0) {
      if (feedbackBlock) {
        feedbackBlock.innerHTML = "<p class='msg-error'>Por favor, completa todos los campos válidamente.</p>";
      }
      return;
    }

    if (feedbackBlock) {
      feedbackBlock.innerHTML = "<p class='loading'>Registrando tu asistencia...</p>";
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (feedbackBlock) {
        feedbackBlock.innerHTML = `<p class='msg-success'>¡Reserva confirmada con éxito para ${nameValue} (${attendeesValue} cupo/s)!</p>`;
      }
      form.reset();
    } catch {
      if (feedbackBlock) {
        feedbackBlock.innerHTML = "<p class='msg-error'>Ocurrió un error al procesar el envío.</p>";
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadMeetupsCatalog();
  setupReservationForm();
});