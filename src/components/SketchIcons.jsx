// Hand-drawn sketch-style SVG icons for the classroom aesthetic

export function SketchStar({ className = "w-6 h-6" }) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 5 C20.5 5 21 7 21.5 12 C22 17 23 18 28 19 C33 20 35 20.5 35 21 C35 21.5 33 22 28 23 C23 24 22 25 21.5 30 C21 35 20.5 37 20 37 C19.5 37 19 35 18.5 30 C18 25 17 24 12 23 C7 22 5 21.5 5 21 C5 20.5 7 20 12 19 C17 18 18 17 18.5 12 C19 7 19.5 5 20 5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function SketchBook({ className = "w-6 h-6" }) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="7" y="5" width="22" height="30" rx="3" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7 5 C7 5 5 5.5 5 20 C5 34.5 7 35 7 35" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
      <path d="M12 12 L24 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M12 17 L24 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M12 22 L20 22" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      <circle cx="7" cy="14" r="1.5" fill="currentColor"/>
      <circle cx="7" cy="22" r="1.5" fill="currentColor"/>
    </svg>
  );
}

export function SketchGraduate({ className = "w-6 h-6" }) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="20" cy="12" rx="10" ry="2.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M10 12 L20 15 L30 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14 14 L14 24 C14 27 17 30 20 30 C23 30 26 27 26 24 L26 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M30 12 L30 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="30" cy="22" r="2" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M20 5 L20 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M20 9 L22 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  );
}

export function SketchClock({ className = "w-6 h-6" }) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="13" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
      <path d="M20 12 L20 21 L25 25" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7 10 C9 7 10 7 12 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export function SketchPencil({ className = "w-6 h-6" }) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 32 L10 26 L26 10 C27.5 8.5 30 8.5 31.5 10 C33 11.5 33 14 31.5 15.5 L15.5 31.5 L9 33 Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M24 12 L28 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M10 26 L14 30" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  );
}

export function SketchPin({ className = "w-6 h-6" }) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 5 C14 5 9 10 9 16 C9 24 20 36 20 36 C20 36 31 24 31 16 C31 10 26 5 20 5Z" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="20" cy="16" r="4" stroke="currentColor" strokeWidth="2"/>
    </svg>
  );
}

export function SketchPeople({ className = "w-6 h-6" }) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="15" cy="12" r="4.5" stroke="currentColor" strokeWidth="2"/>
      <path d="M5 33 C5 27 9 23 15 23 C21 23 25 27 25 33" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="27" cy="13" r="3.5" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M24 33 C24 28 27 24 32 24 C35 24 37 25.5 37 27" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  );
}

export function SketchApple({ className = "w-6 h-6" }) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 10 C20 10 21 5 25 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M14 12 C9 12 6 17 6 22 C6 29 11 36 16 36 C18 36 18.5 35 20 35 C21.5 35 22 36 24 36 C29 36 34 29 34 22 C34 17 31 12 26 12 C24 12 22 13.5 20 13.5 C18 13.5 16 12 14 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function SketchQuote({ className = "w-6 h-6" }) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 10 C8 10 6 14 6 18 C6 22 8.5 24 11 24 C13.5 24 15.5 22 15.5 19.5 C15.5 17 13.5 15 11 15 C10 15 9 15.5 9 15.5 C9 15.5 10 11 14 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M22 10 C22 10 20 14 20 18 C20 22 22.5 24 25 24 C27.5 24 29.5 22 29.5 19.5 C29.5 17 27.5 15 25 15 C24 15 23 15.5 23 15.5 C23 15.5 24 11 28 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function SketchHeart({ className = "w-6 h-6" }) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 33 C20 33 6 24 6 15 C6 10 10 7 14 7 C17 7 19 9 20 10 C21 9 23 7 26 7 C30 7 34 10 34 15 C34 24 20 33 20 33Z" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// Decorative doodle elements for backgrounds
export function DoodleCircle({ className = "" }) {
  return (
    <svg viewBox="0 0 60 60" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M30 5 C45 5 55 15 55 30 C55 45 45 55 30 55 C15 55 5 45 5 30 C5 15 15 5 30 5 Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 3"/>
    </svg>
  );
}

export function DoodleStar({ className = "" }) {
  return (
    <svg viewBox="0 0 30 30" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 3 L16.5 11 L24 9 L18 15 L24 21 L16.5 19 L15 27 L13.5 19 L6 21 L12 15 L6 9 L13.5 11 Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function DoodleArrow({ className = "" }) {
  return (
    <svg viewBox="0 0 50 20" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 10 C10 8 30 9 44 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M38 5 L45 10 L38 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}