import { Particles } from "@repo/design-system/components/ui/particles";
import HomeContent from "@/content/home.mdx";

export default function Home() {
  return (
    <div className="relative">
      <Particles
        className="pointer-events-none absolute inset-0 -z-10 animate-fade-in"
        quantity={100}
      />
      <section className="py-24">
        <div className="mx-auto max-w-2xl px-4">
          <HomeContent />
        </div>
      </section>
    </div>
  );
}
