// Profile info for the current User
export interface Profile {
  // His/Her name in the app
  displayName: string
  // optional URL pointing to his/her profile photo
  photoURL: string | null
  // the earned credits for the user
  credits: number
  // last streak
  currentStreak: number
  // longest streak
  longestStreak: number
}
