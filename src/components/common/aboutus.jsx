"use client"

import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function AboutUs() {
     return (
          <section className="w-full min-h-screen bg-[#e8e8e8] flex items-center justify-center rounded-tl-[80px] px-4">
               <div className="max-w-6xl mx-auto w-full py-24">
                    <div className="grid gap-8">
                         <motion.div 
                              initial={{ opacity: 0, y: 20 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.5 }}
                              className="space-y-2"
                         >
                              <p className="text-sm text-muted-foreground">Overview</p>
                              <p className="text-sm">Who am I</p>
                         </motion.div>
                         
                         <motion.h1 
                              initial={{ opacity: 0, y: 30 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.5, delay: 0.2 }}
                              className="text-3xl md:text-4xl lg:text-5xl font-medium leading-tight tracking-tight lg:leading-[1.2] max-w-3xl"
                         >
                              I&apos;m a full-stack developer passionate about building innovative web applications and digital experiences
                         </motion.h1>
                         
                         <motion.div 
                              initial={{ opacity: 0, y: 30 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.5, delay: 0.4 }}
                              className="pt-8"
                         >
                              <Button variant="link" className="group p-0 text-primary" asChild>
                                   <a href="/contact">
                                        Know More{" "}
                                        <motion.div
                                             whileHover={{ x: 4 }}
                                             transition={{ duration: 0.2 }}
                                        >
                                             <ArrowRight className="ml-2 h-4 w-4" />
                                        </motion.div>
                                   </a>
                              </Button>
                         </motion.div>
                    </div>
               </div>
          </section>
     )
}