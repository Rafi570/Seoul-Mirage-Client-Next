import React from 'react'
import { cn } from "@/lib/utils" 

interface ContainerProps {
  children: React.ReactNode
  className?: string
}

export default function Container({ children, className }: ContainerProps) {
  return (
    <div 
      className={cn(
        "mx-auto w-full max-w-[1440px] px-4 md:px-6 lg:px-10", 
        className
      )}
    >
      {children}
    </div>
  )
}