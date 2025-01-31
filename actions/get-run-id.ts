"use server";

interface Props {
  BearerToken: string;
  body: string;
}

export const getRunId = async ({ BearerToken, body }: Props) => {
  try {
    const res = await fetch(
      "https://api.comfydeploy.com/api/run/deployment/queue",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${BearerToken}`,
          "Content-Type": "application/json",
        },
        body,
      }
    );

    const response = await res.json();
    const runId = response.run_id;
    return runId;
  } catch (error) {
    console.log("Error getting runID", error);
    return null;
  }
};
