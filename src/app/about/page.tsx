"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Target, 
  Users, 
  Zap, 
  Shield, 
  Globe, 
  TrendingUp,
  Award,
  Star,
  Heart,
  Lightbulb,
  Rocket,
  Lock,
  BarChart3,
  Coins,
  ArrowRight,
  ExternalLink,
  Twitter,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Calendar,
  CheckCircle
} from "lucide-react"

// Mock team data
const teamMembers = [
  {
    name: "Alex Chen",
    role: "Founder & CEO",
    bio: "Former Goldman Sachs VP with 8+ years in traditional finance. Led the development of multiple DeFi protocols and has been in crypto since 2017.",
    image: "/api/placeholder/200/200",
    social: {
      twitter: "https://twitter.com/alexchen",
      linkedin: "https://linkedin.com/in/alexchen"
    },
    expertise: ["DeFi", "Finance", "Strategy"]
  },
  {
    name: "Sarah Kim",
    role: "CTO & Co-Founder",
    bio: "Ex-Google engineer with deep expertise in blockchain technology. Built scalable systems serving millions of users and has 10+ years in software engineering.",
    image: "/api/placeholder/200/200",
    social: {
      twitter: "https://twitter.com/sarahkim",
      github: "https://github.com/sarahkim"
    },
    expertise: ["Blockchain", "Engineering", "Architecture"]
  },
  {
    name: "Marcus Rodriguez",
    role: "Head of Product",
    bio: "Former Product Manager at Coinbase with extensive experience in crypto UX. Passionate about making DeFi accessible to everyone.",
    image: "/api/placeholder/200/200",
    social: {
      twitter: "https://twitter.com/marcusrod",
      linkedin: "https://linkedin.com/in/marcusrod"
    },
    expertise: ["Product", "UX", "Crypto"]
  },
  {
    name: "Dr. Elena Volkov",
    role: "Head of Security",
    bio: "Cybersecurity expert with PhD in Computer Science. Former security researcher at Chainlink and has audited over 50 smart contracts.",
    image: "/api/placeholder/200/200",
    social: {
      twitter: "https://twitter.com/elenavolkov",
      linkedin: "https://linkedin.com/in/elenavolkov"
    },
    expertise: ["Security", "Auditing", "Research"]
  }
]

const values = [
  {
    icon: Shield,
    title: "Security First",
    description: "We prioritize the security of user funds above all else, implementing industry-leading security measures and regular audits.",
    color: "text-red-500",
    bgColor: "bg-red-500/10"
  },
  {
    icon: Users,
    title: "User-Centric",
    description: "Every decision we make is guided by what's best for our users. We believe DeFi should be accessible to everyone.",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10"
  },
  {
    icon: Zap,
    title: "Innovation",
    description: "We're constantly pushing the boundaries of what's possible in DeFi, developing cutting-edge solutions for the future.",
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10"
  },
  {
    icon: Globe,
    title: "Decentralization",
    description: "We believe in the power of decentralized finance to create a more open, transparent, and fair financial system.",
    color: "text-green-500",
    bgColor: "bg-green-500/10"
  }
]

const stats = [
  { label: "Total Value Locked", value: "$2.5B+", icon: Coins },
  { label: "Active Users", value: "500K+", icon: Users },
  { label: "Supported Tokens", value: "200+", icon: BarChart3 },
  { label: "Security Audits", value: "15+", icon: Shield },
  { label: "Countries Served", value: "150+", icon: Globe },
  { label: "Uptime", value: "99.9%", icon: CheckCircle }
]

