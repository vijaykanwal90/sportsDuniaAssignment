'use client'

import React, { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const AdminPage = () => {
  const [payoutValue, setPayoutValue] = useState('')
  const [currentPayoutValue, setCurrentPayoutValue] = useState('')
  const [debugInfo, setDebugInfo] = useState('')

  useEffect(() => {
    const loadPayoutValue = () => {
      try {
        const storedValue = localStorage.getItem('payoutValue')
        console.log('Stored payout value:', storedValue)
        setDebugInfo(prev => prev + `\nStored value: ${storedValue}`)
        if (storedValue) {
          setCurrentPayoutValue(storedValue)
          setDebugInfo(prev => prev + `\nSet current payout value to: ${storedValue}`)
        } else {
          setDebugInfo(prev => prev + '\nNo stored payout value found')
        }
      } catch (error) {
        console.error('Error loading payout value:', error)
        setDebugInfo(prev => prev + `\nError loading payout value: ${error.message}`)
      }
    }

    loadPayoutValue()
  }, [])

  const handlePayoutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPayoutValue(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (payoutValue.trim() === '') {
      toast.error('Please enter a valid payout value')
      return
    }
    try {
      localStorage.setItem('payoutValue', payoutValue)
      console.log('Saved payout value:', payoutValue)
      setDebugInfo(prev => prev + `\nSaved payout value: ${payoutValue}`)
      setCurrentPayoutValue(payoutValue)
      setPayoutValue('')  // Clear the input field
      toast.success('Payout value saved successfully')
    } catch (error) {
      console.error('Error saving payout value:', error)
      setDebugInfo(prev => prev + `\nError saving payout value: ${error.message}`)
      toast.error('Failed to save payout value')
    }
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Admin Page</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Current Payout Value</h3>
            <p className="text-xl font-bold">{currentPayoutValue || 'Not set'}</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="payoutValue" className="block text-sm font-medium text-gray-700">
                Set New Payout Value
              </label>
              <Input
                type="number"
                id="payoutValue"
                value={payoutValue}
                onChange={handlePayoutChange}
                placeholder="Enter payout value"
                className="mt-1"
              />
            </div>
            <Button type="submit" className="w-full">
              Save Payout Value
            </Button>
          </form>
          {/* <div className="mt-4">
            <h4 className="text-sm font-semibold mb-2">Debug Information</h4>
            <pre className="text-xs bg-gray-100 p-2 rounded">{debugInfo}</pre>
          </div> */}
        </CardContent>
      </Card>
      <ToastContainer position="bottom-right" />
    </div>
  )
}

export default AdminPage

