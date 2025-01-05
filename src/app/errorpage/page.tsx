'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { AlertTriangle, ArrowLeft, RefreshCcw } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const router = useRouter()

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full px-6 py-8 bg-white shadow-lg rounded-lg">
        <div className="flex flex-col items-center text-center">
          <AlertTriangle className="h-12 w-12 text-yellow-500 mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Oops! Something went wrong</h1>
          <p className="text-gray-600 mb-6">
             We&apos;re sorry, but an unexpected error occurred.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <Button
              onClick={() => reset()}
              className="flex-1 flex items-center justify-center"
            >
              <RefreshCcw className="mr-2 h-4 w-4" />
              Try again
            </Button>
            <Button
              onClick={() => router.push('/')}
              variant="outline"
              className="flex-1 flex items-center justify-center"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go back home
            </Button>
          </div>
          <p className="mt-6 text-sm text-gray-500">
            If the problem persists, please{' '}
            <Link href="/contact" className="text-blue-500 hover:underline">
              contact support
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}

