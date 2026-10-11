import { BirthdayCard } from "@/components/birthday/BirthdayCard";
import { ConfettiCanvas } from "@/components/birthday/ConfettiCanvas";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

export default function Home() {
  return (
    <>
      {/* Lienzo de fuegos artificiales (clic en cualquier parte) */}
      <ConfettiCanvas />

      <Header />

      <BirthdayCard />

      <Footer />
    </>
  );
}
