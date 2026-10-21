export const feedbackEmail = "chriswilliambuzza@gmail.com";
export const feedbackEndpoint = `https://formsubmit.co/ajax/${feedbackEmail}`;
export const feedbackTypes = ["Suggestion", "Test request", "Missing or incorrect test date", "Complaint or problem"];
export const feedbackImageTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
export function validateFeedbackImage(image) {
  if (!image) return;
  if (!feedbackImageTypes.includes(image.type)) throw new Error("Choose a JPG, PNG, WebP or GIF image.");
  if (!image.size || image.size > 10_000_000) throw new Error("Choose an image smaller than 10 MB.");
}

export async function sendStudyFeedback(draft, fetchImpl = fetch) {
  const message = draft.message.trim();
  const course = draft.course.trim();
  if (!message || message.length > 2000 || course.length > 100 || !feedbackTypes.includes(draft.type)) {
    throw new Error("Check your feedback type and message before sending.");
  }
  validateFeedbackImage(draft.image);
  const body = new FormData();
  for (const [key, value] of Object.entries({
    _subject: `Aviation Study: ${draft.type}`, _template: "table",
    type: draft.type, course: course || "Not specified", message,
  })) body.append(key, value);
  if (draft.image) body.append("attachment", draft.image, draft.image.name);
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15000);
  try {
    const response = await fetchImpl(feedbackEndpoint, {
      method: "POST",
      headers: { Accept: "application/json" },
      signal: controller.signal,
      body,
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
