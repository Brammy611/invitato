/* ============================================================
   invitation.types.ts
   TypeScript interfaces for all invitation data structures.
   This is the single source of truth for data shapes used
   across all invitation features.
   ============================================================ */

/* ------------------------------------------------------------
   PERSON
   ------------------------------------------------------------ */

/** A person (groom or bride) featured in the invitation */
export interface Person {
  /** Full name with title/suffix, e.g. "Ricky Ravanelli, S.E." */
  fullName: string
  /** Short/display name used in headings, e.g. "Ricky" */
  displayName: string
  /** Role in the wedding */
  role: 'groom' | 'bride'
  /** Parent(s) attribution line */
  parents: {
    father: string
    mother: string
  }
  /** Social media handle (without @) */
  socialHandle?: string
  /** URL to profile/portrait photo */
  photoUrl?: string
  /** Short biography or personal note */
  bio?: string
}

/* ------------------------------------------------------------
   COUPLE
   ------------------------------------------------------------ */

/** Couple information shown in hero and couple sections */
export interface Couple {
  groom: Person
  bride: Person
  /** Romantic quote shown on hero/opening */
  quote: string
  /** Decorative tagline, e.g. "Better Together" */
  tagline?: string
  /** Hashtag, e.g. "#WeAreGettingMarried" */
  hashtag?: string
}

/* ------------------------------------------------------------
   DATE & TIME
   ------------------------------------------------------------ */

/** ISO 8601 date string, e.g. "2026-12-25" */
export type ISODate = string

/** ISO 8601 datetime string, e.g. "2026-12-25T10:00:00+07:00" */
export type ISODateTime = string

/* ------------------------------------------------------------
   WEDDING EVENTS
   ------------------------------------------------------------ */

/** A single event (akad / holy matrimony / reception) */
export interface WeddingEvent {
  /** Unique identifier, e.g. "akad" | "reception" */
  id: string
  /** Display name of the event */
  name: string
  /** Full date + time in ISO 8601 */
  datetime: ISODateTime
  /** Timezone label shown to guests, e.g. "WIB" */
  timezone: string
  /** Venue name */
  venue: string
  /** Icon filename (e.g., 'ring.svg') */
  icon?: string
  /** Street address */
  address: string
  /** City */
  city: string
  /** Google Maps URL */
  mapsUrl?: string
  /** Optional dress code instruction */
  dresscode?: string
  /** Additional notes for guests */
  notes?: string
}

/* ------------------------------------------------------------
   LOCATION
   ------------------------------------------------------------ */

/** Location/venue details — may overlap with WeddingEvent */
export interface Location {
  /** Section introduction text */
  introduction?: string
  /** Venue/hall name */
  venueName: string
  address: string
  city: string
  /** Google Maps embed URL or share URL */
  mapsUrl: string
  /** Local map image asset URL (e.g. /assets/images/location/map.png) */
  mapImage?: string
  /** Optional coordinates for custom map pin */
  coordinates?: {
    lat: number
    lng: number
  }
}

/* ------------------------------------------------------------
   STORY
   ------------------------------------------------------------ */

/** A single milestone in the couple's love story */
export interface StoryItem {
  /** Year or label, e.g. "2019" */
  year: string
  /** Story milestone title */
  title?: string
  /** Narrative text for this milestone */
  description: string
  /** Optional photo for this milestone */
  photoUrl?: string
}

/** The couple's love story timeline */
export interface Story {
  /** Section title, e.g. "Our Story" */
  heading: string
  /** Brief intro sentence */
  intro: string
  /** Ordered list of milestones */
  timeline: StoryItem[]
}

/* ------------------------------------------------------------
   GALLERY
   ------------------------------------------------------------ */

/** A single gallery image */
export interface GalleryImage {
  id: string
  /** URL to full-resolution image */
  src: string
  /** URL to thumbnail (optional, falls back to src) */
  thumbnail?: string
  alt: string
  /** Caption shown on hover or lightbox */
  caption?: string
}

/** Photo gallery section */
export interface Gallery {
  heading?: string
  images: GalleryImage[]
}

/* ------------------------------------------------------------
   VIDEO
   ------------------------------------------------------------ */

/** Media sections (Pre Wedding, Live Streaming) */
export interface MediaItem {
  title: string
  thumbnail: string
  youtubeUrl: string
}

export interface Media {
  preWedding?: MediaItem
  liveStreaming?: MediaItem
}

/* ------------------------------------------------------------
   MUSIC
   ------------------------------------------------------------ */

/** Background music configuration */
export interface Music {
  /** URL to audio file (.mp3) */
  src: string
  /** Song title displayed to guest */
  title: string
  /** Artist name */
  artist: string
  /** Auto-play on open (subject to browser policy) */
  autoplay: boolean
}

/* ------------------------------------------------------------
   RSVP
   ------------------------------------------------------------ */

/** RSVP attendance option */
export type RSVPAttendance = 'attending' | 'not_attending' | 'maybe'

/** A submitted RSVP entry */
export interface RSVPEntry {
  id?: string
  /** Guest name */
  name: string
  /** Number of attendees in the party */
  attendance: RSVPAttendance
  /** Number of seats (only relevant if attending) */
  numberOfGuests?: number
  /** Optional message to the couple */
  message?: string
  /** ISO datetime of submission */
  submittedAt?: ISODateTime
}

/** RSVP section configuration */
export interface RSVPSection {
  /** Deadline for RSVP in ISO date */
  deadline?: ISODate
  /** Maximum guest capacity (for capacity tracking) */
  capacity?: number
  /** Custom heading text */
  heading?: string
  /** Introductory description text */
  description?: string
}

/* ------------------------------------------------------------
   WISHES
   ------------------------------------------------------------ */

/** A single wish/message from a guest */
export interface Wish {
  id?: string
  /** Guest name */
  name: string
  /** The wish message */
  message: string
  /** ISO datetime of submission */
  submittedAt?: ISODateTime
}

/* ------------------------------------------------------------
   OPENING / CLOSING
   ------------------------------------------------------------ */

/** Opening section — shown before invitation is "opened" */
export interface Opening {
  /** Background photo URL (full-bleed portrait) */
  backgroundPhotoUrl?: string
  /** CTA label, e.g. "Open Invitation" */
  ctaLabel: string
}

/** Closing section — thank-you note at the bottom */
export interface Closing {
  /** Heading, e.g. "Thank You" */
  heading: string
  /** Thank-you body text */
  message: string
  /** Optional hashtag */
  hashtag?: string
  /** Background photo for closing section */
  backgroundImage?: string
  /** Optional decorative image along the bottom */
  decorationImage?: string
}

/* ------------------------------------------------------------
   ROOT INVITATION DATA
   ------------------------------------------------------------ */

/**
 * InvitationData — the single root object that contains
 * all content for a wedding invitation.
 * Exported from invitation.data.ts and consumed by
 * all section components.
 */
export interface InvitationData {
  couple: Couple
  weddingDate: ISODateTime
  eventIntro?: string
  events: WeddingEvent[]
  location: Location
  story: Story
  gallery: Gallery
  media?: Media
  music?: Music
  rsvp: RSVPSection
  opening: Opening
  closing: Closing
}