const achievements = [
  {
    year: "2024",
    title: "Series A Funding",
    description: "Raised $50M from top-tier VCs including Andreessen Horowitz and Paradigm",
    icon: TrendingUp
  },
  {
    year: "2024",
    title: "Security Certification",
    description: "Achieved SOC 2 Type II compliance and ISO 27001 certification",
    icon: Award
  },
  {
    year: "2023",
    title: "Product Launch",
    description: "Launched DeFi Nexus with full suite of DeFi tools and services",
    icon: Rocket
  },
  {
    year: "2023",
    title: "Team Formation",
    description: "Assembled world-class team of DeFi experts and blockchain engineers",
    icon: Users
  }
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-blue-900 dark:to-purple-900">
      {/* Hero Section */}
      <div className="text-center mb-16 pt-16 pb-8">
        <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
          <Heart className="h-4 w-4 text-yellow-400" />
          <span className="text-sm font-medium">About DeFi Nexus</span>
        </div>
        <h1 className="text-5xl lg:text-6xl font-bold mb-6">
          <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Building the Future of Finance
          </span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          DeFi Nexus is on a mission to democratize finance by making decentralized financial services 
          accessible, secure, and user-friendly for everyone, everywhere.
        </p>
      </div>

      <div className="container mx-auto px-4 pb-16">
        {/* Mission Section */}
        <section className="mb-16">
          <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
            <CardContent className="p-8 lg:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="inline-flex items-center space-x-2 bg-blue-500/10 rounded-full px-4 py-2 mb-6">
                    <Target className="h-4 w-4 text-blue-500" />
                    <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Our Mission</span>
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                    Empowering Financial Freedom
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                    We believe that financial services should be open, transparent, and accessible to everyone. 
                    Our platform combines the power of decentralized finance with intuitive design to create 
                    a seamless experience for both beginners and experts.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    From trading and lending to staking and yield farming, DeFi Nexus provides all the tools 
                    you need to participate in the decentralized economy. We're building the infrastructure 
                    for a more inclusive financial future.
                  </p>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-3xl" />
                  <div className="relative bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl p-8 h-80 flex items-center justify-center">
                    <div className="text-center">
                      <Globe className="h-24 w-24 text-blue-500 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold mb-2">Global Impact</h3>
                      <p className="text-muted-foreground">Serving users in 150+ countries</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Stats Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                By the Numbers
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our impact speaks for itself. Here are some key metrics that showcase our growth and success.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <Card key={index} className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 ease-out hover:scale-105">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                Our Values
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              These core principles guide everything we do and shape our vision for the future of finance.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <Card key={index} className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 ease-out hover:scale-105">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 rounded-lg ${value.bgColor} flex items-center justify-center flex-shrink-0`}>
                        <Icon className={`h-6 w-6 ${value.color}`} />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                Meet Our Team
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're a diverse team of innovators, engineers, and visionaries working together to build the future of finance.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <Card key={index} className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 ease-out hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
                  <p className="text-sm text-blue-600 dark:text-blue-400 mb-3">{member.role}</p>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{member.bio}</p>
                  
                  <div className="flex flex-wrap gap-1 justify-center mb-4">
                    {member.expertise.map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex justify-center space-x-2">
                    {member.social.twitter && (
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Twitter className="h-4 w-4" />
                      </Button>
                    )}
                    {member.social.linkedin && (
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Linkedin className="h-4 w-4" />
                      </Button>
                    )}
                    {member.social.github && (
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Github className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Achievements Timeline */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                Our Journey
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Key milestones in our mission to revolutionize decentralized finance.
            </p>
          </div>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-blue-500 to-purple-600" />
            
            <div className="space-y-8">
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon
                const isEven = index % 2 === 0
                
                return (
                  <div key={index} className={`flex items-center ${isEven ? 'flex-row' : 'flex-row-reverse'}`}>
                    <div className={`w-1/2 ${isEven ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                      <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                        <CardContent className="p-6">
                          <div className="flex items-center space-x-3 mb-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                              <Icon className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <Badge variant="secondary" className="mb-1">{achievement.year}</Badge>
                              <h3 className="text-lg font-semibold">{achievement.title}</h3>
                            </div>
                          </div>
                          <p className="text-muted-foreground">{achievement.description}</p>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 border-4 border-background shadow-lg z-10" />
                    
                    <div className="w-1/2" />
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <Card className="border-0 shadow-xl bg-gradient-to-r from-blue-600 to-purple-700 text-white">
            <CardContent className="p-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Ready to Join the DeFi Revolution?
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Start your journey with DeFi Nexus today and experience the future of finance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="outline" className="bg-white/10 border-white text-white hover:bg-white hover:text-primary">
                  <Rocket className="h-5 w-5 mr-2" />
                  Get Started
                </Button>
                <Button size="lg" variant="outline" className="bg-white/10 border-white text-white hover:bg-white hover:text-primary">
                  <Users className="h-5 w-5 mr-2" />
                  Join Our Community
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
