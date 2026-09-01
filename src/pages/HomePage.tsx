import React from 'react';
import { Hero } from '../components/home/Hero';
import { StoreOverview } from '../components/home/StoreOverview';
import { VegetablesSection } from '../components/home/VegetablesSection';
import { FruitsSection } from '../components/home/FruitsSection';
import { RetailWholesale } from '../components/home/RetailWholesale';
import { WholesaleEnquiry } from '../components/home/WholesaleEnquiry';
import { ExperienceStory } from '../components/home/ExperienceStory';
import { WhyChooseMDS } from '../components/home/WhyChooseMDS';
import { StoreLocator } from '../components/home/StoreLocator';
import { Gallery } from '../components/home/Gallery';
import { AboutMDS } from '../components/home/AboutMDS';
import { ContactSection } from '../components/home/ContactSection';

interface HomePageProps {
  onViewStore: (slug: string) => void;
  onShowToast: (msg: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onViewStore, onShowToast }) => {
  const scrollToSection = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="flex-grow">
      {/* 1. Hero Section */}
      <Hero
        onExploreStores={() => scrollToSection('#stores')}
        onWholesaleClick={() => scrollToSection('#wholesale')}
      />

      {/* 2. Three Store Locations */}
      <StoreOverview
        onViewStore={onViewStore}
        onShowToast={onShowToast}
      />

      {/* 3. Vegetables Produce Section */}
      <VegetablesSection />

      {/* 4. Fruits Produce Section */}
      <FruitsSection />

      {/* 5. Retail for Families. Wholesale for Businesses. */}
      <RetailWholesale
        onFindStore={() => scrollToSection('#stores')}
        onWholesaleClick={() => scrollToSection('#wholesale')}
      />

      {/* 6. Wholesale Bulk Enquiry System */}
      <WholesaleEnquiry
        onShowToast={onShowToast}
      />

      {/* 7. Nearly 50 Years Heritage Story */}
      <ExperienceStory />

      {/* 8. Why Choose MDS */}
      <WhyChooseMDS />

      {/* 9. Interactive Store Locator & Map */}
      <StoreLocator
        onViewStore={onViewStore}
        onShowToast={onShowToast}
      />

      {/* 10. Gallery */}
      <Gallery />

      {/* 11. About MDS Brand Story */}
      <AboutMDS />

      {/* 12. Contact Section */}
      <ContactSection
        onShowToast={onShowToast}
      />
    </main>
  );
};
