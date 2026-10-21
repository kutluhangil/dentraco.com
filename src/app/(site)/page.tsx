import { Hero } from "@/components/home/hero";
import { ScrollProgress } from "@/components/home/motion-bits";
import { FeaturedDoctors, GuideTeaser, HospitalStrip, ModerationSteps, StatsStrip, TreatmentMarquee } from "@/components/home/sections";

export default function HomePage() {
  return (
    <>
      <ScrollProgress />
      <Hero />
      <StatsStrip />
      <TreatmentMarquee />
      <FeaturedDoctors />
      <HospitalStrip />
      <GuideTeaser />
      <ModerationSteps />
    </>
  );
}
