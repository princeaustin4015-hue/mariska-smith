'use client'

// NOTE: Admin panel is currently disabled via middleware
// All /admin routes redirect to home page
// To re-enable: Update middleware.ts to uncomment the admin protection code

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BonusOffer, LeaderboardItem, GiveawayItem } from '@/lib/types/bonus'
import BonusList from '@/components/admin/BonusList'
import BonusForm from '@/components/admin/BonusForm'
import LeaderboardList from '@/components/admin/LeaderboardList'
import LeaderboardForm from '@/components/admin/LeaderboardForm'
import GiveawayList from '@/components/admin/GiveawayList'
import GiveawayForm from '@/components/admin/GiveawayForm'
import ToastContainer from '@/components/admin/ToastContainer'
import LoadingSpinner from '@/components/admin/LoadingSpinner'
import { useToast } from '@/hooks/useToast'
import { Plus, LogOut } from 'lucide-react'

export default function AdminDashboardPage() {
  const { data: session, status } = useSession()
  const [activeTab, setActiveTab] = useState('bonuses')
  const [showForm, setShowForm] = useState(false)
  const [refreshTrigger, setRefreshTrigger] = useState(0)
  const [editingBonus, setEditingBonus] = useState<BonusOffer | null>(null)
  const [editingLeaderboard, setEditingLeaderboard] = useState<LeaderboardItem | null>(null)
  const [editingGiveaway, setEditingGiveaway] = useState<GiveawayItem | null>(null)
  const router = useRouter()
  const toast = useToast()

  const handleLogout = async () => {
    try {
      await signOut({ redirect: false })
      toast.success('Logged out successfully')
      router.push('/admin/login')
      router.refresh()
    } catch (error) {
      toast.error('Failed to logout')
    }
  }

  const handleEditBonus = (bonus: BonusOffer) => {
    setEditingBonus(bonus)
    setShowForm(true)
  }

  const handleCreateBonus = () => {
    setEditingBonus(null)
    setShowForm(true)
  }

  const handleEditLeaderboard = (item: LeaderboardItem) => {
    setEditingLeaderboard(item)
    setShowForm(true)
  }

  const handleCreateLeaderboard = () => {
    setEditingLeaderboard(null)
    setShowForm(true)
  }

  const handleEditGiveaway = (item: GiveawayItem) => {
    setEditingGiveaway(item)
    setShowForm(true)
  }

  const handleCreateGiveaway = () => {
    setEditingGiveaway(null)
    setShowForm(true)
  }

  const handleFormClose = () => {
    setShowForm(false)
    setEditingBonus(null)
    setEditingLeaderboard(null)
    setEditingGiveaway(null)
    setRefreshTrigger(prev => prev + 1)
  }

  const handleFormSuccess = () => {
    handleFormClose()
    toast.success('Operation completed successfully')
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0b0604]">
        <LoadingSpinner />
      </div>
    )
  }

  if (status === 'unauthenticated' || !session) {
    router.push('/admin/login')
    return null
  }

  return (
    <div className="min-h-screen bg-[#0b0604] py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white font-cursive">
              Admin Panel
            </h1>
            <p className="text-gray-400 mt-2">Manage Content</p>
          </div>
          <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-[#19110a] border border-[rgba(255,210,74,0.35)] mb-6">
            <TabsTrigger value="bonuses" className="text-white data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
              Bonuses
            </TabsTrigger>
            <TabsTrigger value="leaderboard" className="text-white data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
              Leaderboard
            </TabsTrigger>
            <TabsTrigger value="giveaways" className="text-white data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
              Giveaways
            </TabsTrigger>
          </TabsList>

          <TabsContent value="bonuses">
            <div className="mb-4">
              <Button onClick={handleCreateBonus} className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Bonus
              </Button>
            </div>
            {showForm && activeTab === 'bonuses' ? (
              <BonusForm
                bonus={editingBonus}
                onClose={handleFormClose}
                onSuccess={handleFormSuccess}
              />
            ) : (
              <BonusList onEdit={handleEditBonus} refreshTrigger={refreshTrigger} />
            )}
          </TabsContent>

          <TabsContent value="leaderboard">
            <div className="mb-4">
              <Button onClick={handleCreateLeaderboard} className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Leaderboard Item
              </Button>
            </div>
            {showForm && activeTab === 'leaderboard' ? (
              <LeaderboardForm
                item={editingLeaderboard}
                onClose={handleFormClose}
                onSuccess={handleFormSuccess}
              />
            ) : (
              <LeaderboardList onEdit={handleEditLeaderboard} refreshTrigger={refreshTrigger} />
            )}
          </TabsContent>

          <TabsContent value="giveaways">
            <div className="mb-4">
              <Button onClick={handleCreateGiveaway} className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Giveaway Item
              </Button>
            </div>
            {showForm && activeTab === 'giveaways' ? (
              <GiveawayForm
                item={editingGiveaway}
                onClose={handleFormClose}
                onSuccess={handleFormSuccess}
              />
            ) : (
              <GiveawayList onEdit={handleEditGiveaway} refreshTrigger={refreshTrigger} />
            )}
          </TabsContent>
        </Tabs>
      </div>
      <ToastContainer toasts={toast.toasts} onRemove={toast.removeToast} />
    </div>
  )
}

