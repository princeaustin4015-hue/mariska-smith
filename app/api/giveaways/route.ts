import { NextResponse } from 'next/server'
import { getGiveawayItems } from '@/lib/utils/giveaways-storage'

export async function GET() {
  try {
    const items = await getGiveawayItems()
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
      console.error('Error fetching giveaways:', error)
    }
    return NextResponse.json(
      { success: false, error: 'Failed to fetch giveaways' },
      { status: 500 }
    )
  }
}