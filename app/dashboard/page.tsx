'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { ChartArea } from '@/components/charts/chart-area'
import { ChartBar } from '@/components/charts/chart-bar'
import { ChartLine } from '@/components/charts/chart-line'
import { ChartPie } from '@/components/charts/chat-pie'
import { jsPDF } from "jspdf";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [numArticles, setNumArticles] = useState(0)
  const [payoutPerArticle, setPayoutPerArticle] = useState(0)
  const [totalPayout, setTotalPayout] = useState(0)
  const [showExportOptions, setShowExportOptions] = useState(false)

  const { isToastVisible, message, showToast } = useToast()

  // Retrieve the payout from localStorage (set by admin)
  useEffect(() => {
    const adminPayout = localStorage.getItem('adminPayout');
    if (adminPayout) {
      setPayoutPerArticle(parseFloat(adminPayout));
    }

    // Retrieve numArticles and payoutPerArticle from localStorage
    const storedNumArticles = localStorage.getItem('numArticles');
    const storedPayoutPerArticle = localStorage.getItem('payoutPerArticle');
    if (storedNumArticles && storedPayoutPerArticle) {
      setNumArticles(parseInt(storedNumArticles));
      setPayoutPerArticle(parseFloat(storedPayoutPerArticle));
    }
  }, []);

  const handleNumArticlesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumArticles(parseInt(e.target.value) || 0)
  }

  const calculateTotalPayout = () => {
    setTotalPayout(numArticles * payoutPerArticle)

    // Save values to localStorage after calculation
    localStorage.setItem('numArticles', numArticles.toString())
    localStorage.setItem('payoutPerArticle', payoutPerArticle.toString())

    showToast("Your input has been saved successfully.")
  }

  // Generate current date
  const currentDate = new Date().toLocaleDateString()

  // Generate invoice number
  const invoiceNumber = `INV-${Math.floor(Math.random() * 1000000)}`

  // Export to CSV
  const exportToCSV = () => {
    const csvContent = `data:text/csv;charset=utf-8,Invoice Number,Date,Number of Articles,Payout per Article,Total Payout\n${invoiceNumber},${currentDate},${numArticles},${payoutPerArticle},${totalPayout.toFixed(2)}`
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', 'payout_data.csv')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    showToast("Exported to CSV successfully.")
  }

  // Export to PDF (Using jsPDF library)
  const exportToPDF = () => {
    // const { jsPDF } = require("jspdf");
    const doc = new jsPDF();

    doc.text("Payout Data", 10, 10);
    doc.text(`Invoice Number: ${invoiceNumber}`, 10, 20);
    doc.text(`Date: ${currentDate}`, 10, 30);
    doc.text(`Number of Articles: ${numArticles}`, 10, 40);
    doc.text(`Payout per Article: $${payoutPerArticle.toFixed(2)}`, 10, 50);
    doc.text(`Total Payout: $${totalPayout.toFixed(2)}`, 10, 60);

    doc.save("payout_data.pdf");
    showToast("Exported to PDF successfully.")
  }

  // Placeholder for Google Sheets export
  const exportToGoogleSheets = () => {
    showToast("Exported to Google Sheets (Dummy function).")
  }

  return (
    <div className="p-4">
      {/* Tab Navigation */}
      <div className="mb-4">
        <button
          className={`px-4 py-2 mr-2 ${activeTab === 'dashboard' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('dashboard')}
        >
          Dashboard
        </button>
        <button
          className={`px-4 py-2 ${activeTab === 'news-insights' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('news-insights')}
        >
          News Insights
        </button>
      </div>

      {/* Conditional rendering based on active tab */}
      {activeTab === 'dashboard' && (
        <div>
          <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Number of Articles</CardTitle>
                <CardDescription>Enter the number of articles</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="numArticles">Number of Articles</Label>
                  <Input
                    id="numArticles"
                    type="number"
                    value={numArticles}
                    onChange={handleNumArticlesChange}
                    min="0"
                    aria-describedby="numArticlesDescription"
                  />
                  <p id="numArticlesDescription" className="sr-only">
                    Enter the number of articles you have written
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Payout per Article</CardTitle>
                <CardDescription>Enter the payout per article</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="payoutPerArticle">Payout per Article ($)</Label>
                  <Input
                    id="payoutPerArticle"
                    type="number"
                    value={payoutPerArticle}
                    onChange={(e) => setPayoutPerArticle(parseFloat(e.target.value))}
                    min="0"
                    step="0.01"
                    aria-describedby="payoutPerArticleDescription"
                  />
                  <p id="payoutPerArticleDescription" className="sr-only">
                    Enter the payout amount per article in dollars
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Total Payout</CardTitle>
                <CardDescription>Based on articles and payout per article</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center gap-4">
                <p className="text-3xl font-bold" aria-live="polite" aria-atomic="true">
                  ${totalPayout.toFixed(2)}
                </p>
                <div className="flex gap-4 w-full max-w-xs">
                  <Button onClick={calculateTotalPayout} className="flex-1">
                    Calculate
                  </Button>

                  <Button
                    onClick={() => setShowExportOptions(!showExportOptions)}
                    className="flex-1 bg-gray-500 hover:bg-gray-700 text-white"
                  >
                    Save
                  </Button>
                  {showExportOptions && (
                    <div className="absolute bg-white shadow-lg rounded-md mt-2 p-2 space-y-2">
                      <Button onClick={exportToCSV} className="w-full bg-blue-500 hover:bg-blue-700">
                        Export to CSV
                      </Button>
                      <Button onClick={exportToPDF} className="w-full bg-red-500 hover:bg-red-700">
                        Export to PDF
                      </Button>
                      <Button onClick={exportToGoogleSheets} className="w-full bg-green-500 hover:bg-green-700">
                        Export to Google Sheets
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {activeTab === 'news-insights' && (
        <div className="flex min-h-svh items-center justify-center p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl">
            <ChartLine />
            <ChartBar />
            <ChartArea />
            <ChartPie />
          </div>
        </div>
      )}

      {/* Toast notification */}
      {isToastVisible && (
        <div className="fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded-lg shadow-lg">
          {message}
        </div>
      )}
    </div>
  )
}
