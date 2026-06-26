import { Suspense } from "react";
import LoginContent from "./LoginContent";

export const metadata = {
  title: "Login | DocAppoint",
  description: "Login to your DocAppoint account.",
};
export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
}
