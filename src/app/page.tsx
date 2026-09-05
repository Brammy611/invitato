import RootLayout from './layout'
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
import Closing from '../features/invitation/components/Closing/Closing'
import { useInvitation } from '../features/invitation/hooks/useInvitation'
import { invitationData } from '../features/invitation/data/invitation.data'

export default function Page() {
  const { isOpen, isExiting, openInvitation } = useInvitation()
  const isScrollLocked = !isOpen && !isExiting

  return (
    <RootLayout>
      <InvitationLayout isScrollLocked={isScrollLocked}>

        {!isOpen && (
          <Opening
            data={{
              couple: invitationData.couple,
              opening: invitationData.opening,
            }}
            isExiting={isExiting}
            onOpen={openInvitation}
          />
        )}

        {isOpen && (
          <>
            <Hero
              data={{
                couple: invitationData.couple,
                weddingDate: invitationData.weddingDate,
              }}
            />
            <Couple data={{ couple: invitationData.couple }} />
            <Story
              data={{
                story: invitationData.story,
                couple: invitationData.couple,
              }}
            />
            <Countdown data={{ weddingDate: invitationData.weddingDate }} />
            <Event
              data={{
                events: invitationData.events,
                eventIntro: invitationData.eventIntro,
              }}
            />
            <Location data={{ location: invitationData.location }} />
            <Memories
              data={{
                gallery: invitationData.gallery,
                media: invitationData.media,
              }}
            />
            <RSVP data={{ rsvp: invitationData.rsvp }} />
            
            {/* Final Section */}
            <Closing
              data={{
                couple: invitationData.couple,
                closing: invitationData.closing
              }}
            />
          </>
        )}

      </InvitationLayout>
    </RootLayout>
  )
}
