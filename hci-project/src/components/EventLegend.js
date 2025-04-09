// Legend Component
const EventLegend = () => {
    return (
      <div style={{ marginBottom: '20px', fontSize: '16px' }}>
        <h4>Event Legend</h4>
        <div>
          <span className="rounded" style={{ backgroundColor: 'green', color: 'white', padding: '5px 10px', marginRight: '10px' }}>Booked Session</span>
          <span className="rounded" style={{ backgroundColor: 'orange', color: 'white', padding: '5px 10px', marginRight: '10px' }}>Online Fitness Class</span>
          <span className="rounded" style={{ backgroundColor: 'blue', color: 'white', padding: '5px 10px', marginRight: '10px' }}>Personal Training</span>
        </div>
      </div>
    );
  };

  export default EventLegend