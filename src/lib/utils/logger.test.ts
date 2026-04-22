import { sanitizeLogMessage } from "./logger";

describe("sanitizeLogMessage", () => {
  it("should return the original message if it does not contain sensitive data", () => {
    const safeMessage = "Error fetching dashboard summary: Network error";
    expect(sanitizeLogMessage(safeMessage)).toBe(safeMessage);
  });

  it("should redact JWTs", () => {
    const jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
    const message = `Error with token: ${jwt} in request`;
    expect(sanitizeLogMessage(message)).toBe("Error with token: [REDACTED_JWT] in request");
  });

  it("should redact generic Bearer tokens", () => {
    const message = "Request failed. Headers: Authorization: Bearer abcdef1234567890-xyz";
    expect(sanitizeLogMessage(message)).toBe("Request failed. Headers: Authorization: Bearer [REDACTED_TOKEN]");
  });

  it("should redact emails", () => {
    const message = "User jules@example.com failed to login";
    expect(sanitizeLogMessage(message)).toBe("User [REDACTED_EMAIL] failed to login");
  });

  it("should redact DNI/NIE", () => {
    const messageDNI = "Error processing user with document 12345678Z";
    expect(sanitizeLogMessage(messageDNI)).toBe("Error processing user with document [REDACTED_DNI_NIE]");

    const messageNIE = "Error processing user with document X1234567Z";
    expect(sanitizeLogMessage(messageNIE)).toBe("Error processing user with document [REDACTED_DNI_NIE]");
  });

  it("should redact credit cards", () => {
    const message = "Payment failed for card 1234-5678-9012-3456";
    expect(sanitizeLogMessage(message)).toBe("Payment failed for card [REDACTED_CREDIT_CARD]");
  });

  it("should redact credentials assignments", () => {
    const messageJson = `{"error": "Failed", "password": "mySecretPassword123!"}`;
    expect(sanitizeLogMessage(messageJson)).toBe(`{"error": "Failed", "password": "[REDACTED_CREDENTIAL]"}`);

    const messageUrl = `Connecting to db with secret=abc123xyz`;
    expect(sanitizeLogMessage(messageUrl)).toBe(`Connecting to db with secret=[REDACTED_CREDENTIAL]`);
  });

  it("should redact multiple types of sensitive data in the same string", () => {
    const message = "User jules@example.com with token Bearer abcdef123 and password=supersecret failed.";
    expect(sanitizeLogMessage(message)).toBe("User [REDACTED_EMAIL] with token Bearer [REDACTED_TOKEN] and password=[REDACTED_CREDENTIAL] failed.");
  });

});
