import { NextRequest, NextResponse } from 'next/server'
import { getActiveBonuses, getBonuses } from '@/lib/utils/bonus-storage'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const activeOnly = searchParams.get('activeOnly') === 'true'
    
    const bonuses = activeOnly ? await getActiveBonuses() : await getBonuses()
    
    return NextResponse.json(
      { success: true, data: bonuses },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
        },
      }
    )
  } catch (error) {
    // Only log in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error fetching bonuses:', error)
    }
    return NextResponse.json(
      { success: false, error: 'Failed to fetch bonuses' },
      { status: 500 }
    )
  }
}