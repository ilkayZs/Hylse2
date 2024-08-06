import { NextApiRequest, NextApiResponse } from 'next';
import { getAuth } from '@clerk/nextjs/server';
import { connect } from '@/db';
import User from '@/modals/user.modals';
import Credit from '@/modals/credit';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    await connect();

    const user = await User.findOne({ clerkId: userId }).populate('credits');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!user.credits) {
      // If no credit record exists, create one with 20 credits
      const newCredit = await Credit.create({
        userId: user._id,
        amount: 20,
        lastUpdated: new Date()
      });

      user.credits = newCredit._id;
      await user.save();

      return res.status(200).json({ 
        amount: newCredit.amount, 
        lastUpdated: newCredit.lastUpdated 
      });
    }

    res.status(200).json({ 
      amount: user.credits.amount, 
      lastUpdated: user.credits.lastUpdated 
    });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}