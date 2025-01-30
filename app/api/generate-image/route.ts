import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const prompt = body.prompt;
    const res = await fetch(
      "https://api.comfydeploy.com/api/run/deployment/queue",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.COMFY_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          deployment_id: process.env.COMFY_DEPLOYMENT_ID,
          inputs: {
            input_text: prompt,
          },
        }),
      }
    );

    const response = await res.json();
    const runId = response.run_id;

    if (!runId)
      return NextResponse.json({
        message: "Error generating Image",
        status: 500,
      });

    const fetchedImage = await waitForRunComplete({ runId });
    return NextResponse.json({ image: fetchedImage });
  } catch (err) {
    console.log("ERROR", err);
    return NextResponse.json({
      message: "Error generating Image",
      status: 500,
    });
  }
}

async function waitForRunComplete({
  runId,
}: {
  runId: string;
}): Promise<string> {
  while (true) {
    const res = await fetch(`https://api.comfydeploy.com/api/run/${runId}`, {
      headers: { Authorization: `Bearer ${process.env.COMFY_API_KEY}` },
    });

    const json = await res.json();

    if (json.status === "success")
      return json.outputs?.[0]?.data?.images?.[0]?.url ?? "";

    await new Promise((resolve) => setTimeout(resolve, 2000));
  }
}
