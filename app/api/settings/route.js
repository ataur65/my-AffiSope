import { NextResponse } from 'next/server';
import axios from 'axios';

const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function GET(request) {
  try {
    const response = await axios.get(`${BACKEND_API_URL}/api/settings`);
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error in Next.js API route (GET /api/settings):', error);
    return NextResponse.json({ message: 'Failed to fetch settings' }, { status: error.response?.status || 500 });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const response = await axios.put(`${BACKEND_API_URL}/api/settings`, body);
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error in Next.js API route (PUT /api/settings):', error);
    return NextResponse.json({ message: 'Failed to update settings' }, { status: error.response?.status || 500 });
  }
}
