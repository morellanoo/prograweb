/* Utilidades */
// Acceso por id
function byId(id) { return document.getElementById(id); }
// querySelector y querySelectorAll con contenedor opcional.
function q(sel, el = document) { return el.querySelector(sel); }
function qa(sel, el = document) { return Array.from(el.querySelectorAll(sel)); }

/* Acceso local */
const STORAGE_KEY = "bshopper:brief";

function storageLoad() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
    catch (e) { console.error("storageLoad", e); return []; }
}
function storageSave(value) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(value)); }
    catch (e) { console.error("storageSave", e); }
}
function storageClear() { localStorage.removeItem(STORAGE_KEY); }

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
            '<strong class="brief-item__title">' + escapeHTML(item.titulo) + '</strong>' +
            '<div class="brief-item__meta">' +
            '<span><b>Cant.:</b> ' + item.cantidad + '</span>' +
            '<span><b>Alcance:</b> ' + escapeHTML(item.alcance || "—") + '</span>' +
            '<span><b>Notas:</b> ' + escapeHTML(item.notas || "—") + '</span>' +
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

// Delego eventos del panel del brief.
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

// Delego en la sección #servicios los clicks “Agregar a mi solicitud”
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
// Leo service/template desde el form de contacto 
var EMAILJS_CONFIG = {
    SERVICE_ID: (function () {
        var f = document.getElementById("contact-form");
        return f ? (f.dataset.emailjsService || "") : "";
    })(),
    TEMPLATE_ID: (function () {
        var f = document.getElementById("contact-form");
        return f ? (f.dataset.emailjsTemplate || "") : "";
    })(),
    PUBLIC_KEY: "_v0uEUNkflsV7pfGo" // mi public key de EmailJS
};

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

// Pinta el panel "Solicitud enviada" con un snapshot del brief
function renderSentSummary(items, rawJson) {
    var box = byId("sent-summary");
    var list = byId("sent-summary-list");
    var preEl = byId("sent-summary-json");
    if (!box || !list || !preEl) return;

    list.innerHTML = "";

    if (!Array.isArray(items) || items.length === 0) {
        list.innerHTML = '<li class="brief-item"><div class="brief-item__main"><strong class="brief-item__title">Sin ítems</strong><div class="brief-item__meta">No se agregaron servicios al brief.</div></div></li>';
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

    preEl.textContent = rawJson || "[]";
    box.hidden = false;
    // lo llevo a la vista para feedback inmediato
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
        const nombre = data.get("nombre");
        const email = data.get("email");
        const mensaje = data.get("mensaje");

        // Tomo el JSON del brief desde el textarea oculto
        const briefJson = byId("brief-payload") ? byId("brief-payload").value : "[]";
        let briefText;
        let briefSnapshot = []; // <-- NUEVO

        try {
            const parsed = JSON.parse(briefJson);
            briefSnapshot = Array.isArray(parsed) ? parsed.slice() : []; // copia
            briefText = summarizeBrief(parsed);
        } catch (_) {
            briefText = "No se pudo leer el brief.";
        }




        // Validación
        if (!nombre || !email || !mensaje) {
            live.textContent = "Completá nombre, email y mensaje.";
            return;
        }

        // Envío con EmailJS 
        sendEmailJS({
            nombre: nombre,
            email: email,
            mensaje: mensaje,
            brief_text: briefText,
            brief_json: briefJson
        })
            .then(function () {
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

// Inicializa con PUBLIC_KEY y envía.
function sendEmailJS(params) {
    return new Promise(function (resolve, reject) {
        function doSend() {
            window.emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
            window.emailjs
                .send(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.TEMPLATE_ID, params)
                .then(resolve).catch(reject);
        }
        if (!window.emailjs) {
            var s = document.createElement("script");
            s.src = "https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js";
            s.onload = doSend;
            s.onerror = reject;
            document.head.appendChild(s);
        } else {
            doSend();
        }
    });
}

/* Cosas utiles */
function announce(msg) {
    var live = byId("live");
    if (!live) return;
    live.textContent = msg;
    setTimeout(function () { live.textContent = ""; }, 2000);
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
