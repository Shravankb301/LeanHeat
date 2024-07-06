"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Details() {
  const router = useRouter();
  const [websiteInfo, setWebsiteInfo] = useState<string | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const website = urlParams.get('website');
    if (website) {
      setWebsiteInfo(decodeURIComponent(website));
    }
  }, []);

  return (
    <div>
      <h1>Website Details</h1>
      {websiteInfo ? (
        <div>
          <p>Website: {websiteInfo}</p>
          {/* Render additional details here */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
