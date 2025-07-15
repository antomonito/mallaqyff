document.addEventListener("DOMContentLoaded", function () {
  const ramos = document.querySelectorAll(".ramo");

  // Desactivar todos los ramos con prerrequisitos al inicio
  ramos.forEach(ramo => {
    const prereqs = ramo.dataset.prereqs.split(",").filter(p => p.trim() !== "");
    if (prereqs.length > 0) {
      ramo.classList.add("bloqueado");
      ramo.querySelector("button").disabled = true;
    }
  });

  // Función global para que el botón llame
  window.aprobar = function (btn) {
    const ramo = btn.parentElement;
    const nombre = ramo.dataset.nombre;

    // Guardar en localStorage
    localStorage.setItem("aprobado_" + nombre, "true");

    // Marcar visualmente
    ramo.classList.remove("bloqueado");
    ramo.classList.add("aprobado");
    btn.disabled = true;

    // Intentar desbloquear otros
    desbloquearRamos();
  };

  window.reiniciar = function () {
    ramos.forEach(ramo => {
      const nombre = ramo.dataset.nombre;
      localStorage.removeItem("aprobado_" + nombre);
    });
    location.reload();
  };

  function desbloquearRamos() {
    ramos.forEach(ramo => {
      if (!ramo.classList.contains("aprobado")) {
        const prereqs = ramo.dataset.prereqs.split(",").filter(p => p.trim() !== "");
        const cumplidos = prereqs.every(p => localStorage.getItem("aprobado_" + p) === "true");
        if (cumplidos && prereqs.length > 0) {
          ramo.classList.remove("bloqueado");
          ramo.querySelector("button").disabled = false;
        }
      }
    });
  }

  // Restaurar estado anterior
  ramos.forEach(ramo => {
    const nombre = ramo.dataset.nombre;
    if (localStorage.getItem("aprobado_" + nombre) === "true") {
      ramo.classList.add("aprobado");
      ramo.querySelector("button").disabled = true;
    }
  });

  desbloquearRamos();
});
