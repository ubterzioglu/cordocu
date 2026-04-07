'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()

  // Redirect to home page immediately since login is not required
  router.push('/')
  router.refresh()

  return null
}
