import React, { createContext, useContext, useState } from 'react';
import { DEFAULT_AI_MODEL } from '../config/aiConfig';

const AiModelContext = createContext(null);

export function AiModelProvider({ children }) {
  // Make model configurable at runtime if needed (start with default)
  const [model, setModel] = useState(DEFAULT_AI_MODEL);

  return (
    <AiModelContext.Provider value={{ model, setModel }}>
      {children}
    </AiModelContext.Provider>
  );
}

export function useAiModel() {
  const ctx = useContext(AiModelContext);
  if (!ctx) throw new Error('useAiModel must be used within AiModelProvider');
  return ctx;
}

export default AiModelContext;
