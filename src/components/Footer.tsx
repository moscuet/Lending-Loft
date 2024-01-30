import '../styles/footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h3>About Us</h3>
          <p>In placerat, leo sit amet malesuada semper, sem nisi luctus lacus, at tincidunt mauris turpis nec nisi.</p>
        </div>
        <div className="footer-section links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/contact-us">Contact</a></li>
            <li><a href="/signin">Sign In</a></li>
            <li><a href="/signup">Sign Up</a></li>
          </ul>
        </div>
        <div className="footer-section contact-form">
          <h3>Contact</h3>
          <p>123 Infinity Lane, Creativille, Artistan </p>
          <p> (123) 456-7890</p>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; Mostafizur Rahman | Build with love from Helsinki
      </div>
    </footer>

  )
}
export default Footer