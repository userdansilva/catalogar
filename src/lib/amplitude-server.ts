import { flush, init, track } from "@amplitude/analytics-node";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const amplitudeServer = init(process.env.AMPLITUDE_KEY!);

export async function trackServerEvent(
  eventName: string,
  userId: string,
  eventProperties?: Record<string, string>,
) {
  try {
    track(eventName, eventProperties, {
      user_id: userId,
    });

    await flush().promise;
  } catch (error) {
    console.error("Failed to track server event:", error);
  }
}
