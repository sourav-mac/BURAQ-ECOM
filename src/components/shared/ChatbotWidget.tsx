"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  X,
  Send,
  ArrowUp,
  RotateCcw,
  Bot,
  User,
} from "lucide-react";
import {
  ChatMessage,
  getChatbotResponse,
} from "@/lib/chatbot-data";

// Web Audio API sound synthesizers for chat interactions
function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (!AudioContextClass) return null;

    const win = window as unknown as { __buraqAudioCtx?: AudioContext };
    if (!win.__buraqAudioCtx) {
      win.__buraqAudioCtx = new AudioContextClass();
    }
    if (win.__buraqAudioCtx.state === "suspended") {
      win.__buraqAudioCtx.resume();
    }
    return win.__buraqAudioCtx;
  } catch {
    return null;
  }
}

// Gentle pleasant "pop/swoosh" sound on sending message
function playSendSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(420, now);
    osc.frequency.exponentialRampToValueAtTime(750, now + 0.08);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.11);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.11);
  } catch {
    // Ignore audio policy restrictions
  }
}

// Crisp warm two-tone chime on receiving assistant response
function playReceiveSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // Note 1 (D5 ~ 587Hz)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(587.33, now);
    gain1.gain.setValueAtTime(0.10, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.14);

    // Note 2 (A5 ~ 880Hz, offset by 70ms)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = "sine";
    osc2.frequency.setValueAtTime(880, now + 0.07);
    gain2.gain.setValueAtTime(0.001, now);
    gain2.gain.setValueAtTime(0.11, now + 0.07);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.26);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.07);
    osc2.stop(now + 0.26);
  } catch {
    // Ignore audio policy restrictions
  }
}

