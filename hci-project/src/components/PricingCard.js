import React from 'react';

const PricingCard = () => {
  return (
    <div className='vh-100 container'>
    <h1 className='text-center my-5'>Available plans</h1>
    <div className="container d-flex justify-content-center align-items-center">
      <div className="row w-100 justify-content-around">
        {/* Biweekly Pricing Card */}
        <div className="col-12 col-md-3 pricing-card p-3 text-center bg-light rounded shadow-sm">
          <h3 className="mb-3">Biweekly</h3>
          <p className="price display-4 text-primary font-weight-bold">$25</p>
          <span className="duration text-muted">Every 2 weeks</span>
          <ul className="text-left mt-3">
            <li>Access to gym facilities</li>
            <li>1 Fitness Class per week</li>
            <li>Basic Locker Room Access</li>
            <li>Limited Personal Training Session</li>
          </ul>
        </div>

        {/* Monthly Pricing Card */}
        <div className="col-12 col-md-3 pricing-card p-3 text-center bg-light rounded shadow-sm">
          <h3 className="mb-3">Monthly</h3>
          <p className="price display-4 text-primary font-weight-bold">$40</p>
          <span className="duration text-muted">Per month</span>
          <ul className="text-left mt-3">
            <li>Access to gym facilities</li>
            <li>3 Fitness Classes per week</li>
            <li>Full Locker Room Access</li>
            <li>1 Personal Training Session per month</li>
            <li>Discount on Merchandise</li>
          </ul>
        </div>

        {/* Yearly Pricing Card */}
        <div className="col-12 col-md-3 pricing-card p-3 text-center bg-light rounded shadow-sm">
          <h3 className="mb-3">Yearly</h3>
          <p className="price display-4 text-primary font-weight-bold">$420</p>
          <span className="duration text-muted">Per year</span>
          <ul className="text-left mt-3">
            <li>Access to gym facilities</li>
            <li>Unlimited Fitness Classes</li>
            <li>Premium Locker Room Access</li>
            <li>2 Personal Training Sessions per month</li>
            <li>Free Merchandise</li>
            <li>Exclusive Member Events</li>
            <li>Priority Booking for Classes</li>
          </ul>
        </div>
      </div>
    </div>
    </div>
  );
};

export default PricingCard;
