"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import { useEffect, useState } from "react";

const slides = [
  {
    image: "/images/slider/slider-1-corregido.webp",
    alt: "Bombas de calor termodinámicas NAE y estanque de acero inoxidable en sala técnica de edificio",
    eyebrow: "Bombas de calor para edificios y copropiedades",
    title: "Bombas de calor termodinámicas de 3ra generación para ACS.",
    text: "Venta, instalación y asesoría técnica de bombas de calor NAE. Dimensionadas para las condiciones reales de su edificio o comunidad.",
    href: "/catalogo", action: "Ver catálogo de bombas de calor",
  },
  {
    image: "/images/slider/slider-5.webp",
    alt: "Sistema de bombas de calor instalado en azotea de edificio residencial",
    eyebrow: "Para administradores y comités",
    title: "Instalación profesional de bombas de calor en edificios.",
    text: "Evaluamos consumo, infraestructura y continuidad operativa antes de instalar una bomba de calor en su comunidad.",
    href: "/contacto?perfil=administrador", action: "Solicitar evaluación técnica",
  },
  {
    image: "/images/slider/slider-0.webp",
    alt: "Asesores en copropiedad evaluando soluciones de bombas de calor para edificios",
    eyebrow: "Canal asesor en copropiedad",
    title: "Venda bombas de calor a las comunidades que asesora.",
    text: "Presente soluciones de bombas de calor NAE, acompañe la evaluación y construya una relación comercial legítima con Prosol.",
    href: "/contacto?perfil=asesor", action: "Conocer el canal de asesores",
  },
  {
    image: "/images/slider/slider-4.webp",
    alt: "Equipo técnico de Prosol instalando bombas de calor en sala técnica",
    eyebrow: "Ingeniería y servicio técnico",
    title: "Una bomba de calor termodinámica no se instala como una caldera.",
    text: "Departamento de ingeniería especializado, capacitación en China y acompañamiento técnico durante la puesta en marcha de cada bomba de calor.",
    href: "/centro-tecnico", action: "Conocer el enfoque técnico",
  },
  {
    image: "/images/slider/slider-3.webp",
    alt: "Edificios residenciales con sistema de bomba de calor instalado",
    eyebrow: "Más de 10 años de experiencia",
    title: "Asesoría técnica y respaldo en bombas de calor NAE.",
    text: "Exclusividad con proveedores y un equipo que acompaña a administradores, comités y asesores en la adopción de bombas de calor.",
    href: "/nosotros", action: "Por qué elegir Prosol",
  },
];

export function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setCurrent((value) => (value + 1) % slides.length), 7500);
    return () => window.clearInterval(timer);
  }, [paused]);

  const go = (index: number) => setCurrent((index + slides.length) % slides.length);

  return (
    <section className="hero" aria-label="Presentación de Prosol">
      <div className="hero-slides">
        {slides.map((slide, index) => (
          <article className={`hero-slide ${index === current ? "active" : ""}`} key={slide.image} aria-hidden={index !== current}>
            <Image src={slide.image} alt={index === current ? slide.alt : ""} fill priority={index === 0} sizes="100vw" />
            <div className="hero-overlay" />
            <div className="container hero-content">
              <div className="hero-copy">
                <span className="eyebrow">{slide.eyebrow}</span>
                {index === 0 ? <h1>{slide.title}</h1> : <h2>{slide.title}</h2>}
                <p>{slide.text}</p>
                <Link className="button" href={slide.href} tabIndex={index === current ? 0 : -1}>{slide.action}<ArrowRight size={18} /></Link>
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="container hero-controls">
        <div className="hero-count"><strong>{String(current + 1).padStart(2, "0")}</strong><span>/ {String(slides.length).padStart(2, "0")}</span></div>
        <div className="hero-progress" role="tablist" aria-label="Seleccionar diapositiva">
          {slides.map((slide, index) => <button key={slide.image} role="tab" aria-selected={index === current} aria-label={`Diapositiva ${index + 1}`} onClick={() => go(index)}><span /></button>)}
        </div>
        <div className="hero-arrows">
          <button onClick={() => setPaused(!paused)} aria-label={paused ? "Reanudar cambio automático" : "Pausar cambio automático"}>{paused ? <Play size={17} /> : <Pause size={17} />}</button>
          <button onClick={() => go(current - 1)} aria-label="Diapositiva anterior"><ArrowLeft /></button>
          <button onClick={() => go(current + 1)} aria-label="Diapositiva siguiente"><ArrowRight /></button>
        </div>
      </div>
    </section>
  );
}
