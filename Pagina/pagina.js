/* Utilidades */
// Acceso por id
function byId(id) {
  return document.getElementById(id);
}
// querySelector y querySelectorAll
function q(sel, el = document) {
  return el.querySelector(sel);
}
function qa(sel, el = document) {
  return Array.from(el.querySelectorAll(sel));
}

/* Acceso local */
const STORAGE_KEY = "bshopper:brief";

function storageLoad() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch (e) {
    console.error("storageLoad", e);
    return [];
  }
}
function storageSave(value) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch (e) {
    console.error("storageSave", e);
  }
}
function storageClear() {
  localStorage.removeItem(STORAGE_KEY);
}

let briefState = storageLoad();

/* Base de la UI */
function initUI() {
  // Menú mobile toggle
  const btn = byId("menu-toggle");
  const nav = byId("site-nav");
  if (btn && nav) {
    btn.addEventListener("click", function () {
      const expanded = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!expanded));
      nav.hidden = expanded;
    });
  }

  // Scroll a secciones (#id)
  document.addEventListener("click", function (ev) {
    const a = ev.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute("href").slice(1);
    const target = byId(id);
    if (!target) return;
    ev.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    history.pushState(null, "", "#" + id);
  });

  // Botón "volver arriba"
  const backToTop = byId("back-to-top");
  if (backToTop) {
    const THRESHOLD = 700;
    function onScroll() {
      const y = window.scrollY || document.documentElement.scrollTop;
      backToTop.hidden = y < THRESHOLD;
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Resaltado de link activo según el hash actual
  function highlight() {
    const hash = location.hash || "#inicio";
    qa("#site-nav a").forEach(function (a) {
      const active = a.getAttribute("href") === hash;
      a.dataset.active = active ? "true" : "false";
    });
  }
  window.addEventListener("hashchange", highlight);
  highlight();
}

/* Brief UI */
// Dibuja la lista, contador y el JSON oculto para EmailJS
function renderBrief() {
  const list = byId("brief-list");
  const empty = byId("brief-empty");
  const counter = byId("brief-count");
  const payload = byId("brief-payload");
  if (!list || !empty || !counter || !payload) return;

  list.innerHTML = "";

  if (briefState.length === 0) {
    empty.hidden = false;
    counter.textContent = "0";
    payload.value = "[]"; // JSON vacío
    return;
  }

  empty.hidden = true;
  counter.textContent = String(briefState.length);

  briefState.forEach(function (item) {
    const li = document.createElement("li");
    li.className = "brief-item";
    li.dataset.id = item.id;

    li.innerHTML =
      '<div class="brief-item__main">' +
      '<strong class="brief-item__title">' +
      escapeHTML(item.titulo) +
      "</strong>" +
      '<div class="brief-item__meta">' +
      "<span><b>Cant.:</b> " +
      item.cantidad +
      "</span>" +
      "<span><b>Alcance:</b> " +
      escapeHTML(item.alcance || "—") +
      "</span>" +
      "<span><b>Notas:</b> " +
      escapeHTML(item.notas || "—") +
      "</span>" +
      "</div>" +
      "</div>" +
      '<div class="brief-item__actions">' +
      '<button class="btn-ghost" data-action="edit" aria-label="Editar ítem">Editar</button>' +
      '<button class="btn-danger" data-action="delete" aria-label="Eliminar ítem">Eliminar</button>' +
      "</div>";

    list.appendChild(li);
  });

  // Mantengo el JSON del brief listo para enviar por EmailJS
  payload.value = JSON.stringify(briefState, null, 2);
}

// Agrega un servicio al brief 
function addToBrief(data) {
  const item = {
    id: crypto.randomUUID(),
    servicioId: data.servicioId,
    titulo: data.titulo,
    alcance: "",
    notas: "",
    cantidad: 1
  };
  briefState.push(item);
  storageSave(briefState);
  renderBrief();
  announce('Se agregó “' + data.titulo + '” a tu solicitud.');
}

// Edición de ítem 
function editItem(id) {
  const idx = briefState.findIndex(function (x) { return x.id === id; });
  if (idx === -1) return;

  const current = briefState[idx];
  const cantIn = prompt("Cantidad (número entero):", current.cantidad);
  const alcanceIn = prompt("Alcance (descripción breve):", current.alcance || "") || current.alcance;
  const notasIn = prompt("Notas adicionales:", current.notas || "") || current.notas;

  var cant = parseInt(cantIn, 10);
  if (!Number.isFinite(cant) || cant <= 0) cant = current.cantidad;

  current.cantidad = cant;
  current.alcance = String(alcanceIn).slice(0, 500);
  current.notas = String(notasIn).slice(0, 500);

  briefState[idx] = current;
  storageSave(briefState);
  renderBrief();
  announce("Ítem actualizado.");
}

// Borrado con confirmación
function deleteItem(id) {
  const idx = briefState.findIndex(function (x) { return x.id === id; });
  if (idx === -1) return;
  const titulo = briefState[idx].titulo;
  if (!confirm('¿Eliminar “' + titulo + '” del brief?')) return;
  briefState.splice(idx, 1);
  storageSave(briefState);
  renderBrief();
  announce('Se eliminó “' + titulo + '”.');
}

// Vaciar todo el brief con confirmación
function clearBrief() {
  if (!confirm("¿Vaciar todo el brief?")) return;
  briefState = [];
  storageClear();
  renderBrief();
  announce("Brief vacío.");
}

// Eventos del panel del brief
function bindBriefEvents() {
  const list = byId("brief-list");
  const clearBtn = byId("brief-clear");

  if (list) {
    list.addEventListener("click", function (ev) {
      const btn = ev.target.closest("button");
      if (!btn) return;
      const li = ev.target.closest("li.brief-item");
      if (!li) return;
      const id = li.dataset.id;
      const action = btn.dataset.action;
      if (action === "edit") editItem(id);
      if (action === "delete") deleteItem(id);
    });
  }
  if (clearBtn) clearBtn.addEventListener("click", clearBrief);
}

// Sección #servicios los clicks “Agregar a mi solicitud”
function bindServiceButtons() {
  const container = byId("servicios");
  if (!container) return;
  container.addEventListener("click", function (ev) {
    const btn = ev.target.closest("[data-add-service]");
    if (!btn) return;
    const card = ev.target.closest("[data-service]");
    if (!card) return;
    const servicioId = card.getAttribute("data-service");
    const titleEl = card.querySelector(".service-title");
    const titulo = (titleEl && titleEl.textContent.trim()) || "Servicio";
    addToBrief({ servicioId: servicioId, titulo: titulo });
  });
}

/* EmailJS */
// Leo template desde el form de contacto cuando se envia y valido
function getEmailConfig() {
  // Leo template desde el form de contacto 
  var f = document.getElementById("contact-form");
  var SERVICE_ID = f ? (f.dataset.emailjsService || "") : "";
  var TEMPLATE_ID = f ? (f.dataset.emailjsTemplate || "") : "";
  var PUBLIC_KEY = "_v0uEUNkflsV7pfGo"; // mi public key de EmailJS

  if (!SERVICE_ID || !TEMPLATE_ID) {
    throw new Error("Falta configurar SERVICE_ID o TEMPLATE_ID en el form (data-emailjs-*)");
  }
  return { SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY };
}

/* Funciones de validaciones de form */
// Valida formato básico de email
function isValidEmail(str) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(str).trim());
}
// Marca/desmarca un campo como inválido para feedback
function setFieldError(inputEl, hasError) {
  if (!inputEl) return;
  inputEl.setAttribute("aria-invalid", hasError ? "true" : "false");
  if (hasError) inputEl.classList.add("is-invalid");
  else inputEl.classList.remove("is-invalid");
}

