import { Suspense } from "react";
import BookingContent from "./BookingContent";

export const metadata = {
  title: "Book Appointment | DocAppoint",
  description: "Confirm your doctor appointment.",
};

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <BookingContent></BookingContent>
    </Suspense>
  );
}
