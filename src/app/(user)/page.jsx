import React from "react";
import HeroSection from "@/components/home/HeroSection";
import MissionVisionSection from "@/components/home/MissionVissionSection";
import MemberBenefitsSection from "@/components/home/MemberBenefitsSection";
import EventsSection from "@/components/home/EventsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CTASection from "@/components/home/CTASection";
import ContactSection from "@/components/home/ContactSection";
import ServicesSection from "@/components/home/ServicesSection";

const Home = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-green-100 overflow-x-hidden font-sans">
      {/* --- Enhanced Hero Section --- */}
      <HeroSection />

      {/* --- MISSION/VISION: Better color contrast --- */}
      <MissionVisionSection />

      {/* --- Our Services Section --- */}
      <ServicesSection />

      {/* --- HEALTHCARE PARTNERS (DKMC & MADILIFE) --- */}
      <MemberBenefitsSection />

      {/* --- UPCOMING EVENTS: Redesign --- */}
      <EventsSection />

      {/* --- VOICES OF IMPACT --- */}
      <TestimonialsSection />

      {/* --- FINAL ACTION TO CALL --- */}
      <CTASection />

      {/* --- MODERN CONTACT SECTION --- */}
      <ContactSection />

      
    </div>
  );
};

export default Home;
