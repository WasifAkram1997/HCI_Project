import React, {useCallback, useMemo, useState, useEffect} from 'react'
import moment from 'moment'
import{
    Calendar,
    Views,
    DateLocalizer,
    momentLocalizer
} from 'react-big-calendar'
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Container } from 'reactstrap';
import { useLocation } from 'react-router-dom';
import EventLegend from './EventLegend';
import Toaster from './Toaster';

const mLocalizer = momentLocalizer(moment)


const CalendarTrial = ({localizer = mLocalizer, user = {user}, setUser={setUser} }) => {
    const location = useLocation();

    // const notifySuccess = () => toast.success('Session Booked Successfully',{
    //   autoClose: 1000,
    //   transition: Bounce,
    //   closeOnClick: true
    // });
    // const notifyCancel = () => toast.success('Session Canceled Successfully',{
    //   autoClose: 1000,
    //   transition: Bounce,
    //   closeOnClick: true
    // });

    // console.log(user.events)
  
    // Use URLSearchParams to parse the query params
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');
    // console.log(id)

    const [view, setView] = useState('month');
    const [date, setDate] = useState(new Date());
    const [events, setEvents] = useState([])
    const [showOnlineClasses, setShowOnlineClasses] = useState(false);
    const [showPersonalTrainingSession, setShowPersonalTrainingSessions] = useState(false);
    const [showAllSessions, setShowAllSessions] = useState(false);
    const [showBookedSessions, setShowBookedSessions] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState({});
    const [showModal, setShowModal] = useState(false)
    const [showBookingToast, setShowBookingToast] = useState(false)
    const [showCancelingToast, setShowCancelingToast] = useState(false)
    const { components, defaultDate, max, views } = useMemo(
        () => ({
        //   components: {
        //     timeSlotWrapper: ColoredDateCellWrapper,
        //   },
          defaultDate: new Date(),
        //   max: new Date(2035, 3, 31),
        //   views: Object.keys(Views).map((k) => Views[k]),
        views: ['month', 'week', 'day']
        }),
        []
      )


        useEffect(() => {
            
          fetch("http://localhost:5000/events") // Fetch data from JSON server
            .then((response) => response.json())
            .then((data) => {
               // Convert string dates to Date objects
                const eventsWithDates = data.map(event => ({
                    ...event,
                    start: new Date(event.start),
                    end: new Date(event.end),
            }));
          setEvents(eventsWithDates);
          if(id){
            const event = eventsWithDates.find(event => event.id == id);
            // console.log(event.title)
            setSelectedEvent(event)
            // handleSelectEvent(event)
            setShowModal(true)
        }
            })
            .catch((error) => console.error("Error fetching events:", error));

           
        }, []);
        // if(id){
        //     const event = events.find(event => event.id === id);
        //     setSelectedEvent(event)
        // }
       
      const onView = useCallback((newView) => setView(newView), [setView])
      const onNavigate = useCallback((newDate) => setDate(newDate), [setDate])
      const handleSelectEvent = (clickedEvent) => {
        setSelectedEvent(clickedEvent);
        setShowModal(true)
        // console.log(clickedEvent.title)
      }

    //   console.log(user)

      const toggleModal = () => {
        setShowModal(!showModal)
      };

      const handleConfirmation = async () => {
        try {
          // Check if the selected event is already in the user's events list
          const isEventAlreadyBooked = user.events.some(event => event.id === selectedEvent.id);
      
          if (isEventAlreadyBooked) {
            // If the event is already booked, show an alert and do not proceed
            // alert("This event has already been booked.");
            setShowModal(false); // Close the modal
            return; // Exit the function
          }
      
          // Proceed with adding the event if it's not already booked
          const updatedUser = {
            ...user,
            events: [...user.events, selectedEvent], // Add the selected event to the events array
          };
      
          const response = await fetch(`http://localhost:5000/users/${user.id}`, {
            method: 'PATCH',
            headers: {
              'Content-type': 'application/json',
            },
            body: JSON.stringify(updatedUser),
          });
      
          if (!response.ok) {
            throw new Error('Failed to update user events');
          }
      
          const updatedUserData = await response.json();
          setUser(updatedUserData); // Update the user state with the new data
          // alert("Event successfully added");
        } catch (error) {
          console.error('Error adding event', error);
          // alert("An error occurred while booking the event.");
        }
      
        setShowModal(false); // Close the modal after the action
      };
      
      
        const handleDeletion = async () => {
            try {
              // Check if the event is in the user's events array
              const eventIndex = user.events.findIndex(event => event.id === selectedEvent.id);
          
              // If event is not found, alert the user that the session was never booked
              if (eventIndex === -1) {
                // alert('This session was never booked!');
                setShowModal(false);
                return;
              }
          
              // Remove the event from the user's events array
              const updatedUser = {
                ...user,
                events: user.events.filter(event => event.id !== selectedEvent.id), // Filter out the canceled event
              };
          
              // Send PATCH request to update the user data
              const response = await fetch(`http://localhost:5000/users/${user.id}`, {
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedUser),
              });
          
              if (!response.ok) {
                throw new Error('Failed to update user events');
              }
          
              // Confirm the cancellation and update the user data
              const updatedUserData = await response.json();
              setUser(updatedUserData); // Update the user state with the modified user data
          
              // alert('Booking has been successfully canceled!');
            } catch (error) {
              console.error('Error canceling event:', error);
            } finally {
              setShowModal(false); // Close the modal after action
            }
          };
    
    //   const onNavigate = (newDate) => setDate(newDate)

    const filteredEvents = events.filter((event) => {
        if (showAllSessions) {
          return true;
        } else if (showOnlineClasses && event.type === "Online Fitness Class") {
          return true;
        } else if (showPersonalTrainingSession && event.type === "Personal Training") {
          return true;
        } else if (
          showBookedSessions &&
          user.events.some((userEvent) => userEvent.id === event.id)
        ) {
          return true;
        } else {
          return false;
        }
      });

    //   console.log(selectedEvent?.id)
      

       // Custom event styling based on event type
  const eventStyleGetter = (event) => {
    let backgroundColor = '';
    if(user.events.find((userEvent) => userEvent.id == event.id)){
      backgroundColor = "green"
    }else if (event.type === 'Online Fitness Class') {
      backgroundColor = 'orange';
    } else if (event.type === 'Personal Training') {
      backgroundColor = 'blue';
    }
    return {
      style: {
        backgroundColor,
        color: 'white', // Ensure text is readable
      },
    };
  };


    return(
      <Container>
        <div className="vh-100 my-4">
      <div className="h-75">
        <EventLegend />

        {/* Checkbox controls */}
        <div className='d-flex flex-row my-2 justify-content-between '>
          <label>
            <input
              type="checkbox"
              checked={showAllSessions}
              onChange={() => {
                if(showAllSessions){
                  setShowAllSessions(false)
                  setShowBookedSessions(false)
                  setShowOnlineClasses(false)
                  setShowPersonalTrainingSessions(false)
                }else{
                  setShowAllSessions(true)
                  setShowBookedSessions(true)
                  setShowOnlineClasses(true)
                  setShowPersonalTrainingSessions(true)
                }
              }}
            />
            Show All Events
          </label>
          <label>
            <input
              type="checkbox"
              checked={showBookedSessions}
              onChange={() => setShowBookedSessions(!showBookedSessions)}
            />
            Show Booked Sessions
          </label>
          <label>
            <input
              type="checkbox"
              checked={showOnlineClasses}
              onChange={() => setShowOnlineClasses(!showOnlineClasses)}
            />
            Show Online Fitness Classes
          </label>
          <label>
            <input
              type="checkbox"
              checked={showPersonalTrainingSession}
              onChange={() => setShowPersonalTrainingSessions(!showPersonalTrainingSession)}
            />
            Show Personal Training
          </label>
        </div>

        {/* Calendar component */}
        <Calendar
        //   defaultDate={date}
          date={date}
          localizer={localizer}
          views={views}
          view={view}
          onView={onView}
          onNavigate={onNavigate}
          events={filteredEvents}
          eventPropGetter={eventStyleGetter} // Apply custom styling to events
          toolbar = {true}
          onSelectEvent={handleSelectEvent}
        />
      </div>
      {/* Modal for displaying event details */}
      {selectedEvent && (
        <Modal isOpen={showModal} toggle={toggleModal}>
          <ModalHeader toggle={toggleModal}>
            {selectedEvent.title}
          </ModalHeader>
          <ModalBody>
            <p><strong>Start Time:</strong> {moment(selectedEvent.start).format('MMMM Do YYYY, h:mm:ss a')}</p>
            <p><strong>End Time:</strong> {moment(selectedEvent.end).format('MMMM Do YYYY, h:mm:ss a')}</p>
            <p><strong>Type:</strong> {selectedEvent.type}</p>
            {/* <p><strong>Username:</strong> {selectedEvent.resource.username}</p> */}
            {/* <p><strong>Score:</strong> {selectedEvent.resource.score}</p> */}
          </ModalBody>
          <ModalFooter>
            {/* <Button color="secondary" onClick={toggleModal}>Close</Button> */}
            {user.events.find((userEvent) => userEvent.id == selectedEvent.id) ? <Button color="danger" onClick={() => {
              handleDeletion();
              setShowCancelingToast(true)
              setTimeout(() => {
                setShowCancelingToast(false)
              },1000)
              // notifyCancel();
            }}>Cancel Booking</Button> : <Button color="success" onClick={() => {
              handleConfirmation()
              setShowBookingToast(true)
              setTimeout(() => {
                setShowBookingToast(false)
              }, 1000)
              // notifySuccess()
            }}>Book Session</Button>}
            
            
          </ModalFooter>
        </Modal>
      )}
      <ToastContainer />
    </div>
    {showBookingToast && <Toaster message="Booked Session" title="Booking Confirmation" />}
    {showCancelingToast && <Toaster message="Canceled Booking" title="Cancellation Confirmation" />}
    </Container>
    )
}

export default CalendarTrial;