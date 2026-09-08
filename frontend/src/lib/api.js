export async function predictCalories(payload) {
  const response = await fetch("/api/predict", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Prediction failed");
  }

  return response.json();
}
