/**
 * HealthAI - AI Service Layer
 * 
 * Handles question interpretation, keyword intent scoring, structured formatting,
 * and seamless bridging to external Real AI APIs (OpenAI / Google Gemini).
 */

const AIService = (function () {
  'use strict';

  /**
   * Optional configuration for Live AI API integration.
   * By default, USE_REAL_AI is false to run 100% offline without dependencies or API costs.
   */
  const CONFIG = {
    USE_REAL_AI: false, // Set to true to route requests to a remote LLM API
    PROVIDER: "gemini", // Options: "gemini" | "openai"
    
    // In standard environments, keys can be injected via process.env or window.ENV.
    // For local student demos, if testing live API, enter your key here.
    // NEVER commit production private keys to public Git repositories!
    API_KEY: (typeof window !== 'undefined' && window.VITE_AI_API_KEY) || "",

    // System prompt ensuring medical safety compliance on remote models
    SYSTEM_PROMPT: `You are HealthAI, a friendly and responsible educational health information assistant for a college project.
STRICT SAFETY INSTRUCTIONS:
1. You are NOT a doctor and cannot diagnose illnesses, provide prescriptions, or replace medical consultations.
2. Provide only objective, evidence-based, general health education and lifestyle awareness.
3. Structure your response into:
   - General Overview
   - Common Signs / Symptoms
   - General Self-Care Measures
   - When to Seek Professional Medical Care
4. If a user describes an acute emergency (chest pain, shortness of breath, severe trauma), advise them to dial emergency services immediately.`
  };

  /**
   * Checks if user input contains critical emergency keywords
   */
  function detectEmergency(normalizedQuery) {
    for (let i = 0; i < EMERGENCY_KEYWORDS.length; i++) {
      const trigger = EMERGENCY_KEYWORDS[i];
      if (normalizedQuery.includes(trigger)) {
        return trigger;
      }
    }
    return null;
  }

  /**
   * Generates urgent red-flag response card for life-threatening queries
   */
  function buildEmergencyResponse(trigger) {
    return {
      isEmergency: true,
      category: "Emergency Medical Alert",
      title: "Urgent Medical Attention Required",
      overview: `You mentioned terms relating to <strong>"${trigger}"</strong>. This may indicate a serious medical emergency that requires prompt clinical attention rather than automated guidance.`,
      symptoms: [
        "Acute crushing chest discomfort or pressure radiating to arm or jaw",
        "Severe shortness of breath or sudden inability to speak full sentences",
        "Sudden numbness or paralysis of the face, arm, or leg",
        "Loss of consciousness, severe trauma, or uncontrollable bleeding"
      ],
      selfCare: [
        "Stop all physical activity immediately and sit or lie down in a safe, supported position.",
        "Alert someone nearby immediately so you are not alone.",
        "Do NOT attempt to drive yourself to the emergency department if experiencing severe distress."
      ],
      whenToConsult: [
        "IMMEDIATELY call your regional emergency telephone number (911 in North America, 112 in the EU/India, 999 in the UK).",
        "Notify emergency responders of your exact location and symptoms clearly."
      ],
      reminder: "Automated chatbots cannot assist in life-threatening medical emergencies. Please contact emergency services right away."
    };
  }

  /**
   * Scores user query against knowledge base categories
   */
  function matchKnowledgeBase(normalizedQuery) {
    let bestMatch = null;
    let highestScore = 0;

    // Tokenize query into clean words
    const queryTokens = normalizedQuery
      .replace(/[^\w\s]/gi, '')
      .split(/\s+/)
      .filter(token => token.length > 2);

    HEALTH_KNOWLEDGE_BASE.forEach(topic => {
      let score = 0;

      // Check title match
      if (normalizedQuery.includes(topic.title.toLowerCase())) {
        score += 15;
      }

      // Check keywords match
      topic.keywords.forEach(keyword => {
        const lowerKeyword = keyword.toLowerCase();
        if (normalizedQuery.includes(lowerKeyword)) {
          score += 10;
        } else {
          // Token overlap check
          const keywordParts = lowerKeyword.split(/\s+/);
          keywordParts.forEach(part => {
            if (queryTokens.includes(part)) {
              score += 3;
            }
          });
        }
      });

      if (score > highestScore) {
        highestScore = score;
        bestMatch = topic;
      }
    });

    // Require a minimum confidence threshold
    return highestScore >= 5 ? bestMatch : null;
  }

  /**
   * Fallback response when user inquiry falls outside offline knowledge base
   */
  function buildFallbackResponse(rawQuery) {
    return {
      isFallback: true,
      category: "General Health Notice",
      title: "Educational Scope Notice",
      overview: `Thank you for asking about this topic. As an educational prototype for a college project, HealthAI's offline knowledge base is currently focused on common wellness topics like colds, fevers, headaches, coughs, hydration, sleep, nutrition, exercise, mental wellness, and first aid.`,
      symptoms: [
        "Health symptoms can vary widely depending on personal medical history, genetics, age, and lifestyle.",
        "Online information cannot account for individual biological complexities."
      ],
      selfCare: [
        "Maintain a daily log of your specific symptoms, when they began, and what makes them better or worse.",
        "Focus on fundamental wellness practices: adequate water intake, wholesome nutrition, and sufficient rest.",
        "Refrain from self-medicating or using unverified home remedies without clinical guidance."
      ],
      whenToConsult: [
        "Schedule an appointment with a qualified primary care physician or healthcare specialist.",
        "Consult a pharmacist or licensed nurse for questions regarding medications or persistent symptoms.",
        "If you experience any sudden, severe, or alarming symptoms, seek immediate medical attention."
      ],
      reminder: "This chatbot is designed for general health awareness and cannot replace a doctor's examination."
    };
  }

  /**
   * Calls a remote AI API (e.g., Google Gemini or OpenAI) if configured by the student
   */
  async function queryRemoteAI(queryText) {
    if (!CONFIG.API_KEY) {
      console.warn("HealthAI: Real AI API requested but API_KEY is empty. Falling back to offline engine.");
      return null;
    }

    try {
      if (CONFIG.PROVIDER === "gemini") {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${CONFIG.API_KEY}`;
        const payload = {
          contents: [
            { role: "user", parts: [{ text: `${CONFIG.SYSTEM_PROMPT}\n\nUser Question: ${queryText}` }] }
          ]
        };

        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });

        if (!response.ok) {
          throw new Error(`Gemini API HTTP ${response.status}`);
        }

        const data = await response.json();
        const candidate = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (candidate) {
          return {
            isRemote: true,
            title: "AI Health Information Response",
            category: "Live AI Response",
            rawText: candidate,
            reminder: "Generated by an educational AI assistant. Always verify medical queries with a certified healthcare provider."
          };
        }
      } else if (CONFIG.PROVIDER === "openai") {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${CONFIG.API_KEY}`
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
              { role: "system", content: CONFIG.SYSTEM_PROMPT },
              { role: "user", content: queryText }
            ],
            temperature: 0.7
          })
        });

        if (!response.ok) {
          throw new Error(`OpenAI API HTTP ${response.status}`);
        }

        const data = await response.json();
        const text = data.choices?.[0]?.message?.content;
        if (text) {
          return {
            isRemote: true,
            title: "AI Health Information Response",
            category: "Live AI Response",
            rawText: text,
            reminder: "Generated by an educational AI assistant. Always verify medical queries with a certified healthcare provider."
          };
        }
      }
    } catch (err) {
      console.error("HealthAI Remote API Error:", err);
      // Returns null to cleanly trigger offline knowledge base fallback
      return null;
    }

    return null;
  }

  /**
   * Main Public Method: Processes query and returns structured answer
   */
  async function processQuery(rawQuery) {
    if (!rawQuery || !rawQuery.trim()) {
      return {
        isFallback: true,
        category: "Input Required",
        title: "Please ask a question",
        overview: "Please type a health or wellness-related question so I can assist you.",
        symptoms: [],
        selfCare: [],
        whenToConsult: [],
        reminder: "Ask about colds, sleep, hydration, nutrition, headaches, or first aid."
      };
    }

    const trimmed = rawQuery.trim();
    const normalized = trimmed.toLowerCase();

    // 1. Check for critical emergency keywords
    const emergencyTrigger = detectEmergency(normalized);
    if (emergencyTrigger) {
      return buildEmergencyResponse(emergencyTrigger);
    }

    // 2. If Real AI API is enabled in CONFIG, attempt remote API query
    if (CONFIG.USE_REAL_AI && CONFIG.API_KEY) {
      const remoteResult = await queryRemoteAI(trimmed);
      if (remoteResult) {
        return remoteResult;
      }
    }

    // 3. Match against structured offline knowledge base
    const matchedKnowledge = matchKnowledgeBase(normalized);
    if (matchedKnowledge) {
      return {
        isEmergency: false,
        category: matchedKnowledge.category,
        title: matchedKnowledge.title,
        overview: matchedKnowledge.overview,
        symptoms: matchedKnowledge.symptoms,
        selfCare: matchedKnowledge.selfCare,
        whenToConsult: matchedKnowledge.whenToConsult,
        reminder: matchedKnowledge.reminder
      };
    }

    // 4. Safe fallback for out-of-scope queries
    return buildFallbackResponse(trimmed);
  }

  // Expose public API
  return {
    processQuery,
    CONFIG
  };
})();
