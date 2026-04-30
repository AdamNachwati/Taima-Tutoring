import { db } from '../lib/supabase-db.js';

import { useState, useEffect } from "react";

import HeroSection from "../components/home/HeroSection";
import CredentialsBar from "../components/home/CredentialsBar";
import FeaturedResources from "../components/home/FeaturedResources";
import TutoringPreview from "../components/home/TutoringPreview";
import TestimonialSection from "../components/home/TestimonialSection";

const PORTRAIT_URL = "https://mathquotient.org/wp-content/uploads/2023/02/ub-7-30-20.jpg";
const MATH_DETAIL_URL = "https://media.db.com/images/public/69d2c158a6e819c8428c7d2f/671022e59_generated_a76c299a.png";

export default function Home() {
  const [resources, setResources] = useState([]);
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    db.entities.Resource.filter({ status: "published" }, "-created_date", 3)
      .then(setResources)
      .catch(() => {});
    db.entities.Testimonial.list("-created_date", 3)
      .then(setTestimonials)
      .catch(() => {});
  }, []);

  return (
    <div>
      <HeroSection portraitUrl={PORTRAIT_URL} />
      <CredentialsBar />
      <FeaturedResources resources={resources} />
      <TutoringPreview imageUrl={MATH_DETAIL_URL} />
      <TestimonialSection testimonials={testimonials} />
    </div>
  );
}