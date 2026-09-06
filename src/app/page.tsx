import { useCallback, useRef } from 'react'
import RootLayout from './layout'
import Reveal from '../components/animation/Reveal'
import BackgroundMusic, {
  DEFAULT_MUSIC_SRC,
  type BackgroundMusicHandle,
} from '../components/common/BackgroundMusic'
import InvitationLayout from '../features/invitation/components/InvitationLayout/InvitationLayout'
import Opening from '../features/invitation/components/Opening/Opening'
import Hero from '../features/invitation/components/Hero/Hero'
import Couple from '../features/invitation/components/Couple/Couple'
import Story from '../features/invitation/components/Story/Story'
import Countdown from '../features/invitation/components/Countdown/Countdown'
import Event from '../features/invitation/components/Event/Event'
import Location from '../features/invitation/components/Location/Location'
import Memories from '../features/invitation/components/Memories/Memories'
import RSVP from '../features/invitation/components/RSVP/RSVP'
import Wishes from '../features/invitation/components/Wishes/Wishes'
import Closing from '../features/invitation/components/Closing/Closing'
import { useInvitation } from '../features/invitation/hooks/useInvitation'
import { invitationData } from '../features/invitation/data/invitation.data'

export default function Page() {
  const { isOpen, isExiting, openInvitation } = useInvitation()
  const musicRef = useRef<BackgroundMusicHandle>(null)
  const isScrollLocked = !isOpen && !isExiting

  const handleOpenInvitation = useCallback(() => {
    void musicRef.current?.start()
    openInvitation()
  }, [openInvitation])

  return (
    <RootLayout>
      <BackgroundMusic ref={musicRef} src={invitationData.music?.src || DEFAULT_MUSIC_SRC} />
      <InvitationLayout isScrollLocked={isScrollLocked}>

        {!isOpen && (
          <Opening
            data={{
              couple: invitationData.couple,
              opening: invitationData.opening,
            }}
            isExiting={isExiting}
            onOpen={handleOpenInvitation}
          />
        )}

        {isOpen && (
          <>
            <Reveal duration={1000}>
              <Hero
                data={{
                  couple: invitationData.couple,
                  weddingDate: invitationData.weddingDate,
                }}
              />
            </Reveal>
            <Reveal delay={90}><Couple data={{ couple: invitationData.couple }} /></Reveal>
            <Reveal delay={120} variant="fade-right">
              <Story
                data={{
                  story: invitationData.story,
                  couple: invitationData.couple,
                }}
              />
            </Reveal>
            <Reveal delay={90} variant="fade">
              <Countdown data={{ weddingDate: invitationData.weddingDate }} />
            </Reveal>
            <Reveal delay={90}><Event
              data={{
                events: invitationData.events,
                eventIntro: invitationData.eventIntro,
              }}
            /></Reveal>
            <Reveal delay={90} variant="fade-left"><Location data={{ location: invitationData.location }} /></Reveal>
            <Reveal delay={120}><Memories
              data={{
                gallery: invitationData.gallery,
                media: invitationData.media,
              }}
            /></Reveal>
            <Reveal delay={90}><RSVP data={{ rsvp: invitationData.rsvp }} /></Reveal>

            {/* Wishes — Kind Words */}
            <Reveal delay={90}><Wishes data={{ wishes: invitationData.wishes }} /></Reveal>
            
            {/* Final Section */}
            <Reveal variant="fade" duration={1100}>
              <Closing
                data={{
                  couple: invitationData.couple,
                  closing: invitationData.closing
                }}
              />
            </Reveal>
          </>
        )}

      </InvitationLayout>
    </RootLayout>
  )
}
