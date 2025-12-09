import { NextRequest, NextResponse } from 'next/server'
import { getLeaderboardItemById, updateLeaderboardItem, deleteLeaderboardItem } from '@/lib/utils/leaderboard-storage'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const item = await getLeaderboardItemById(id)
    
    if (!item) {
      return NextResponse.json(
        { success: false, error: 'Item not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ success: true, data: item })
  } catch (error) {
    console.error('Error fetching item:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch item' },
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
    
    const updated = await updateLeaderboardItem(id, body)
    
    if (!updated) {
      return NextResponse.json(
        { success: false, error: 'Item not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ success: true, data: updated })
  } catch (error) {
    console.error('Error updating item:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update item' },
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
    const deleted = await deleteLeaderboardItem(id)
    
    if (!deleted) {
      return NextResponse.json(
        { success: false, error: 'Item not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ success: true, message: 'Item deleted successfully' })
  } catch (error) {
    console.error('Error deleting item:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete item' },
      { status: 500 }
    )
  }
}



