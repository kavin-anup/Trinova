import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./router";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import { AuthProvider } from "./contexts/AuthContext";
import { ChatbotWidget } from "./components/chatbot/ChatbotWidget";


function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
          {/* Global floating AI chatbot — rendered outside page routes so it persists on every page */}
          <ChatbotWidget />
        </AuthProvider>
      </BrowserRouter>
    </I18nextProvider>
  );
}

export default App;
