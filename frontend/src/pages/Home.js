import './Home.css';

export default function Home() {
    return (
        <div className="home-container">
            {/* Hero Section */}
            <section className="hero">
                    <h1>Welcome to EventHub 🎉</h1>
                    <p>Your one-stop platform for booking, managing, and creating events.</p>
                <div className="hero-buttons">
                    <a href="/events" className="btn-primary">Browse Events</a>
                    <a href="/register" className="btn-secondary">Join Now</a>
                </div>
            </section>

            {/* Features Section */}
            <section className="features">
                <div className="feature-card">
                    <h3>🎟 Easy Ticketing</h3>
                    <p>Book tickets instantly and keep them safe in your dashboard.</p>
                </div>
                <div className="feature-card">
                    <h3>📅 Event Management</h3>
                    <p>Organizers can create and manage events with ease.</p>
                </div>
                <div className="feature-card">
                    <h3>💳 Secure Payments</h3>
                    <p>Pay safely with multiple payment options integrated.</p>
                </div>
            </section>

            {/* Testimonials / Call to Action */}
            <section className="testimonials">
                <h2>What Our Users Say</h2>
                <div className="testimonial-grid">
                <div className="testimonial-card">
                    <p>"EventHub made booking tickets so easy! I’ll never miss a concert again."</p>
                    <span>- Sarah, Nairobi</span>
                </div>
                <div className="testimonial-card">
                    <p>"As an organizer, I love how simple it is to create events and track sales."</p>
                    <span>- James, Mombasa</span>
                </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <p>&copy; {new Date().getFullYear()} EventHub. All rights reserved.</p>
            </footer>
        </div>
    );
}
