// api/credits/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import { connect } from '@/db';
import User from '@/modals/user.modals';
import Credit from '@/modals/credit';

export async function GET(req: NextRequest) {
  const { userId } = getAuth(req);

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connect();

    const user = await User.findOne({ clerkId: userId }).populate('credits');

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    if (!user.credits) {
      // If no credit record exists, create one with 20 credits
      const newCredit = await Credit.create({
        userId: user._id,
        amount: 20,
        lastUpdated: new Date(),
      });

      user.credits = newCredit._id;
      await user.save();

      return NextResponse.json({
        amount: newCredit.amount,
        lastUpdated: newCredit.lastUpdated,
      });
    }

    return NextResponse.json({
      amount: user.credits.amount,
      lastUpdated: user.credits.lastUpdated,
    });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const { userId } = getAuth(req);

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connect();

    const user = await User.findOne({ clerkId: userId }).populate('credits');

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    if (!user.credits) {
      // If no credit record exists, create one with 20 credits
      const newCredit = await Credit.create({
        userId: user._id,
        amount: 20,
        lastUpdated: new Date(),
      });

      user.credits = newCredit._id;
      await user.save();

      return NextResponse.json({
        amount: newCredit.amount,
        lastUpdated: newCredit.lastUpdated,
      });
    }

    // Reduce credits by 1
    user.credits.amount -= 1;
    user.credits.lastUpdated = new Date();
    await user.credits.save();

    return NextResponse.json({
      amount: user.credits.amount,
      lastUpdated: user.credits.lastUpdated,
    });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
