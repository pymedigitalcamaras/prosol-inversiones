// Contenido exclusivamente demostrativo. Debe reemplazarse o retirarse antes de publicación.
export const demoBuildings = Array.from({ length: 12 }, (_, index) => ({
  id: `ED-${String(index + 1).padStart(2, "0")}`,
  name: `Edificio demostrativo ${String(index + 1).padStart(2, "0")}`,
  location: "Chile · ubicación no identificable",
  system: ["ACS horizontal y acumulación", "ACS vertical y recirculación", "Modernización de sala técnica"][index % 3],
  summary: [
    "Ejemplo editorial de una evaluación técnica y puesta en marcha acompañada.",
    "Caso simulado para mostrar cómo se presentará el alcance de un proyecto.",
    "Demostración de una solución dimensionada según las condiciones del edificio.",
  ][index % 3],
  image: ["/images/instalaciones/azotea.webp", "/images/instalaciones/instalacion-estanque.webp", "/images/instalaciones/instalacion-acs.webp"][index % 3],
}));

export const demoTestimonials = Array.from({ length: 20 }, (_, index) => ({
  id: `TD-${String(index + 1).padStart(2, "0")}`,
  role: ["Administrador · rol simulado", "Presidente de comité · rol simulado", "Asesor en copropiedad · rol simulado", "Mayordomo · rol simulado"][index % 4],
  quote: [
    "Texto demostrativo sobre una explicación clara del alcance y los supuestos del proyecto.",
    "Texto demostrativo sobre la utilidad de recibir antecedentes para conversar con el comité.",
    "Texto demostrativo sobre el acompañamiento durante la evaluación y la puesta en marcha.",
    "Texto demostrativo sobre una coordinación técnica ordenada con el equipo del edificio.",
  ][index % 4],
}));

export const demoTechnicalConfirmations = Array.from({ length: 6 }, (_, index) => ({
  id: `CT-${String(index + 1).padStart(2, "0")}`,
  role: ["Conserje · rol simulado", "Mayordomo · rol simulado", "Administrador · rol simulado"][index % 3],
  quote: [
    "Confirmación técnica simulada: el contenido destacará la facilidad para revisar el estado del sistema.",
    "Confirmación técnica simulada: el contenido explicará el valor de contar con una pauta de monitoreo.",
    "Confirmación técnica simulada: el contenido describirá una escalación clara ante una anomalía.",
  ][index % 3],
}));
