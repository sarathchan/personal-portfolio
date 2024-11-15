'use client'

import { Monitor, BriefcaseIcon } from 'lucide-react'
import { motion } from 'framer-motion'

const experiences = [
  {
    title: "React Developer Intern",
    company: "Nectarglob Technologies",
    description: "Worked as a React.js developer intern at Nectarglob Technologies for 3 months from December 2023 to March 2024. Contributed to a CRM application built on SharePoint, primarily in a support role.",
    icon: <Monitor className="w-5 h-5" />,
    technologies: ["React.js", "SharePoint"],
    duration: "December 2023 - March 2024"
  },
  {
    title: "Full Stack Developer",
    company: "Sinss Digital Marketing Studio",
    description: "Currently working as a full-stack developer at Sinss Digital Marketing Studio since March 2023. Developed e-commerce, CRM, and project management applications using the MERN stack, Next.js, PostgreSQL, and MySQL. Designed and developed over 8 websites as the sole developer.",
    icon: <BriefcaseIcon className="w-5 h-5" />,
    technologies: ["React", "Next.js", "Node.js", "Express", "PostgreSQL", "MySQL"],
    duration: "March 2023 - Present"
  }
]

export default function Experience() {
  return (
    <section className="min-h-screen bg-white py-24 px-4 sm:px-6 lg:px-8 rounded-t-[80px]">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-extralight text-gray-400 mb-10 tracking-wider"
        >
          EXPERIENCE
        </motion.h2>

        <div className="">
          {experiences.map((experience, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="group"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left column - Title and Company */}
                <div className="lg:col-span-4 ">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-50 group-hover:bg-gray-100 transition-colors duration-300">
                      {experience.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-light text-gray-800">{experience.title}</h3>
                      <p className="text-gray-500 mt-1">{experience.company}</p>
                      <p className="text-gray-400 text-sm mt-1">{experience.duration}</p>
                    </div>
                  </div>
                </div>

                {/* Right column - Description and Technologies */}
                <div className="lg:col-span-8 space-y-2">
                  <p className="text-gray-600 leading-relaxed">
                    {experience.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {experience.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-light bg-gray-50 text-gray-800 hover:bg-gray-100 transition-colors duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Divider */}
              {index !== experiences.length - 1 && (
                <div className="w-full h-px bg-gray-100 my-8" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}