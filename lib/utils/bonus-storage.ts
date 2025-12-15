import { promises as fs } from 'fs'
import path from 'path'
import { BonusOffer } from '../types/bonus'

const DATA_FILE = path.join(process.cwd(), 'lib/data/bonuses.json')

export async function getBonuses(): Promise<BonusOffer[]> {
  try {
    const fileContents = await fs.readFile(DATA_FILE, 'utf8')
    return JSON.parse(fileContents)
  } catch (error) {
    // Only log in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error reading bonuses:', error)
    }
    return []
  }
}

export async function getActiveBonuses(): Promise<BonusOffer[]> {
  const bonuses = await getBonuses()
  return bonuses.filter(bonus => bonus.isActive !== false)
}
