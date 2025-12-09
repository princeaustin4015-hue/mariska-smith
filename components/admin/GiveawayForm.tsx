'use client'

import { useState, useEffect } from 'react'
import { GiveawayItem } from '@/lib/types/bonus'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { X } from 'lucide-react'
import ImageUpload from './ImageUpload'
import { useAdminMutation } from '@/hooks/useAdminMutation'
import { useToast } from '@/hooks/useToast'
import ErrorMessage from './ErrorMessage'

interface GiveawayFormProps {
  item?: GiveawayItem | null
  onClose: () => void
  onSuccess: () => void
}

const STATUS_OPTIONS = [
  { value: 'coming-soon', label: 'Coming Soon' },
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
]

export default function GiveawayForm({ item, onClose, onSuccess }: GiveawayFormProps) {
  const toast = useToast()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: '🎁',
    imageUrl: '',
    status: 'coming-soon' as 'coming-soon' | 'active' | 'inactive',
  })
  const { mutate, loading, error } = useAdminMutation({
    onSuccess: () => {
      toast.success(item ? 'Item updated successfully' : 'Item created successfully')
      onSuccess()
    },
    onError: (error) => {
      toast.error(error)
    },
  })

  useEffect(() => {
    if (item) {
      setFormData({
        title: item.title,
        description: item.description,
        icon: item.icon || '🎁',
        imageUrl: item.imageUrl || '',
        status: item.status,
      })
    }
  }, [item])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const url = item
      ? `/api/giveaways/${item.id}`
      : '/api/giveaways/create'
    
    const method = item ? 'PUT' : 'POST'

    await mutate({
      endpoint: url,
      method,
      data: formData,
    })
  }

  return (
    <Card className="bg-gradient-to-br from-[#19110a] to-[#0f0a06] border-[rgba(255,210,74,0.35)]">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-white font-cursive">
              {item ? 'Edit Giveaway' : 'Create Giveaway Item'}
            </CardTitle>
            <CardDescription className="text-gray-400">
              {item ? 'Update giveaway details' : 'Add a new giveaway item'}
            </CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-white">
                Title *
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                className="bg-[#0f0a06] border-[rgba(255,210,74,0.35)] text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="icon" className="text-white">
                Icon (Emoji)
              </Label>
              <Input
                id="icon"
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                placeholder="🎁"
                className="bg-[#0f0a06] border-[rgba(255,210,74,0.35)] text-white"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description" className="text-white">
                Description *
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                className="bg-[#0f0a06] border-[rgba(255,210,74,0.35)] text-white"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <ImageUpload
                value={formData.imageUrl}
                onChange={(url) => setFormData({ ...formData, imageUrl: url })}
                label="Image (Optional)"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="status" className="text-white">
                Status
              </Label>
              <select
                id="status"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as 'coming-soon' | 'active' | 'inactive' })}
                className="w-full h-9 rounded-md border border-[rgba(255,210,74,0.35)] bg-[#0f0a06] text-white px-3"
              >
                {STATUS_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {error && <ErrorMessage message={error} />}

          <div className="flex gap-4 pt-4">
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : item ? 'Update Item' : 'Create Item'}
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

