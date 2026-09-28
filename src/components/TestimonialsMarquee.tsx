import { useEffect, useRef } from "react";
import { Quote, Star } from "lucide-react";

const placeholders = ["01", "02", "03", "04", "05"];

export function TestimonialsMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const draggingRef = useRef(false);
  const lastXRef = useRef(0);

  useEffect(() => {
    let frame = 0;
    let lastTime = 0;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const animate = (time: number) => {
      const width = groupRef.current?.getBoundingClientRect().width ?? 0;
      if (width) {
        if (!draggingRef.current && !reduceMotion.matches && lastTime) {
          offsetRef.current -= Math.min(time - lastTime, 64) * 0.025;
        }
        offsetRef.current = ((offsetRef.current % width) + width) % width;
        if (trackRef.current) trackRef.current.style.transform = `translate3d(${-width + offsetRef.current}px,0,0)`;
      }
      lastTime = time;
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  function onPointerDown(event: React.PointerEvent<HTMLDivElement>) {
    draggingRef.current = true;
    lastXRef.current = event.clientX;
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!draggingRef.current) return;
    offsetRef.current += event.clientX - lastXRef.current;
    lastXRef.current = event.clientX;
  }

  function onPointerUp() {
    draggingRef.current = false;
  }

  const cards = (copy: number) => (
    <div className="testimonial-group" ref={copy === 0 ? groupRef : undefined} aria-hidden={copy !== 1} key={copy}>
      {placeholders.map((item, index) => (
        <div className={`testimonial-placeholder testimonial-placeholder-${index + 1}`} key={item}>
          <div className="testimonial-stars" aria-hidden="true">{Array.from({ length: 5 }, (_, star) => <Star key={star} size={15} fill="currentColor" />)}</div>
          <Quote size={37} strokeWidth={1.3} aria-hidden="true" />
          <span>Aguardando print do Google</span>
          <small>AVALIAÇÃO {item}</small>
        </div>
      ))}
    </div>
  );

  return (
    <div
      className="testimonial-viewport"
      aria-label="Espaço reservado para avaliações do Google"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onLostPointerCapture={onPointerUp}
    >
      <div ref={trackRef} className="testimonial-track">{[0, 1, 2].map(cards)}</div>
    </div>
  );
}