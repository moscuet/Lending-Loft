import { FC } from 'react'

const Footer: FC = ({ }) => {
    return <footer className="footer">
        <div className="footer-content">
            <div className="footer-section about">
                <h3>About Us</h3>
                <p>Your company's brief description goes here. A concise, engaging paragraph works best.</p>
            </div>
            <div className="footer-section links">
                <h3>Quick Links</h3>
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Services</a></li>
                    <li><a href="#">Portfolio</a></li>
                    <li><a href="#">Contact</a></li>
                </ul>
            </div>
            <div className="footer-section contact-form">
                <h3>Contact</h3>
                <p>Address: Your address here.</p>
                <p>Email: <a href="mailto:example@example.com">example@example.com</a></p>
                <p>Phone: (123) 456-7890</p>
            </div>
        </div>
        <div className="footer-bottom">
            &copy; [YourCompanyName] | Designed by YourName
        </div>
    </footer>
}

export default Footer
