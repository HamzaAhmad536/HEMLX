"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Eye, Navigation, Camera, Mic, Cloud, Zap, CheckCircle } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const features = [
  {
    icon: Shield,
    title: "Crash Detection",
    description:
      "AI-powered accelerometers and gyroscopes detect crashes accurately. Automatically sends GPS location and alerts to emergency contacts through the cloud.",
    color: "from-red-500 to-orange-500",
    features: ["Real-time Detection", "GPS Tracking", "Emergency Alerts", "Cloud Sync"],
    stats: { value: "99.5%", label: "Accuracy" },
  },
  {
    icon: Eye,
    title: "Drowsiness Detection",
    description:
      "Computer vision monitors eye closure and head position in real time. Alerts the rider instantly through audio and visual signals when fatigue is detected.",
    color: "from-blue-500 to-cyan-500",
    features: ["Eye Tracking", "Head Position", "Audio Alerts", "Visual Warnings"],
    stats: { value: "<1s", label: "Response Time" },
  },
  {
    icon: Navigation,
    title: "Smart Navigation",
    description:
      "AI-enhanced routing with traffic avoidance, weather insights, and ride suggestions. Helps riders stay aware without distraction.",
    color: "from-green-500 to-emerald-500",
    features: ["Traffic Updates", "Weather Alerts", "Route Optimization", "Voice Guidance"],
    stats: { value: "360°", label: "Awareness" },
  },
  {
    icon: Camera,
    title: "Dual Cameras",
    description:
      "Front & rear cameras record rides continuously or capture images on demand. Perfect for evidence, vlogging, traffic monitoring, or situational awareness.",
    color: "from-purple-500 to-pink-500",
    features: ["1080p Recording", "Night Vision", "Loop Recording", "Image Capture"],
    stats: { value: "2x", label: "Cameras" },
  },
  {
    icon: Mic,
    title: "Voice Control + Entertainment",
    description:
      "Hands-free voice assistant for calls, navigation, and media. Supports both online and offline commands with adaptive noise handling.",
    color: "from-yellow-500 to-orange-500",
    features: ["Voice Commands", "Music Control", "Call Handling", "Offline Mode"],
    stats: { value: "100%", label: "Hands-Free" },
  },
  {
    icon: Cloud,
    title: "Environmental Monitoring",
    description:
      "Real-time readings of air quality, temperature, humidity, allergens, and weather. Generates smart recommendations for safer and healthier rides.",
    color: "from-indigo-500 to-purple-500",
    features: ["Air Quality", "Temperature", "Humidity", "Weather Data"],
    stats: { value: "Real-time", label: "Monitoring" },
  },
]

export function Features() {
  const [visibleCards, setVisibleCards] = useState<number[]>([])
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observers = cardRefs.current.map((card, index) => {
      if (!card) return null

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setTimeout(() => {
                setVisibleCards((prev) => [...new Set([...prev, index])])
              }, index * 150)
            }
          })
        },
        { threshold: 0.2 },
      )

      observer.observe(card)
      return observer
    })

    return () => {
      observers.forEach((observer) => observer?.disconnect())
    }
  }, [])

  return (
    <section id="features" className="relative py-20 md:py-32">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>

      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm text-primary">
            <Zap className="h-3 w-3" />
            Seven Essential Features
          </div>
          <h2 className="mb-4 text-balance text-4xl font-bold md:text-5xl">
            Next-Generation{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Safety Features
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Advanced AI and IoT technologies working together to create the most comprehensive motorcycle safety system
            ever designed
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card
              key={index}
              ref={(el) => {
                cardRefs.current[index] = el
              }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              className={`group relative overflow-hidden border border-border/40 bg-card p-6 transition-all duration-700 ${
                visibleCards.includes(index)
                  ? "translate-y-0 opacity-100"
                  : index % 2 === 0
                    ? "-translate-y-8 opacity-0"
                    : "translate-y-8 opacity-0"
              } ${
                hoveredCard === index
                  ? "scale-105 border-primary/50 shadow-2xl shadow-primary/20"
                  : ""
              }`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 transition-opacity duration-500 ${
                  hoveredCard === index ? "opacity-10" : ""
                }`}
              ></div>
              <div className="relative">
                <div className="mb-6 flex items-center justify-between">
                  <div
                    className={`inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${feature.color} text-white shadow-lg transition-all duration-500 ${
                      hoveredCard === index ? "scale-110 rotate-12 shadow-2xl" : ""
                    }`}
                  >
                    {feature.icon && <feature.icon className="h-7 w-7" />}
                  </div>
                  <Badge variant="outline" className="border-primary/50 bg-primary/10 text-primary">
                    <span className="font-bold">{feature.stats.value}</span>
                    <span className="ml-1 text-xs">{feature.stats.label}</span>
                  </Badge>
                </div>

                <h3 className="mb-3 text-2xl font-bold transition-colors group-hover:text-primary">{feature.title}</h3>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>

                <div className="mb-4 space-y-2">
                  {feature.features.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span className="text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="relative mt-4 h-1 w-full overflow-hidden rounded-full bg-border">
                  <div
                    className={`h-full transition-all duration-1000 bg-gradient-to-r ${feature.color} ${
                      hoveredCard === index ? "w-full" : "w-0"
                    }`}
                  ></div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-16 rounded-2xl border border-border/40 bg-card/50 p-8 backdrop-blur-sm">
          <div className="text-center">
            <h3 className="mb-6 text-2xl font-bold">Why HelmX Stands Out</h3>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="group rounded-xl border border-border/40 bg-background/50 p-6 transition-all hover:scale-105 hover:border-primary/50 hover:shadow-lg">
                <div className="mb-2 text-3xl font-bold text-primary">7</div>
                <div className="text-sm text-muted-foreground">Integrated Features</div>
              </div>
              <div className="group rounded-xl border border-border/40 bg-background/50 p-6 transition-all hover:scale-105 hover:border-primary/50 hover:shadow-lg">
                <div className="mb-2 text-3xl font-bold text-primary">AI</div>
                <div className="text-sm text-muted-foreground">Powered Technology</div>
              </div>
              <div className="group rounded-xl border border-border/40 bg-background/50 p-6 transition-all hover:scale-105 hover:border-primary/50 hover:shadow-lg">
                <div className="mb-2 text-3xl font-bold text-primary">24/7</div>
                <div className="text-sm text-muted-foreground">Protection & Monitoring</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
