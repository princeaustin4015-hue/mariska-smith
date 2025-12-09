import { promises as fs } from 'fs'
import path from 'path'
import { GiveawayItem } from '../types/bonus'

const DATA_FILE = path.join(process.cwd(), 'lib/data/giveaways.json')

export async function getGiveawayItems(): Promise<GiveawayItem[]> {
  try {
    const fileContents = await fs.readFile(DATA_FILE, 'utf8')
    return JSON.parse(fileContents)
  } catch (error) {
    console.error('Error reading giveaways:', error)
    return []
  }
}

export async function getGiveawayItemById(id: string): Promise<GiveawayItem | null> {
  const items = await getGiveawayItems()
  return items.find(item => item.id === id) || null
}

export async function createGiveawayItem(item: Omit<GiveawayItem, 'id' | 'createdAt' | 'updatedAt'>): Promise<GiveawayItem> {
  const items = await getGiveawayItems()
  const newItem: GiveawayItem = {
    ...item,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  items.push(newItem)
  await fs.writeFile(DATA_FILE, JSON.stringify(items, null, 2))
  return newItem
}

export async function updateGiveawayItem(id: string, updates: Partial<GiveawayItem>): Promise<GiveawayItem | null> {
  const items = await getGiveawayItems()
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

export async function deleteGiveawayItem(id: string): Promise<boolean> {
  const items = await getGiveawayItems()
  const filtered = items.filter(item => item.id !== id)
  
  if (filtered.length === items.length) {
    return false
  }
  
  await fs.writeFile(DATA_FILE, JSON.stringify(filtered, null, 2))
  return true
}



