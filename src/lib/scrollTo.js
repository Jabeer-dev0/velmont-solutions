export const NAV_OFFSET = 76;

export function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    window.scrollTo({ top: el.offsetTop - NAV_OFFSET, behavior: 'smooth' });
  }
}
