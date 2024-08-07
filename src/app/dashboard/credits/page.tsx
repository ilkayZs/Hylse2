'use client';
import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, CreditCard, Plus, Minus } from 'lucide-react';
import Link from 'next/link';

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
      if (!user) return;

      try {
        const response = await fetch('/api/credits');
        if (!response.ok) {
          throw new Error('Failed to fetch credits');
        }
        const data = await response.json();
        setCredits(data);
      } catch (err) {
        console.error('Error fetching credits:', err);
        setError('Failed to load credits. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCredits();
  }, [user]);

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

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className=" mx-auto p-4 w-full h-screen dark:bg-neutral-900 bg-neutral-50">
      <Card className="w-[600px] mx-auto">
        <CardHeader>
          <h2 className="text-2xl font-bold text-center">Your Credits</h2>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center space-x-2 mb-6">
            <CreditCard className="h-8 w-8 text-blue-500" />
            <span className="text-4xl font-bold">{credits?.amount ?? 0}</span>
          </div>
          <p className="text-center text-gray-600 mb-4">
          Our application is in beta. Credit usage is limited for now. You can support us via 
          <Link 
            href='https://www.buymeacoffee.com/hylse'
            target="_blank"
            rel="noreferrer"
             className="text-green-400 text-sm">
            You can support us on buymeacoffee.
            </Link>
           if you want.
          </p>
          
          <div className="grid grid-cols-1 gap-4">
            <Button onClick={handleBuyCredits} className="w-full">
              <Plus className="mr-2 h-4 w-4" /> Credit purchase will be added in the future.
            </Button>
           
          </div>
        </CardContent>
        <CardFooter className="text-center text-sm text-gray-500">
          Last updated: {credits?.lastUpdated ? new Date(credits.lastUpdated).toLocaleDateString() : 'N/A'}
        </CardFooter>
      </Card>
    </div>
  );
};

export default Credits;