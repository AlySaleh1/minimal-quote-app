"use client"

import { useEffect, useState } from "react"

export default function Home() {
  const [displayText, setDisplayText] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchQuoteAndSetupText() {
      try {
        // Get local time
        const now = new Date()
        const localFormatter = new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })

        const localTime = localFormatter.format(now)

        // Fetch quote
        const response = await fetch("/api/quote")

        if (!response.ok) {
          throw new Error("Failed to fetch quote")
        }

        const data = await response.json()

        // Create the complete text
        const fullText = `${localTime}\n\nToday's quote:\n\n"${data.q}"\n\n— ${data.a}`

        // Start the typing animation
        let currentIndex = 0
        setIsLoading(false)

        const typingInterval = setInterval(() => {
          if (currentIndex <= fullText.length) {
            setDisplayText(fullText.substring(0, currentIndex))
            currentIndex++
          } else {
            clearInterval(typingInterval)
          }
        }, 50)

        // Clean up interval on unmount
        return () => clearInterval(typingInterval)
      } catch (error) {
        console.error("Error:", error)
        setDisplayText("Error loading quote. Please refresh the page.")
        setIsLoading(false)
      }
    }

    fetchQuoteAndSetupText()
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white p-4">
      <div className="max-w-2xl w-full">
        {isLoading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <pre className="font-mono text-lg whitespace-pre-wrap leading-relaxed">
            {displayText}
            <span className="animate-pulse">|</span>
          </pre>
        )}
      </div>
    </main>
  )
}

