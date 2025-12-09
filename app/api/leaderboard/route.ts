import { NextRequest, NextResponse } from 'next/server'
import { getLeaderboardItems } from '@/lib/utils/leaderboard-storage'

export async function GET() {
  try {
    const items = await getLeaderboardItems()
    return NextResponse.json(
      { success: true, data: items },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
        },
      }
    )
  } catch (error) {
    // Only log in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error fetching leaderboard:', error)
    }
    return NextResponse.json(
      { success: false, error: 'Failed to fetch leaderboard' },
      { status: 500 }
    )
  }
}


