// src/services/cloudFrontClient.ts
import { getSignedUrl } from "@aws-sdk/cloudfront-signer";
import { CLOUDFRONT_DOMAIN, CLOUDFRONT_KEY_PAIR_ID, CLOUDFRONT_PRIVATE_KEY } from "../config";

export function getSignedCloudFrontUrl(filename: string, expiresInSeconds = 3600) {
  const url = `https://${CLOUDFRONT_DOMAIN}/${filename}`;

  const signedUrl = getSignedUrl({
    url,
    keyPairId: CLOUDFRONT_KEY_PAIR_ID,
    privateKey: CLOUDFRONT_PRIVATE_KEY.replace(/\\n/g, '\n'), // Ensure correct formatting
    dateLessThan: new Date(Date.now() + expiresInSeconds * 1000).toISOString(),
  });

  return signedUrl;
}
