'use client'

import { BonusOffer } from '@/lib/types/bonus'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Edit, Trash2, Eye, EyeOff } from 'lucide-react'
import Image from 'next/image'
import { useAdminData } from '@/hooks/useAdminData'
import { useAdminMutation } from '@/hooks/useAdminMutation'
import { useConfirmDialog } from '@/hooks/useConfirmDialog'
import { useToast } from '@/hooks/useToast'
import LoadingSpinner from './LoadingSpinner'
import ErrorMessage from './ErrorMessage'
import ConfirmDialog from './ConfirmDialog'

interface BonusListProps {
  onEdit: (bonus: BonusOffer) => void
  refreshTrigger?: number
}

export default function BonusList({ onEdit, refreshTrigger }: BonusListProps) {
  const toast = useToast()
  const { data: bonuses, loading, error, refetch, mutate } = useAdminData<BonusOffer>({
    endpoint: '/api/bonuses',
    refreshTrigger,
  })
  const { mutate: deleteMutation } = useAdminMutation({
    onSuccess: () => {
      refetch()
      toast.success('Bonus deleted successfully')
    },
    onError: (error) => toast.error(error),
  })
  const { mutate: toggleMutation } = useAdminMutation({
    onSuccess: () => {
      refetch()
    },
  })
  const { dialog, confirm, handleConfirm, handleCancel } = useConfirmDialog()

  const handleDelete = async (bonus: BonusOffer) => {
    const confirmed = await confirm({
      title: 'Delete Bonus',
      message: `Are you sure you want to delete "${bonus.title}"? This action cannot be undone.`,
      confirmText: 'Delete',
      cancelText: 'Cancel',
      variant: 'danger',
    })

    if (confirmed) {
      mutate({ id: bonus.id, isActive: false })
      await deleteMutation({
        endpoint: `/api/bonuses/${bonus.id}`,
        method: 'DELETE',
      })
    }
  }

  const handleToggleActive = async (bonus: BonusOffer) => {
    const newActiveState = !bonus.isActive
    mutate({ id: bonus.id, isActive: newActiveState })
    
    await toggleMutation({
      endpoint: `/api/bonuses/${bonus.id}`,
      method: 'PUT',
      data: { isActive: newActiveState },
    })
  }

  if (loading) {
    return <LoadingSpinner className="py-12" />
  }

  if (error) {
    return <ErrorMessage message={error} />
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {bonuses.map((bonus) => (
        <Card
          key={bonus.id}
          className="bg-gradient-to-br from-[#19110a] to-[#0f0a06] border-[rgba(255,210,74,0.35)]"
        >
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle className="text-white font-cursive">
                {bonus.title}
              </CardTitle>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleToggleActive(bonus)}
                  className="h-8 w-8"
                >
                  {bonus.isActive ? (
                    <Eye className="w-4 h-4" />
                  ) : (
                    <EyeOff className="w-4 h-4" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(bonus)}
                  className="h-8 w-8"
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(bonus)}
                  className="h-8 w-8 text-red-400 hover:text-red-500"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {bonus.imageUrl ? (
                <div className="relative w-full h-48 sm:h-56 md:h-64 rounded-md overflow-hidden border border-[rgba(255,210,74,0.35)] mb-3">
                  <Image
                    src={bonus.imageUrl}
                    alt={bonus.title}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-3xl">{bonus.icon}</span>
                </div>
              )}
              <p className="text-gray-300 text-sm">{bonus.description}</p>
              <p className="text-yellow-300/80 text-xs">{bonus.details}</p>
              {bonus.highlight && (
                <span className="inline-block bg-yellow-400/20 text-yellow-300 px-2 py-1 rounded text-xs">
                  {bonus.highlight}
                </span>
              )}
              {bonus.badge && (
                <span className="inline-block bg-red-500/20 text-red-300 px-2 py-1 rounded text-xs ml-2">
                  {bonus.badge}
                </span>
              )}
              <div className="pt-2">
                <span className={`text-xs ${bonus.isActive ? 'text-green-400' : 'text-gray-500'}`}>
                  {bonus.isActive ? 'Active' : 'Inactive'}
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

