export function openBuraqChatbot() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent('open-buraq-chatbot'));
  }
}