function getFormattedTime(): string {
  if (typeof window === "undefined") return "";
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const initialMessage: ChatMessage = {
    id: "welcome-1",
    sender: "assistant",
    text: "Hello! 👋 Welcome to **Ask BURAQ**.\nHow can we help you today?",
    timestamp: "",
  };

  const [messages, setMessages] = useState<ChatMessage[]>([initialMessage]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // Set actual local time on mount
    const timeNow = getFormattedTime();
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id.startsWith("welcome")
          ? {
              ...msg,
              timestamp: msg.timestamp || timeNow,
            }
          : msg
      )
    );

    const handleOpenEvent = () => {
      setIsOpen(true);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    };

    window.addEventListener("open-buraq-chatbot", handleOpenEvent);
    return () => window.removeEventListener("open-buraq-chatbot", handleOpenEvent);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("buraq-chatbot-toggle", {
          detail: { isOpen },
        })
      );
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsTyping(true);
    playSendSound();

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: messages.slice(-4),
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const botMsg: ChatMessage = {
          id: `assistant-${Date.now()}`,
          sender: "assistant",
          text: data.reply,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
        setMessages((prev) => [...prev, botMsg]);
        setIsTyping(false);
        playReceiveSound();
        return;
      }
    } catch (err) {
      console.warn("API route unavailable, using local knowledge engine:", err);
    }

    const responseData = getChatbotResponse(text);
    const botMsg: ChatMessage = {
      id: `assistant-${Date.now()}`,
      sender: "assistant",
      text: responseData.text,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, botMsg]);
    setIsTyping(false);
    playReceiveSound();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: "assistant",
        text: "Hello! 👋 Welcome to **Ask BURAQ**.\nHow can we help you today?",
        timestamp: getFormattedTime(),
      },
    ]);
    setIsTyping(false);
  };

  // Helper to render text with clickable emails (without underline, color change, or hover effect)
  const renderTextWithEmails = (text: string, keyPrefix: string | number) => {
    const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/;
    const segments = text.split(emailRegex);

    return segments.map((seg, segIdx) => {
      if (emailRegex.test(seg)) {
        return (
          <a
            key={`${keyPrefix}-mail-${segIdx}`}
            href={`mailto:${seg}`}
            className="cursor-pointer no-underline hover:no-underline font-inherit"
            style={{
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {seg}
          </a>
        );
      }
      return seg;
    });
  };

  // Helper to format text, strip markdown hashtags (#), handle bolding, bullet points, and emails
  const renderFormattedText = (content: string) => {
    return content.split("\n").map((line, lineIdx) => {
      let trimmed = line.trim();
      if (!trimmed) {
        return <div key={lineIdx} className="h-2" />;
      }

      // Check and strip markdown header hashtags (#, ##, ###, ####)
      const isHeader = /^#{1,6}\s+/.test(trimmed);
      if (isHeader) {
        trimmed = trimmed.replace(/^#{1,6}\s+/, "");
      }

      // Remove any lingering heading hashes anywhere in the line like "### Title"
      trimmed = trimmed.replace(/(^|\s)#{1,6}\s*/g, "$1");

      // Check bullet point (•, -, *)
      const isBullet = trimmed.startsWith("•") || trimmed.startsWith("-") || trimmed.startsWith("* ");
      const cleanLine = isBullet ? trimmed.replace(/^[•\-*]\s*/, "") : trimmed;

      // Parse bold segments (**bold**)
      const parts = cleanLine.split(/(\*\*.*?\*\*)/g);
      const parsedParts = parts.map((part, partIdx) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          const boldContent = part.slice(2, -2);
          return (
            <strong key={partIdx} className="font-bold text-buraq-dark">
              {renderTextWithEmails(boldContent, partIdx)}
            </strong>
          );
        }
        
        // Parse italic segments (*italic*)
        const italicParts = part.split(/(\*.*?\*)/g);
        return italicParts.map((iPart, iIdx) => {
          if (iPart.startsWith("*") && iPart.endsWith("*") && iPart.length >= 2) {
            const italicContent = iPart.slice(1, -1);
            return (
              <em key={`${partIdx}-${iIdx}`} className="italic">
                {renderTextWithEmails(italicContent, `${partIdx}-${iIdx}`)}
              </em>
            );
          }
          return renderTextWithEmails(iPart, `${partIdx}-${iIdx}`);
        });
      });

      if (isHeader) {
        return (
          <p key={lineIdx} className="font-bold text-buraq-dark mt-2 mb-0.5 leading-snug">
            {parsedParts}
          </p>
        );
      }

      if (isBullet) {
        return (
          <div key={lineIdx} className="flex items-start gap-2 py-0.5">
            <span className="text-buraq-primary font-bold text-sm mt-0.5 shrink-0">•</span>
            <span className="leading-relaxed">{parsedParts}</span>
          </div>
        );
      }

      return (
        <p key={lineIdx} className="leading-relaxed">
          {parsedParts}
        </p>
      );
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-3 sm:bottom-5 inset-x-0 sm:inset-x-auto sm:right-6 z-50 flex justify-center sm:justify-end px-3.5 sm:px-0 pointer-events-none transition-all">
      {/* Modern Perfectly Centered on Mobile / Right-Side on Desktop Chat Window */}
      <div
        className="pointer-events-auto w-full max-w-[calc(100vw-28px)] sm:w-[430px] sm:max-w-[440px] h-[580px] max-h-[80dvh] sm:max-h-[82vh] mx-auto sm:mx-0 bg-white/95 backdrop-blur-2xl rounded-[26px] sm:rounded-[28px] shadow-[0_24px_60px_-12px_rgba(16,32,31,0.25),0_8px_24px_-4px_rgba(0,0,0,0.08)] border border-black/[0.08] flex flex-col overflow-hidden transition-all duration-300"
      >
        {/* Modern Clean Header */}
        <div className="bg-gradient-to-r from-buraq-dark via-[#132b28] to-buraq-dark px-5 py-3.5 text-white flex items-center justify-between border-b border-white/10 relative z-10">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-2xl bg-[#FFFDEB] p-1.5 shadow-sm border border-white/20 shrink-0">
              <Image
                src="/images/buraq-logo.png"
                alt="BURAQ Logo"
                width={40}
                height={40}
                className="w-full h-full object-contain"
              />
            </div>
            <h3 className="font-bold text-base text-white tracking-tight leading-none">
              Ask BURAQ
            </h3>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handleResetChat}
              title="Reset conversation"
              className="p-1.5 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Reset chat"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              title="Close chat"
              className="p-1.5 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Body Content */}
        <div className="relative flex-1 flex flex-col overflow-hidden">
          {/* Uiverse.io by Yaya12085 Background */}
          <div className="uiverse-chat-bg" />

          {/* Message Stream */}
          <div className="relative z-10 flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 text-sm">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === "user" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`flex items-start gap-2.5 max-w-[88%] ${
                    msg.sender === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  {/* Avatar Icon */}
                  <div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 text-xs mt-0.5 overflow-hidden transition-all ${
                      msg.sender === "user"
                        ? "bg-buraq-primary text-white shadow-xs"
                        : "bg-gradient-to-b from-white/90 to-[#FFFDEB]/85 backdrop-blur-md border border-white/90 p-0.5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_2px_6px_rgba(0,0,0,0.06)]"
                    }`}
                  >
                    {msg.sender === "user" ? (
                      <User className="w-4 h-4" />
                    ) : (
                      <Image
                        src="/images/buraq-logo.png"
                        alt="BURAQ"
                        width={24}
                        height={24}
                        className="w-full h-full object-contain"
                      />
                    )}
                  </div>

                  {/* Message Card */}
                  <div
                    className={`rounded-2xl px-4 py-3 border transition-all ${
                      msg.sender === "user"
                        ? "bg-gradient-to-r from-buraq-primary/95 via-[#0a664c]/95 to-[#0e7d5d]/90 text-white border-white/25 shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.4),0_6px_20px_rgba(8,84,62,0.25)] rounded-tr-xs"
                        : "bg-gradient-to-b from-white/85 via-white/70 to-white/80 backdrop-blur-xl text-buraq-dark/95 border-white/80 shadow-[inset_0_1.5px_1.5px_rgba(255,255,255,0.95),0_8px_24px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.04)] rounded-tl-xs"
                    }`}
                  >
                    <div className="space-y-1 text-[13px] sm:text-[13.5px] leading-relaxed">
                      {msg.sender === "user" ? (
                        <p className="leading-relaxed font-medium">{msg.text}</p>
                      ) : (
                        renderFormattedText(msg.text)
                      )}
                    </div>
                  </div>
                </div>

                <span className="text-[10px] text-gray-500 font-medium mt-1 px-1 font-mono">
                  {msg.timestamp && msg.timestamp !== "Just now" ? msg.timestamp : getFormattedTime()}
                </span>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-2.5 max-w-[80%] py-1">
                <div className="w-7 h-7 rounded-xl bg-gradient-to-b from-white/90 to-[#FFFDEB]/85 backdrop-blur-md border border-white/90 flex items-center justify-center shrink-0 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_2px_6px_rgba(0,0,0,0.06)] p-0.5 overflow-hidden">
                  <Image
                    src="/images/buraq-logo.png"
                    alt="BURAQ"
                    width={24}
                    height={24}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="chat-generating-spinner pl-1">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Modern Professional Input Console */}
        <div className="px-4 pt-3 pb-3 sm:pb-3.5 bg-white/95 backdrop-blur-2xl border-t border-buraq-border/70 shadow-[0_-8px_30px_rgba(16,32,31,0.05)] relative z-10">
          <div className="flex items-center gap-2 bg-[#FAF9F5] hover:bg-white focus-within:!bg-white rounded-2xl px-3.5 py-1.5 sm:py-2 border border-buraq-border/80 shadow-[inset_0_1px_2px_rgba(0,0,0,0.02),0_2px_8px_rgba(16,32,31,0.03)] focus-within:!border-buraq-primary focus-within:ring-4 focus-within:ring-buraq-primary/10 transition-all duration-200">
            <input
              ref={inputRef}
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about lighting, solar components, cables, quotes..."
              className="flex-1 bg-transparent text-[13px] sm:text-[13.5px] text-buraq-dark placeholder:text-buraq-muted/70 focus:outline-none py-1 font-medium"
            />
            {inputText.trim() && (
              <button
                type="button"
                onClick={() => setInputText("")}
                className="p-1 rounded-full text-buraq-muted/50 hover:text-buraq-dark hover:bg-black/[0.05] transition-colors shrink-0 cursor-pointer"
                title="Clear input"
                aria-label="Clear input"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputText.trim()}
              className={`group relative flex items-center justify-center w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-xl transition-all duration-200 shrink-0 ${
                inputText.trim()
                  ? "bg-gradient-to-tr from-buraq-primary via-[#0a664c] to-buraq-primary text-white shadow-[0_3px_12px_rgba(7,84,63,0.32)] hover:shadow-[0_5px_18px_rgba(7,84,63,0.45)] hover:scale-105 active:scale-95 cursor-pointer"
                  : "bg-black/[0.04] text-buraq-muted/40 cursor-not-allowed border border-black/[0.04]"
              }`}
              aria-label="Send message"
            >
              <ArrowUp
                className={`w-4 h-4 stroke-[2.5] transition-transform duration-200 ${
                  inputText.trim() ? "group-hover:-translate-y-0.5" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
