import "@testing-library/jest-dom";
import { vi } from "vitest";

window.scrollTo = vi.fn();

const intersectionObserverMock = () => ({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
});
window.IntersectionObserver = vi.fn().mockImplementation(intersectionObserverMock);

window.Element.prototype.hasPointerCapture = vi.fn();
window.Element.prototype.releasePointerCapture = vi.fn();
window.Element.prototype.scrollIntoView = vi.fn();
