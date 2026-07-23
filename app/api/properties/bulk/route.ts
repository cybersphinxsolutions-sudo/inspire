import { NextRequest, NextResponse } from 'next/server';
import { connectDB, Property } from '@/lib/db';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'inspire_jwt_secret_key_2024';

function getUserFromToken(req: NextRequest) {
  const auth = req.headers.get('authorization');
  if (!auth) return null;
  const token = auth.replace('Bearer ', '');
  try {
    return jwt.verify(token, JWT_SECRET) as any;
  } catch {
    return null;
  }
}

// POST /api/properties/bulk — create multiple properties
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const user = getUserFromToken(req);
    const { properties } = await req.json();

    if (!Array.isArray(properties) || properties.length === 0) {
      return NextResponse.json({ success: false, message: 'Properties array is required' }, { status: 400 });
    }

    const created = await Property.insertMany(
      properties.map(p => ({ ...p, userId: user?.id || null }))
    );

    return NextResponse.json({
      success: true,
      message: `${created.length} properties created successfully`,
      properties: created,
    }, { status: 201 });
  } catch (error: any) {
    console.error('POST /api/properties/bulk error:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