// Valida formato del nombre
function isValidName(value) {
  const s = String(value || "").trim();
  if (s.length < 2) return false;
  if (/\d/.test(s)) return false;
  return /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü' -]+$/.test(s);
}

// Helpers
function summarizeBrief(items) {
  try {
    if (!Array.isArray(items) || items.length === 0) return "Sin ítems en el brief.";
    return items.map(function (it, i) {
      var line1 = (i + 1) + ") " + (it.titulo || "Servicio") + " (Cant: " + (it.cantidad || 1) + ")";
      var alcance = "   - Alcance: " + (it.alcance ? String(it.alcance) : "—");
      var notas = "   - Notas: " + (it.notas ? String(it.notas) : "—");
      return [line1, alcance, notas].join("\n");
    }).join("\n\n");
  } catch (e) {
    console.error("summarizeBrief error", e);
    return "No se pudo generar el resumen del brief.";
  }
}

// "Solicitud enviada" con un snapshot del brief
function renderSentSummary(items, rawJson) {
  var box = byId("sent-summary");
  var list = byId("sent-summary-list");
  var preEl = byId("sent-summary-json");
  if (!box || !list) return;

  list.innerHTML = "";

  if (!Array.isArray(items) || items.length === 0) {
    list.innerHTML =
      '<li class="brief-item"><div class="brief-item__main"><strong class="brief-item__title">Sin ítems</strong><div class="brief-item__meta">No se agregaron servicios al brief.</div></div></li>';
  } else {
    items.forEach(function (it) {
      var li = document.createElement("li");
      li.className = "brief-item";
      li.innerHTML =
        '<div class="brief-item__main">' +
        '<strong class="brief-item__title">' + escapeHTML(it.titulo || "Servicio") + '</strong>' +
        '<div class="brief-item__meta">' +
        '<span><b>Cant.:</b> ' + (it.cantidad || 1) + '</span>' +
        '<span><b>Alcance:</b> ' + escapeHTML(it.alcance || "—") + '</span>' +
        '<span><b>Notas:</b> ' + escapeHTML(it.notas || "—") + '</span>' +
        '</div>' +
        '</div>';
      list.appendChild(li);
    });
  }

  if (preEl) preEl.textContent = rawJson || "[]";
  box.hidden = false;

  try { box.scrollIntoView({ behavior: "smooth", block: "start" }); } catch (_) { }
}

