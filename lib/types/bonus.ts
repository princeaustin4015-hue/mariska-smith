export interface BonusOffer {
  id: string
  title: string
  description: string
  icon: string
  details: string
  path?: string
  action?: string
  highlight?: string
  badge?: string
  gradient?: string
  imageUrl?: string
  isActive?: boolean
  createdAt?: string
  updatedAt?: string
}

export interface BonusOfferFormData {
  title: string
  description: string
  icon: string
  details: string
  path?: string
  action?: string
  highlight?: string
  badge?: string
  gradient?: string
  imageUrl?: string
  isActive?: boolean
}

export interface LeaderboardItem {
  id: string
  title: string
  description: string
  icon?: string
  imageUrl?: string
  status: 'coming-soon' | 'active' | 'inactive'
  createdAt?: string
  updatedAt?: string
}

export interface GiveawayItem {
  id: string
  title: string
  description: string
  icon?: string
  imageUrl?: string
  status: 'coming-soon' | 'active' | 'inactive'
  createdAt?: string
  updatedAt?: string
}

