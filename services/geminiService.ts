import { URSResponse } from '../types';

export const generateURS = async (userPrompt: string, systemType: string): Promise<URSResponse> => {
  const response = await fetch('/api/generate-urs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userPrompt,
      systemType,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Failed to generate URS');
  }

  const payload = await response.json();
  if (!payload || typeof payload !== 'object') {
    throw new Error('Unexpected API response');
  }

  return payload as URSResponse;
};
