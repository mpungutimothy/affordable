import { useEffect, useState } from 'react';
import { supabase, Property } from '../lib/supabase';
import HeroSlider from '../components/home/HeroSlider';
import RentToOwn from '../components/home/RentToOwn';
import VisionMission from '../components/home/VisionMission';
import PropertyLocations from '../components/home/PropertyLocations';
import WhyAffordable from '../components/home/WhyAffordable';
import FeaturedProperties from '../components/home/FeaturedProperties';
import Partners from '../components/home/Partners';

const Home = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);

  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async () => {
    const { data: allProps } = await supabase
      .from('properties')
      .select('*')
      .order('sort_order', { ascending: true });

    if (allProps) {
      setProperties(allProps);
      setFeaturedProperties(allProps.filter((p) => p.featured));
    }
  };

  return (
    <div className="min-h-screen">
      <HeroSlider properties={featuredProperties.slice(0, 6)} />
      <RentToOwn />
      <VisionMission />
      <PropertyLocations properties={properties} />
      <WhyAffordable />
      <FeaturedProperties properties={properties.slice(0, 12)} />
      <Partners />
    </div>
  );
};

export default Home;
