import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

afterEach(() => {
  cleanup();
  localStorage.clear();
  document.body.className = '';
  document.documentElement.removeAttribute('data-theme');
  window.history.replaceState({}, '', '/');
});

Object.defineProperty(window.navigator, 'language', {
  value: 'en-US',
  configurable: true
});

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn()
  }))
});

class IntersectionObserverMock implements IntersectionObserver {
  readonly root: Element | Document | null = null;
  readonly rootMargin: string = '';
  readonly scrollMargin: string = '0px 0px 0px 0px';
  readonly thresholds: readonly number[] = [0];

  disconnect(): void {
    // no-op in test environment
  }
  observe(): void {
    // no-op in test environment
  }
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
  unobserve(): void {
    // no-op in test environment
  }
}

vi.stubGlobal('IntersectionObserver', IntersectionObserverMock);
vi.stubGlobal('open', vi.fn());
Element.prototype.scrollIntoView = vi.fn();
