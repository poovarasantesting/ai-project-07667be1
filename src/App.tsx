import { RegistrationForm } from "./components/RegistrationForm";
import { Toaster } from "./components/ui/toaster";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Welcome to Our App</h1>
      <RegistrationForm />
      <Toaster />
    </div>
  );
}