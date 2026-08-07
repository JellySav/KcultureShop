import { Meetup, MeetupType } from "./models/meetup";
import { fetchMeetups } from "./services/meetupService";
import { generateMeetupCardHtml } from "./components/MeetupCard";

// Estado local en memoria
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

async function loadMeetupsCatalog(): Promise<void> {
  const container = document.getElementById("meetups-container");
  if (container === null) return;

  container.innerHTML = "<p class='loading'>Cargando agenda de Chinzillas Sin Filtro...</p>";

  try {
    allMeetups = await fetchMeetups();
    renderMeetups(allMeetups);
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
      // Cambiar estado activo en la UI
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

    const nameInput = document.getElementById("txt-name") as HTMLInputElement;
    const emailInput = document.getElementById("txt-email") as HTMLInputElement;
    const countryInput = document.getElementById("select-country") as HTMLSelectElement;
    const attendeesInput = document.getElementById("num-attendees") as HTMLInputElement;

    const nameValue = nameInput.value.trim();
    const emailValue = emailInput.value.trim();
    const countryValue = countryInput.value;
    const attendeesValue = parseInt(attendeesInput.value, 10);

    // Validación cliente
    if (!nameValue || !emailValue || !countryValue || isNaN(attendeesValue) || attendeesValue <= 0) {
      if (feedbackBlock) {
        feedbackBlock.innerHTML = "<p class='msg-error'>Por favor, completa todos los campos requeridos.</p>";
      }
      return;
    }

    if (feedbackBlock) {
      feedbackBlock.innerHTML = "<p class='loading'>Registrando tu cupo...</p>";
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      if (feedbackBlock) {
        feedbackBlock.innerHTML = `<p class='msg-success'>¡Inscripción confirmada para ${nameValue} (${attendeesValue} cupos)! Revisaremos tu correo ${emailValue}.</p>`;
      }
      form.reset();
    } catch {
      if (feedbackBlock) {
        feedbackBlock.innerHTML = "<p class='msg-error'>Error al procesar el registro.</p>";
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadMeetupsCatalog();
  setupFilterButtons();
  setupReservationForm();
});