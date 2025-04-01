import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Add a console log to debug
    console.log("Fetching quote from API")

    const response = await fetch("https://zenquotes.io/api/today")

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`)
    }

    const data = await response.json()
    console.log("Quote data received:", data)

    // ZenQuotes API returns an array with a single quote object
    return NextResponse.json(data[0])
  } catch (error) {
    console.error("Error fetching quote:", error)

    // Return a fallback quote if the API fails
    return NextResponse.json({
      q: "The best way to predict the future is to create it.",
      a: "Abraham Lincoln",
    })
  }
}

