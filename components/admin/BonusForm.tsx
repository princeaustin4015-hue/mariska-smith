'use client'

import { useState, useEffect } from 'react'
import { BonusOffer, BonusOfferFormData } from '@/lib/types/bonus'
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

interface BonusFormProps {
  bonus?: BonusOffer | null
  onClose: () => void
  onSuccess: () => void
}

const GRADIENT_OPTIONS = [
  'from-yellow-500 via-orange-500 to-red-500',
  'from-red-500 via-orange-500 to-yellow-500',
  'from-green-500 via-emerald-500 to-teal-500',
  'from-pink-500 via-rose-500 to-red-500',
  'from-blue-500 via-indigo-500 to-purple-500',
  'from-cyan-500 via-blue-500 to-indigo-500',
]

export default function BonusForm({ bonus, onClose, onSuccess }: BonusFormProps) {
  const toast = useToast()
  const [formData, setFormData] = useState<BonusOfferFormData>({
    title: '',
    description: '',
    icon: '',
    details: '',
    path: '',
    action: '',
    highlight: '',
    badge: '',
    gradient: GRADIENT_OPTIONS[0],
    imageUrl: '',
    isActive: true,
  })
  const { mutate, loading, error } = useAdminMutation({
    onSuccess: () => {
      toast.success(bonus ? 'Bonus updated successfully' : 'Bonus created successfully')
      onSuccess()
    },
    onError: (error) => {
      toast.error(error)
    },
  })

  useEffect(() => {
    if (bonus) {
      setFormData({
        title: bonus.title,
        description: bonus.description,
        icon: bonus.icon,
        details: bonus.details,
        path: bonus.path || '',
        action: bonus.action || '',
        highlight: bonus.highlight || '',
        badge: bonus.badge || '',
        gradient: bonus.gradient || GRADIENT_OPTIONS[0],
        imageUrl: bonus.imageUrl || '',
        isActive: bonus.isActive !== undefined ? bonus.isActive : true,
      })
    }
  }, [bonus])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const url = bonus
      ? `/api/bonuses/${bonus.id}`
      : '/api/bonuses/create'
    
    const method = bonus ? 'PUT' : 'POST'

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
              {bonus ? 'Edit Bonus' : 'Create New Bonus'}
            </CardTitle>
            <CardDescription className="text-gray-400">
              {bonus ? 'Update bonus offer details' : 'Add a new bonus offer'}
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
                Icon (Emoji) *
              </Label>
              <Input
                id="icon"
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                required
                placeholder="💥"
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
              <Label htmlFor="details" className="text-white">
                Details *
              </Label>
              <Input
                id="details"
                value={formData.details}
                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                required
                placeholder="New Players Only | First Deposit"
                className="bg-[#0f0a06] border-[rgba(255,210,74,0.35)] text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="highlight" className="text-white">
                Highlight
              </Label>
              <Input
                id="highlight"
                value={formData.highlight}
                onChange={(e) => setFormData({ ...formData, highlight: e.target.value })}
                placeholder="100%"
                className="bg-[#0f0a06] border-[rgba(255,210,74,0.35)] text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="badge" className="text-white">
                Badge
              </Label>
              <Input
                id="badge"
                value={formData.badge}
                onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                placeholder="HOT"
                className="bg-[#0f0a06] border-[rgba(255,210,74,0.35)] text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="action" className="text-white">
                Action Button Text
              </Label>
              <Input
                id="action"
                value={formData.action}
                onChange={(e) => setFormData({ ...formData, action: e.target.value })}
                placeholder="Claim Now"
                className="bg-[#0f0a06] border-[rgba(255,210,74,0.35)] text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="path" className="text-white">
                Path (URL)
              </Label>
              <Input
                id="path"
                value={formData.path}
                onChange={(e) => setFormData({ ...formData, path: e.target.value })}
                placeholder="/claim"
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
              <Label htmlFor="gradient" className="text-white">
                Gradient
              </Label>
              <select
                id="gradient"
                value={formData.gradient}
                onChange={(e) => setFormData({ ...formData, gradient: e.target.value })}
                className="w-full h-9 rounded-md border border-[rgba(255,210,74,0.35)] bg-[#0f0a06] text-white px-3"
              >
                {GRADIENT_OPTIONS.map((gradient) => (
                  <option key={gradient} value={gradient}>
                    {gradient}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="w-4 h-4"
                />
                <span className="text-white">Active</span>
              </label>
            </div>
          </div>

          {error && <ErrorMessage message={error} />}

          <div className="flex gap-4 pt-4">
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : bonus ? 'Update Bonus' : 'Create Bonus'}
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

