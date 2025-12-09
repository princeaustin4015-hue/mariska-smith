import { NextRequest, NextResponse } from 'next/server'
import { createBonus } from '@/lib/utils/bonus-storage'
import { BonusOffer } from '@/lib/types/bonus'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    const requiredFields = ['title', 'description', 'icon', 'details']
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }
    
    const newBonus = await createBonus({
      title: body.title,
      description: body.description,
      icon: body.icon,
      details: body.details,
      path: body.path,
      action: body.action,
      highlight: body.highlight,
      badge: body.badge,
      gradient: body.gradient || 'from-yellow-500 via-orange-500 to-red-500',
      isActive: body.isActive !== undefined ? body.isActive : true,
      imageUrl: body.imageUrl,
    })
    
    return NextResponse.json({ success: true, data: newBonus }, { status: 201 })
  } catch (error) {
    console.error('Error creating bonus:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create bonus' },
      { status: 500 }
    )
  }
}


