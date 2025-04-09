import React, {useState, useEffect} from 'react'
import {
    Accordion,
    AccordionBody,
    AccordionHeader,
    AccordionItem,
    Button,
    Container
    
} from 'reactstrap'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'

const EventsAccordion = ({user}) => {
    const [open, setOpen] = useState()
    const navigate = useNavigate()
    const [eventsList, setEventsList] = useState([])
    const toggle = (id) => {
        if(open == id){
            setOpen()
        }else{
            setOpen(id)
        }
    }

     // Fetch news from localhost:5000/news
      useEffect(() => {
        const fetchEvents = async () => {
          try {
            const response = await fetch('http://localhost:5000/events');
            const data = await response.json();
            setEventsList(data);
          } catch (error) {
            console.error('Error fetching news:', error);
          }
        };
    
        fetchEvents()
      }, []);

      const handleBook = () => {
        navigate(`/scheduler?id=${open}`)
      }

    return(
        <Container className = "my-4 rounded p-2">
            <h1>Upcoming Events</h1>
            <Accordion open={open} toggle={toggle}>
                {eventsList.map((event) => (
                    <AccordionItem key={event?.id}>
                        <AccordionHeader targetId={event?.id?.toString()}>
                            {event?.title}
                        </AccordionHeader>
                        <AccordionBody accordionId={event?.id.toString()}>
                            <p><strong>Start Time:</strong> {moment(event.start).format('MMMM Do YYYY, h:mm:ss a')}</p>
                            <p><strong>End Time:</strong> {moment(event.end).format('MMMM Do YYYY, h:mm:ss a')}</p>
                            <p><strong>Type:</strong> {event.type}</p>
                            {user?.events.find((userEvent) => userEvent?.id == event.id) ? <p className='fst-italic fs-6 fw-bold'>*This session has already been booked*</p> : <></>}
                            {user ? <div className='d-flex flex-row justify-end'>
                                {
                                    user?.events?.find((userEvent) => userEvent?.id == event?.id) ? 
                                    
                                    <Button color='danger' className='ml-2' onClick={handleBook}>Cancel Booking</Button>
                                     : <Button color='success'  onClick={handleBook}>Book Session</Button>
                                }
                                
                            </div> : <></>}
                            
                        </AccordionBody>
                    </AccordionItem>
                ))}
            </Accordion>
        </Container>
    )
}


export default EventsAccordion