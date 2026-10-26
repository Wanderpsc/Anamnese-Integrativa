// Minimal assistant config — editable list of assistants the user uses (Asclépio / Higina)
// We keep only names and a helpful external redirect URL pattern. The app does not
// store or manage user credentials; users will paste the generated prompt into their
// ChatGPT (or later connect using an API key if they choose).
const ASSISTANTS = [
  { id: 'asclepio', name: 'Asclépio', chatUrl: 'https://chat.openai.com/new' },
  { id: 'higina', name: 'Higina', chatUrl: 'https://chat.openai.com/new' },
];

export default ASSISTANTS;
