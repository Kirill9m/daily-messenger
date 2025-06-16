import { connectMongoDB } from '@/app/lib/mongodb';
import { checkAuth } from '@/app/lib/auth';
import { NextResponse } from 'next/server';
import '@/app/models/User';

export const GET = async () => {
  try {
    await connectMongoDB();
    const authenticatedUser = await checkAuth();

    if (!authenticatedUser) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.json(
      {
        name: authenticatedUser.name,
        email: authenticatedUser.email,
        role: authenticatedUser.role,
        savedData: authenticatedUser.savedData,

      },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: 'Error:', error: error.message },
        { status: 500 },
      );
    }
  }
};
