import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, acmMemberNumber, yearOfStudy, department } = body;

    // Validate required fields
    if (!name || !email || !acmMemberNumber || !yearOfStudy || !department) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Airtable API configuration
    const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
    const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
    const AIRTABLE_TABLE_NAME = process.env.AIRTABLE_TABLE_NAME || "Registrations";

    if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
      console.error("Airtable configuration missing");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    // Submit to Airtable
    const airtableResponse = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE_NAME)}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${AIRTABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          records: [
            {
              fields: {
                Name: name,
                Email: email,
                "ACM Member Number": acmMemberNumber,
                "Year Of Study": yearOfStudy,
                Department: department,
                "Submitted At": new Date().toISOString(),
              },
            },
          ],
        }),
      }
    );

    if (!airtableResponse.ok) {
      const errorData = await airtableResponse.json();
      console.error("Airtable error:", errorData);
      return NextResponse.json(
        { error: "Failed to submit registration" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Registration submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
