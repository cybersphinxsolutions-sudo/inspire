import { NextRequest, NextResponse } from 'next/server';
import { connectDB, Inspection } from '@/lib/db';
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

// GET /api/inspections/progress — get inspection progress
export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const user = getUserFromToken(req);

    const { searchParams } = new URL(req.url);
    const propertyId = searchParams.get('property_id') || searchParams.get('propertyId');

    const filter: any = {};
    if (user?.id) {
      filter.inspectorId = user.id;
    }
    if (propertyId) {
      filter.propertyId = propertyId;
    }

    const progress = await Inspection.find(filter)
      .select('propertyId inspectionType unitId buildingId status inspectionData data')
      .lean();

    return NextResponse.json({ success: true, progress });
  } catch (error: any) {
    console.error('GET /api/inspections/progress error:', error);
    return NextResponse.json({ success: true, progress: [] });
  }
}
