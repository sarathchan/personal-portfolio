"use client"

import { useMemo, useState } from "react"
import { AnimatePresence, MotionConfig, motion } from "framer-motion"
import useMeasure from "react-use-measure"
import { Download, Headphones } from "lucide-react"
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
     const [ref, bounds] = useMeasure()

     // Function to play click sound
     const playClickSound = () => {
          const audio = new Audio('/src/assets/sfx/click.wav');
          audio.play();
     }

     const content = useMemo(() => {
          switch (activeTab) {
               case 0:
                    return (
                         <div className="flex items-center justify-center">
                              <Download size={32} className="text-white" />
                         </div>
                    )
               case 1:
                    return (
                         <div className="flex items-center justify-center">
                              <Headphones size={32} className="text-white" />
                         </div>
                    )
               default:
                    return null
          }
     }, [activeTab])

     const handleTabClick = (newTabId) => {
          if (newTabId !== activeTab && !isAnimating) {
               const newDirection = newTabId > activeTab ? 1 : -1
               setDirection(newDirection)
               setActiveTab(newTabId)
               playClickSound();
               // Handle the action based on the tab
               if (newTabId === 0) {
                    // Trigger resume download
                    console.log("Downloading resume...")
                    // Add your download logic here
               } else {
                    // Trigger resume listen
                    console.log("Starting resume text-to-speech...")
                    // Add your text-to-speech logic here
               }
          }
     }

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