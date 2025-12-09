import { NextRequest, NextResponse } from 'next/server'
import { getBonusById, updateBonus, deleteBonus } from '@/lib/utils/bonus-storage'
import { BonusOffer } from '@/lib/types/bonus'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const bonus = await getBonusById(id)
    
    if (!bonus) {
      return NextResponse.json(
        { success: false, error: 'Bonus not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ success: true, data: bonus })
  } catch (error) {
    console.error('Error fetching bonus:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch bonus' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    
    const updated = await updateBonus(id, body)
    
    if (!updated) {
      return NextResponse.json(
        { success: false, error: 'Bonus not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ success: true, data: updated })
  } catch (error) {
    console.error('Error updating bonus:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update bonus' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const deleted = await deleteBonus(id)
    
    if (!deleted) {
      return NextResponse.json(
        { success: false, error: 'Bonus not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ success: true, message: 'Bonus deleted successfully' })
  } catch (error) {
    console.error('Error deleting bonus:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete bonus' },
      { status: 500 }
    )
  }
}



