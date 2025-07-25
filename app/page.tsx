"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

// Retro Components
import { RetroButton } from "@/components/retro-button"
import { RetroInput } from "@/components/retro-input"
import { RetroWindow } from "@/components/retro-window"
import { RetroSearchBar } from "@/components/retro-search-bar"
import { RetroProgressBar } from "@/components/retro-progress-bar"
import { RetroSidebarItem } from "@/components/retro-sidebar-item"
import { RetroProfileCard } from "@/components/retro-profile-card"

import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { injected } from 'wagmi/connectors'; // We'll use this to directly connect to MetaMask


import {
  Target,
  CheckCircle2,
  Clock,
  Flame,
  Trophy,
  Wallet,
  Settings,
  Plus,
  Upload,
  Coins,
  Calendar,
  Gift,
  Zap,
  FileText,
  ImageIcon,
  Link,
  AlertCircle,
  CheckCircle,
  XCircle,
  Timer,
  DollarSign,
  Crown,
  Shield,
  Sparkles,
  TrendingDown,
  BarChart3,
  Eye,
  RefreshCw,
  ArrowRight,
  ArrowUp,
  Lock,
  Briefcase,
  PiggyBankIcon as Pig,
  LogOut,
  GraduationCap,
  BookOpen,
  Lightbulb,
  Star,
  Award,
  Percent,
  Copy,
  Bell,
  Moon,
  Sun,
  Globe,
  Smartphone,
  User,
} from "lucide-react"

// Types and Interfaces
interface Task {
  id: string
  title: string
  description: string
  category: string
  deadline: Date
  stakeAmount: number
  stakeCurrency: "ETH" | "USDC" | "ZLAG"
  status: "active" | "pending" | "completed" | "failed"
  progress: number
  proofSubmitted?: boolean
  proofType?: "text" | "image" | "file" | "url"
  proofContent?: string
  createdAt: Date
  completedAt?: Date
  reward?: number
  difficulty: "easy" | "medium" | "hard"
  tags: string[]
  userType: "student" | "freelancer" | "productivity"
  validatorScore?: number
}

interface NFTBadge {
  id: string
  name: string
  description: string
  rarity: "Common" | "Uncommon" | "Rare" | "Epic" | "Legendary"
  streakRequired: number
  unlocked: boolean
  progress: number
  imageUrl: string
  mintedAt?: Date
  tradeable: boolean
  marketValue?: number
  attributes: { trait_type: string; value: string | number }[]
  category: "student" | "freelancer" | "productivity" | "general"
}

interface UserStats {
  currentStreak: number
  longestStreak: number
  totalStaked: number
  totalEarned: number
  successRate: number
  tasksCompleted: number
  tasksActive: number
  nftBadges: number
  governanceVotes: number
  retryTokens: number
  premiumUntil?: Date
  userType: "student" | "freelancer" | "productivity"
  trustScore: number
}

interface RevenueStream {
  name: string
  monthlyRevenue: number
  growth: number
  color: string
  icon: any
}

interface TaskLifecycleStage {
  stage: string
  status: "completed" | "current" | "pending"
  timestamp?: Date
  description: string
}

interface ActivityItem {
  id: string
  type: "task" | "nft" | "proof" | "stake"
  description: string
  timestamp: Date
  status?: "success" | "fail" | "pending"
  icon?: React.ElementType
}



