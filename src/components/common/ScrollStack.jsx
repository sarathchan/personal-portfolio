'use client';

import { ReactLenis } from 'lenis/react';
import Experience from './experience';
import Skills from './skills';
import Projects from './project';
import AboutUs from './aboutus';
import { RevealLinks } from './RevealLinks';
export default function ScrollStack() {
  return (
    <ReactLenis root>
      <main>
        <article>
          <section className="  h-screen  w-full   sticky top-0">
            <AboutUs />
          </section>

          <section className=" h-screen  sticky top-0  overflow-hidden">
            <Projects />
          </section>
          <section className="bg-[#e8e8e8] rounded-t-[80px]  h-screen   sticky top-0">
            <Skills />
          </section>

          <section className="h-screen  w-full sticky top-0">
            <Experience />
          </section>

          <section className="h-screen bg-green-300 rounded-t-[80px]  sticky top-0  overflow-hidden">
            <RevealLinks />
          </section>

        </article>
      </main>
    </ReactLenis>

  );
}

