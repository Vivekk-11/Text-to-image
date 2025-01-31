"use server";

interface Props {
  runId: string;
  BearerToken: string;
}

export const fetchInterval = async ({ BearerToken, runId }: Props) => {
  while (true) {
    const res = await fetch(`https://api.comfydeploy.com/api/run/${runId}`, {
      headers: { Authorization: `Bearer ${BearerToken}` },
    });

    const json = await res.json();

    if (json.status === "success") return json || null;
    //   return json.outputs?.[0]?.data?.images?.[0]?.url ?? "";

    await new Promise((resolve) => setTimeout(resolve, 2000));
  }
};
