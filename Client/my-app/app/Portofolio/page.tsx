'use client'

import React, { useState, useEffect, Suspense, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import {
  User, Mail, Phone, MapPin, Briefcase, Building,
  Calendar, Globe, FileText, Award, Upload, Link2,
  Download, Edit, Printer, Share2, Mail as MailIcon
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import {
  IconCircleCheck,
  IconCircleCheckFilled,
  IconCircleDot,
  IconLoader,
} from "@tabler/icons-react";
import { useApplicant, useUpdateApplicant } from "@/features/applicants/hooks";
import { toast } from "sonner";
import { Applicant } from '@/utils/schemas'

const STATUS_CONFIG = {
  unseen: {
    label: "Unseen",
    color: "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/30 dark:text-gray-300 dark:border-gray-800",
    icon: IconCircleDot,
    iconColor: "text-gray-500 dark:text-gray-400"
  },
  seen: {
    label: "Seen",
    color: "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800",
    icon: IconCircleDot,
    iconColor: "text-blue-500 dark:text-blue-400"
  },
  reviewed: {
    label: "Reviewed",
    color: "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800",
    icon: IconCircleCheck,
    iconColor: "text-purple-500 dark:text-purple-400"
  },
  selected: {
    label: "Selected",
    color: "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/30 dark:text-gray-300 dark:border-gray-800",
    icon: IconCircleCheckFilled,
    iconColor: "text-green-500 dark:text-green-400"
  },
  done: {
    label: "Done",
    color: "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-gray-800",
    icon: IconCircleCheckFilled,
    iconColor: "text-green-500 dark:text-green-400"
  }
} as const;

function PortfolioContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const { data: applicant, isLoading: loading } = useApplicant(id || "");
  console.log(applicant)
  const updateMutation = useUpdateApplicant();
  const [activeTab, setActiveTab] = useState("overview");

  const formData = useMemo(() => {
    if (!applicant) return null;

    return {
      personal: {
        fullName: `${applicant.firstName} ${applicant.lastName}`,
        email: applicant.email,
        referralSource: applicant.referralSource?.name || "N/A",
        phoneNumber: applicant.phone,
      },
      experience: {
        yearsOfExperience: applicant.yearsOfExperience,
        selectedFields: applicant.jobField ? [applicant.jobField.name] : [],
        positionApplied: applicant.jobTitle?.title || "N/A",
        lastCompany: applicant.lastCompany || "N/A",
        countriesWorked: applicant.desiredRegions?.map((r: any) => r.name) || [],
        achievements: applicant.experienceDescription || "No description provided.",
      },
      documents: applicant.googleDriveUrl
        ? [
          {
            name: "CV - Google Drive",
            type: "External Link",
            size: "N/A",
            url: applicant.googleDriveUrl,
          },
        ]
        : [],
      metadata: {
        applicationDate: new Date(applicant.createdAt).toLocaleDateString(),
        applicationId: `APP-${applicant.id.substring(0, 8).toUpperCase()}`,
        status: applicant.status || "unseen",
        lastUpdated: new Date(applicant.createdAt).toLocaleDateString(),
      },
    };
  }, [applicant]);

  const handleStatusChange = async (newStatus: string) => {
    if (!id) return;
    updateMutation.mutate(
      { id, status: newStatus as any },
      {
        onSuccess: () => {
          toast.success("Status updated successfully");
        },
        onError: (error: any) => {
          toast.error(`Failed to update status: ${error.message}`);
        },
      }
    );
  };

  if (loading) return <div className="p-10 text-center">Loading portfolio...</div>
  if (!formData) return <div className="p-10 text-center">No portfolio data found. Please select an application from the dashboard.</div>

  // Format phone number for display
  const formatPhoneNumber = (phone: string) => {
    if (!phone) return 'N/A'
    return phone // Return as is for now, or add formatting logic
  }

  // Get country flag emoji
  const getCountryFlag = (countryCode: string) => {
    const flags: Record<string, string> = {
      'SA': '🇸🇦',
      'AE': '🇦🇪',
      'EG': '🇪🇬',
      'IQ': '🇮🇶',
      'JO': '🇯🇴',
      'LB': '🇱🇧',
      'KW': '🇰🇼',
      'QA': '🇶🇦',
      'BH': '🇧🇭',
      'OM': '🇴🇲',
      'SY': '🇸🇾',
      'YE': '🇾🇪',
      'PS': '🇵🇸',
      'MA': '🇲🇦',
      'DZ': '🇩🇿',
      'TN': '🇹🇳',
      'LY': '🇱🇾',
      'SD': '🇸🇩',
      'SO': '🇸🇴',
      'MR': '🇲🇷',
      'DJ': '🇩🇯',
      'KM': '🇰🇲',
      'GCC': '🌍',
      'NA': '🌍',
    }

    // Map country names to codes
    const countryMapping: Record<string, string> = {
      'Jordan': 'JO',
      'Yemen': 'YE',
      'Egypt': 'EG',
      'Saudi Arabia': 'SA',
    }

    const code = countryMapping[countryCode] || countryCode
    return flags[code] || '🌍'
  }

  const handlePrint = () => {
    window.print()
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${formData.personal.fullName} - Professional Portfolio`,
          text: `Check out ${formData.personal.fullName}'s professional portfolio`,
          url: window.location.href,
        })
      } catch (error) {
        console.log('Sharing cancelled', error)
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  const handleDownloadCV = () => {
    // In a real app, this would download the actual CV
    if (applicant?.googleDriveUrl) {
      console.log(applicant.googleDriveUrl)
      window.location.href = applicant.googleDriveUrl
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-4 md:p-8 print:p-0">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 print:mb-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Professional Portfolio
              </h1>
              <p className="text-gray-600">
                Application ID: <span className="font-mono font-semibold text-kaizen-red">{formData.metadata.applicationId}</span>
              </p>
            </div>
            <div className="flex flex-wrap gap-2 mt-4 md:mt-0 print:hidden">
              <Button onClick={handleDownloadCV}>
                <Download className="w-4 h-4 mr-2" />
                <Link href={`${applicant.googleDriveUrl}`}>View CV</Link>


              </Button>
            </div>
          </div>

          {/* Status Bar */}
          <div className="bg-white rounded-xl shadow-sm border p-4 mb-6">
            <div className="flex flex-wrap items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-kaizen-red to-orange-500 flex items-center justify-center">
                  <span className="text-2xl text-white font-bold">
                    {formData.personal.fullName.split(' ').map((n: string) => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{formData.personal.fullName}</h2>
                  <p className="text-gray-600 flex items-center">
                    <Briefcase className="w-4 h-4 mr-1" />
                    {formData.experience.positionApplied}
                  </p>
                </div>
              </div>
              <div className="mt-4 md:mt-0">
                <div className="flex flex-col gap-3">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.metadata.status}
                    onValueChange={handleStatusChange}
                  >
                    <SelectTrigger id="status" className="w-full">
                      <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(STATUS_CONFIG).map((status: string) => {
                        const config = STATUS_CONFIG[status as keyof typeof STATUS_CONFIG]
                        const Icon = config.icon
                        return (
                          <SelectItem key={status} value={status}>
                            <div className="flex items-center gap-2">
                              <Icon className={`size-3 ${config.iconColor}`} />
                              <span>{(config as any).label}</span>
                            </div>
                          </SelectItem>
                        )
                      })}
                    </SelectContent>
                  </Select>
                </div>
                <p className="text-sm text-gray-500 mt-2 text-right">
                  Last updated: {formData.metadata.lastUpdated}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-1 md:grid-cols-4 w-full print:hidden">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information Card */}
              <Card className="border shadow-sm">
                <CardHeader className="bg-gradient-to-r from-gray-50 to-white">
                  <CardTitle className="flex items-center text-lg">
                    <User className="w-5 h-5 mr-2 text-kaizen-red" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Mail className="w-5 h-5 mr-3 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium">{formData.personal.email}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Phone className="w-5 h-5 mr-3 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-500">Phone Number</p>
                        <p className="font-medium">{formatPhoneNumber(formData.personal.phoneNumber)}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Link2 className="w-5 h-5 mr-3 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-500">How did you hear about us?</p>
                        <p className="font-medium">{formData.personal.referralSource}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Professional Summary Card */}
              <Card className="border shadow-sm">
                <CardHeader className="bg-gradient-to-r from-gray-50 to-white">
                  <CardTitle className="flex items-center text-lg">
                    <Briefcase className="w-5 h-5 mr-2 text-kaizen-red" />
                    Professional Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Calendar className="w-5 h-5 mr-3 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-500">Years of Experience</p>
                        <p className="font-medium">{formData.experience.yearsOfExperience}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Building className="w-5 h-5 mr-3 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-500">Last Company</p>
                        <p className="font-medium">{formData.experience.lastCompany}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Award className="w-5 h-5 mr-3 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-500">Fields of Expertise</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {formData.experience.selectedFields.map((field: string, index: number) => (
                            <Badge key={index} variant="secondary" className="bg-red-50 text-kaizen-red">
                              {field}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* International Experience Card */}
            <Card className="border shadow-sm">
              <CardHeader className="bg-gradient-to-r from-gray-50 to-white">
                <CardTitle className="flex items-center text-lg">
                  <Globe className="w-5 h-5 mr-2 text-kaizen-red" />
                  International Experience
                </CardTitle>
                <CardDescription>
                  Countries where professional experience was gained
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="flex flex-wrap gap-4">
                  {formData.experience.countriesWorked.map((country: string, index: number) => (
                    <div key={index} className="flex items-center space-x-2 bg-gray-50 rounded-lg px-4 py-3">
                      <span className="text-2xl">{getCountryFlag(country)}</span>
                      <span className="font-medium">{country}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Achievements Card */}
            {/* <Card className="border shadow-sm">
              <CardHeader className="bg-gradient-to-r from-gray-50 to-white">
                <CardTitle className="flex items-center text-lg">
                  <Award className="w-5 h-5 mr-2 text-kaizen-red" />
                  Key Achievements & Projects
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 whitespace-pre-line">
                    {formData.experience.achievements}
                  </p>
                </div>
              </CardContent>
            </Card> */}
          </TabsContent>

          {/* Experience Tab */}
          <TabsContent value="experience" className="space-y-6">
            <Card className="border shadow-sm">
              <CardHeader>
                <CardTitle>Detailed Experience Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Experience Timeline */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <Calendar className="w-5 h-5 mr-2 text-kaizen-red" />
                      Experience Timeline
                    </h3>
                    <div className="space-y-4">
                      <div className="border-l-2 border-kaizen-red pl-4 pb-4">
                        <div className="relative">
                          <div className="absolute -left-[28px] top-0 w-4 h-4 rounded-full bg-kaizen-red border-4 border-white"></div>
                          <div className="flex flex-col md:flex-row md:items-center justify-between">
                            <div>
                              <h4 className="font-bold text-gray-900">{formData.experience.positionApplied}</h4>
                              <p className="text-gray-600">{formData.experience.lastCompany}</p>
                            </div>
                            <Badge className="mt-2 md:mt-0">Current</Badge>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">{formData.experience.yearsOfExperience} experience</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Skills & Competencies */}
                  {/* <div>
                    <h3 className="text-lg font-semibold mb-4">Skills & Competencies</h3>
                    <div className="flex flex-wrap gap-2">
                      {formData.experience.selectedFields.map((field: string, index: number) => (
                        <Badge key={index} variant="outline" className="px-4 py-2 text-sm">
                          {field}
                        </Badge>
                      ))}
                      <Badge variant="outline" className="px-4 py-2 text-sm">Team Leadership</Badge>
                      <Badge variant="outline" className="px-4 py-2 text-sm">Project Management</Badge>
                      <Badge variant="outline" className="px-4 py-2 text-sm">Strategic Planning</Badge>
                      <Badge variant="outline" className="px-4 py-2 text-sm">Digital Marketing</Badge>
                      <Badge variant="outline" className="px-4 py-2 text-sm">Market Analysis</Badge>
                    </div>
                  </div> */}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents" className="space-y-6">
            <Card className="border shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-kaizen-red" />
                  Application Documents
                </CardTitle>
                <CardDescription>
                  All submitted documents and files
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {formData.documents.map((doc: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-lg bg-red-50 flex items-center justify-center">
                          <FileText className="w-6 h-6 text-kaizen-red" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{doc.name}</h4>
                          <div className="flex items-center space-x-4 mt-1">
                            <span className="text-sm text-gray-500">{doc.type}</span>
                            <span className="text-sm text-gray-500">•</span>
                            <span className="text-sm text-gray-500">{doc.size}</span>
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" asChild>
                        <a href={doc.url} target="_blank" rel="noopener noreferrer">
                          <Download className="w-4 h-4 mr-2" />
                          View Document
                        </a>
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contact Tab */}
          <TabsContent value="contact" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MailIcon className="w-5 h-5 mr-2 text-kaizen-red" />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-gray-500">Full Name</label>
                      <p className="font-medium mt-1">{formData.personal.fullName}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Email Address</label>
                      <p className="font-medium mt-1">{formData.personal.email}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Phone Number</label>
                      <p className="font-medium mt-1">{formatPhoneNumber(formData.personal.phoneNumber)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Link2 className="w-5 h-5 mr-2 text-kaizen-red" />
                    Application Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-gray-500">Application ID</label>
                      <p className="font-medium font-mono mt-1">{formData.metadata.applicationId}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Application Date</label>
                      <p className="font-medium mt-1">{formData.metadata.applicationDate}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Referral Source</label>
                      <p className="font-medium mt-1">{formData.personal.referralSource}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Status</label>
                      <Badge className="mt-1" variant="outline">
                        {formData.metadata.status}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="border shadow-sm">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button className="w-full" onClick={handleDownloadCV}>
                    <Download className="w-4 h-4 mr-2" />
                    Download Complete Portfolio
                  </Button>
                  
                  
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <footer className="mt-8 pt-6 border-t text-center text-gray-500 text-sm print:hidden">
          <p>Application submitted on {formData.metadata.applicationDate}</p>
          <p className="mt-1">This portfolio is automatically generated from your application data</p>
        </footer>
      </div>
    </div>
  )
}

export default function PortfolioPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading portfolio...</div>}>
      <PortfolioContent />
    </Suspense>
  )
}
