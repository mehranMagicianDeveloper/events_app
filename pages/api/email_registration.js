import fs from "fs";
import path from "path";

function buildPath() {
  return path.join(process.cwd(), "data", "data.json");
}

function extractData(filePath) {
  const jsonData = fs.readFileSync(filePath);
  const data = JSON.parse(jsonData);
  return data;
}

export default function handler(req, res) {
  const { method } = req;

  const filePath = buildPath();
  const { events_categories, allEvents } = extractData(filePath);

  if (!allEvents) {
    res.status(404).json({
      message: "Events data is not found",
    });
  }

  if (method === "POST") {
    const { email, eventId } = req.body;

    const newAllEvents = allEvents.map((event) => {
      if (event.id === eventId) {
        if (event.emails_registered.includes(email)) {
          res.status(409).json({ message: "This email is already registered" });
          return event;
        }
        return {
          ...event,
          emails_registered: [...event.emails_registered, email],
        };
      }
      return event;
    });

    fs.writeFileSync(
      filePath,
      JSON.stringify({ events_categories, allEvents: newAllEvents })
    );

    res.status(200).json({
      message: `You have been registered successfully with the email:${email} and event:${eventId}`,
    });
  }
}
