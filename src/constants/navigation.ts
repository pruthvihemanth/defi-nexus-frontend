export const NAVIGATION_ITEMS = [
  {
    name: "Swap",
    href: "/swap",
    description: "Trade tokens instantly"
  },
  {
    name: "Perpetuals",
    href: "/perpetuals",
    description: "Trade perpetual futures"
  },
  {
    name: "Pools",
    href: "/pools",
    description: "Provide liquidity and earn fees"
  },
  {
    name: "Lend",
    href: "/lend",
    description: "Lend and borrow assets"
  },
  {
    name: "Stake",
    href: "/stake",
    description: "Stake tokens and earn rewards"
  },
  {
    name: "Looper",
    href: "/looper",
    description: "Automated trading strategies"
  }
] as const

export const FOOTER_LINKS = {
  product: [
    { name: "Swap", href: "/swap" },
    { name: "Perpetuals", href: "/perpetuals" },
    { name: "Pools", href: "/pools" },
    { name: "Lend", href: "/lend" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Stake", href: "/stake" },
    { name: "Looper", href: "/looper" }
  ],
  company: [
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Careers", href: "/careers" },
    { name: "Press", href: "/press" }
  ],
  support: [
    { name: "Help Center", href: "/help" },
    { name: "Documentation", href: "/docs" },
    { name: "API", href: "/api" },
    { name: "Status", href: "/status" }
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
    { name: "Disclaimer", href: "/disclaimer" }
  ]
} as const

export const SOCIAL_LINKS = [
  { name: "Twitter", href: "https://twitter.com/definexus", icon: "twitter" },
  { name: "Discord", href: "https://discord.gg/definexus", icon: "discord" },
  { name: "Telegram", href: "https://t.me/definexus", icon: "telegram" },
  { name: "GitHub", href: "https://github.com/definexus", icon: "github" }
] as const
