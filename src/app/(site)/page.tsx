import { Hero } from "@/components/home/hero";
import { FeaturedDoctors, GuideTeaser, HospitalStrip, ModerationSteps } from "@/components/home/sections";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedDoctors />
      <HospitalStrip />
      <GuideTeaser />
      <ModerationSteps />
    </>
  );
}
