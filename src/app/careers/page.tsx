"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { CustomSelect } from "@/components/ui/select"
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  Users, 
  Search, 
  Filter,
  ArrowRight,
  Star,
  Zap,
  Shield,
  TrendingUp,
  Code,
  BarChart3,
  Globe,
  Heart,
  ChevronDown,
  ExternalLink,
  Calendar,
  DollarSign,
  Award,
  Upload
} from "lucide-react"

// Mock job data
const mockJobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    experience: "Senior",
    salary: "$120k - $180k",
    posted: "2 days ago",
    description: "We're looking for a Senior Frontend Developer to join our team and help build the next generation of DeFi applications. You'll work with React, TypeScript, and modern web technologies to create seamless user experiences.",
    requirements: [
      "5+ years of experience with React and TypeScript",
      "Strong understanding of modern CSS and responsive design",
      "Experience with state management libraries (Redux, Zustand)",
      "Knowledge of Web3 and blockchain technologies",
      "Experience with testing frameworks (Jest, Cypress)"
    ],
    benefits: [
      "Competitive salary and equity",
      "Flexible remote work",
      "Health, dental, and vision insurance",
      "Professional development budget",
      "Latest tech equipment"
    ],
    tags: ["React", "TypeScript", "Web3", "DeFi", "Remote"]
  },
  {
    id: 2,
    title: "Blockchain Engineer",
    department: "Engineering",
    location: "San Francisco, CA",
    type: "Full-time",
    experience: "Senior",
    salary: "$150k - $220k",
    posted: "1 week ago",
    description: "Join our blockchain team to build and optimize smart contracts, DeFi protocols, and cross-chain solutions. You'll work on cutting-edge technology that powers the future of finance.",
    requirements: [
      "3+ years of Solana development experience",
      "Proficiency in Rust programming",
      "Experience with Anchor framework",
      "Knowledge of DeFi protocols and AMMs",
      "Understanding of cryptographic principles"
    ],
    benefits: [
      "Top-tier compensation package",
      "Stock options",
      "Comprehensive health benefits",
      "Learning and development opportunities",
      "Team building events"
    ],
    tags: ["Rust", "Solana", "Smart Contracts", "DeFi", "Anchor"]
  },
  {
    id: 3,
    title: "Product Manager",
    department: "Product",
    location: "New York, NY",
    type: "Full-time",
    experience: "Mid-level",
    salary: "$100k - $140k",
    posted: "3 days ago",
    description: "Lead product strategy and development for our DeFi platform. Work closely with engineering, design, and business teams to deliver exceptional user experiences.",
    requirements: [
      "3+ years of product management experience",
      "Experience in fintech or DeFi",
      "Strong analytical and problem-solving skills",
      "Excellent communication and leadership abilities",
      "Experience with agile development methodologies"
    ],
    benefits: [
      "Competitive salary and bonuses",
      "Health and wellness benefits",
      "Flexible PTO policy",
      "Professional development opportunities",
      "Modern office in Manhattan"
    ],
    tags: ["Product Management", "DeFi", "Strategy", "Leadership", "Fintech"]
  },
  {
    id: 4,
    title: "UX/UI Designer",
    department: "Design",
    location: "Remote",
    type: "Full-time",
    experience: "Mid-level",
    salary: "$80k - $120k",
    posted: "5 days ago",
    description: "Create intuitive and beautiful user interfaces for our DeFi platform. You'll work on complex financial interfaces while maintaining excellent user experience.",
    requirements: [
      "3+ years of UX/UI design experience",
      "Proficiency in Figma and design systems",
      "Experience with financial or complex applications",
      "Strong understanding of user research methods",
      "Knowledge of accessibility standards"
    ],
    benefits: [
      "Competitive salary and equity",
      "Remote-first culture",
      "Design tools and software budget",
      "Conference and training opportunities",
      "Flexible working hours"
    ],
    tags: ["Figma", "UX Design", "UI Design", "Design Systems", "Fintech"]
  },
  {
    id: 5,
    title: "DevOps Engineer",
    department: "Engineering",
    location: "Austin, TX",
    type: "Full-time",
    experience: "Senior",
    salary: "$110k - $160k",
    posted: "1 week ago",
    description: "Build and maintain our cloud infrastructure, CI/CD pipelines, and monitoring systems. Ensure our platform is scalable, secure, and highly available.",
    requirements: [
      "4+ years of DevOps/SRE experience",
      "Experience with AWS or GCP",
      "Knowledge of Kubernetes and Docker",
      "Experience with monitoring tools (Prometheus, Grafana)",
      "Strong scripting skills (Python, Bash)"
    ],
    benefits: [
      "Competitive salary and equity",
      "Health and dental insurance",
      "401k with company matching",
      "Professional development budget",
      "Relocation assistance available"
    ],
    tags: ["AWS", "Kubernetes", "Docker", "CI/CD", "Monitoring"]
  },
  {
    id: 6,
    title: "Marketing Manager",
    department: "Marketing",
    location: "Remote",
    type: "Full-time",
    experience: "Mid-level",
    salary: "$70k - $100k",
    posted: "4 days ago",
    description: "Drive growth and brand awareness for DeFi Nexus. Develop and execute marketing strategies across multiple channels to reach our target audience.",
    requirements: [
      "3+ years of marketing experience",
      "Experience in crypto/DeFi marketing",
      "Strong content creation skills",
      "Knowledge of digital marketing channels",
      "Analytical mindset with data-driven approach"
    ],
    benefits: [
      "Competitive salary and performance bonuses",
      "Remote work flexibility",
      "Marketing tools and software budget",
      "Conference and event attendance",
      "Health and wellness benefits"
    ],
    tags: ["Digital Marketing", "Content Creation", "Crypto", "Growth", "Analytics"]
  }
]

