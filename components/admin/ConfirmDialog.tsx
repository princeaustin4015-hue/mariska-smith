'use client'

import { AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ConfirmDialogProps {
  title: string
  message: string
  onConfirm: () => void
  onCancel: () => void
  confirmText?: string
  cancelText?: string
  variant?: 'danger' | 'warning' | 'info'
}

export default function ConfirmDialog({
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger',
}: ConfirmDialogProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-[#19110a] to-[#0f0a06] border border-[rgba(255,210,74,0.35)] rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl">
        <div className="flex items-start gap-4 mb-4">
          <div className={`p-2 rounded-full ${
            variant === 'danger' ? 'bg-red-500/20' :
            variant === 'warning' ? 'bg-yellow-500/20' :
            'bg-blue-500/20'
          }`}>
            <AlertTriangle className={`w-5 h-5 ${
              variant === 'danger' ? 'text-red-400' :
              variant === 'warning' ? 'text-yellow-400' :
              'text-blue-400'
            }`} />
          </div>
          <div className="flex-1">
            <h3 className="text-white font-bold text-lg mb-2 font-cursive">
              {title}
            </h3>
            <p className="text-gray-300 text-sm">{message}</p>
          </div>
        </div>
        <div className="flex gap-3 justify-end">
          <Button variant="outline" onClick={onCancel}>
            {cancelText}
          </Button>
          <Button
            onClick={onConfirm}
            variant={variant === 'danger' ? 'destructive' : 'default'}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  )
}



