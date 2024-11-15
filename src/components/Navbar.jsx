'use client'

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Asterisk, Search, Menu, X, Github } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"
import { Link } from "react-router-dom"

const navLinks = [
  { id: "01", name: "Home", href: "/" },
  { id: "02", name: "Projects", href: "/projects" },
  { id: "03", name: "Blogs", href: "/blogs" },
  { id: "04", name: "About", href: "/about" },
  { id: "06", name: "Contact", href: "/contact" },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [isOpen, setIsOpen] = React.useState(false)

  const playClickSound = () => {
    const audio = new Audio('/src/assets/sfx/click.wav')
    audio.play()
  }

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 
        ${isScrolled ? 'backdrop-blur-md' : 'bg-transparent'}`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4 rounded-lg">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-[#db4848] rounded-full">
              <Asterisk size={40} className="text-secondary" />
            </div>
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-4">
                {navLinks.map((item) => (
                  <Link key={item.name} to={item.href}>
                    <Button
                      variant="ghost"
                      className="text-sm text-slate-900 font-medium"
                      onClick={playClickSound}
                    >
                      {item.name}
                    </Button>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="mr-2">
              <Github className="h-5 w-5" />
            </Button>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-full sm:w-[300px] bg-white/80 backdrop-blur-lg"
              >
                <SheetHeader className="border-b pb-4">
                  <SheetTitle className="text-left">Navigation</SheetTitle>
                  <SheetClose className="absolute right-4 top-4">
                   
                  </SheetClose>
                </SheetHeader>
                <nav className="flex flex-col space-y-4 mt-8">
                  {navLinks.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => {
                        setIsOpen(false)
                        playClickSound()
                      }}
                    >
                      <div className="flex items-center space-x-4 px-2 py-2 hover:bg-gray-100 rounded-md transition-colors">
                        <span className="text-sm text-gray-400">{item.id}</span>
                        <span className="text-base">{item.name}</span>
                      </div>
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  )
}