/* ============================================================
   invitation.data.ts
   Centralized invitation content — single source of truth.

   All section components read from this object.
   Replace placeholder values with real content when available.
   ============================================================ */

import type { InvitationData } from '../types/invitation.types'

export const invitationData: InvitationData = {
  /* ----------------------------------------------------------
     COUPLE
     ---------------------------------------------------------- */
  couple: {
    groom: {
      fullName: 'Ricky Ravanelli, S.E.',
      displayName: 'Ricky',
      role: 'groom',
      parents: {
        father: 'Mr. Parent Man',
        mother: 'Mrs. Parent Lady',
      },
      socialHandle: 'groomricky',
      photoUrl: '',
      bio: '',
    },
    bride: {
      fullName: 'Fellycia Santoso',
      displayName: 'Fellycia',
      role: 'bride',
      parents: {
        father: 'Mr. Bride Father',
        mother: 'Mrs. Bride Mother',
      },
      socialHandle: 'bridefelly',
      photoUrl: '',
      bio: '',
    },
    quote:
      '"I was sound asleep, but in my dreams I was wide awake. Oh, listen! It\'s the sound of my lover knocking, calling!"',
    tagline: 'Better Together',
    hashtag: '#WeAreGettingMarried',
  },

  /* ----------------------------------------------------------
     WEDDING DATE
     Main ceremony date used for countdown timer.
     ---------------------------------------------------------- */
  weddingDate: '2027-01-01T10:00:00+07:00',

  /* ----------------------------------------------------------
     EVENTS
     ---------------------------------------------------------- */
  eventIntro: 'With joyful hearts and the grace of God, we invite you to celebrate our wedding day.',
  events: [
    {
      id: 'akad',
      name: 'Holy Matrimony',
      datetime: '2030-12-26T11:00:00+07:00',
      timezone: 'WIB',
      venue: 'GBT Kristus Alfa Omega Puri Anjaumoro',
      address: 'Jalan Pari Anjatmoro No 10 Blok J1.',
      city: 'Semarang',
      mapsUrl: 'https://maps.google.com',
      dresscode: 'Formal — Sage Green & White',
      notes: '',
      icon: 'ring.svg',
    },
    {
      id: 'reception',
      name: 'Wedding Reception',
      datetime: '2030-12-26T13:00:00+07:00',
      timezone: 'WIB',
      venue: 'MAC Ballroom',
      address: 'Jalan Majapahit No 168,',
      city: 'Gayamsari, Kota Semarang',
      mapsUrl: 'https://maps.google.com',
      dresscode: 'Formal — Sage Green & White',
      notes: '',
      icon: 'cocktailcup.svg',
    },
  ],

  /* ----------------------------------------------------------
     LOCATION
     ---------------------------------------------------------- */
  location: {
    introduction: 'We would be delighted to celebrate this special moment with you',
    venueName: 'GBT Kristus Alfa Omega Puri Anjaumoro',
    address: 'Jalan Pari Anjatmoro No 10 Blok J1.',
    city: 'Semarang',
    mapsUrl: 'https://maps.app.goo.gl/o1H432x5e6T2m8TFA', // Example placeholder URL
    mapImage: '', // Placeholder for map asset
    coordinates: {
      lat: -6.9666,
      lng: 110.3938,
    },
  },

  /* ----------------------------------------------------------
     STORY
     ---------------------------------------------------------- */
  story: {
    heading: 'Our Story',
    intro:
      'From a chance meeting to a journey of love, laughter, and everything in between.',
    timeline: [
      {
        year: '2019',
        title: 'First Meeting',
        description:
          'Lorem ipsum dercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        photoUrl: '',
      },
      {
        year: '2020',
        title: 'Growing Together',
        description:
          'Lorem ipsum dercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        photoUrl: '',
      },
      {
        year: '2022',
        title: 'The Proposal',
        description:
          'Lorem ipsum dercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        photoUrl: '',
      },
    ],
  },

  /* ----------------------------------------------------------
     GALLERY
     ---------------------------------------------------------- */
  gallery: {
    heading: 'A Portrait of Us',
    description: 'A collection of moments we will always remember.',
    images: [
      {
        id: 'gallery-1',
        src: '/assets/images/gallery/10.png',
        alt: 'Portrait 1',
      },
      {
        id: 'gallery-2',
        src: '/assets/images/gallery/7.png',
        alt: 'Portrait 2',
      },
      {
        id: 'gallery-3',
        src: '/assets/images/gallery/8.png',
        alt: 'Portrait 3',
      },
      {
        id: 'gallery-4',
        src: '/assets/images/gallery/9.png',
        alt: 'Portrait 4',
      },
    ],
  },

  /* ----------------------------------------------------------
     MEDIA (Pre-wedding & Live Streaming)
     ---------------------------------------------------------- */
  media: {
    preWedding: {
      title: 'Pre Wedding',
      thumbnail: '/assets/images/gallery/background.jpg', // Placeholder
      youtubeUrl: 'https://youtube.com', // Placeholder
    },
    liveStreaming: {
      title: 'Live Streaming',
      thumbnail: '/assets/images/gallery/background.jpg', // Placeholder
      youtubeUrl: 'https://youtube.com', // Placeholder
    },
  },

  /* ----------------------------------------------------------
     MUSIC (optional)
     ---------------------------------------------------------- */
  music: {
    src: '/audio/background-music.mp3',
    title: 'Beautiful in White',
    artist: 'Westlife',
    autoplay: true,
  },

  /* ----------------------------------------------------------
     RSVP
     ---------------------------------------------------------- */
  rsvp: {
    heading: 'RSVP',
    description: 'We love to hear from you! Please confirm your attendance below.',
    deadline: '2026-12-15',
    capacity: 200,
  },

  /* ----------------------------------------------------------
     WISHES
     ---------------------------------------------------------- */
  wishes: {
    heading: 'KIND WORDS',
    description: 'Your kind words mean so much to us. Please leave us a message.',
  },

  /* ----------------------------------------------------------
     OPENING
     ---------------------------------------------------------- */
  opening: {
    backgroundPhotoUrl: '/assets/images/hero/opening.png',
    ctaLabel: 'Open Invitation',
  },

  /* ----------------------------------------------------------
     CLOSING
     ---------------------------------------------------------- */
  closing: {
    heading: 'THANK YOU,',
    message: '', // not strictly needed by the new design but kept for safety
    hashtag: '#RickyFellinlove',
    backgroundImage: '/assets/images/gallery/1.png',
    decorationImage: '/assets/images/icons/leftDecoration.png'
  },
}
