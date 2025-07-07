import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Router } from "./router";
import { AuthProvider } from "./context/AuthContext/AuthContext";
import { ToastContainer } from "react-toastify";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
        <ToastContainer />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
