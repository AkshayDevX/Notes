const Footer = () => {
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    return (
      <>
        <footer className="footer absolute bottom-0 footer-center p-4 bg-base-100 text-base-content mt-14">
          <aside>
            <p>
              Copyright © {currentYear} - All right reserved by Notes
            </p>
          </aside>
        </footer>
      </>
    );
  };
  
  export default Footer;
  