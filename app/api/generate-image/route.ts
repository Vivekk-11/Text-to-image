// import { fetchInterval } from "@/actions/fetch-interval";
import { getRunId } from "@/actions/get-run-id";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const prompt = body.prompt;
    const BearerToken = process.env.NEXT_PUBLIC_COMFY_API_KEY!;

    const runId = await getRunId({
      body: JSON.stringify({
        deployment_id: process.env.COMFY_DEPLOYMENT_ID,
        inputs: {
          input_text: prompt,
        },
      }),
      BearerToken,
    });

    if (!runId)
      return NextResponse.json({
        message: "Error generating Image",
        status: 500,
      });

    return NextResponse.json({ runId });
    // const fetchedResponse = await fetchInterval({
    //   runId,
    //   BearerToken,
    // });

    // if (!fetchedResponse)
    //   return NextResponse.json({
    //     message: "Error generating Image",
    //     status: 500,
    //   });

    // const image = fetchedResponse.outputs?.[0]?.data?.images?.[0]?.url;

    // return NextResponse.json({ image });
  } catch (err) {
    console.log("ERROR", err);
    return NextResponse.json({
      message: "Error generating Image",
      status: 500,
    });
  }
}
