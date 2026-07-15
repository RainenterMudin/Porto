import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Experience } from "@/components/Experience";
import { Education } from "@/components/Education";
// import { Projects } from "@/components/Projects"; // sementara disembunyikan — uncomment untuk menampilkan lagi
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Education />
        {/* <Projects /> */}
        <Contact />
      </main>
      <Footer />
    </>
  );
}
