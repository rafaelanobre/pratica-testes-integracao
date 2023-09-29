export function notFoundError(message?: string) {
  const errorMsg = message || "Not Found";
  return {
    message: errorMsg
  }
}