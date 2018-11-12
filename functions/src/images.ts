// Firebase dependencies
import * as admin from "firebase-admin"
import * as functions from "firebase-functions"

// tools
import { spawn } from "ts-process-promises"
import * as tmp from "tmp-promise"

// regexp to identify images
const profileImageRegexp = /^users\/[a-zA-Z0-9]+\/profile.jpg$/ // match "image/jpeg", "image/png" etc.
// profile image expected size in pixels
const profileImageWidth = 350

//
// Resize the profile image to thex expected size
//
export const resizeProfileImage = functions.storage
  .object()
  .onFinalize(async ({ name }) => {
    // check it's the profile image
    if (!name || !profileImageRegexp.test(name)) {
      return
    }

    // (step 0): we prepare a temp file
    const { path: tempFile, cleanup } = await tmp.file({
      template: "profile-XXXXXXXX.jpg",
    })

    // step 1: download the uploaded file into the temp file
    const bucket = admin.storage().bucket()
    await bucket.file(name).download({ destination: tempFile })

    try {
      // step 2: we run ImageMagick to resize the thumbnail
      await spawn("convert", [
        tempFile,
        "-resize",
        `${profileImageWidth}x${profileImageWidth}`,
        tempFile,
      ])

      // step 3: we re-upload the resized version
      const defaultBucket = admin.storage().bucket()
      await defaultBucket.upload(tempFile, {
        destination: name,
        metadata: { contentType: "image/jpeg" },
      })
    } finally {
      // step 4: delete temp
      cleanup()
    }
  })