export default function ZeroLagDashboard() {
  // State Management
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const [activeTab, setActiveTab] = useState("overview")

  // Helper to format the address
  const formattedAddress = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : '';
// Function your button will call
  const handleConnectWallet = () => {
    connect({ connector: injected() });
  };
  const handleDisconnectWallet = () => {
   disconnect();
 };

  //const [isWalletConnected, setIsWalletConnected] = useState(false)
  //const [userAddress, setUserAddress] = useState("")
  const [userBalance, setUserBalance] = useState({ ETH: 2.5, USDC: 1000, ZLAG: 5000 })
  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false)
  const [showProofModal, setShowProofModal] = useState(false)
  const [showNFTDetailsModal, setShowNFTDetailsModal] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [selectedNFT, setSelectedNFT] = useState<NFTBadge | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("deadline")
  const [filterStatus, setFilterStatus] = useState("all")
  const [darkMode, setDarkMode] = useState(false)
  const [language, setLanguage] = useState("en")
  const [zkProofMode, setZkProofMode] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())

  // Wallet Connection Functions
  
  
  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  // Mock Data
  const [userStats, setUserStats] = useState<UserStats>({
    currentStreak: 12,
    longestStreak: 28,
    totalStaked: 1250,
    totalEarned: 890,
    successRate: 87,
    tasksCompleted: 45,
    tasksActive: 3,
    nftBadges: 7,
    governanceVotes: 12,
    retryTokens: 5,
    premiumUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    userType: "student",
    trustScore: 92,
  })

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Complete React Tutorial Series",
      description: "Finish all 12 modules of the advanced React course with hands-on projects",
      category: "Learning",
      deadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      stakeAmount: 50,
      stakeCurrency: "ZLAG",
      status: "active",
      progress: 75,
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      difficulty: "medium",
      tags: ["React", "JavaScript", "Frontend"],
      userType: "student",
      validatorScore: 0.92,
    },
    {
      id: "2",
      title: "Client Website Delivery",
      description: "Complete responsive website for client with mobile optimization",
      category: "Freelance",
      deadline: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      stakeAmount: 150,
      stakeCurrency: "ETH",
      status: "pending",
      progress: 100,
      proofSubmitted: true,
      proofType: "url",
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      difficulty: "hard",
      tags: ["Web Development", "Client Work", "Responsive"],
      userType: "freelancer",
      validatorScore: 0.88,
    },
    {
      id: "3",
      title: "Daily Reading Goal",
      description: "Read 30 pages of technical documentation and take notes",
      category: "Productivity",
      deadline: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      stakeAmount: 15,
      stakeCurrency: "USDC",
      status: "completed",
      progress: 100,
      completedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      reward: 18,
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      difficulty: "easy",
      tags: ["Reading", "Documentation", "Learning"],
      userType: "productivity",
      validatorScore: 0.95,
    },
    {
      id: "4",
      title: "Assignment Submission",
      description: "Submit final project for Computer Science course with documentation",
      category: "Academic",
      deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      stakeAmount: 75,
      stakeCurrency: "ZLAG",
      status: "active",
      progress: 60,
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      difficulty: "hard",
      tags: ["Assignment", "Computer Science", "Project"],
      userType: "student",
    },
    {
      id: "5",
      title: "Morning Routine Consistency",
      description: "Complete morning routine including exercise and planning",
      category: "Productivity",
      deadline: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      stakeAmount: 10,
      stakeCurrency: "ZLAG",
      status: "failed",
      progress: 0,
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      difficulty: "easy",
      tags: ["Routine", "Consistency", "Habits"],
      userType: "productivity",
    },
    {
      id: "6",
      title: "Logo Design Delivery",
      description: "Create and deliver logo design package for startup client",
      category: "Freelance",
      deadline: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
      stakeAmount: 100,
      stakeCurrency: "ZLAG",
      status: "active",
      progress: 30,
      createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
      difficulty: "medium",
      tags: ["Design", "Logo", "Branding"],
      userType: "freelancer",
    },
  ])

  const [nftBadges, setNftBadges] = useState<NFTBadge[]>([
    {
      id: "1",
      name: "Academic Achiever",
      description: "Complete 5 academic assignments successfully",
      rarity: "Common",
      streakRequired: 5,
      unlocked: true,
      progress: 100,
      imageUrl: "/placeholder.svg?height=64&width=64",
      mintedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      tradeable: true,
      marketValue: 5,
      category: "student",
      attributes: [
        { trait_type: "Category", value: "Academic" },
        { trait_type: "Difficulty", value: "Beginner" },
        { trait_type: "Type", value: "Achievement" },
      ],
    },
    {
      id: "2",
      name: "Trusted Freelancer",
      description: "Complete 10 client projects with 95%+ satisfaction",
      rarity: "Uncommon",
      streakRequired: 10,
      unlocked: true,
      progress: 100,
      imageUrl: "/placeholder.svg?height=64&width=64",
      mintedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      tradeable: true,
      marketValue: 25,
      category: "freelancer",
      attributes: [
        { trait_type: "Category", value: "Professional" },
        { trait_type: "Trust Level", value: "High" },
        { trait_type: "Client Rating", value: "95+" },
      ],
    },
    {
      id: "3",
      name: "Consistency Master",
      description: "Maintain 14-day productivity streak",
      rarity: "Rare",
      streakRequired: 14,
      unlocked: false,
      progress: 85,
      imageUrl: "/placeholder.svg?height=64&width=64",
      tradeable: false,
      category: "productivity",
      attributes: [
        { trait_type: "Category", value: "Productivity" },
        { trait_type: "Streak", value: 14 },
        { trait_type: "Difficulty", value: "Advanced" },
      ],
    },
    {
      id: "4",
      name: "Scholar Supreme",
      description: "Complete 50 academic tasks with perfect record",
      rarity: "Epic",
      streakRequired: 50,
      unlocked: false,
      progress: 40,
      imageUrl: "/placeholder.svg?height=64&width=64",
      tradeable: false,
      category: "student",
      attributes: [
        { trait_type: "Category", value: "Academic" },
        { trait_type: "Tasks", value: 50 },
        { trait_type: "Difficulty", value: "Expert" },
      ],
    },
    {
      id: "5",
      name: "Elite Contractor",
      description: "Legendary freelancer status - 100 successful deliveries",
      rarity: "Legendary",
      streakRequired: 100,
      unlocked: false,
      progress: 20,
      imageUrl: "/placeholder.svg?height=64&width=64",
      tradeable: false,
      category: "freelancer",
      attributes: [
        { trait_type: "Category", value: "Professional" },
        { trait_type: "Deliveries", value: 100 },
        { trait_type: "Status", value: "Elite" },
      ],
    },
    {
      id: "6",
      name: "Productivity Guru",
      description: "Master of habits - 60-day consistency streak",
      rarity: "Legendary",
      streakRequired: 60,
      unlocked: false,
      progress: 20,
      imageUrl: "/placeholder.svg?height=64&width=64",
      tradeable: false,
      category: "productivity",
      attributes: [
        { trait_type: "Category", value: "Productivity" },
        { trait_type: "Streak", value: 60 },
        { trait_type: "Mastery", value: "Guru" },
      ],
    },
  ])

  const revenueStreams: RevenueStream[] = [
    {
      name: "Subscriptions",
      monthlyRevenue: 7500,
      growth: 12,
      color: "light-plum",
      icon: Crown,
    },
    {
      name: "Staking Fees",
      monthlyRevenue: 1737,
      growth: 8,
      color: "retro-green",
      icon: Coins,
    },
    {
      name: "NFT Marketplace",
      monthlyRevenue: 45,
      growth: -5,
      color: "dark-navy",
      icon: Trophy,
    },
    {
      name: "Token Utility",
      monthlyRevenue: 1000,
      growth: 15,
      color: "warm-orange",
      icon: Zap,
    },
  ]

  const activityFeed: ActivityItem[] = [
    {
      id: "a1",
      type: "task",
      description: "Completed 'Daily Reading Goal'",
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 mins ago
      status: "success",
      icon: CheckCircle,
    },
    {
      id: "a2",
      type: "nft",
      description: "Unlocked 'Academic Achiever' NFT Badge",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      status: "success",
      icon: Trophy,
    },
    {
      id: "a3",
      type: "proof",
      description: "Submitted proof for 'Client Website Delivery'",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
      status: "pending",
      icon: Upload,
    },
    {
      id: "a4",
      type: "stake",
      description: "Staked 50 ZLAG for 'Complete React Tutorial Series'",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      status: "success",
      icon: Coins,
    },
    {
      id: "a5",
      type: "task",
      description: "Failed 'Morning Routine Consistency'",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
      status: "fail",
      icon: XCircle,
    },
  ]

  // New Task Form State
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    category: "",
    deadline: "",
    stakeAmount: "",
    stakeCurrency: "ZLAG" as "ETH" | "USDC" | "ZLAG",
    difficulty: "medium" as "easy" | "medium" | "hard",
    tags: "",
    userType: userStats.userType,
  })

  // Proof Submission State
  const [proofSubmission, setProofSubmission] = useState({
    type: "text" as "text" | "image" | "file" | "url",
    content: "",
    file: null as File | null,
  })

  // Sidebar Navigation Items
  const sidebarItems = [
    { id: "overview", label: "Overview", icon: Target },
    { id: "tasks", label: "Tasks", icon: CheckCircle2 },
    { id: "submissions", label: "Submissions", icon: Upload },
    { id: "nfts", label: "NFT Badges", icon: Trophy },
    { id: "treasury", label: "Treasury", icon: Wallet },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  // Category Options based on user types
  const categories = [
    { value: "all", label: "All Categories", icon: Target },
    { value: "academic", label: "Academic", icon: GraduationCap },
    { value: "freelance", label: "Freelance", icon: Briefcase },
    { value: "productivity", label: "Productivity", icon: Lightbulb },
    { value: "learning", label: "Learning", icon: BookOpen },
    { value: "creative", label: "Creative", icon: Star },
  ]

  // User Type Descriptions
  const userTypeDescriptions = {
    student: {
      title: "Students",
      description: "Use on-chain task submission to verify assignment completion. Earn NFTs and build trust records.",
      icon: GraduationCap,
      color: "dark-navy", // Mapped to dark-navy
    },
    freelancer: {
      title: "Freelancers",
      description: "Use trustless delivery enforcement and escrow models. Submit work with zk-proof of delivery.",
      icon: Briefcase,
      color: "retro-green", // Keeping retro-green for now
    },
    productivity: {
      title: "Productivity Enthusiasts",
      description: "Streak-based goals. Reward for consistency.",
      icon: Lightbulb,
      color: "warm-orange",
    },
  }

  // Utility Functions
  const createTask = () => {
    if (!newTask.title || !newTask.deadline || !newTask.stakeAmount) return
    // ✅ This now uses the REAL connection status
    if (!isConnected) {
      alert("Please connect your wallet first!")
      return
    }

    const stakeAmount = Number.parseFloat(newTask.stakeAmount)
    const currency = newTask.stakeCurrency

    // Check if user has sufficient balance
    if (userBalance[currency] < stakeAmount) {
      alert(`Insufficient ${currency} balance. You have ${userBalance[currency]} ${currency}`)
      return
    }

    // Simulate smart contract locking stake
    console.log(`Smart contract locking ${stakeAmount} ${currency} for task: ${newTask.title}`)
    
    // Deduct stake from user balance
    setUserBalance(prev => ({
      ...prev,
      [currency]: prev[currency] - stakeAmount
    }))

    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description,
      category: newTask.category || "productivity",
      deadline: new Date(newTask.deadline),
      stakeAmount: stakeAmount,
      stakeCurrency: newTask.stakeCurrency,
      status: "active",
      progress: 0,
      createdAt: new Date(),
      difficulty: newTask.difficulty,
      tags: newTask.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      userType: newTask.userType as "student" | "freelancer" | "productivity",
    }

    setTasks((prev) => [task, ...prev])
    setUserStats(prev => ({ ...prev, tasksActive: prev.tasksActive + 1 }))
    
    setNewTask({
      title: "",
      description: "",
      category: "",
      deadline: "",
      stakeAmount: "",
      stakeCurrency: "ZLAG" as "ETH" | "USDC" | "ZLAG",
      difficulty: "medium" as "easy" | "medium" | "hard",
      tags: "",
      userType: userStats.userType,
    })
    setShowCreateTaskModal(false)
    
    console.log(`Task created successfully. Stake of ${stakeAmount} ${currency} locked.`)
  }

  const submitProof = () => {
    if (!selectedTask || !proofSubmission.content) return

    console.log(`Proof submitted for task: ${selectedTask.title}`)
    console.log(`Proof type: ${proofSubmission.type}`)
    console.log(`Proof content: ${proofSubmission.content}`)

    const updatedTask = {
      ...selectedTask,
      status: "pending" as const,
      progress: 100,
      proofSubmitted: true,
      proofType: proofSubmission.type,
      proofContent: proofSubmission.content,
    }

    setTasks((prev) => prev.map((task) => (task.id === selectedTask.id ? updatedTask : task)))

    // Simulate validation process after a delay
    setTimeout(() => {
      validateTask(updatedTask)
    }, 2000)

    setProofSubmission({
      type: "text" as "text" | "image" | "file" | "url",
      content: "",
      file: null,
    })
    setSelectedTask(null)
    setShowProofModal(false)
  }

  const validateTask = (task: Task) => {
    console.log(`Starting validation for task: ${task.title}`)
    
    // Mock validation with random outcomes based on probabilities
    const random = Math.random()
    let outcome: "pass" | "partial" | "fail"
    let returnPercentage = 0
    
    if (random < 0.6) { // 60% chance of pass
      outcome = "pass"
      returnPercentage = 100
    } else if (random < 0.85) { // 25% chance of partial
      outcome = "partial"
      returnPercentage = Math.floor(Math.random() * 11) + 30 // 30-40%
    } else { // 15% chance of fail
      outcome = "fail"
      returnPercentage = 0
    }

    console.log(`Validation result: ${outcome} (${returnPercentage}% return)`)

    const returnAmount = (task.stakeAmount * returnPercentage) / 100
    const burnAmount = task.stakeAmount - returnAmount

    let updatedTask: Task
    let nftAwarded = false

    if (outcome === "pass") {
      updatedTask = {
        ...task,
        status: "completed",
        completedAt: new Date(),
        reward: returnAmount,
      }
      
      // Return full stake
      setUserBalance(prev => ({
        ...prev,
        [task.stakeCurrency]: prev[task.stakeCurrency] + returnAmount
      }))
      
      // Award NFT based on streak
      nftAwarded = awardNFTBasedOnStreak()
      
      setUserStats(prev => ({ 
        ...prev, 
        tasksCompleted: prev.tasksCompleted + 1,
        tasksActive: prev.tasksActive - 1,
        currentStreak: prev.currentStreak + 1,
        totalEarned: prev.totalEarned + returnAmount
      }))
      
    } else if (outcome === "partial") {
      updatedTask = {
        ...task,
        status: "completed",
        completedAt: new Date(),
        reward: returnAmount,
      }
      
      // Return partial stake
      setUserBalance(prev => ({
        ...prev,
        [task.stakeCurrency]: prev[task.stakeCurrency] + returnAmount
      }))
      
      setUserStats(prev => ({ 
        ...prev, 
        tasksCompleted: prev.tasksCompleted + 1,
        tasksActive: prev.tasksActive - 1,
        totalEarned: prev.totalEarned + returnAmount
      }))
      
    } else {
      updatedTask = {
        ...task,
        status: "failed",
        completedAt: new Date(),
      }
      
      // Reset streak on failure
      setUserStats(prev => ({ 
        ...prev, 
        tasksActive: prev.tasksActive - 1,
        currentStreak: 0
      }))
    }

    setTasks((prev) => prev.map((t) => (t.id === task.id ? updatedTask : t)))
    
    console.log(`Task ${outcome}. Returned: ${returnAmount} ${task.stakeCurrency}, Burned: ${burnAmount} ${task.stakeCurrency}`)
    if (nftAwarded) {
      console.log("NFT awarded for maintaining streak!")
    }
  }

  const awardNFTBasedOnStreak = (): boolean => {
    const streak = userStats.currentStreak + 1 // +1 because we haven't updated the streak yet
    
    // Award NFTs based on streak milestones from the diagram
    const milestones = [
      { days: 3, name: "Spark", rarity: "Common" },
      { days: 7, name: "Ember", rarity: "Uncommon" },
      { days: 14, name: "Flame", rarity: "Rare" },
      { days: 30, name: "Blaze", rarity: "Epic" },
      { days: 60, name: "Inferno", rarity: "Legendary" }
    ]
    
    const milestone = milestones.find(m => streak === m.days)
    if (milestone) {
      console.log(`Milestone reached! Awarding ${milestone.name} NFT (${milestone.rarity})`)
      setUserStats(prev => ({ ...prev, nftBadges: prev.nftBadges + 1 }))
      return true
    }
    
    return false
  }

  const retryFailedTask = (task: Task) => {
    if (userBalance.ZLAG < 10) { // Cost 10 ZLAG to retry
      alert("Insufficient ZLAG balance to retry task")
      return
    }
    
    // Deduct retry cost
    setUserBalance(prev => ({
      ...prev,
      ZLAG: prev.ZLAG - 10
    }))
    
    // Reset task to active
    const retriedTask = {
      ...task,
      status: "active" as const,
      progress: 0,
      proofSubmitted: false,
      proofType: undefined,
      proofContent: undefined,
      completedAt: undefined,
    }
    
    setTasks((prev) => prev.map((t) => (t.id === task.id ? retriedTask : t)))
    setUserStats(prev => ({ ...prev, tasksActive: prev.tasksActive + 1 }))
    
    console.log(`Task retried. 10 ZLAG deducted.`)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-dark-navy text-white border-retro-border-dark"
      case "pending":
        return "bg-butter-yellow text-retro-navy-text border-retro-border-dark"
      case "completed":
        return "bg-retro-green text-white border-retro-border-dark"
      case "failed":
        return "bg-warm-red text-white border-retro-border-dark"
      default:
        return "bg-retro-gray-200 text-retro-navy-text border-retro-border-dark"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <Clock className="w-4 h-4" />
      case "pending":
        return <Timer className="w-4 h-4" />
      case "completed":
        return <CheckCircle className="w-4 h-4" />
      case "failed":
        return <XCircle className="w-4 h-4" />
      default:
        return <AlertCircle className="w-4 h-4" />
    }
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Common":
        return "bg-retro-gray-200 text-retro-navy-text border-retro-border-dark"
      case "Uncommon":
        return "bg-retro-green text-white border-retro-border-dark"
      case "Rare":
        return "bg-dark-navy text-white border-retro-border-dark"
      case "Epic":
        return "bg-light-plum text-white border-retro-border-dark"
      case "Legendary":
        return "bg-butter-yellow text-retro-navy-text border-retro-border-dark"
      default:
        return "bg-retro-gray-200 text-retro-navy-text border-retro-border-dark"
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-retro-green text-white border-retro-border-dark"
      case "medium":
        return "bg-butter-yellow text-retro-navy-text border-retro-border-dark"
      case "hard":
        return "bg-warm-red text-white border-retro-border-dark"
      default:
        return "bg-retro-gray-200 text-retro-navy-text border-retro-border-dark"
    }
  }

  const formatTimeRemaining = (deadline: Date) => {
    const now = new Date()
    const diff = deadline.getTime() - now.getTime()

    if (diff < 0) return "Overdue"

    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

    if (days > 0) return `${days}d ${hours}h`
    if (hours > 0) return `${hours}h ${minutes}m`
    return `${minutes}m`
  }

  const getTaskLifecycleStages = (task: Task): TaskLifecycleStage[] => {
    const stages: TaskLifecycleStage[] = [
      {
        stage: "Created",
        status: "completed",
        timestamp: task.createdAt,
        description: "Task created and stake locked",
      },
      {
        stage: "In Progress",
        status: task.progress > 0 ? "completed" : task.status === "active" ? "current" : "pending",
        description: "Working on task completion",
      },
      {
        stage: "Proof Submitted",
        status: task.proofSubmitted
          ? "completed"
          : task.status === "pending"
            ? "current"
            : task.status === "active"
              ? "pending"
              : "pending",
        description: "Evidence uploaded for verification",
      },
      {
        stage: "Validated",
        status:
          task.status === "completed" || task.status === "failed"
            ? "completed"
            : task.status === "pending"
              ? "current"
              : "pending",
        description: "AI/zk-SNARK verification complete",
      },
      {
        stage: "Settled",
        status: task.status === "completed" || task.status === "failed" ? "completed" : "pending",
        timestamp: task.completedAt,
        description: task.status === "completed" ? "Reward distributed" : "Stake burned",
      },
    ]

    return stages
  }

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = selectedCategory === "all" || task.category.toLowerCase() === selectedCategory
    const matchesStatus = filterStatus === "all" || task.status === filterStatus

    return matchesSearch && matchesCategory && matchesStatus
  })

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    switch (sortBy) {
      case "deadline":
        return a.deadline.getTime() - b.deadline.getTime()
      case "stake":
        return b.stakeAmount - a.stakeAmount
      case "progress":
        return b.progress - a.progress
      case "created":
        return b.createdAt.getTime() - a.createdAt.getTime()
      default:
        return 0
    }
  })

  return (
    <div className="min-h-screen bg-dark-navy relative overflow-hidden font-sans text-retro-navy-text">
      <div className="flex h-screen relative z-10">
        {/* Left Sidebar */}
        <div className="w-64 bg-soft-beige border-r-2 border-retro-border-dark p-4 shadow-retro-soft">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-dark-navy border-2 border-retro-border-dark rounded-sm flex items-center justify-center shadow-retro-soft-sm">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-retro text-retro-navy-text">ZeroLag.</h1>
            </div>
            <p className="text-sm text-gray-700">Discipline-as-a-Service</p>
            <div className="flex items-center gap-2 mt-2">
              <div className="w-2 h-2 bg-retro-green rounded-full border border-retro-border-dark animate-pulse"></div>
              <span className="text-xs font-medium text-retro-green">Protocol Active</span>
            </div>
          </div>

          <nav className="space-y-1 mb-8">
            {sidebarItems.map((item) => (
              <RetroSidebarItem
                key={item.id}
                label={item.label}
                icon={item.icon}
                active={activeTab === item.id}
                onClick={() => setActiveTab(item.id)}
                badgeContent={item.id === "tasks" ? tasks.filter((t) => t.status === "active").length : undefined}
              />
            ))}
          </nav>

          {isConnected ? (
            <RetroButton
              onClick={handleDisconnectWallet} // Use new disconnect handler
              variant="ghost"
              className="w-full justify-start text-left text-sm font-medium text-retro-navy-text hover:bg-warm-red hover:text-white"
            >
              <LogOut className="w-4 h-4 mr-3" />
              <span>Disconnect Wallet</span>
            </RetroButton>
          ) : (
            <RetroButton
              onClick={handleConnectWallet} // Use new connect handler
              variant="ghost"
              className="w-full justify-start text-left text-sm font-medium text-retro-navy-text hover:bg-retro-green hover:text-white"
            >
              <Wallet className="w-4 h-4 mr-3" />
              <span>Connect Wallet</span>
            </RetroButton>
          )}

          {/* Upgrade Card */}
          <RetroWindow title="Upgrade" retroHeaderColor="light-plum" showControls={false} className="mt-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-light-plum border-2 border-retro-border-dark rounded-sm flex items-center justify-center shadow-retro-soft-sm">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-retro text-retro-navy-text mb-1 text-base">Upgrade to PRO</h3>
              <p className="text-xs text-gray-700 mb-3">Unlock advanced features</p>
              <RetroButton variant="primary" className="w-full text-sm">
                Get Started
              </RetroButton>
            </div>
          </RetroWindow>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 overflow-auto bg-soft-beige">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <RetroSearchBar
                  placeholder="Search anything..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64"
                />
                <RetroButton onClick={() => setShowCreateTaskModal(true)} className="text-sm">
                  <Plus className="w-4 h-4 mr-2" />
                  New Task
                </RetroButton>
              </div>

              <div className="flex items-center gap-3">
                {/* Balance Display */}
                {isConnected && (
                  <div className="flex items-center gap-2 bg-soft-beige border-2 border-retro-border-dark rounded-lg px-3 py-2 text-sm shadow-retro-soft-sm">
                    <Wallet className="w-4 h-4 text-retro-navy-text" />
                    <span className="font-medium text-retro-navy-text">
                      {userBalance.ETH.toFixed(2)} ETH | {userBalance.USDC.toFixed(0)} USDC | {userBalance.ZLAG.toFixed(0)} ZLAG
                    </span>
                  </div>
                )}
                
                {/* Time Display */}
                <div className="px-3 py-2 rounded-lg border-2 border-retro-border-dark bg-soft-beige text-retro-navy-text text-sm shadow-retro-soft-inset">
                  <span className="font-mono">
                    {currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>

                {!isConnected ? (
                  <RetroButton onClick={handleConnectWallet} className="text-sm">
                    <Wallet className="w-4 h-4 mr-2" />
                    Connect Wallet
                  </RetroButton>
                ) : (
                  <div className="flex items-center gap-2 bg-retro-green border-2 border-retro-border-dark rounded-lg px-3 py-2 text-sm shadow-retro-soft-sm">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    <span className="font-medium text-white">{formattedAddress}</span> {/* Use formatted address */}
                  </div>
                )}
                <RetroButton variant="ghost" size="icon" className="w-8 h-8">
                  <User className="w-4 h-4 text-retro-navy-text" />
                </RetroButton>
              </div>
            </div>

            <div className="flex gap-2 flex-wrap">
              {categories.slice(1, 5).map((category) => (
                <Badge
                  key={category.value}
                  className={`rounded-lg px-3 py-1 text-xs font-medium cursor-pointer border-2 border-retro-border-dark shadow-retro-soft-sm ${
                    selectedCategory === category.value
                      ? "bg-dark-navy text-white"
                      : "bg-soft-beige text-retro-navy-text hover:bg-butter-yellow hover:text-retro-navy-text"
                  }`}
                  onClick={() => setSelectedCategory(category.value)}
                >
                  <category.icon className="w-3 h-3 mr-1" />
                  {category.label}
                </Badge>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* KPI Row */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <RetroWindow title="Total Tasks" retroHeaderColor="blue" showControls={false}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-700">All Tasks</p>
                      <p className="text-2xl font-retro text-retro-navy-text">{tasks.length}</p>
                    </div>
                    <div className="w-10 h-10 bg-dark-navy border-2 border-retro-border-dark rounded-lg flex items-center justify-center shadow-retro-soft-sm">
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </RetroWindow>

                <RetroWindow title="Completed Tasks" retroHeaderColor="green" showControls={false}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-700">Successfully Done</p>
                      <p className="text-2xl font-retro text-retro-navy-text">{userStats.tasksCompleted}</p>
                    </div>
                    <div className="w-10 h-10 bg-retro-green border-2 border-retro-border-dark rounded-lg flex items-center justify-center shadow-retro-soft-sm">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </RetroWindow>

                <RetroWindow title="Stakes Locked" retroHeaderColor="light-plum" showControls={false}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-700">Total Staked</p>
                      <p className="text-2xl font-retro text-retro-navy-text">{userStats.totalStaked} ZLAG</p>
                    </div>
                    <div className="w-10 h-10 bg-light-plum border-2 border-retro-border-dark rounded-lg flex items-center justify-center shadow-retro-soft-sm">
                      <Coins className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </RetroWindow>

                <RetroWindow title="Active Streak" retroHeaderColor="yellow" showControls={false}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-700">Current Streak</p>
                      <p className="text-2xl font-retro text-retro-navy-text">{userStats.currentStreak} Days</p>
                    </div>
                    <div className="w-10 h-10 bg-butter-yellow border-2 border-retro-border-dark rounded-lg flex items-center justify-center shadow-retro-soft-sm">
                      <Flame className="w-5 h-5 text-retro-navy-text" />
                    </div>
                  </div>
                </RetroWindow>
              </div>

              {/* Activity Feed */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <RetroWindow title="Activity Feed" retroHeaderColor="orange">
                  <ScrollArea className="h-72 pr-4">
                    <div className="space-y-4">
                      {activityFeed.map((activity) => (
                        <div key={activity.id} className="flex items-start gap-3">
                          <div
                            className={cn(
                              "w-8 h-8 rounded-full flex items-center justify-center border-2 border-retro-border-dark shadow-retro-soft-sm",
                              activity.status === "success"
                                ? "bg-retro-green text-white"
                                : activity.status === "pending"
                                  ? "bg-butter-yellow text-retro-navy-text"
                                  : "bg-warm-red text-white",
                            )}
                          >
                            {activity.icon && <activity.icon className="w-4 h-4" />}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-retro-navy-text font-medium">{activity.description}</p>
                            <p className="text-xs text-gray-600">
                              {activity.timestamp.toLocaleString([], {
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </RetroWindow>

                {/* Charts & Analytics (Simplified) */}
                <RetroWindow title="Analytics Overview" retroHeaderColor="pink">
                  <div className="space-y-4">
                    {revenueStreams.map((stream) => (
                      <div
                        key={stream.name}
                        className="flex items-center justify-between 
                        p-3 bg-soft-beige border-2 border-retro-border-dark rounded-lg shadow-retro-soft-inset"
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className={cn(
                              "w-8 h-8 rounded-full flex items-center justify-center",
                              stream.color === "light-plum" && "bg-light-plum text-white",
                              stream.color === "retro-green" && "bg-retro-green text-white",
                              stream.color === "dark-navy" && "bg-dark-navy text-white",
                              stream.color === "warm-orange" && "bg-warm-orange text-white",
                            )}
                          >
                            <stream.icon className="w-4 h-4" />
                          </div>
                          <span className="font-medium text-retro-navy-text">{stream.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-retro text-retro-navy-text">
                            ${stream.monthlyRevenue.toLocaleString()}
                          </span>
                          <span
                            className={cn(
                              "text-xs font-medium",
                              stream.growth > 0 ? "text-retro-green" : "text-warm-red",
                            )}
                          >
                            {stream.growth > 0 ? "+" : ""}
                            {stream.growth}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </RetroWindow>
              </div>

              {/* Recent Tasks */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-xl font-retro text-retro-navy-text">Recent Tasks</h2>
                  <RetroButton
                    variant="link"
                    className="text-dark-navy hover:text-light-plum text-sm px-0"
                    onClick={() => setActiveTab("tasks")}
                  >
                    See all
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </RetroButton>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {tasks.slice(0, 3).map((task) => (
                    <RetroWindow key={task.id} title={task.title} retroHeaderColor={task.userType === "student" ? "blue" : task.userType === "freelancer" ? "green" : "yellow"}>
                      <div className="flex items-start justify-between mb-2">
                        <Badge
                          className={`text-xs font-medium border-2 border-retro-border-dark shadow-retro-soft-sm ${getStatusColor(task.status)}`}
                        >
                          {getStatusIcon(task.status)}
                          <span className="ml-1 capitalize">{task.status}</span>
                        </Badge>
                        <div className="text-right">
                          <span className="text-sm font-medium text-warm-orange">
                            {task.stakeAmount} {task.stakeCurrency}
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-700 mb-2 line-clamp-2">{task.description}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-700 mb-2">
                        <Clock className="w-3 h-3" />
                        <span className="font-medium">{formatTimeRemaining(task.deadline)}</span>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge
                          className={`text-xs font-medium border-2 border-retro-border-dark shadow-retro-soft-sm ${getDifficultyColor(task.difficulty)}`}
                        >
                          {task.difficulty}
                        </Badge>
                        <Badge
                          className={`text-xs font-medium border-2 border-retro-border-dark shadow-retro-soft-sm ${
                            task.userType === "student"
                              ? "bg-dark-navy text-white"
                              : task.userType === "freelancer"
                                ? "bg-retro-green text-white"
                                : "bg-light-plum text-white"
                          }`}
                        >
                          {userTypeDescriptions[task.userType].title}
                        </Badge>
                      </div>
                      <RetroProgressBar value={task.progress} className="h-2 mb-2" indicatorColor="bg-warm-orange" />
                      <RetroButton
                        size="sm"
                        className="w-full text-xs"
                        onClick={() => {
                          if (task.status === "active") {
                            setSelectedTask(task)
                            setShowProofModal(true)
                          }
                        }}
                      >
                        {task.status === "pending"
                          ? "Proof Submitted"
                          : task.status === "active"
                            ? "Submit Proof"
                            : "View Details"}
                      </RetroButton>
                    </RetroWindow>
                  ))}
                </div>
              </div>

              {/* NFT Showcase */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-xl font-retro text-retro-navy-text">NFT Badge Showcase</h2>
                  <RetroButton
                    variant="link"
                    className="text-dark-navy hover:text-light-plum text-sm px-0"
                    onClick={() => setActiveTab("nfts")}
                  >
                    See all
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </RetroButton>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  {nftBadges.slice(0, 5).map((badge) => (
                    <RetroWindow
                      key={badge.id}
                      title={badge.name}
                      retroHeaderColor={badge.unlocked ? "butter-yellow" : "gray"}
                      showControls={false}
                      className={`cursor-pointer ${
                        badge.unlocked
                          ? "border-4 border-retro-border-dark shadow-retro-soft"
                          : "border-2 border-retro-border-dark hover:border-dark-navy"
                      }`}
                      onClick={() => {
                        setSelectedNFT(badge)
                        setShowNFTDetailsModal(true)
                      }}
                    >
                      <div className="text-center">
                        <div
                          className={`w-14 h-14 rounded-lg flex items-center justify-center mx-auto mb-3 border-2 border-retro-border-dark shadow-retro-soft-sm ${
                            badge.unlocked ? "bg-butter-yellow" : "bg-retro-gray-200"
                          }`}
                        >
                          <Trophy
                            className={`w-7 h-7 ${badge.unlocked ? "text-retro-navy-text" : "text-retro-gray-500"}`}
                          />
                        </div>
                        <h3 className="font-retro text-retro-navy-text mb-1 text-sm">{badge.name}</h3>
                        <p className="text-sm text-gray-700 mb-2">{badge.description}</p>
                        <Badge
                          className={`mb-2 text-sm font-medium border-2 border-retro-border-dark shadow-retro-soft-sm ${getRarityColor(badge.rarity)}`}
                        >
                          {badge.rarity}
                        </Badge>
                        {!badge.unlocked && (
                          <div className="space-y-1">
                            <RetroProgressBar
                              value={badge.progress}
                              className="h-1.5"
                              indicatorColor="bg-warm-orange"
                            />
                            <p className="text-xs text-gray-700">{badge.progress}% Complete</p>
                          </div>
                        )}
                        {badge.unlocked && (
                          <div className="flex items-center justify-center gap-1 text-butter-yellow text-sm font-medium">
                            <Sparkles className="w-4 h-4" />
                            <span>Unlocked!</span>
                          </div>
                        )}
                      </div>
                    </RetroWindow>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "tasks" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-retro text-retro-navy-text">Task Management</h2>
                <div className="flex items-center gap-3">
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-36 text-sm border-2 border-retro-border-dark bg-soft-beige shadow-retro-soft-sm">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent className="border-2 border-retro-border-dark bg-soft-beige shadow-retro-soft">
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-36 text-sm border-2 border-retro-border-dark bg-soft-beige shadow-retro-soft-sm">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent className="border-2 border-retro-border-dark bg-soft-beige shadow-retro-soft">
                      <SelectItem value="deadline">Deadline</SelectItem>
                      <SelectItem value="stake">Stake Amount</SelectItem>
                      <SelectItem value="progress">Progress</SelectItem>
                      <SelectItem value="created">Created Date</SelectItem>
                    </SelectContent>
                  </Select>
                  <RetroButton onClick={() => setShowCreateTaskModal(true)} className="text-sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Task
                  </RetroButton>
                </div>
              </div>

              <div className="grid gap-4">
                {sortedTasks.map((task) => (
                  <RetroWindow key={task.id} title={task.title} retroHeaderColor={task.userType === "student" ? "blue" : task.userType === "freelancer" ? "green" : "yellow"}>
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-retro text-retro-navy-text">{task.title}</h3>
                          <Badge
                            className={`text-xs font-medium border-2 border-retro-border-dark shadow-retro-soft-sm ${getStatusColor(task.status)}`}
                          >
                            {getStatusIcon(task.status)}
                            <span className="ml-1 capitalize">{task.status}</span>
                          </Badge>
                          <Badge className="text-xs font-medium border-2 border-retro-border-dark shadow-retro-soft-sm bg-soft-beige text-retro-navy-text">
                            {task.category}
                          </Badge>
                          <Badge
                            className={`text-xs font-medium border-2 border-retro-border-dark shadow-retro-soft-sm ${getDifficultyColor(task.difficulty)}`}
                          >
                            {task.difficulty}
                          </Badge>
                          <Badge
                            className={`text-xs font-medium border-2 border-retro-border-dark shadow-retro-soft-sm ${
                              task.userType === "student"
                                ? "bg-dark-navy text-white"
                                : task.userType === "freelancer"
                                  ? "bg-retro-green text-white"
                                  : "bg-light-plum text-white"
                            }`}
                          >
                            {userTypeDescriptions[task.userType].title}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-700 mb-2">{task.description}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-700 mb-2">
                          <span className="flex items-center gap-1 font-medium">
                            <Coins className="w-3 h-3" />
                            {task.stakeAmount} {task.stakeCurrency}
                          </span>
                          <span className="flex items-center gap-1 font-medium">
                            <Clock className="w-3 h-3" />
                            {formatTimeRemaining(task.deadline)}
                          </span>
                          <span className="flex items-center gap-1 font-medium">
                            <Calendar className="w-3 h-3" />
                            Created {task.createdAt.toLocaleDateString()}
                          </span>
                          {task.validatorScore && (
                            <span className="flex items-center gap-1 font-medium text-retro-green">
                              <Shield className="w-3 h-3" />
                              AI Score: {Math.round(task.validatorScore * 100)}%
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1 mb-2">
                          {task.tags.map((tag) => (
                            <Badge
                              key={tag}
                              className="text-xs font-medium border-2 border-retro-border-dark shadow-retro-soft-sm bg-soft-beige text-retro-navy-text"
                            >
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center gap-2">
                          <RetroProgressBar
                            value={task.progress}
                            className="flex-1 h-2"
                            indicatorColor="bg-warm-orange"
                          />
                          <span className="text-sm font-medium text-retro-navy-text">{task.progress}%</span>
                        </div>
                      </div>
                      <div className="ml-4 flex flex-col gap-2">
                        {task.status === "active" && (
                          <RetroButton
                            onClick={() => {
                              setSelectedTask(task)
                              setShowProofModal(true)
                            }}
                            className="text-xs"
                          >
                            <Upload className="w-3 h-3 mr-1" />
                            Submit Proof
                          </RetroButton>
                        )}
                        {task.status === "pending" && (
                          <RetroButton disabled variant="secondary" className="text-xs">
                            <Timer className="w-3 h-3 mr-1" />
                            Under Review
                          </RetroButton>
                        )}
                        {task.status === "completed" && (
                          <div className="text-center">
                            <div className="text-retro-green font-medium text-xs">
                              <CheckCircle className="w-3 h-3 inline mr-1" />
                              Completed
                            </div>
                            <div className="text-retro-green font-medium text-sm">
                              +{task.reward} {task.stakeCurrency}
                            </div>
                          </div>
                        )}
                        {task.status === "failed" && (
                          <div className="text-center">
                            <div className="text-warm-red font-medium text-xs">
                              <XCircle className="w-3 h-3 inline mr-1" />
                              Failed
                            </div>
                            <div className="text-warm-red font-medium text-sm">
                              -{task.stakeAmount} {task.stakeCurrency}
                            </div>
                            {userBalance.ZLAG >= 10 && (
                              <RetroButton
                                size="sm"
                                variant="outline"
                                className="mt-1 text-xs border-dark-navy text-dark-navy hover:bg-butter-yellow bg-transparent"
                                onClick={() => retryFailedTask(task)}
                              >
                                <RefreshCw className="w-3 h-3 mr-1" />
                                Retry (10 ZLAG)
                              </RetroButton>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </RetroWindow>
                ))}
              </div>
            </div>
          )}

          {activeTab === "submissions" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-retro text-retro-navy-text">Proof Submissions</h2>
                <Badge className="text-base px-3 py-1 bg-light-plum text-white font-medium border-2 border-retro-border-dark shadow-retro-soft-sm">
                  <Shield className="w-4 h-4 mr-2" />
                  {zkProofMode ? "zk-SNARK Mode" : "AI Verification"}
                </Badge>
              </div>

              <div className="grid gap-4">
                {tasks
                  .filter((task) => task.proofSubmitted)
                  .map((task) => (
                    <RetroWindow key={task.id} title={task.title} retroHeaderColor={task.userType === "student" ? "blue" : task.userType === "freelancer" ? "green" : "yellow"}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-retro text-retro-navy-text">{task.title}</h3>
                            <Badge
                              className={`text-xs font-medium border-2 border-retro-border-dark shadow-retro-soft-sm ${getStatusColor(task.status)}`}
                            >
                              {getStatusIcon(task.status)}
                              <span className="ml-1 capitalize">{task.status}</span>
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-700 mb-3">{task.description}</p>
                          <div className="flex items-center gap-3 mb-3">
                            <Badge
                              className={`text-xs font-medium border-2 border-retro-border-dark shadow-retro-soft-sm ${
                                task.proofType === "text"
                                  ? "bg-dark-navy text-white"
                                  : task.proofType === "image"
                                    ? "bg-retro-green text-white"
                                    : task.proofType === "file"
                                      ? "bg-light-plum text-white"
                                      : "bg-warm-orange text-white"
                              }`}
                            >
                              {task.proofType === "text" && <FileText className="w-3 h-3 mr-1" />}
                              {task.proofType === "image" && <ImageIcon className="w-3 h-3 mr-1" />}
                              {task.proofType === "file" && <Upload className="w-3 h-3 mr-1" />}
                              {task.proofType === "url" && <Link className="w-3 h-3 mr-1" />}
                              {task.proofType} proof
                            </Badge>
                            {task.validatorScore && (
                              <Badge
                                className={`text-xs font-medium border-2 border-retro-border-dark shadow-retro-soft-sm ${
                                  task.validatorScore > 0.9
                                    ? "bg-retro-green text-white"
                                    : task.validatorScore > 0.7
                                      ? "bg-butter-yellow text-retro-navy-text"
                                      : "bg-warm-red text-white"
                                }`}
                              >
                                <Shield className="w-3 h-3 mr-1" />
                                Confidence: {Math.round(task.validatorScore * 100)}%
                              </Badge>
                            )}
                          </div>
                          {task.proofContent && (
                            <div className="p-3 rounded-lg border-2 border-retro-border-dark bg-retro-gray-100 shadow-retro-soft-inset">
                              <h4 className="font-retro text-retro-navy-text mb-1 text-sm">Submitted Proof:</h4>
                              <p className="text-xs text-gray-700">{task.proofContent}</p>
                            </div>
                          )}
                        </div>
                        <div className="ml-4 flex flex-col gap-2">
                          <RetroButton
                            variant="outline"
                            size="sm"
                            className="text-xs border-dark-navy text-dark-navy hover:bg-butter-yellow bg-transparent"
                          >
                            <Eye className="w-3 h-3 mr-1" />
                            View Details
                          </RetroButton>
                          {task.status === "pending" && (
                            <RetroButton
                              variant="outline"
                              size="sm"
                              className="text-xs border-warm-red text-warm-red hover:bg-butter-yellow bg-transparent"
                            >
                              <XCircle className="w-3 h-3 mr-1" />
                              Withdraw
                            </RetroButton>
                          )}
                        </div>
                      </div>
                    </RetroWindow>
                  ))}
              </div>
            </div>
          )}

          {activeTab === "nfts" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-retro text-retro-navy-text">NFT Badge Collection</h2>
                <Badge className="text-base px-3 py-1 bg-light-plum text-white font-medium border-2 border-retro-border-dark shadow-retro-soft-sm">
                  <Trophy className="w-4 h-4 mr-1" />
                  {nftBadges.filter((b) => b.unlocked).length} / {nftBadges.length} Unlocked
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {nftBadges.map((badge) => (
                  <RetroWindow
                    key={badge.id}
                    title={badge.name}
                    retroHeaderColor={badge.unlocked ? "butter-yellow" : "gray"}
                    showControls={false}
                    className={`cursor-pointer ${
                      badge.unlocked
                        ? "border-4 border-retro-border-dark shadow-retro-soft"
                        : "border-2 border-retro-border-dark hover:border-dark-navy"
                    }`}
                    onClick={() => {
                      setSelectedNFT(badge)
                      setShowNFTDetailsModal(true)
                    }}
                  >
                    <div className="text-center">
                      <div
                        className={`w-14 h-14 rounded-lg flex items-center justify-center mx-auto mb-3 border-2 border-retro-border-dark shadow-retro-soft-sm ${
                          badge.unlocked ? "bg-butter-yellow" : "bg-retro-gray-200"
                        }`}
                      >
                        <Trophy
                          className={`w-7 h-7 ${badge.unlocked ? "text-retro-navy-text" : "text-retro-gray-500"}`}
                        />
                      </div>
                      <h3 className="font-retro text-retro-navy-text mb-1 text-base">{badge.name}</h3>
                      <p className="text-sm text-gray-700 mb-2">{badge.description}</p>
                      <Badge
                        className={`mb-2 text-sm font-medium border-2 border-retro-border-dark shadow-retro-soft-sm ${getRarityColor(badge.rarity)}`}
                      >
                        {badge.rarity}
                      </Badge>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-700">Streak Required:</span>
                          <span className="font-medium text-retro-navy-text">{badge.streakRequired} days</span>
                        </div>
                        {badge.marketValue && badge.tradeable && (
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-700">Market Value:</span>
                            <span className="font-medium text-retro-green">{badge.marketValue} ZLAG</span>
                          </div>
                        )}
                        {!badge.unlocked && (
                          <div className="space-y-1">
                            <RetroProgressBar
                              value={badge.progress}
                              className="h-1.5"
                              indicatorColor="bg-warm-orange"
                            />
                            <p className="text-xs text-gray-700">{badge.progress}% Complete</p>
                            <p className="text-xs text-gray-600">
                              {Math.ceil((badge.streakRequired * (100 - badge.progress)) / 100)} days remaining
                            </p>
                          </div>
                        )}
                        {badge.unlocked && (
                          <div className="flex items-center justify-center gap-1 text-butter-yellow text-sm font-medium">
                            <Sparkles className="w-4 h-4" />
                            <span>Unlocked!</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </RetroWindow>
                ))}
              </div>

              {/* NFT Marketplace Preview */}
              <RetroWindow title="NFT Marketplace" retroHeaderColor="light-plum">
                <div className="text-center py-6">
                  <div className="w-14 h-14 bg-light-plum border-2 border-retro-border-dark rounded-lg flex items-center justify-center mx-auto mb-3 shadow-retro-soft-sm">
                    <Gift className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-retro text-retro-navy-text mb-1">Coming Soon!</h3>
                  <p className="text-sm text-gray-700 mb-3">
                    Marketplace will launch in Phase 2 with 1.5% trading fees
                  </p>
                  <RetroButton disabled variant="secondary" className="text-sm">
                    Marketplace Opening Soon
                  </RetroButton>
                </div>
              </RetroWindow>
            </div>
          )}

          {activeTab === "treasury" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-retro text-retro-navy-text">Treasury & Analytics</h2>
                <Badge className="text-base px-3 py-1 bg-retro-green text-white font-medium border-2 border-retro-border-dark shadow-retro-soft-sm">
                  <DollarSign className="w-4 h-4 mr-1" />
                  Protocol Revenue: $10,400/mo
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <RetroWindow title="Total Staked" retroHeaderColor="retro-green" showControls={false}>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-retro text-retro-green text-lg">Total Staked</h3>
                    <Pig className="w-7 h-7 text-retro-green" />
                  </div>
                  <p className="text-3xl font-retro text-retro-navy-text mb-1">125,000</p>
                  <p className="text-gray-700 text-sm">ZLAG Tokens</p>
                  <div className="flex items-center gap-2 mt-2">
                    <ArrowUp className="w-4 h-4 text-retro-green" />
                    <span className="text-sm text-retro-green">+12% this month</span>
                  </div>
                </RetroWindow>

                <RetroWindow title="Burned Stakes" retroHeaderColor="warm-red" showControls={false}>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-retro text-warm-red text-lg">Burned Stakes</h3>
                    <Flame className="w-7 h-7 text-warm-red" />
                  </div>
                  <p className="text-3xl font-retro text-retro-navy-text mb-1">18,750</p>
                  <p className="text-gray-700 text-sm">ZLAG Tokens</p>
                  <div className="flex items-center gap-2 mt-2">
                    <TrendingDown className="w-4 h-4 text-warm-red" />
                    <span className="text-sm text-warm-red">-5% this month</span>
                  </div>
                </RetroWindow>

                <RetroWindow title="Protocol Fees" retroHeaderColor="dark-navy" showControls={false}>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-retro text-dark-navy text-lg">Protocol Fees</h3>
                    <Percent className="w-7 h-7 text-dark-navy" />
                  </div>
                  <p className="text-3xl font-retro text-retro-navy-text mb-1">3,125</p>
                  <p className="text-gray-700 text-sm">ZLAG Earned</p>
                  <div className="flex items-center gap-2 mt-2">
                    <ArrowUp className="w-4 h-4 text-dark-navy" />
                    <span className="text-sm text-dark-navy">+8% this month</span>
                  </div>
                </RetroWindow>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <RetroWindow title="Revenue Breakdown" retroHeaderColor="warm-orange">
                  <div className="space-y-3">
                    {revenueStreams.map((stream) => (
                      <div
                        key={stream.name}
                        className={`flex items-center justify-between p-3 bg-soft-beige border-2 border-retro-border-dark rounded-lg shadow-retro-soft-inset`}
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className={cn(
                              `w-3 h-3 rounded-full`,
                              stream.color === "light-plum" && "bg-light-plum",
                              stream.color === "retro-green" && "bg-retro-green",
                              stream.color === "dark-navy" && "bg-dark-navy",
                              stream.color === "warm-orange" && "bg-warm-orange",
                            )}
                          ></div>
                          <span className="font-medium text-retro-navy-text">{stream.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-retro-navy-text">
                            ${stream.monthlyRevenue.toLocaleString()}
                          </span>
                          <span
                            className={`text-xs font-medium ${stream.growth > 0 ? "text-retro-green" : "text-warm-red"}`}
                          >
                            {stream.growth > 0 ? "+" : ""}
                            {stream.growth}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </RetroWindow>

                <RetroWindow title="$ZLAG Token Utility" retroHeaderColor="retro-green">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-butter-yellow border-2 border-retro-border-dark rounded-lg shadow-retro-soft-sm">
                      <div className="flex items-center gap-2">
                        <Lock className="w-4 h-4 text-retro-navy-text" />
                        <span className="font-medium text-retro-navy-text">Staking Tasks</span>
                      </div>
                      <Badge className="bg-butter-yellow text-retro-navy-text text-xs font-medium border-2 border-retro-border-dark shadow-retro-soft-sm">
                        Active
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-light-plum border-2 border-retro-border-dark rounded-lg shadow-retro-soft-sm">
                      <div className="flex items-center gap-2">
                        <Crown className="w-4 h-4 text-white" />
                        <span className="font-medium text-white">Premium Access</span>
                      </div>
                      <Badge className="bg-light-plum text-white text-xs font-medium border-2 border-retro-border-dark shadow-retro-soft-sm">
                        Active
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-dark-navy border-2 border-retro-border-dark rounded-lg shadow-retro-soft-sm">
                      <div className="flex items-center gap-2">
                        <RefreshCw className="w-4 h-4 text-white" />
                        <span className="font-medium text-white">Retry Failed Tasks</span>
                      </div>
                      <Badge className="bg-dark-navy text-white text-xs font-medium border-2 border-retro-border-dark shadow-retro-soft-sm">
                        Active
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-retro-green border-2 border-retro-border-dark rounded-lg shadow-retro-soft-sm">
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-white" />
                        <span className="font-medium text-white">DAO Governance</span>
                      </div>
                      <Badge className="bg-retro-green text-white text-xs font-medium border-2 border-retro-border-dark shadow-retro-soft-sm">
                        Phase 2
                      </Badge>
                    </div>
                  </div>
                </RetroWindow>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-retro text-retro-navy-text">Settings</h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <RetroWindow title="Account Settings" retroHeaderColor="warm-orange">
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="wallet" className="text-sm font-medium text-retro-navy-text">
                        Connected Wallet
                      </Label>
                      <div className="flex items-center gap-2 mt-1">
                        <RetroInput id="wallet" value={formattedAddress} disabled className="text-sm bg-retro-gray-100" />
                        <RetroButton variant="outline" size="sm" className="text-xs bg-transparent">
                          <Copy className="w-3 h-3" />
                        </RetroButton>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="userType" className="text-sm font-medium text-retro-navy-text">
                        User Type
                      </Label>
                      <Select value={userStats.userType} disabled>
                        <SelectTrigger className="mt-1 text-sm border-2 border-retro-border-dark bg-soft-beige shadow-retro-soft-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="border-2 border-retro-border-dark bg-soft-beige shadow-retro-soft">
                          <SelectItem value="student">Student</SelectItem>
                          <SelectItem value="freelancer">Freelancer</SelectItem>
                          <SelectItem value="productivity">Productivity Enthusiast</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="notifications" className="text-sm font-medium text-retro-navy-text">
                        Notifications
                      </Label>
                      <div className="flex items-center gap-3 mt-1">
                        <RetroButton variant="outline" className="text-xs bg-transparent">
                          <Bell className="w-3 h-3 mr-2" />
                          Email Alerts
                        </RetroButton>
                        <RetroButton variant="outline" className="text-xs bg-transparent">
                          <Smartphone className="w-3 h-3 mr-2" />
                          Push Notifications
                        </RetroButton>
                      </div>
                    </div>
                  </div>
                </RetroWindow>

                <RetroWindow title="Preferences" retroHeaderColor="retro-green">
                  <div className="space-y-3">
                    <div>
                      <Label className="text-sm font-medium text-retro-navy-text">Default Stake Currency</Label>
                      <Select defaultValue="ZLAG">
                        <SelectTrigger className="mt-1 text-sm border-2 border-retro-border-dark bg-soft-beige shadow-retro-soft-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="border-2 border-retro-border-dark bg-soft-beige shadow-retro-soft">
                          <SelectItem value="ZLAG">ZLAG Token</SelectItem>
                          <SelectItem value="ETH">Ethereum (ETH)</SelectItem>
                          <SelectItem value="USDC">USD Coin (USDC)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-retro-navy-text">Theme & Language</Label>
                      <div className="flex items-center gap-3 mt-1">
                        <RetroButton variant="outline" onClick={() => setDarkMode(!darkMode)} className="text-xs">
                          {darkMode ? <Sun className="w-3 h-3 mr-2" /> : <Moon className="w-3 h-3 mr-2" />}
                          {darkMode ? "Light Mode" : "Dark Mode"}
                        </RetroButton>
                        <RetroButton variant="outline" className="text-xs bg-transparent">
                          <Globe className="w-3 h-3 mr-2" />
                          English
                        </RetroButton>
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-retro-navy-text">Privacy Settings</Label>
                      <div className="flex items-center gap-3 mt-1">
                        <RetroButton
                          variant="outline"
                          onClick={() => setZkProofMode(!zkProofMode)}
                          className={`text-xs ${
                            zkProofMode
                              ? "border-light-plum text-light-plum bg-soft-beige"
                              : "border-retro-border-dark text-retro-navy-text hover:bg-butter-yellow"
                          }`}
                        >
                          <Shield className="w-3 h-3 mr-2" />
                          {zkProofMode ? "zk-Proof ON" : "zk-Proof OFF"}
                        </RetroButton>
                        <RetroButton variant="outline" className="text-xs bg-transparent">
                          <Eye className="w-3 h-3 mr-2" />
                          Public Profile
                        </RetroButton>
                      </div>
                    </div>
                  </div>
                </RetroWindow>
              </div>
            </div>
          )}
        </div>


      </div>

      {/* Create Task Modal */}
      <Dialog open={showCreateTaskModal} onOpenChange={setShowCreateTaskModal}>
        <DialogContent className="max-w-md bg-soft-beige rounded-lg border-2 border-retro-border-dark shadow-retro-soft" style={{ backgroundColor: '#FFF8E1' }}>
          <DialogHeader>
            <DialogTitle className="text-xl font-retro text-retro-navy-text">Create New Task</DialogTitle>
            <DialogDescription className="text-sm text-gray-700">
              Set your goal and stake tokens to commit
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <Label htmlFor="title" className="text-sm font-medium text-retro-navy-text">
                Task Title
              </Label>
              <RetroInput
                id="title"
                placeholder="e.g., Complete morning workout"
                value={newTask.title}
                onChange={(e) => setNewTask((prev) => ({ ...prev, title: e.target.value }))}
                className="mt-1 text-sm"
              />
            </div>
            <div>
              <Label htmlFor="description" className="text-sm font-medium text-retro-navy-text">
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="Describe what you need to accomplish..."
                value={newTask.description}
                onChange={(e) => setNewTask((prev) => ({ ...prev, description: e.target.value }))}
                className="mt-1 text-sm border-2 border-retro-border-dark bg-soft-beige shadow-retro-soft-inset"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="category" className="text-sm font-medium text-retro-navy-text">
                  Category
                </Label>
                <Select
                  value={newTask.category}
                  onValueChange={(value) => setNewTask((prev) => ({ ...prev, category: value }))}
                >
                  <SelectTrigger className="mt-1 text-sm border-2 border-retro-border-dark bg-soft-beige shadow-retro-soft-sm">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="border-2 border-retro-border-dark bg-soft-beige shadow-retro-soft">
                    {categories.slice(1).map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        <div className="flex items-center gap-2">
                          <cat.icon className="w-4 h-4" />
                          {cat.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="deadline" className="text-sm font-medium text-retro-navy-text">
                  Deadline
                </Label>
                <RetroInput
                  id="deadline"
                  type="datetime-local"
                  value={newTask.deadline}
                  onChange={(e) => setNewTask((prev) => ({ ...prev, deadline: e.target.value }))}
                  className="mt-1 text-sm"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="stake" className="text-sm font-medium text-retro-navy-text">
                  Stake Amount
                </Label>
                <RetroInput
                  id="stake"
                  type="number"
                  placeholder="0"
                  value={newTask.stakeAmount}
                  onChange={(e) => setNewTask((prev) => ({ ...prev, stakeAmount: e.target.value }))}
                  className="mt-1 text-sm"
                />
              </div>
              <div>
                <Label htmlFor="currency" className="text-sm font-medium text-retro-navy-text">
                  Currency
                </Label>
                <Select
                  value={newTask.stakeCurrency}
                  onValueChange={(value) =>
                    setNewTask((prev) => ({ ...prev, stakeCurrency: value as "ETH" | "USDC" | "ZLAG" }))
                  }
                >
                  <SelectTrigger className="mt-1 text-sm border-2 border-retro-border-dark bg-soft-beige shadow-retro-soft-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="border-2 border-retro-border-dark bg-soft-beige shadow-retro-soft">
                    <SelectItem value="ZLAG">ZLAG</SelectItem>
                    <SelectItem value="ETH">ETH</SelectItem>
                    <SelectItem value="USDC">USDC</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="difficulty" className="text-sm font-medium text-retro-navy-text">
                Difficulty
              </Label>
              <Select
                value={newTask.difficulty}
                onValueChange={(value) =>
                  setNewTask((prev) => ({ ...prev, difficulty: value as "easy" | "medium" | "hard" }))
                }
              >
                <SelectTrigger className="mt-1 text-sm border-2 border-retro-border-dark bg-soft-beige shadow-retro-soft-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="border-2 border-retro-border-dark bg-soft-beige shadow-retro-soft">
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="tags" className="text-sm font-medium text-retro-navy-text">
                Tags (comma separated)
              </Label>
              <RetroInput
                id="tags"
                placeholder="e.g., React, JavaScript, Frontend"
                value={newTask.tags}
                onChange={(e) => setNewTask((prev) => ({ ...prev, tags: e.target.value }))}
                className="mt-1 text-sm"
              />
            </div>
            <div className="flex gap-3 pt-3">
              <RetroButton variant="outline" onClick={() => setShowCreateTaskModal(false)} className="flex-1 text-sm">
                Cancel
              </RetroButton>
              <RetroButton onClick={createTask} className="flex-1 text-sm">
                <Lock className="w-4 h-4 mr-2" />
                Stake & Create
              </RetroButton>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Proof Submission Modal */}
      <Dialog open={showProofModal} onOpenChange={setShowProofModal}>
        <DialogContent className="max-w-md bg-soft-beige rounded-lg border-2 border-retro-border-dark shadow-retro-soft" style={{ backgroundColor: '#FFF8E1' }}>
          <DialogHeader>
            <DialogTitle className="text-xl font-retro text-retro-navy-text">Submit Proof</DialogTitle>
            <DialogDescription className="text-sm text-gray-700">
              Provide evidence that you completed: <span className="font-medium">{selectedTask?.title}</span>
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <Label className="text-sm font-medium text-retro-navy-text">Proof Type</Label>
              <Tabs
                value={proofSubmission.type}
                onValueChange={(value) =>
                  setProofSubmission((prev) => ({ ...prev, type: value as "text" | "image" | "file" | "url" }))
                }
              >
                <TabsList className="grid w-full grid-cols-4 mt-2 border-2 border-retro-border-dark bg-retro-gray-100 shadow-retro-soft-inset">
                  <TabsTrigger
                    value="text"
                    className="data-[state=active]:bg-butter-yellow data-[state=active]:text-retro-navy-text data-[state=active]:shadow-retro-soft-sm"
                  >
                    <FileText className="w-4 h-4" />
                  </TabsTrigger>
                  <TabsTrigger
                    value="image"
                    className="data-[state=active]:bg-butter-yellow data-[state=active]:text-retro-navy-text data-[state=active]:shadow-retro-soft-sm"
                  >
                    <ImageIcon className="w-4 h-4" />
                  </TabsTrigger>
                  <TabsTrigger
                    value="file"
                    className="data-[state=active]:bg-butter-yellow data-[state=active]:text-retro-navy-text data-[state=active]:shadow-retro-soft-sm"
                  >
                    <Upload className="w-4 h-4" />
                  </TabsTrigger>
                  <TabsTrigger
                    value="url"
                    className="data-[state=active]:bg-butter-yellow data-[state=active]:text-retro-navy-text data-[state=active]:shadow-retro-soft-sm"
                  >
                    <Link className="w-4 h-4" />
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="text" className="mt-3">
                  <Textarea
                    placeholder="Describe what you accomplished..."
                    value={proofSubmission.content}
                    onChange={(e) => setProofSubmission((prev) => ({ ...prev, content: e.target.value }))}
                    className="text-sm border-2 border-retro-border-dark bg-soft-beige shadow-retro-soft-inset"
                    rows={4}
                  />
                </TabsContent>
                <TabsContent value="image" className="mt-3">
                  <div className="border-2 border-dashed border-retro-border-dark rounded-lg p-4 text-center bg-retro-gray-100 shadow-retro-soft-inset">
                    <ImageIcon className="w-7 h-7 text-retro-navy-text mx-auto mb-2" />
                    <p className="text-sm text-gray-700">Upload an image as proof</p>
                    <RetroInput
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          setProofSubmission((prev) => ({ ...prev, file, content: file.name }))
                        }
                      }}
                      className="mt-2 text-sm"
                    />
                  </div>
                </TabsContent>
                <TabsContent value="file" className="mt-3">
                  <div className="border-2 border-dashed border-retro-border-dark rounded-lg p-4 text-center bg-retro-gray-100 shadow-retro-soft-inset">
                    <Upload className="w-7 h-7 text-retro-navy-text mx-auto mb-2" />
                    <p className="text-sm text-gray-700">Upload a file as proof</p>
                    <RetroInput
                      type="file"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          setProofSubmission((prev) => ({ ...prev, file, content: file.name }))
                        }
                      }}
                      className="mt-2 text-sm"
                    />
                  </div>
                </TabsContent>
                <TabsContent value="url" className="mt-3">
                  <RetroInput
                    placeholder="https://example.com/proof"
                    value={proofSubmission.content}
                    onChange={(e) => setProofSubmission((prev) => ({ ...prev, content: e.target.value }))}
                    className="text-sm"
                  />
                </TabsContent>
              </Tabs>
            </div>
            <div className="flex gap-3 pt-3">
              <RetroButton variant="outline" onClick={() => setShowProofModal(false)} className="flex-1 text-sm">
                Cancel
              </RetroButton>
              <RetroButton
                onClick={submitProof}
                disabled={!proofSubmission.content}
                className="flex-1 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Upload className="w-4 h-4 mr-2" />
                Submit Proof
              </RetroButton>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* NFT Details Modal */}
      <Dialog open={showNFTDetailsModal} onOpenChange={setShowNFTDetailsModal}>
        <DialogContent className="max-w-md bg-soft-beige rounded-lg border-2 border-retro-border-dark shadow-retro-soft" style={{ backgroundColor: '#FFF8E1' }}>
          <DialogHeader>
            <DialogTitle className="text-xl font-retro text-retro-navy-text">NFT Badge Details</DialogTitle>
            <DialogDescription className="text-sm text-gray-700">{selectedNFT?.name}</DialogDescription>
          </DialogHeader>
          {selectedNFT && (
            <div className="space-y-3">
              <div className="text-center">
                <div
                  className={`w-20 h-20 rounded-lg flex items-center justify-center mx-auto mb-3 border-2 border-retro-border-dark shadow-retro-soft-sm ${
                    selectedNFT.unlocked ? "bg-butter-yellow" : "bg-retro-gray-200"
                  }`}
                >
                  <Trophy
                    className={`w-10 h-10 ${selectedNFT.unlocked ? "text-retro-navy-text" : "text-retro-gray-500"}`}
                  />
                </div>
                <Badge
                  className={`text-base font-medium border-2 border-retro-border-dark shadow-retro-soft-sm ${getRarityColor(selectedNFT.rarity)}`}
                >
                  {selectedNFT.rarity}
                </Badge>
              </div>
              <div>
                <h4 className="font-retro text-retro-navy-text mb-1 text-sm">Description</h4>
                <p className="text-sm text-gray-700">{selectedNFT.description}</p>
              </div>
              <div>
                <h4 className="font-retro text-retro-navy-text mb-1 text-sm">Attributes</h4>
                <div className="space-y-1">
                  {selectedNFT.attributes.map((attr, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-2 bg-retro-gray-100 rounded-lg border-2 border-retro-border-dark shadow-retro-soft-inset"
                    >
                      <span className="text-xs font-medium text-gray-700">{attr.trait_type}</span>
                      <span className="text-xs font-medium text-retro-navy-text">{attr.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              {selectedNFT.unlocked && selectedNFT.tradeable && (
                <div>
                  <h4 className="font-retro text-retro-navy-text mb-1 text-sm">Market Info</h4>
                  <div className="flex justify-between items-center p-3 bg-retro-green border-2 border-retro-border-dark rounded-lg shadow-retro-soft-sm">
                    <span className="text-sm font-medium text-white">Current Value</span>
                    <span className="text-lg font-medium text-white">{selectedNFT.marketValue} ZLAG</span>
                  </div>
                </div>
              )}
              <div className="flex gap-3 pt-3">
                <RetroButton variant="outline" onClick={() => setShowNFTDetailsModal(false)} className="flex-1 text-sm">
                  Close
                </RetroButton>
                {selectedNFT.unlocked && selectedNFT.tradeable && (
                  <RetroButton className="flex-1 text-sm">
                    <DollarSign className="w-4 h-4 mr-2" />
                    List for Sale
                  </RetroButton>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
