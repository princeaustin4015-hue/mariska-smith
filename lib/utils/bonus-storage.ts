import { promises as fs } from 'fs'
import path from 'path'
import { BonusOffer } from '../types/bonus'

const DATA_FILE = path.join(process.cwd(), 'lib/data/bonuses.json')

export async function getBonuses(): Promise<BonusOffer[]> {
  try {
    const fileContents = await fs.readFile(DATA_FILE, 'utf8')
    return JSON.parse(fileContents)
  } catch (error) {
    console.error('Error reading bonuses:', error)
    return []
  }
}

export async function getActiveBonuses(): Promise<BonusOffer[]> {
  const bonuses = await getBonuses()
  return bonuses.filter(bonus => bonus.isActive !== false)
}

export async function getBonusById(id: string): Promise<BonusOffer | null> {
  const bonuses = await getBonuses()
  return bonuses.find(bonus => bonus.id === id) || null
}

export async function createBonus(bonus: Omit<BonusOffer, 'id' | 'createdAt' | 'updatedAt'>): Promise<BonusOffer> {
  const bonuses = await getBonuses()
  const newBonus: BonusOffer = {
    ...bonus,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  bonuses.push(newBonus)
  await fs.writeFile(DATA_FILE, JSON.stringify(bonuses, null, 2))
  return newBonus
}

export async function updateBonus(id: string, updates: Partial<BonusOffer>): Promise<BonusOffer | null> {
  const bonuses = await getBonuses()
  const index = bonuses.findIndex(bonus => bonus.id === id)
  
  if (index === -1) {
    return null
  }
  
  bonuses[index] = {
    ...bonuses[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  }
  
  await fs.writeFile(DATA_FILE, JSON.stringify(bonuses, null, 2))
  return bonuses[index]
}

export async function deleteBonus(id: string): Promise<boolean> {
  const bonuses = await getBonuses()
  const filtered = bonuses.filter(bonus => bonus.id !== id)
  
  if (filtered.length === bonuses.length) {
    return false
  }
  
  await fs.writeFile(DATA_FILE, JSON.stringify(filtered, null, 2))
  return true
}



