import Header from "@/components/site/Header";
import Hero from "@/components/site/Hero";
import Promotion from "@/components/site/Promotion";
import Plans from "@/components/site/Plans";
import Benefits from "@/components/site/Benefits";
import WhyChoose from "@/components/site/WhyChoose";
import Coverage from "@/components/site/Coverage";
import Offices from "@/components/site/Offices";
import LoyaltyContract from "@/components/site/LoyaltyContract";
import Testimonials from "@/components/site/Testimonials";
import FAQ from "@/components/site/FAQ";
import Footer from "@/components/site/Footer";
import WhatsAppButton from "@/components/site/WhatsAppButton";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <Promotion />
        <Plans />
        <Benefits />
        <WhyChoose />
        <Coverage />
        <LoyaltyContract />
        <Testimonials />
        <FAQ />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
