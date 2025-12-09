// This route is deprecated - use NextAuth signOut instead
// Keeping for backward compatibility if needed

import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  // NextAuth handles logout via signOut() function
  // This endpoint is kept for backward compatibility
  return NextResponse.json({ 
    success: true, 
    message: 'Please use NextAuth signOut() function' 
  })
}

