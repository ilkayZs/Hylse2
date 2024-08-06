'use client';
import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, CreditCard, Plus, Minus, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface UserCredits {
  amount: number;
  lastUpdated: string;
}

const Credits: React.FC = () => {
  const { user } = useUser();
  const [credits, setCredits] = useState<UserCredits | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCredits = async () => {
      try {
        setError(null);
        const response = await fetch('/api/credits');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const text = await response.text();
        const data = text ? JSON.parse(text) : null;
        if (data) {
          setCredits(data);
        } else {
          throw new Error('No data received from the server');
        }
      } catch (e) {
        console.error('Error fetching credits:', e);
        setError(e instanceof Error ? e.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchCredits();
    }
  }, [user?.id]);

  const handleBuyCredits = () => {
    // TODO: Implement credit purchase logic
    console.log('Buying credits');
  };

  const handleUseCredits = () => {
    // TODO: Implement credit usage logic
    console.log('Using credits');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-md">
      <Card className="w-full">
        <CardHeader>
          <h2 className="text-2xl font-bold text-center">Your Credits</h2>
        </CardHeader>
        <CardContent>
          {error ? (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : (
            <>
              <div className="flex items-center justify-center space-x-2 mb-6">
                <CreditCard className="h-8 w-8 text-blue-500" />
                <span className="text-4xl font-bold">{credits?.amount ?? 0}</span>
              </div>
              <p className="text-center text-gray-600 mb-4">
                Use your credits to access premium features and content.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <Button onClick={handleBuyCredits} className="w-full">
                  <Plus className="mr-2 h-4 w-4" /> Buy Credits
                </Button>
                <Button onClick={handleUseCredits} variant="outline" className="w-full">
                  <Minus className="mr-2 h-4 w-4" /> Use Credits
                </Button>
              </div>
            </>
          )}
        </CardContent>
        {credits?.lastUpdated && (
          <CardFooter className="text-center text-sm text-gray-500">
            Last updated: {new Date(credits.lastUpdated).toLocaleDateString()}
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default Credits;