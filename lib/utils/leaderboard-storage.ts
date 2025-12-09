import { promises as fs } from 'fs'
import path from 'path'
import { LeaderboardItem } from '../types/bonus'

const DATA_FILE = path.join(process.cwd(), 'lib/data/leaderboard.json')

export async function getLeaderboardItems(): Promise<LeaderboardItem[]> {
  try {
    const fileContents = await fs.readFile(DATA_FILE, 'utf8')
    return JSON.parse(fileContents)
  } catch (error) {
    console.error('Error reading leaderboard:', error)
    return []
  }
}

export async function getLeaderboardItemById(id: string): Promise<LeaderboardItem | null> {
  const items = await getLeaderboardItems()
  return items.find(item => item.id === id) || null
}

export async function createLeaderboardItem(item: Omit<LeaderboardItem, 'id' | 'createdAt' | 'updatedAt'>): Promise<LeaderboardItem> {
  const items = await getLeaderboardItems()
  const newItem: LeaderboardItem = {
    ...item,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  items.push(newItem)
  await fs.writeFile(DATA_FILE, JSON.stringify(items, null, 2))
  return newItem
}

export async function updateLeaderboardItem(id: string, updates: Partial<LeaderboardItem>): Promise<LeaderboardItem | null> {
  const items = await getLeaderboardItems()
  const index = items.findIndex(item => item.id === id)
  
  if (index === -1) {
    return null
  }
  
  items[index] = {
    ...items[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  }
  
  await fs.writeFile(DATA_FILE, JSON.stringify(items, null, 2))
  return items[index]
}

export async function deleteLeaderboardItem(id: string): Promise<boolean> {
  const items = await getLeaderboardItems()
  const filtered = items.filter(item => item.id !== id)
  
  if (filtered.length === items.length) {
    return false
  }
  
  await fs.writeFile(DATA_FILE, JSON.stringify(filtered, null, 2))
  return true
}



