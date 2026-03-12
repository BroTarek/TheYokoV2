
'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog'
import { useAuth } from '@/context/AuthContext'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

interface LoginModalProps {
    isOpen: boolean
    onOpenChange: (open: boolean) => void
}

export function LoginModal({ isOpen, onOpenChange }: LoginModalProps) {
    const { login } = useAuth()
    const router = useRouter()
    const [adminMail, setAdminMail] = useState('')
    const [adminPass1, setAdminPass1] = useState('')
    const [adminPass2, setAdminPass2] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        console.log("handleSubmit fired")
        try {
            // check against hard‑coded credentials in frontend only
            const validMail = 'THEYOKO@GAIL.NOTCOM'
            const validPass1 = '123456789'
            const validPass2 = '987654321'

            if (
                adminMail === validMail &&
                adminPass1 === validPass1 &&
                adminPass2 === validPass2
            ) {
                login()
                toast.success('Login successful!')
                onOpenChange(false)
                // redirect to dashboard or first restricted route
                console.log("successful")
                router.push('/dashboard')
            } else {
                toast.error('Invalid credentials')
            }
        } catch (error: any) {
            console.log("failed")
            console.error('Unexpected login error:', error)
            toast.error('An unexpected error occurred')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-kaizen-red">Admin Authentication</DialogTitle>
                    <DialogDescription>
                        Please enter your administrator credentials to access restricted routes.
                    </DialogDescription>
                    <p className="text-sm text-gray-500 mt-2">
                        <strong>Hint:</strong> use <code>THEYOKO@GAIL.NOTCOM</code> / <code>123456789</code> / <code>987654321</code>
                    </p>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                    <div className="space-y-2">
                        <Label htmlFor="adminMail">Admin Email</Label>
                        <Input
                            id="adminMail"
                            type="email"
                            placeholder="admin@example.com"
                            value={adminMail}
                            onChange={(e) => setAdminMail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="adminPass1">Admin Password 1</Label>
                        <Input
                            id="adminPass1"
                            type="password"
                            value={adminPass1}
                            onChange={(e) => setAdminPass1(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="adminPass2">Admin Password 2</Label>
                        <Input
                            id="adminPass2"
                            type="password"
                            value={adminPass2}
                            onChange={(e) => setAdminPass2(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex justify-end gap-3 mt-6">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="bg-kaizen-red hover:bg-red-700"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Verifying...' : 'Authenticate'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
