import { promises as fs } from 'fs'
import path from 'path'
import { LeaderboardItem } from '../types/bonus'

const DATA_FILE = path.join(process.cwd(), 'lib/data/leaderboard.json')

export async function getLeaderboardItems(): Promise<LeaderboardItem[]> {
  try {
    const fileContents = await fs.readFile(DATA_FILE, 'utf8')
    return JSON.parse(fileContents)
  } catch (error) {
    // Only log in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error reading leaderboard:', error)
    }
    return []
  }
}
