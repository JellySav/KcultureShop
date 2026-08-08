import { Meetup, MeetupStatus, MeetupType } from "./models/meetup";
import { fetchMeetups } from "./services/meetupService";
import { generateMeetupCardHtml } from "./components/MeetupCard";
import { generateMeetupSelectOptionsHtml } from "./components/MeetupSelect";

// Tipos de ordenamiento soportados
type SortOption = "DATE_ASC" | "DATE_DESC" | "STATUS";

// Estado global en memoria
let allMeetups: Meetup[] = [];
let filteredMeetups: Meetup[] = [];
let currentSort: SortOption = "DATE_ASC";
let currentPage = 1;
const PAGE_SIZE = 6;

/**
 * Convierte cadenas tipo "2026-08-15 20:00 hrs" o "2026-08-15" a milisegundos de manera segura.
 */
function parseMeetupDate(dateStr: string): number {
  const cleanStr = dateStr.replace(/\s*hrs\s*/i, "").trim();
  const isoStr = cleanStr.includes(" ") ? cleanStr.replace(" ", "T") : cleanStr;
  const parsed = new Date(isoStr).getTime();
  return isNaN(parsed) ? 0 : parsed;
}

/**
 * Ordena la lista de eventos según el criterio seleccionado.
 * Garantiza que los eventos FINALIZADO siempre queden al final.
 */
export function sortMeetups(meetups: Meetup[], criteria: SortOption): Meetup[] {
  return [...meetups].sort((a, b) => {
    const isFinishedA = a.status === MeetupStatus.FINALIZADO;
    const isFinishedB = b.status === MeetupStatus.FINALIZADO;

    // REGLA GLOBAL: Eventos FINALIZADOS siempre al fondo
    if (isFinishedA && !isFinishedB) return 1;
    if (!isFinishedA && isFinishedB) return -1;

    // Comparación por fecha segura
    const timeA = parseMeetupDate(a.date);
    const timeB = parseMeetupDate(b.date);

    if (criteria === "DATE_ASC") {
      return timeA - timeB; // Más cercanos primero
    }

    if (criteria === "DATE_DESC") {
      return timeB - timeA; // Más lejanos primero
    }

    if (criteria === "STATUS") {
      const getPriority = (m: Meetup): number => {
        if (m.status === MeetupStatus.EN_VIVO) return 1;
        if (m.status === MeetupStatus.PROGRAMADO && m.spotsAvailable > 0) return 2;
        if (m.spotsAvailable <= 0) return 3; // Agotado
        return 4; // Finalizado
      };

      return getPriority(a) - getPriority(b);
    }

    return 0;
  });
}

function renderMeetups(meetups: Meetup[] = filteredMeetups): void {
  const container = document.getElementById("meetups-container");
  if (!container) return;

  // 1. Aplicar la ordenación seleccionada actualmente
  const sortedMeetups = sortMeetups(meetups, currentSort);

  // 2. Limpiar contenedor
  container.innerHTML = "";

  if (sortedMeetups.length === 0) {
    container.innerHTML = `<p class="no-events">No hay eventos disponibles en esta categoría.</p>`;
    updatePaginationControls();
    return;
  }

  // 3. Aplicar paginación
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const paginatedMeetups = sortedMeetups.slice(startIndex, endIndex);

  // 4. Renderizar tarjetas
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

function setupSortSelect(): void {
  const sortSelect = document.getElementById("select-sort") as HTMLSelectElement | null;
  if (!sortSelect) return;

  sortSelect.addEventListener("change", () => {
    currentSort = sortSelect.value as SortOption;
    currentPage = 1; // Volver a la primera página tras reordenar
    renderMeetups();
  });
}

function populateEventSelect(meetups: Meetup[]): void {
  const eventSelect = document.getElementById("select-event") as HTMLSelectElement | null;
  if (!eventSelect) return;

  // Usa el componente modular de MeetupSelect para renderizar las opciones filtradas
  eventSelect.innerHTML = generateMeetupSelectOptionsHtml(meetups);
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

      // Re-renderizar tarjetas y desplegable con la información de cupos actualizada
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
  setupSortSelect();
  setupPaginationEvents();
  setupReservationForm();
});