const departments = ["All", "Engineering", "Product", "Design", "Marketing"]
const locations = ["All", "Remote", "San Francisco, CA", "New York, NY", "Austin, TX"]
const experienceLevels = ["All", "Entry", "Mid-level", "Senior", "Lead"]

export default function CareersPage() {
  const [selectedJob, setSelectedJob] = useState<typeof mockJobs[0] | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("All")
  const [selectedLocation, setSelectedLocation] = useState("All")
  const [selectedExperience, setSelectedExperience] = useState("All")

  const filteredJobs = useMemo(() => {
    return mockJobs.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           job.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      
      const matchesDepartment = selectedDepartment === "All" || job.department === selectedDepartment
      const matchesLocation = selectedLocation === "All" || job.location === selectedLocation
      const matchesExperience = selectedExperience === "All" || job.experience === selectedExperience

      return matchesSearch && matchesDepartment && matchesLocation && matchesExperience
    })
  }, [searchTerm, selectedDepartment, selectedLocation, selectedExperience])

  const handleJobClick = (job: typeof mockJobs[0]) => {
    setSelectedJob(job)
  }

  const handleCloseJob = () => {
    setSelectedJob(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-blue-900 dark:to-purple-900">
      {/* Header */}
      <div className="text-center mb-8 pt-8">
        <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
          <Briefcase className="h-4 w-4 text-yellow-400" />
          <span className="text-sm font-medium">Join Our Team</span>
        </div>
        <h1 className="text-5xl lg:text-6xl font-bold mb-6">
          <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Careers
          </span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Build the future of DeFi with us. Join a team of innovators, builders, and dreamers.
        </p>
      </div>

      <div className="container mx-auto px-4 pb-16">
        {/* Why Join Us Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 ease-out hover:scale-105">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Innovation First</h3>
              <p className="text-muted-foreground">Work on cutting-edge DeFi technology that's shaping the future of finance.</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 ease-out hover:scale-105">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Amazing Team</h3>
              <p className="text-muted-foreground">Collaborate with talented individuals from around the world.</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 ease-out hover:scale-105">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Growth Opportunities</h3>
              <p className="text-muted-foreground">Advance your career with continuous learning and development.</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search jobs, skills, or keywords..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-12"
                  />
                </div>
              </div>

              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-3">
                <CustomSelect
                  value={selectedDepartment}
                  onValueChange={setSelectedDepartment}
                  placeholder="Department"
                  options={departments.map(dept => ({ value: dept, label: dept }))}
                  className="w-full sm:w-48"
                />

                <CustomSelect
                  value={selectedLocation}
                  onValueChange={setSelectedLocation}
                  placeholder="Location"
                  options={locations.map(location => ({ value: location, label: location }))}
                  className="w-full sm:w-48"
                />

                <CustomSelect
                  value={selectedExperience}
                  onValueChange={setSelectedExperience}
                  placeholder="Experience"
                  options={experienceLevels.map(level => ({ value: level, label: level }))}
                  className="w-full sm:w-48"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Job Listings */}
        <div className="space-y-4">
          {filteredJobs.map((job) => (
            <Card 
              key={job.id} 
              className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 ease-out hover:scale-[1.02] cursor-pointer"
              onClick={() => handleJobClick(job)}
            >
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-semibold mb-1">{job.title}</h3>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Briefcase className="h-4 w-4" />
                            <span>{job.department}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-4 w-4" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{job.type}</span>
                          </div>
                        </div>
                      </div>
                      <Badge variant="secondary" className="ml-4">
                        {job.experience}
                      </Badge>
                    </div>
                    
                    <p className="text-muted-foreground mb-4 line-clamp-2">
                      {job.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.tags.slice(0, 4).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {job.tags.length > 4 && (
                        <Badge variant="outline" className="text-xs">
                          +{job.tags.length - 4} more
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end space-y-2">
                    <div className="text-right">
                      <p className="font-semibold text-green-600 dark:text-green-400">{job.salary}</p>
                      <p className="text-sm text-muted-foreground">{job.posted}</p>
                    </div>
                    <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0">
                      View Details
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
            <CardContent className="p-12 text-center">
              <Briefcase className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No jobs found</h3>
              <p className="text-muted-foreground">Try adjusting your search criteria or check back later for new opportunities.</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Job Detail Modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold mb-2">{selectedJob.title}</h2>
                  <div className="flex items-center space-x-6 text-muted-foreground mb-4">
                    <div className="flex items-center space-x-1">
                      <Briefcase className="h-4 w-4" />
                      <span>{selectedJob.department}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{selectedJob.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{selectedJob.type}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Badge variant="secondary">{selectedJob.experience}</Badge>
                    <span className="font-semibold text-green-600 dark:text-green-400">{selectedJob.salary}</span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleCloseJob}
                  className="h-8 w-8"
                >
                  ×
                </Button>
              </div>

              {/* Job Description */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Job Description</h3>
                  <p className="text-muted-foreground leading-relaxed">{selectedJob.description}</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Requirements</h3>
                  <ul className="space-y-2">
                    {selectedJob.requirements.map((req, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-blue-500 mt-1">•</span>
                        <span className="text-muted-foreground">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Benefits</h3>
                  <ul className="space-y-2">
                    {selectedJob.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-green-500 mt-1">•</span>
                        <span className="text-muted-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Skills & Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedJob.tags.map((tag) => (
                      <Badge key={tag} variant="outline">{tag}</Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Application Form */}
              <div className="mt-8 pt-6 border-t">
                <h3 className="text-xl font-semibold mb-4">Apply for this position</h3>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">First Name</label>
                      <Input placeholder="Enter your first name" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Last Name</label>
                      <Input placeholder="Enter your last name" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Email</label>
                    <Input type="email" placeholder="Enter your email" />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Phone Number</label>
                    <Input placeholder="Enter your phone number" />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">LinkedIn Profile</label>
                    <Input placeholder="https://linkedin.com/in/yourprofile" />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Cover Letter</label>
                    <textarea 
                      className="w-full h-32 px-3 py-2 border border-input rounded-md bg-background text-sm ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      placeholder="Tell us why you're interested in this position..."
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Resume/CV</label>
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                      <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                      <p className="text-xs text-muted-foreground mt-1">PDF, DOC, DOCX (Max 10MB)</p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-4 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleCloseJob}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0"
                    >
                      Submit Application
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
