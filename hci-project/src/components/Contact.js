const Contact = () => {
    return (
        <div className="container mt-5">
      <div className="row">
        {/* Contact Section */}
        <div className="col-md-4">
          <div className="card p-3">
            <h2 className="text-danger">Contact</h2>
            <p>
              <strong>Phone:</strong> 514-848-2424 ext. 3860
            </p>
            <p>
              <strong>Email:</strong> <a href="mailto:legym@concordia.ca">legym@concordia.ca</a>
            </p>
            <p>
              <a href="/staff-contact" className="text-danger">Staff contact list</a>
            </p>
          </div>
        </div>

        {/* Location Section */}
        <div className="col-md-4">
          <div className="card p-3">
            <h2 className="text-danger">Location</h2>
            <p>
              <strong>Le Gym</strong><br />
              EV-S2-206 (See Map)
            </p>
            <p>
              Concordia Engineering & Visual Arts Building<br />
              1515 Ste. Catherine St. W, Montreal, Quebec, H3G 2W1
            </p>
          </div>
        </div>

        {/* Hours Section */}
        <div className="col-md-4">
          <div className="card p-3">
            <h2 className="text-danger">Hours</h2>
            <p><strong>Monday - Friday:</strong> 6:30 a.m. - 10 p.m.</p>
            <p><strong>Saturday:</strong> 8 a.m. - 8 p.m.</p>
            <p><strong>Sunday:</strong> 8 a.m. - 8 p.m.</p>
          </div>
        </div>
      </div>
    </div>
    )
}

export default Contact;