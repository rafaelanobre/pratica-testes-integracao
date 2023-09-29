export function conflictError(message?: string) {
  const errorMsg = message || "Conflict";
  return {
    message: errorMsg
  }
}