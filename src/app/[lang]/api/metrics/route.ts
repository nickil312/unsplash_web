import { NextResponse } from 'next/server';
import {register} from "@/app/instrumentation";

export async function GET() {
    // await register()
    const metrics = await globalThis?.metrics?.registry.metrics();
    return new NextResponse(metrics, {
        headers: {
            'Content-Type': 'text/plain',
        },
    });
}