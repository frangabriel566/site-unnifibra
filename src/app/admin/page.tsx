"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AdminConfigProvider } from "@/components/admin/AdminConfigContext";
import AdminLayout from "@/components/admin/AdminLayout";
import { AdminSection } from "@/components/admin/AdminSidebar";
import AdminDashboard from "@/components/admin/AdminDashboard";
import GeneralSettings from "@/components/admin/GeneralSettings";
import AppearanceSettings from "@/components/admin/AppearanceSettings";
import HeroBannersManager from "@/components/admin/HeroBannersManager";
import PlansManager from "@/components/admin/PlansManager";
import PromotionSettings from "@/components/admin/PromotionSettings";
import LoyaltySettings from "@/components/admin/LoyaltySettings";
import BenefitsManager from "@/components/admin/BenefitsManager";
import OfficesManager from "@/components/admin/OfficesManager";
import TestimonialsManager from "@/components/admin/TestimonialsManager";
import FAQManager from "@/components/admin/FAQManager";
import SocialSettings from "@/components/admin/SocialSettings";
import SEOSettings from "@/components/admin/SEOSettings";
import IntegrationsSettings from "@/components/admin/IntegrationsSettings";
import GoogleAdsSettings from "@/components/admin/GoogleAdsSettings";
import AnalyticsSettings from "@/components/admin/AnalyticsSettings";
import DeploySettings from "@/components/admin/DeploySettings";

export default function AdminPage() {
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);
  const [section, setSection] = useState<AdminSection>("dashboard");

  useEffect(() => {
    const isAuth = localStorage.getItem("unnifibra_admin_auth") === "true";
    if (!isAuth) {
      router.replace("/admin/login");
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setAuthChecked(true);
    }
  }, [router]);

  if (!authChecked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-400">
        Carregando painel...
      </div>
    );
  }

  return (
    <AdminConfigProvider>
      <AdminLayout active={section} onSelect={setSection}>
        {section === "dashboard" && <AdminDashboard onNavigate={setSection} />}
        {section === "general" && <GeneralSettings />}
        {section === "appearance" && <AppearanceSettings />}
        {section === "heroBanners" && <HeroBannersManager />}
        {section === "plans" && <PlansManager />}
        {section === "promotion" && <PromotionSettings />}
        {section === "loyalty" && <LoyaltySettings />}
        {section === "benefits" && <BenefitsManager />}
        {section === "offices" && <OfficesManager />}
        {section === "testimonials" && <TestimonialsManager />}
        {section === "faq" && <FAQManager />}
        {section === "social" && <SocialSettings />}
        {section === "seo" && <SEOSettings />}
        {section === "integrations" && <IntegrationsSettings />}
        {section === "googleAds" && <GoogleAdsSettings />}
        {section === "analytics" && <AnalyticsSettings />}
        {section === "deploy" && <DeploySettings />}
      </AdminLayout>
    </AdminConfigProvider>
  );
}
