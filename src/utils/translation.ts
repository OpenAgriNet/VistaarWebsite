// Translation utility functions

export const translateText = async (
  texts: string[],
  targetLanguage: string
): Promise<Record<string, string>> => {
  const translations: Record<string, string> = {};
  
  // Remove duplicates and filter empty strings
  const uniqueTexts = Array.from(new Set(texts)).filter(text => text.trim().length > 0);
  
  if (uniqueTexts.length === 0) {
    return translations;
  }

  // Split into chunks of 25 (API limit)
  const chunks: string[][] = [];
  for (let i = 0; i < uniqueTexts.length; i += 25) {
    chunks.push(uniqueTexts.slice(i, i + 25));
  }

  // Call API for each chunk
  for (const chunk of chunks) {
    try {
      const response = await fetch('https://translation-plugin.bhashini.co.in/v2/translate-text', {
        method: 'POST',
        headers: {
          'Accept': '*/*',
          'Accept-Language': 'en-US,en;q=0.9,en-IN;q=0.8',
          'Connection': 'keep-alive',
          'Content-Type': 'application/json',
          'Origin': 'https://vistaar.da.gov.in',
          'Referer': 'https://vistaar.da.gov.in/',
        },
        body: JSON.stringify({
          targetLanguage: targetLanguage,
          textData: chunk,
          sourceLanguage: 'en'
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data)) {
          data.forEach((item: { source: string; target: string }) => {
            translations[item.source] = item.target;
          });
        }
      }
    } catch (error) {
      console.error('Translation API error:', error);
    }
  }

  return translations;
};

