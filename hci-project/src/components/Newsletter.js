import EventsAccordion from "./EventsAccordion"
import NewsAccordion from "./NewsAccordion"

const Newsletter = ({user}) => {
    return(
        <>
            <NewsAccordion />
            <EventsAccordion user={user} />
        </>
    )
}

export default Newsletter