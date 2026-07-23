import { NextResponse } from 'next/server';

// GET /api/properties/dropdown-data
export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      countries: ['United States'],
      states: {
        'United States': [
          'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
          'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho',
          'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
          'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
          'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada',
          'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
          'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon',
          'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
          'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington',
          'West Virginia', 'Wisconsin', 'Wyoming',
        ],
      },
      cities: {
        'United States': {
          'Alaska': ['Anchorage', 'Fairbanks', 'Juneau'],
          'Arizona': ['Phoenix', 'Tucson', 'Mesa', 'Scottsdale'],
          'California': ['Los Angeles', 'San Francisco', 'San Diego', 'Sacramento'],
          'New York': ['New York City', 'Buffalo', 'Rochester'],
          'Texas': ['Houston', 'Dallas', 'Austin', 'San Antonio'],
          'Washington': ['Seattle', 'Tacoma', 'Spokane'],
        },
      },
    },
  });
}