// Inicializo manejo del form de contacto
function initContact() {
  const form = byId("contact-form");
  const live = byId("live");
  if (!form || !live) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const data = new FormData(form);
    const nombre = String(data.get("nombre") || "").trim();
    const email = String(data.get("email") || "").trim();
    const mensaje = String(data.get("mensaje") || "").trim();

    const inputNombre = byId("input-nombre");
    const inputEmail = byId("input-email");
    const inputMensaje = byId("input-mensaje");

    // Tomo el JSON del brief desde el textarea oculto
    const briefJson = byId("brief-payload") ? byId("brief-payload").value : "[]";
    let briefText;
    let briefSnapshot = []; // snapshot para mostrar post-envío

    try {
      const parsed = JSON.parse(briefJson);
      briefSnapshot = Array.isArray(parsed) ? parsed.slice() : []; // copia
      briefText = summarizeBrief(parsed);
    } catch (_) {
      briefText = "No se pudo leer el brief.";
    }

    // Limpio estados previos de error
    setFieldError(inputNombre, false);
    setFieldError(inputEmail, false);
    setFieldError(inputMensaje, false);

    /* Validaciones del forms antes de enviar */

    // Brief vacío
    if (Array.isArray(briefSnapshot) && briefSnapshot.length === 0) {
      live.textContent = "Agregá al menos un servicio a tu solicitud.";
      return;
    }

    // Nombre / Email faltantes
    const faltanNombre = !nombre;
    const faltanEmail = !email;

    if (faltanNombre && faltanEmail) {
      setFieldError(inputNombre, true);
      setFieldError(inputEmail, true);
      if (inputNombre) inputNombre.focus();
      live.textContent = "Completá nombre y email.";
      return;
    }

    if (faltanNombre) {
      setFieldError(inputNombre, true);
      if (inputNombre) inputNombre.focus();
      live.textContent = "Completá el nombre.";
      return;
    }

    if (faltanEmail) {
      setFieldError(inputEmail, true);
      if (inputEmail) inputEmail.focus();
      live.textContent = "Completá el email.";
      return;
    }
    //  Nombre con formato inválido
    if (!isValidName(nombre)) {
      setFieldError(inputNombre, true);
      if (inputNombre) inputNombre.focus();
      live.textContent = "Ingresá un nombre válido (sólo letras, mínimo 2 caracteres).";
      return;
    }

    // Email con formato inválido
    if (!isValidEmail(email)) {
      setFieldError(inputEmail, true);
      if (inputEmail) inputEmail.focus();
      live.textContent = "Ingresá un email válido (ej: nombre@dominio.com).";
      return;
    }

    // Mensaje vacío
    if (!mensaje) {
      setFieldError(inputMensaje, true);
      if (inputMensaje) inputMensaje.focus();
      live.textContent = "Escribí un mensaje.";
      return;
    }

    // Envío real con EmailJS 
    sendEmailJS({
      nombre: nombre,
      email: email,
      mensaje: mensaje,
      brief_text: briefText,
      brief_json: briefJson
    })
      .then(function () {
        console.log("[OK EmailJS] Envío exitoso, pintando resumen.");
        renderSentSummary(briefSnapshot, briefJson);
        form.reset();
        live.textContent = "¡Gracias! Mensaje enviado correctamente.";
        setTimeout(function () { live.textContent = ""; }, 3000);
      })
      .catch(function (err) {
        console.error("EmailJS error:", err);
        live.textContent = "No pudimos enviar tu mensaje. Probá de nuevo.";
        setTimeout(function () { live.textContent = ""; }, 3000);
      });
  });
}

// Inicializa con PUBLIC_KEY y envía con validación explícita
function sendEmailJS(params) {
  return new Promise(function (resolve, reject) {
    try {
      var cfg = getEmailConfig();

      if (!window.emailjs || !window.emailjs.init || !window.emailjs.send) {
        return reject(new Error('EmailJS SDK no cargó. Verificá <script src="https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js"></script> en <head>.'));
      }

      window.emailjs.init(cfg.PUBLIC_KEY);
      window.emailjs
        .send(cfg.SERVICE_ID, cfg.TEMPLATE_ID, params)
        .then(resolve)
        .catch(reject);

    } catch (cfgErr) {
      reject(cfgErr);
    }
  });
}

/* Cosas utiles */
function announce(msg) {
  var live = byId("live");
  if (!live) return;
  live.textContent = msg;
  setTimeout(function () {
    live.textContent = "";
  }, 2000);
}
function escapeHTML(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

document.addEventListener("DOMContentLoaded", function () {
  initUI();
  renderBrief();
  bindBriefEvents();
  bindServiceButtons();
  initContact();
});
