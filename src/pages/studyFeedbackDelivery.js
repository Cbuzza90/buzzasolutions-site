export const feedbackEmail = "chriswilliambuzza@gmail.com";
export const feedbackEndpoint = `https://formsubmit.co/ajax/${feedbackEmail}`;
export const feedbackTypes = ["Suggestion", "Test request", "Missing or incorrect test date", "Complaint or problem"];

export async function sendStudyFeedback(draft, fetchImpl = fetch) {
  const message = draft.message.trim();
  const course = draft.course.trim();
  if (!message || message.length > 2000 || course.length > 100 || !feedbackTypes.includes(draft.type)) {
    throw new Error("Check your feedback type and message before sending.");
  }
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15000);
  try {
    const response = await fetchImpl(feedbackEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      signal: controller.signal,
      body: JSON.stringify({
        _subject: `Aviation Study: ${draft.type}`,
        _template: "table",
        type: draft.type,
        course: course || "Not specified",
        message,
      }),
    });
    const data = await response.json();
    if (/activat|confirm.*email|verify.*email|check.*inbox/i.test(String(data?.message ?? ""))) {
      throw new Error("Feedback email setup is awaiting confirmation by the site owner. Your message is still here; please try again later.");
    }
    if (!response.ok || (data?.success !== true && data?.success !== "true")) {
      throw new Error("Feedback could not be submitted. Your message is still here; please try again.");
    }
  } finally { clearTimeout(timer); }
}
