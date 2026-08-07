import { Meetup, MeetupType } from "./models/meetup";
import { fetchMeetups } from "./services/meetupService";
import { generateMeetupCardHtml } from "./components/MeetupCard";

let allMeetups: Meetup[] = [];

function renderMeetups(meetupsToRender: Meetup[]): void {
  const container = document.getElementById("meetups-container");
  if (container === null) return;

  container.innerHTML = "";

  if (meetupsToRender.length === 0) {
    container.innerHTML = "<p class='text-muted'>No se encontraron encuentros para esta categoría.</p>";
    return;
  }

  meetupsToRender.forEach((meetup) => {
    container.innerHTML += generateMeetupCardHtml(meetup);
  });
}

// Nueva función para poblar dinámicamente el selector de eventos
function populateEventSelect(meetups: Meetup[]): void {
  const eventSelect = document.getElementById("select-event") as HTMLSelectElement | null;
  if (eventSelect === null) return;

  eventSelect.innerHTML = '<option value="">-- Elige un evento de la lista --</option>';

  meetups.forEach((meetup) => {
    const option = document.createElement("option");
    option.value = meetup.id;
    // Formato claro para el usuario: [Modalidad] Título del evento
    const badgeType = meetup.type === MeetupType.VIRTUAL ? "💻 Virtual" : "📍 Presencial";
    option.textContent = `[${badgeType}] ${meetup.title}`;
    eventSelect.appendChild(option);
  });
}

async function loadMeetupsCatalog(): Promise<void> {
  const container = document.getElementById("meetups-container");
  if (container === null) return;

  container.innerHTML = "<p class='loading'>Cargando agenda de Chinzillas Sin Filtro...</p>";

  try {
    allMeetups = await fetchMeetups();
    renderMeetups(allMeetups);
    populateEventSelect(allMeetups); // Llenamos el desplegable tras recibir los datos
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Error al conectar con la comunidad.";
    container.innerHTML = `
      <div class="alert-error">
        <p>No fue posible cargar la agenda de eventos.</p>
        <small>${message}</small>
      </div>
    `;
  }
}

function setupFilterButtons(): void {
  const filterButtons = document.querySelectorAll<HTMLButtonElement>(".btn-filter");

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filterType = btn.getAttribute("data-filter");

      if (filterType === "ALL") {
        renderMeetups(allMeetups);
      } else if (filterType === "VIRTUAL") {
        const virtualOnly = allMeetups.filter((m) => m.type === MeetupType.VIRTUAL);
        renderMeetups(virtualOnly);
      } else if (filterType === "PRESENCIAL") {
        const physicalOnly = allMeetups.filter((m) => m.type === MeetupType.PRESENCIAL);
        renderMeetups(physicalOnly);
      }
    });
  });
}

function setupReservationForm(): void {
  const form = document.getElementById("reservation-form") as HTMLFormElement | null;
  const feedbackBlock = document.getElementById("form-feedback");

  if (form === null) return;

  form.addEventListener("submit", async (event: Event) => {
    event.preventDefault();

    const eventSelect = document.getElementById("select-event") as HTMLSelectElement;
    const nameInput = document.getElementById("txt-name") as HTMLInputElement;
    const emailInput = document.getElementById("txt-email") as HTMLInputElement;
    const attendeesInput = document.getElementById("num-attendees") as HTMLInputElement;

    const selectedEventId = eventSelect.value;
    const nameValue = nameInput.value.trim();
    const emailValue = emailInput.value.trim();
    const attendeesValue = parseInt(attendeesInput.value, 10);

    // Validación cliente
    if (!selectedEventId || !nameValue || !emailValue || isNaN(attendeesValue) || attendeesValue <= 0) {
      if (feedbackBlock) {
        feedbackBlock.innerHTML = "<p class='msg-error'>Por favor, selecciona un evento y completa todos tus datos.</p>";
      }
      return;
    }

    // Buscar el evento elegido para personalización de la respuesta
    const selectedEvent = allMeetups.find((m) => m.id === selectedEventId);
    const eventTitle = selectedEvent ? selectedEvent.title : "el evento seleccionado";

    if (feedbackBlock) {
      feedbackBlock.innerHTML = "<p class='loading'>Registrando tu cupo...</p>";
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      if (feedbackBlock) {
        feedbackBlock.innerHTML = `
          <div class="msg-success">
            <p>🎉 ¡Reserva confirmada con éxito, <strong>${nameValue}</strong>!</p>
            <small>Te inscribiste a: <em>"${eventTitle}"</em> (${attendeesValue} cupo/s). Enviaremos el acceso o detalles a ${emailValue}.</small>
          </div>
        `;
      }
      form.reset();
    } catch {
      if (feedbackBlock) {
        feedbackBlock.innerHTML = "<p class='msg-error'>Ocurrió un error al procesar el registro.</p>";
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadMeetupsCatalog();
  setupFilterButtons();
  setupReservationForm();
});