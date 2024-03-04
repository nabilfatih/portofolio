import Particles from "@/components/ui/particles"
import MainTransition from "@/components/main/transition"

export default function WorkPage() {
  return (
    <MainTransition className="relative">
      <Particles
        className="pointer-events-none absolute inset-0 -z-10 animate-fade-in"
        quantity={200}
      />
      <section className="py-24"></section>
    </MainTransition>
  )
}
