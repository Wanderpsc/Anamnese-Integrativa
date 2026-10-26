// Central AI configuration for the app
// Default model to use for all clients in the application
export const DEFAULT_AI_MODEL = 'Raptor mini (Preview)';
// Internal ID (use for API client selection if needed)
export const DEFAULT_AI_MODEL_ID = 'raptor-mini-preview';

// Add here any model-specific flags or defaults
export const AI_MODELS = {
  'raptor-mini-preview': {
    id: 'raptor-mini-preview',
    name: 'Raptor mini (Preview)',
    description: 'Lightweight preview LLM for client usage',
  },
};
