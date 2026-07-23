import { NextRequest, NextResponse } from 'next/server';
import { connectDB, Property } from '@/lib/db';

// GET /api/properties/[id]
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const { id } = params;

    let property = null;
    // Try by Mongo _id first, then by propertyId
    try {
      property = await Property.findById(id).lean();
    } catch {}
    if (!property) {
      property = await Property.findOne({ propertyId: id }).lean();
    }

    if (!property) {
      return NextResponse.json({ success: false, message: 'Property not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, property });
  } catch (error: any) {
    console.error('GET /api/properties/[id] error:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// PUT /api/properties/[id]
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const { id } = params;
    const body = await req.json();

    let property = null;
    try {
      property = await Property.findByIdAndUpdate(id, { ...body, updatedAt: new Date() }, { new: true }).lean();
    } catch {}
    if (!property) {
      property = await Property.findOneAndUpdate({ propertyId: id }, { ...body, updatedAt: new Date() }, { new: true }).lean();
    }

    if (!property) {
      return NextResponse.json({ success: false, message: 'Property not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Property updated successfully', property });
  } catch (error: any) {
    console.error('PUT /api/properties/[id] error:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// DELETE /api/properties/[id]
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const { id } = params;

    let result = null;
    try {
      result = await Property.findByIdAndDelete(id);
    } catch {}
    if (!result) {
      result = await Property.findOneAndDelete({ propertyId: id });
    }

    return NextResponse.json({ success: true, message: 'Property deleted successfully' });
  } catch (error: any) {
    console.error('DELETE /api/properties/[id] error:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
