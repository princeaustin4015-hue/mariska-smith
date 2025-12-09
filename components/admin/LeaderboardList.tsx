'use client'

import { LeaderboardItem } from '@/lib/types/bonus'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Edit, Trash2 } from 'lucide-react'
import Image from 'next/image'
import { useAdminData } from '@/hooks/useAdminData'
import { useAdminMutation } from '@/hooks/useAdminMutation'
import { useConfirmDialog } from '@/hooks/useConfirmDialog'
import { useToast } from '@/hooks/useToast'
import LoadingSpinner from './LoadingSpinner'
import ErrorMessage from './ErrorMessage'
import ConfirmDialog from './ConfirmDialog'

interface LeaderboardListProps {
  onEdit: (item: LeaderboardItem) => void
  refreshTrigger?: number
}

export default function LeaderboardList({ onEdit, refreshTrigger }: LeaderboardListProps) {
  const toast = useToast()
  const { data: items, loading, error, refetch, mutate } = useAdminData<LeaderboardItem>({
    endpoint: '/api/leaderboard',
    refreshTrigger,
  })
  const { mutate: deleteMutation } = useAdminMutation({
    onSuccess: () => {
      refetch()
      toast.success('Item deleted successfully')
    },
    onError: (error) => toast.error(error),
  })
  const { dialog, confirm, handleConfirm, handleCancel } = useConfirmDialog()

  const handleDelete = async (item: LeaderboardItem) => {
    const confirmed = await confirm({
      title: 'Delete Item',
      message: `Are you sure you want to delete "${item.title}"? This action cannot be undone.`,
      confirmText: 'Delete',
      cancelText: 'Cancel',
      variant: 'danger',
    })

    if (confirmed) {
      await deleteMutation({
        endpoint: `/api/leaderboard/${item.id}`,
        method: 'DELETE',
      })
    }
  }

  if (loading) {
    return <LoadingSpinner className="py-12" />
  }

  if (error) {
    return <ErrorMessage message={error} />
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {items.map((item) => (
        <Card
          key={item.id}
          className="bg-gradient-to-br from-[#19110a] to-[#0f0a06] border-[rgba(255,210,74,0.35)]"
        >
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle className="text-white font-cursive">
                {item.title}
              </CardTitle>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(item)}
                  className="h-8 w-8"
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(item)}
                  className="h-8 w-8 text-red-400 hover:text-red-500"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {item.imageUrl && (
                <div className="relative w-full h-56 sm:h-64 md:h-72 rounded-md overflow-hidden border border-[rgba(255,210,74,0.35)]">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              {item.icon && !item.imageUrl && (
                <div className="w-20 h-20 rounded-full flex items-center justify-center text-5xl bg-gradient-to-br from-yellow-400 to-orange-300">
                  {item.icon}
                </div>
              )}
              <p className="text-gray-300 text-sm">{item.description}</p>
              <div>
                <span className={`text-xs px-2 py-1 rounded ${
                  item.status === 'active' ? 'bg-green-500/20 text-green-400' :
                  item.status === 'coming-soon' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-gray-500/20 text-gray-400'
                }`}>
                  {item.status}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      {dialog && (
        <ConfirmDialog
          title={dialog.title}
          message={dialog.message}
          confirmText={dialog.confirmText}
          cancelText={dialog.cancelText}
          variant={dialog.variant}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </div>
  )
}

