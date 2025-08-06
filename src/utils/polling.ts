import { APIResponse } from "@playwright/test";

/**
 * Retries an HTTP request function until it returns a 200 OK response or the max retry limit is reached.
 *
 * @param requestFn - A function that returns a Promise with an API response (e.g., GET request).
 * @param maxRetries - Maximum number of retry attempts. Default is 5.
 * @param delayMs - Delay in milliseconds between retries. Default is 1000ms.
 * @returns The APIResponse with status 200.
 * @throws Error if the response never returns a 200 status within the retry limit.
 */
export const pollUntilOk = async (
  requestFn: () => Promise<APIResponse>,
  maxRetries: number = 5,
  delayMs: number = 1000
): Promise<APIResponse> => {
  let lastResponse: APIResponse | undefined;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      lastResponse = await requestFn();
      const status = lastResponse.status();

      if (status === 200) {
        return lastResponse;
      }

      console.warn(
        `Attempt ${attempt}/${maxRetries}: Received status ${status}. Retrying in ${delayMs}ms...`
      );
    } catch (err) {
      console.error(
        `Attempt ${attempt}/${maxRetries} failed with error: ${err}`
      );
    }

    await new Promise((res) => setTimeout(res, delayMs));
  }

  throw new Error(`Failed after ${maxRetries} retries.`);
};

export const pollUntilStatus = async (
  requestFn: () => Promise<APIResponse>,
  expectedStatus: string,
  maxRetries: number = 5,
  delayMs: number = 1000
): Promise<APIResponse> => {
  let lastResponse: APIResponse | undefined;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      lastResponse = await requestFn();
      const { status } = await lastResponse.json();

      if (status === expectedStatus) {
        return lastResponse;
      }

      console.warn(
        `Attempt ${attempt}/${maxRetries}: Received status ${status}. Expected ${expectedStatus}. Retrying in ${delayMs}ms...`
      );
    } catch (err) {
      console.error(
        `Attempt ${attempt}/${maxRetries} failed with error: ${err}`
      );
    }

    await new Promise((res) => setTimeout(res, delayMs));
  }

  throw new Error(
    `Failed after ${maxRetries} retries.`
  );
};
