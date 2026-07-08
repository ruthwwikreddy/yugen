export function friendlyFirebaseError(err: unknown): string {
  const code = typeof err === 'object' && err !== null && 'code' in err ? String((err as { code: string }).code) : ''
  const message = err instanceof Error ? err.message : String(err)

  if (code === 'permission-denied' || message.includes('PERMISSION_DENIED')) {
    if (message.includes('Firestore API has not been used') || message.includes('it is disabled')) {
      return 'Firestore is not enabled yet on your Firebase project. Registration saved locally — enable Firestore in the Firebase console, then redeploy rules.'
    }
    return 'Firestore permission denied. Check your security rules allow writes to the registrations collection.'
  }
  if (code === 'unavailable' || message.includes('offline')) {
    return 'Could not reach Firebase. Your registration was saved locally and will sync when connection returns.'
  }
  if (code === 'failed-precondition' || message.includes('index')) {
    return 'Firestore index missing — admin list may be limited, but your registration was saved.'
  }
  if (message.includes('Firebase is not configured')) {
    return 'Firebase is not configured. Check your VITE_FIREBASE_* environment variables.'
  }
  return message || 'Something went wrong saving your registration.'
}

export function isFirestoreDisabledError(err: unknown): boolean {
  const message = err instanceof Error ? err.message : String(err)
  return message.includes('Firestore API has not been used') || message.includes('it is disabled')
}
