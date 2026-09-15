import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import ProblemSolution from "@/components/ProblemSolution"
import Features from "@/components/Features"
import HowYouGetIt from "@/components/HowYouGetIt"
import CaseStudy from "@/components/CaseStudy"
import AlreadyUsing from "@/components/AlreadyUsing"
import Pricing from "@/components/Pricing"
import ApplicationForm from "@/components/ApplicationForm"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <AlreadyUsing />
      <ProblemSolution />
      <Features />
      <HowYouGetIt />
      <CaseStudy />
      <Pricing />
      <ApplicationForm />
      <Footer />
    </main>
  )
}
