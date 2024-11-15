"use client"

import { useState, useRef, useCallback, useEffect } from 'react'
import { ArrowRight, MoveRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Link } from 'react-router-dom'
import essentialharvest from '../../assets/project-images/essential-harvest.png'
import sinssflow from '../../assets/project-images/sinssflow.png'
import kyte from '../../assets/project-images/kyteenergy.png'

const images = [
     {
          id: 1,
          src: essentialharvest,
          alt: 'Essential Harvest',
          description: 'Full-stack E-commerce Application',
     },
     {
          id: 2,
          src: sinssflow,
          alt: 'SINSSFLOW Project Management',
          description: 'full-stack Project Management Application',
     },
     {
          id: 3,
          src: kyte,
          alt: 'Website Design & Development',
          description: 'design and developement of kyte energy website',
     },
]

export default function Projects() {
     const [activeImage, setActiveImage] = useState(null)
     const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
     const requestRef = useRef(null)
     const prevCursorPosition = useRef({ x: 0, y: 0 })

     const handleMouseMove = useCallback((e) => {
          const { clientX, clientY } = e
          const dx = clientX - prevCursorPosition.current.x
          const dy = clientY - prevCursorPosition.current.y
          const easeAmount = 0.15
          const newX = prevCursorPosition.current.x + dx * easeAmount
          const newY = prevCursorPosition.current.y + dy * easeAmount
          setCursorPosition({ x: newX, y: newY })
          prevCursorPosition.current = { x: newX, y: newY }
     }, [])

     useEffect(() => {
          const updateCursorPosition = (e) => {
               if (requestRef.current) return
               requestRef.current = requestAnimationFrame(() => {
                    handleMouseMove(e)
                    requestRef.current = null
               })
          }
          window.addEventListener('mousemove', updateCursorPosition)
          return () => {
               window.removeEventListener('mousemove', updateCursorPosition)
               if (requestRef.current) cancelAnimationFrame(requestRef.current)
          }
     }, [handleMouseMove])

     const handleImageHover = useCallback((image) => {
          setActiveImage(image)
     }, [])

     const handleMouseLeave = useCallback(() => {
          setActiveImage(null)
     }, [])

     return (
          <div className="w-full min-h-screen bg-black text-white px-4 py-24 rounded-tr-[80px]">
               <div className="max-w-6xl mx-auto">
                    <motion.div 
                         initial={{ opacity: 0, y: 20 }}
                         whileInView={{ opacity: 1, y: 0 }}
                         transition={{ duration: 0.5 }}
                         className="mb-10 flex items-center justify-between w-full"
                    >
                         <div className=''>
                              <h2 className="text-blue-500 text-2xl font-bold">FEATURED PROJECTS</h2>
                              <p className="text-gray-400 text-lg">Selected Works</p>
                         </div>
                         <Link className='flex gap-2 hover:border-b border-blue-400 hover:text-blue-400' to='/projects'>
                              See All Projects 
                              <motion.div
                                   whileHover={{ x: 5 }}
                                   transition={{ type: "spring", stiffness: 400, damping: 10 }}
                              >
                                   <MoveRight />
                              </motion.div>
                         </Link>
                    </motion.div>

                    <div
                         className="space-y-8 relative"
                         onMouseLeave={handleMouseLeave}
                    >
                         {images.map((image, index) => (
                              <motion.div
                                   key={image.id}
                                   className="cursor-pointer flex flex-col md:flex-row items-start justify-between gap-4 group"
                                   onMouseEnter={() => handleImageHover(image)}
                                   initial={{ opacity: 0, y: 30 }}
                                   whileInView={{ opacity: 1, y: 0 }}
                                   transition={{ duration: 0.5, delay: index * 0.2 }}
                                   whileHover={{ scale: 1.02 }}
                              >
                                   <div className="space-y-2 min-w-80">
                                        <span className="text-sm text-gray-500">0{index + 1}</span>
                                        <h3 className="text-sm font-medium">{image.alt}</h3>
                                   </div>
                                   <div className="flex items-center justify-between w-full border-b pb-4 group-hover:border-blue-500 transition-colors duration-300">
                                        <h2 className="text-xl md:text-3xl lg:text-3xl font-light group-hover:text-blue-500 transition-colors duration-300">
                                             {image.description}
                                        </h2>
                                        <motion.a
                                             href="#"
                                             className="inline-flex items-center text-blue-500 hover:text-blue-400 transition-colors"
                                             whileHover={{ x: 5 }}
                                             transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                        >
                                             View Project <ArrowRight className="ml-2 h-4 w-4" />
                                        </motion.a>
                                   </div>
                              </motion.div>
                         ))}
                    </div>
               </div>
               <AnimatePresence>
                    {activeImage && (
                         <motion.img
                              key={activeImage.id}
                              src={activeImage.src}
                              alt={activeImage.alt}
                              className="fixed bg-gray-950 object-cover pointer-events-none z-10 w-96 rounded-lg shadow-lg"
                              style={{
                                   left: `${cursorPosition.x}px`,
                                   top: `${cursorPosition.y}px`,
                                   transform: 'translate(-50%, -50%)'
                              }}
                              initial={{ opacity: 0, scale: 0.5 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.5 }}
                              transition={{ type: "spring", stiffness: 300, damping: 25 }}
                         />
                    )}
               </AnimatePresence>
          </div>
     )
}