import { NextRequest, NextResponse } from 'next/server'
import { createLeaderboardItem } from '@/lib/utils/leaderboard-storage'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const requiredFields = ['title', 'description']
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }
    
    const newItem = await createLeaderboardItem({
      title: body.title,
      description: body.description,
      icon: body.icon || '🏆',
      imageUrl: body.imageUrl,
      status: body.status || 'coming-soon',
    })
    
    return NextResponse.json({ success: true, data: newItem }, { status: 201 })
  } catch (error) {
    console.error('Error creating item:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create item' },
      { status: 500 }
    )
  }
}



