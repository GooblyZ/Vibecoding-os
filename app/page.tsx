import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import Intro from "./components/Intro";
import ProjectUniverse from "./components/ProjectUniverse";
import CaseStudy from "./components/CaseStudy";
import NeovoltCaseStudy from "./components/NeovoltCaseStudy";
import SkillsMatrix from "./components/SkillsMatrix";
import BuildArchive from "./components/BuildArchive";
import Process from "./components/Process";
import FinalCTA from "./components/FinalCTA";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        {/* 01 Hero */}
        <Hero />
        {/* 02 Builder Profile */}
        <Intro />
        {/* 03 Project Universe */}
        <ProjectUniverse />
        {/* 04 Featured Case Study — Barber Booking */}
        <CaseStudy />
        {/* 04B Case Study — NEOVOLT */}
        <NeovoltCaseStudy />
        {/* 05 Skills Matrix */}
        <SkillsMatrix />
        {/* 06 Build Archive */}
        <BuildArchive />
        {/* 07 Process */}
        <Process />
        {/* 08 Final CTA */}
        <FinalCTA />
      </main>
    </>
  );
}
