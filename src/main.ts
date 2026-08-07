import { Meetup, MeetupType } from "./models/meetup";
import { fetchMeetups } from "./services/meetupService";
import { generateMeetupCardHtml } from "./components/MeetupCard";

// Estado global en memoria
let allMeetups: Meetup[] = [];
let filteredMeetups: Meetup[] = [];
let currentPage = 1;
const PAGE_SIZE = 6;

function renderMeetups(): void {
  const container = document.getElementById("meetups-container");
  if (container === null) return;

  container.innerHTML = "";

  if (filteredMeetups.length === 0) {
    container.innerHTML = "<p class='text-muted'>No se encontraron encuentros para esta categoría.</p>";
    updatePaginationControls();
    return;
  }

  // Cálculo de índices para paginación
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const paginatedMeetups = filteredMeetups.slice(startIndex, endIndex);

  paginatedMeetups.forEach((meetup) => {
    container.innerHTML += generateMeetupCardHtml(meetup);
  });

  updatePaginationControls();
}

function updatePaginationControls(): void {
  const btnPrev = document.getElementById("btn-prev-page") as HTMLButtonElement | null;
  const btnNext = document.getElementById("btn-next-page") as HTMLButtonElement | null;
  const pageIndicator = document.getElementById("page-indicator");

  const totalPages = Math.ceil(filteredMeetups.length / PAGE_SIZE) || 1;

  if (pageIndicator) {
    pageIndicator.textContent = `Página ${currentPage} de ${totalPages}`;
  }

  if (btnPrev) {
    btnPrev.disabled = currentPage <= 1;
  }

  if (btnNext) {
    btnNext.disabled = currentPage >= totalPages;
  }
}

function setupPaginationEvents(): void {
  const btnPrev = document.getElementById("btn-prev-page") as HTMLButtonElement | null;
  const btnNext = document.getElementById("btn-next-page") as HTMLButtonElement | null;

  btnPrev?.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderMeetups();
      document.getElementById("meetups-container")?.scrollIntoView({ behavior: "smooth" });
    }
  });

  btnNext?.addEventListener("click", () => {
    const totalPages = Math.ceil(filteredMeetups.length / PAGE_SIZE);
    if (currentPage < totalPages) {
      currentPage++;
      renderMeetups();
      document.getElementById("meetups-container")?.scrollIntoView({ behavior: "smooth" });
    }
  });
}

function populateEventSelect(meetups: Meetup[]): void {
  const eventSelect = document.getElementById("select-event") as HTMLSelectElement | null;
  if (eventSelect === null) return;

  eventSelect.innerHTML = '<option value="">-- Elige un evento de la lista --</option>';

  meetups.forEach((meetup) => {
    const option = document.createElement("option");
    option.value = meetup.id;

    const isSoldOut = meetup.spotsAvailable <= 0;
    const badgeType = meetup.type === MeetupType.VIRTUAL ? "Virtual" : "Presencial";

    if (isSoldOut) {
      option.textContent = `[AGOTADO] ${meetup.title}`;
      option.disabled = true;
    } else {
      option.textContent = `[${badgeType}] ${meetup.title} (${meetup.spotsAvailable} cupos)`;
    }

    eventSelect.appendChild(option);
  });
}

async function loadMeetupsCatalog(): Promise<void> {
  const container = document.getElementById("meetups-container");
  if (container === null) return;

  container.innerHTML = "<p class='loading'>Cargando agenda de eventos de Chinzillas Sin Filtro...</p>";

  try {
    allMeetups = await fetchMeetups();
    filteredMeetups = [...allMeetups];
    currentPage = 1;
    renderMeetups();
    populateEventSelect(allMeetups);
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
        filteredMeetups = [...allMeetups];
      } else if (filterType === "VIRTUAL") {
        filteredMeetups = allMeetups.filter((m) => m.type === MeetupType.VIRTUAL);
      } else if (filterType === "PRESENCIAL") {
        filteredMeetups = allMeetups.filter((m) => m.type === MeetupType.PRESENCIAL);
      }

      // Reiniciamos a la primera página al cambiar el filtro -> Evita error en base a la carga de la pagina
      currentPage = 1;
      renderMeetups();
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

    if (!selectedEventId || !nameValue || !emailValue || isNaN(attendeesValue) || attendeesValue <= 0) {
      if (feedbackBlock) {
        feedbackBlock.innerHTML = "<p class='msg-error'>Por favor, selecciona un evento y completa todos los campos requeridos.</p>";
      }
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailValue)) {
      if (feedbackBlock) {
        feedbackBlock.innerHTML = "<p class='msg-error'>Por favor, ingresa una dirección de correo electrónico válida.</p>";
      }
      return;
    }

    const targetMeetup = allMeetups.find((m) => m.id === selectedEventId);
    if (!targetMeetup) return;

    if (attendeesValue > targetMeetup.spotsAvailable) {
      if (feedbackBlock) {
        feedbackBlock.innerHTML = `<p class='msg-error'>No hay suficientes cupos disponibles. Solo quedan ${targetMeetup.spotsAvailable} cupo(s).</p>`;
      }
      return;
    }

    if (feedbackBlock) {
      feedbackBlock.innerHTML = "<p class='loading'>Procesando reserva y actualizando cupos...</p>";
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      targetMeetup.spotsAvailable -= attendeesValue;

      renderMeetups();
      populateEventSelect(allMeetups);

      if (feedbackBlock) {
        feedbackBlock.innerHTML = `
          <div class="msg-success">
            <p>🎉 ¡Reserva confirmada con éxito, <strong>${nameValue}</strong>!</p>
            <p><small>Te inscribiste a: <em>"${targetMeetup.title}"</em> (${attendeesValue} cupo/s). Enviaremos los detalles a <strong>${emailValue}</strong>.</small></p>
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
  setupPaginationEvents();
  setupReservationForm();
});