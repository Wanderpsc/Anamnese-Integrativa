const React = require('react');

// Minimal runtime mock of react-router-dom for unit tests.
// Exposes MemoryRouter / BrowserRouter / Routes / Route / Link / Navigate and the
// hooks used by the pages so tests don't have to load the actual router (ESM) implementation.
module.exports = {
  MemoryRouter: ({ children }) => React.createElement('div', null, children),
  BrowserRouter: ({ children }) => React.createElement('div', null, children),
  Routes: ({ children }) => React.createElement('div', null, children),
  Route: ({ element }) => React.createElement('div', null, element),
  Link: ({ children, ...props }) => React.createElement('a', props, children),
  Navigate: () => null,
  Outlet: () => null,
  useNavigate: () => () => {},
  useParams: () => ({}),
  useLocation: () => ({ pathname: '/', search: '', hash: '', state: null }),
  useSearchParams: () => [new URLSearchParams(), () => {}],
  useMatch: () => null,
};
