import { promises as fs } from 'fs'
import path from 'path'
import { GiveawayItem } from '../types/bonus'

const DATA_FILE = path.join(process.cwd(), 'lib/data/giveaways.json')

export async function getGiveawayItems(): Promise<GiveawayItem[]> {
  try {
    const fileContents = await fs.readFile(DATA_FILE, 'utf8')
    return JSON.parse(fileContents)
  } catch (error) {
    // Only log in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error reading giveaways:', error)
    }
    return []
  }
}
