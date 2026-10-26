// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Mock react-router-dom for the Jest environment so tests can run without
// transforming ESM-only router packages. This provides minimal router
// primitives (MemoryRouter/BrowserRouter/Routes/Route/Link/useNavigate)
// that are sufficient for our unit tests.
// Note: react-router-dom is ESM in recent versions and sometimes causes resolution
// issues inside the Jest environment. A manual mock lives at src/__mocks__/react-router-dom.js
// so test files can import router primitives without transforming the real package.

// Polyfill missing TextEncoder/TextDecoder in the Jest/node environment used by react-scripts
// (some libraries such as @mui/x-data-grid rely on them). Node >= 11 provides util.TextEncoder
if (typeof global.TextEncoder === 'undefined') {
	const { TextEncoder, TextDecoder } = require('util');
	global.TextEncoder = TextEncoder;
	global.TextDecoder = TextDecoder;
}

// Provide a no-op getContext on HTMLCanvasElement for jsdom so libraries like jspdf/html2pdf
// which call canvas.getContext won't throw during test imports.
// Ensure getContext exists and is safe for tests (jspdf/html2pdf call this during import)
try {
	HTMLCanvasElement.prototype.getContext = HTMLCanvasElement.prototype.getContext || function () { return {}; };
} catch (e) {
	// if HTMLCanvasElement is not defined in this environment, ignore
}

// Provide test-time stubs for html2pdf and window.print so tests don't spam the console when
// the real libraries or browser features are absent in jsdom.
try {
	// If jest.mock is available in this context, register a mock for html2pdf.js
	// otherwise some test files already mock html2pdf locally.
	// eslint-disable-next-line no-undef
	if (typeof jest !== 'undefined') {
		// Avoid double-mocking if tests already mock it
		try {
			jest.mock('html2pdf.js', () => jest.fn(() => ({ set: () => ({ from: () => ({ save: jest.fn() }) }) })));
		} catch (e) {
			// ignore if already mocked per-test
		}
	}
} catch (err) {
	// ignore
}

// stub window.print so jsdom doesn't complain when our code falls back to print()
if (typeof window !== 'undefined' && typeof window.print === 'undefined') {
	// eslint-disable-next-line no-empty-function
	window.print = () => {};
}
