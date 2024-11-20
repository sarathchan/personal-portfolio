"use client"

import { useMemo, useState, useRef, useEffect } from "react"
import { AnimatePresence, MotionConfig, motion } from "framer-motion"
import useMeasure from "react-use-measure"
import { Download, Headphones, Pause } from "lucide-react"
import FamilyButton from "../ui/FamilyButton"

export function ResumeActions() {
     return (
          <div className="fixed bottom-4 right-4 z-[100]">
               <FamilyButton>
                    <ResumeActionsToggle />
               </FamilyButton>
          </div>
     )
}

const tabs = [
     { id: 0, label: "Download" },
     { id: 1, label: "Listen" },
]

export function ResumeActionsToggle() {
     const [activeTab, setActiveTab] = useState(0)
     const [direction, setDirection] = useState(0)
     const [isAnimating, setIsAnimating] = useState(false)
     const [isPlaying, setIsPlaying] = useState(false)
     const [ref, bounds] = useMeasure()
     const audioRef = useRef(null)

     // Function to play click sound
     const playClickSound = () => {
          const audio = new Audio('/src/assets/sfx/click.wav')
          audio.play()
     }

     // Function to handle PDF download
     const handleDownload = () => {
          // Replace '/path/to/your/resume.pdf' with the actual path to your PDF file
          const pdfUrl = '/public/db/resume.pdf'

          // Create a temporary link element
          const link = document.createElement('a')
          link.href = pdfUrl
          link.download = 'durgesh-bachhav-resume.pdf'
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
     }

     // Function to handle audio playback
     const handleAudioPlayback = () => {
          if (!audioRef.current) {
               audioRef.current = new Audio('/public/db/resume.mp3')
               audioRef.current.addEventListener('ended', () => {
                    setIsPlaying(false)
               })
          }

          if (isPlaying) {
               audioRef.current.pause()
          } else {
               audioRef.current.play()
          }
          setIsPlaying(!isPlaying)
     }

     const content = useMemo(() => {
          switch (activeTab) {
               case 0:
                    return (
                         <button
                              onClick={handleDownload}
                              className="flex items-center justify-center p-2 rounded-full hover:bg-neutral-600 transition-colors"
                              aria-label="Download Resume"
                         >
                              <Download size={32} className="text-white" />
                         </button>
                    )
               case 1:
                    return (
                         <button
                              onClick={handleAudioPlayback}
                              className="flex items-center justify-center p-2 rounded-full hover:bg-neutral-600 transition-colors"
                              aria-label={isPlaying ? "Pause Audio" : "Play Audio"}
                         >
                              {isPlaying ? (
                                   <Pause size={32} className="text-white" />
                              ) : (
                                   <Headphones size={32} className="text-white" />
                              )}
                         </button>
                    )
               default:
                    return null
          }
     }, [activeTab, isPlaying])

     // Handle tab switching only
     const handleTabClick = (newTabId) => {
          if (newTabId !== activeTab && !isAnimating) {
               const newDirection = newTabId > activeTab ? 1 : -1
               setDirection(newDirection)
               setActiveTab(newTabId)
               playClickSound()
          }
     }

     // Cleanup audio on component unmount
     useEffect(() => {
          return () => {
               if (audioRef.current) {
                    audioRef.current.pause()
                    audioRef.current.removeEventListener('ended', () => {
                         setIsPlaying(false)
                    })
               }
          }
     }, [])

     const variants = {
          initial: (direction) => ({
               x: 300 * direction,
               opacity: 0,
               filter: "blur(4px)",
          }),
          active: {
               x: 0,
               opacity: 1,
               filter: "blur(0px)",
          },
          exit: (direction) => ({
               x: -300 * direction,
               opacity: 0,
               filter: "blur(4px)",
          }),
     }

     return (
          <div className="flex flex-col items-center pt-4 text-white">
               <div className="flex space-x-1 border border-none rounded-[8px] cursor-pointer bg-neutral-700 px-[3px] py-[3.2px] shadow-inner-shadow">
                    {tabs.map((tab, i) => (
                         <button
                              key={`${tab.id}-i-${i}`}
                              onClick={() => handleTabClick(tab.id)}
                              className={`${activeTab === tab.id ? "text-white" : "hover:text-white-300/60"
                                   } relative rounded-[5px] px-3 py-1.5 text-xs sm:text-sm font-medium text-white-600 transition focus-visible:outline-1 focus-visible:ring-1 focus-visible:ring-blue-light focus-visible:outline-none`}
                              style={{ WebkitTapHighlightColor: "transparent" }}
                         >
                              {activeTab === tab.id && (
                                   <motion.span
                                        layoutId="resume-action-bubble"
                                        className="absolute inset-0 z-10 bg-neutral-800 mix-blend-difference shadow-inner-shadow"
                                        style={{ borderRadius: 5 }}
                                        transition={{ type: "spring", bounce: 0.19, duration: 0.4 }}
                                   />
                              )}
                              {tab.label}
                         </button>
                    ))}
               </div>
               <MotionConfig transition={{ duration: 0.4, type: "spring", bounce: 0.2 }}>
                    <motion.div
                         className="relative mx-auto my-[10px] w-[60px] md:w-[150px] overflow-hidden"
                         initial={false}
                         animate={{ height: bounds.height }}
                    >
                         <div className="md:p-6 p-2" ref={ref}>
                              <AnimatePresence
                                   custom={direction}
                                   mode="popLayout"
                                   onExitComplete={() => setIsAnimating(false)}
                              >
                                   <motion.div
                                        key={activeTab}
                                        variants={variants}
                                        initial="initial"
                                        animate="active"
                                        exit="exit"
                                        custom={direction}
                                        onAnimationStart={() => setIsAnimating(true)}
                                        onAnimationComplete={() => setIsAnimating(false)}
                                        className="flex items-center justify-center"
                                   >
                                        {content}
                                   </motion.div>
                              </AnimatePresence>
                         </div>
                    </motion.div>
               </MotionConfig>
          </div>
     )
}