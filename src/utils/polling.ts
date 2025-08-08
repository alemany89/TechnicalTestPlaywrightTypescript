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
  maxRetries: number = 10,
  delayMs: number = 1000
): Promise<APIResponse> => {
  let response: APIResponse | undefined;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      response = await requestFn();
      const status = response.status();

      if (status === 200) {
        return response;
      }

      console.warn(
        `Attempt ${attempt}/${maxRetries}: Received status ${status}. Retrying in ${delayMs}ms...`
      );
    } catch (err) {
      console.error(
        `Attempt ${attempt}/${maxRetries} failed with error: ${err}`
      );
    }

    await new Promise((resolve) => setTimeout(resolve, delayMs));
  }

  throw new Error(`Failed after ${maxRetries} retries.`);
};

/**
 * Retries an HTTP request function until it returns a specific status or the max retry limit is reached.
 *
 * @param requestFn - A function that returns a Promise with an API response (e.g., GET request).
 * @param expectedStatus - The expected status to match.
 * @param maxRetries - Maximum number of retry attempts. Default is 5.
 * @param delayMs - Delay in milliseconds between retries. Default is 1000ms.
 * @returns The APIResponse with the expected status.
 * @throws Error if the response never matches the expected status within the retry limit.
 */
export const pollUntilStatus = async (
  requestFn: () => Promise<APIResponse>,
  expectedStatus: string,
  maxRetries: number = 5,
  delayMs: number = 1000
): Promise<APIResponse> => {
  let response: APIResponse | undefined;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      response = await requestFn();
      const { status } = await response.json();

      if (status === expectedStatus) {
        return response;
      }

      console.warn(
        `Attempt ${attempt}/${maxRetries}: Received status ${status}. Expected ${expectedStatus}. Retrying in ${delayMs}ms...`
      );
    } catch (err) {
      console.error(
        `Attempt ${attempt}/${maxRetries} failed with error: ${err}`
      );
    }

    await new Promise((resolve) => setTimeout(resolve, delayMs));
  }

  throw new Error(`Failed after ${maxRetries} retries.`);
};
