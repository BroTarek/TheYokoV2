import {
    IconBriefcase,
    IconBuilding,
    IconChartBar,
    IconCircleCheck,
    IconCircleCheckFilled,
    IconCircleDot,
    IconCpu,
    IconGavel,
    IconLoader,
    IconTruck,
} from "@tabler/icons-react"


export const COUNTRIES = [
    { code: "SA", name: "Saudi Arabia" },
    { code: "AE", name: "United Arab Emirates" },
    { code: "EG", name: "Egypt" },
    { code: "IQ", name: "Iraq" },
    { code: "JO", name: "Jordan" },
    { code: "LB", name: "Lebanon" },
    { code: "KW", name: "Kuwait" },
    { code: "QA", name: "Qatar" },
    { code: "BH", name: "Bahrain" },
    { code: "OM", name: "Oman" },
    { code: "SY", name: "Syria" },
    { code: "YE", name: "Yemen" },
    { code: "PS", name: "Palestine" },
    { code: "MA", name: "Morocco" },
    { code: "DZ", name: "Algeria" },
    { code: "TN", name: "Tunisia" },
    { code: "LY", name: "Libya" },
    { code: "SD", name: "Sudan" },
    { code: "SO", name: "Somalia" },
    { code: "MR", name: "Mauritania" },
    { code: "DJ", name: "Djibouti" },
    { code: "KM", name: "Comoros" },
    { code: "GCC", name: "GCC" },
    { code: "NA", name: "North Africa" },
]

export const FIELD_CONFIG = {
    Sales: {
        color: "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800",
        icon: IconChartBar,
        iconColor: "text-red-600 dark:text-red-400"
    },
    Marketing: {
        color: "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800",
        icon: IconBuilding,
        iconColor: "text-blue-600 dark:text-blue-400"
    },
    Management: {
        color: "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800",
        icon: IconBriefcase,
        iconColor: "text-purple-600 dark:text-purple-400"
    },
    Parts: {
        color: "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800",
        icon: IconCpu,
        iconColor: "text-green-600 dark:text-green-400"
    },
    Logistics: {
        color: "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800",
        icon: IconTruck,
        iconColor: "text-amber-600 dark:text-amber-400"
    },
    CRM_CX: {
        color: "bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-800",
        icon: IconBriefcase,
        iconColor: "text-indigo-600 dark:text-indigo-400"
    },
    HR: {
        color: "bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-800",
        icon: IconBriefcase,
        iconColor: "text-indigo-600 dark:text-indigo-400"
    },
    Finance: {
        color: "bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-800",
        icon: IconBriefcase,
        iconColor: "text-indigo-600 dark:text-indigo-400"
    },
    IT: {
        color: "bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-800",
        icon: IconBriefcase,
        iconColor: "text-indigo-600 dark:text-indigo-400"
    },
    Legal: {
        color: "bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-800",
        icon: IconBriefcase,
        iconColor: "text-indigo-600 dark:text-indigo-400"
    },
    CLevel: {
        color: "bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-800",
        icon: IconBriefcase,
        iconColor: "text-indigo-600 dark:text-indigo-400"
    },
    Service: {
        color: "bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-800",
        icon: IconBriefcase,
        iconColor: "text-indigo-600 dark:text-indigo-400"
    },
    Director: {
        color: "bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-800",
        icon: IconBriefcase,
        iconColor: "text-indigo-600 dark:text-indigo-400"
    },
    Product: {
        color: "bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-800",
        icon: IconBriefcase,
        iconColor: "text-indigo-600 dark:text-indigo-400"
    },
    Other: {
        color: "bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-800",
        icon: IconBriefcase,
        iconColor: "text-indigo-600 dark:text-indigo-400"
    },
} as const

export const STATUS_CONFIG = {
    unseen: {
        color: "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/30 dark:text-gray-300 dark:border-gray-800",
        icon: IconCircleDot,
        iconColor: "text-gray-500 dark:text-gray-400"
    },
    seen: {
        color: "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800",
        icon: IconCircleDot,
        iconColor: "text-blue-500 dark:text-blue-400"
    },
    reviewed: {
        color: "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800",
        icon: IconCircleCheck,
        iconColor: "text-purple-500 dark:text-purple-400"
    },
    selected: {
        color: "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/30 dark:text-gray-300 dark:border-gray-800",
        icon: IconCircleCheckFilled,
        iconColor: "text-green-500 dark:text-green-400"
    },
    done: {
        color: "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800",
        icon: IconCircleCheckFilled,
        iconColor: "text-green-500 dark:text-green-400"
    }
} as const


const chartData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
]

const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "var(--primary)",
    },
    mobile: {
        label: "Mobile",
        color: "var(--primary)",
    },
} 