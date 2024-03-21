'use server'

import {revalidateTag} from 'next/cache'
import {NextResponse} from "next/server";

export async function GET() {
	revalidateTag('collection')

	return NextResponse.json({
		status: 200,
		revalidated: true,
		now: Date.now(),
	})
}
