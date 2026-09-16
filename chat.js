/**
 * HealthAI - Chat Controller
 * 
 * Manages chat interface events, message stream rendering,
 * typing animations, suggested prompt chips, and localStorage persistence.
 */

document.addEventListener("DOMContentLoaded", function () {
  'use strict';

  // DOM Elements
  const chatMessages = document.getElementById("chatMessages");
  const chatForm = document.getElementById("chatForm");
  const chatInput = document.getElementById("chatInput");
  const sendBtn = document.getElementById("sendBtn");
  const clearChatBtn = document.getElementById("clearChatBtn");
  const typingIndicator = document.getElementById("typingIndicator");
  const suggestedChipsContainer = document.getElementById("suggestedChipsContainer");
  const chatStatusText = document.getElementById("chatStatusText");

  // Storage key
  const STORAGE_KEY = "healthai_conversation_history_v1";

  /**
   * Helper to escape HTML characters in user input to prevent XSS
   */
  function escapeHTML(str) {
    const p = document.createElement("p");
    p.textContent = str;
    return p.innerHTML;
  }

  /**
   * Formats current time into a clean human-readable string (e.g., '10:45 AM')
   */
  function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  /**
   * Scrolls chat stream smoothly to the newest message
   */
  function scrollToBottom() {
    setTimeout(() => {
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 50);
  }

  /**
   * Saves message array to browser localStorage
   */
  function saveHistory(messages) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch (e) {
      console.warn("Could not save conversation to localStorage:", e);
    }
  }

  /**
   * Loads saved history from localStorage
   */
  function loadHistory() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.warn("Could not parse conversation from localStorage:", e);
      return null;
    }
  }

  /**
   * Renders a User Message Bubble into the chat stream
   */
  function appendUserMessage(text, timestamp = null) {
    const time = timestamp || getCurrentTime();
    const row = document.createElement("div");
    row.className = "message-row user-row";
    row.innerHTML = `
      <div class="msg-bubble user-bubble">
        <p>${escapeHTML(text)}</p>
        <span class="msg-timestamp">${time}</span>
      </div>
    `;
    chatMessages.appendChild(row);
    scrollToBottom();
  }

  /**
   * Renders an AI Response Bubble with structured healthcare formatting
   */
  function appendBotMessage(data, timestamp = null) {
    const time = timestamp || getCurrentTime();
    const row = document.createElement("div");
    row.className = "message-row bot-row";

    let bodyHTML = "";

    // Check if it's an emergency alert
    if (data.isEmergency) {
      bodyHTML = `
        <div class="emergency-callout-card">
          <div class="emergency-header">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2">
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <span>${escapeHTML(data.title)}</span>
          </div>
          <p>${data.overview}</p>
          <div class="emergency-helplines">
            <span>🚨 Dial Emergency Immediately: 911 (US) | 112 (EU/India) | 999 (UK)</span>
          </div>
        </div>
      `;
    } 
    // Check if it's raw text from a real remote LLM API
    else if (data.isRemote && data.rawText) {
      const formattedLines = data.rawText
        .split('\n')
        .map(line => `<p>${escapeHTML(line)}</p>`)
        .join('');

      bodyHTML = `
        <div class="response-card">
          <div class="response-header">
            <h4 class="response-topic-title">${escapeHTML(data.title)}</h4>
            <span class="response-category-badge">${escapeHTML(data.category)}</span>
          </div>
          <div class="remote-content">${formattedLines}</div>
          <div class="doctor-callout">
            <strong>Medical Notice:</strong> ${escapeHTML(data.reminder)}
          </div>
        </div>
      `;
    } 
    // Standard structured offline response
    else {
      let symptomsList = "";
      if (data.symptoms && data.symptoms.length > 0) {
        symptomsList = `
          <div class="info-block">
            <h5 class="block-title symptoms">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 14 14"/>
              </svg>
              Common Signs & Symptoms
            </h5>
            <ul class="info-list">
              ${data.symptoms.map(s => `<li>${escapeHTML(s)}</li>`).join('')}
            </ul>
          </div>
        `;
      }

      let selfCareList = "";
      if (data.selfCare && data.selfCare.length > 0) {
        selfCareList = `
          <div class="info-block">
            <h5 class="block-title self-care">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
              General Self-Care Measures
            </h5>
            <ul class="info-list">
              ${data.selfCare.map(c => `<li>${escapeHTML(c)}</li>`).join('')}
            </ul>
          </div>
        `;
      }

      let whenToConsultList = "";
      if (data.whenToConsult && data.whenToConsult.length > 0) {
        whenToConsultList = `
          <div class="info-block">
            <h5 class="block-title doctor-alert">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              When to Consult a Qualified Doctor
            </h5>
            <ul class="info-list warning-list">
              ${data.whenToConsult.map(w => `<li>${escapeHTML(w)}</li>`).join('')}
            </ul>
          </div>
        `;
      }

      bodyHTML = `
        <div class="response-card">
          <div class="response-header">
            <h4 class="response-topic-title">${escapeHTML(data.title)}</h4>
            <span class="response-category-badge">${escapeHTML(data.category)}</span>
          </div>

          <div class="info-block">
            <p>${data.overview}</p>
          </div>

          ${symptomsList}
          ${selfCareList}
          ${whenToConsultList}

          <div class="doctor-callout">
            <strong>Important Reminder:</strong> ${escapeHTML(data.reminder || "For personal medical diagnosis or treatment, please consult a licensed physician.")}
          </div>
        </div>
      `;
    }

    row.innerHTML = `
      <div class="msg-avatar">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z"/>
        </svg>
      </div>
      <div class="msg-bubble bot-bubble">
        <div class="msg-content">
          ${bodyHTML}
          <div class="safety-tag">
            <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
            </svg>
            Educational Health Guidance • Non-Diagnostic
          </div>
        </div>
        <span class="msg-timestamp">${time}</span>
      </div>
    `;

    chatMessages.appendChild(row);
    scrollToBottom();
  }

  /**
   * Manages state and sends a message to AIService
   */
  async function handleUserSubmit(queryText) {
    const trimmed = queryText.trim();
    if (!trimmed) return;

    // 1. Render user message
    const userTimestamp = getCurrentTime();
    appendUserMessage(trimmed, userTimestamp);

    // Save to history array
    currentHistory.push({
      sender: "user",
      text: trimmed,
      timestamp: userTimestamp
    });
    saveHistory(currentHistory);

    // 2. Clear input & toggle UI to loading state
    chatInput.value = "";
    chatInput.disabled = true;
    sendBtn.disabled = true;
    if (chatStatusText) chatStatusText.textContent = "HealthAI is thinking...";

    // 3. Display typing animation
    typingIndicator.style.display = "flex";
    scrollToBottom();

    // 4. Natural response latency simulation (600ms to 900ms)
    const delay = Math.floor(Math.random() * 300) + 600;

    setTimeout(async () => {
      try {
        const responseData = await AIService.processQuery(trimmed);

        // Hide typing indicator
        typingIndicator.style.display = "none";

        // Render Bot response
        const botTimestamp = getCurrentTime();
        appendBotMessage(responseData, botTimestamp);

        // Save to history
        currentHistory.push({
          sender: "bot",
          data: responseData,
          timestamp: botTimestamp
        });
        saveHistory(currentHistory);
      } catch (err) {
        console.error("Chat submission error:", err);
        typingIndicator.style.display = "none";
        appendBotMessage({
          isFallback: true,
          category: "System Notice",
          title: "Service Temporarily Busy",
          overview: "An error occurred while processing your request. Please try again or rephrase your question.",
          symptoms: [],
          selfCare: ["Check your question for typos", "Ensure your device is connected to the internet if using a live API"],
          whenToConsult: ["Consult a physician for any active health symptoms."],
          reminder: "HealthAI remains operational for general health inquiries."
        });
      } finally {
        // Reset UI state
        chatInput.disabled = false;
        sendBtn.disabled = false;
        if (chatStatusText) chatStatusText.textContent = "Ready to assist with general health information";
        chatInput.focus();
      }
    }, delay);
  }

  /**
   * Initialize chat history from localStorage or set initial state
   */
  let currentHistory = loadHistory();

  if (currentHistory && Array.isArray(currentHistory) && currentHistory.length > 0) {
    // Clear default HTML welcome if saved messages exist
    chatMessages.innerHTML = "";
    currentHistory.forEach(item => {
      if (item.sender === "user") {
        appendUserMessage(item.text, item.timestamp);
      } else if (item.sender === "bot" && item.data) {
        appendBotMessage(item.data, item.timestamp);
      }
    });
  } else {
    currentHistory = [];
  }

  // --- Event Listeners ---

  // 1. Form Submission (Send button or Enter key)
  chatForm.addEventListener("submit", function (e) {
    e.preventDefault();
    handleUserSubmit(chatInput.value);
  });

  // 2. Clear Chat Button
  clearChatBtn.addEventListener("click", function () {
    if (confirm("Are you sure you want to clear your conversation history?")) {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (e) {}
      currentHistory = [];
      chatMessages.innerHTML = `
        <div class="message-row bot-row" id="welcomeMessage">
          <div class="msg-avatar">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z"/>
            </svg>
          </div>
          <div class="msg-bubble bot-bubble">
            <div class="msg-content">
              <p><strong>Chat history cleared!</strong> I am ready for your next health or wellness question.</p>
              <div class="safety-tag">
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
                </svg>
                Educational only • Not a diagnostic system
              </div>
            </div>
            <span class="msg-timestamp">${getCurrentTime()}</span>
          </div>
        </div>
      `;
      chatInput.focus();
    }
  });

  // 3. Suggested Prompt Chips Click Handler
  suggestedChipsContainer.addEventListener("click", function (e) {
    const chip = e.target.closest(".chip-btn");
    if (!chip) return;

    const query = chip.getAttribute("data-query");
    if (query) {
      chatInput.value = query;
      handleUserSubmit(query);
    }
  });

});
