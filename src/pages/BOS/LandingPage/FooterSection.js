import { useNavigate } from "react-router-dom";
import {
  RiArrowRightUpLine,
  RiLinkedinFill,
  RiInstagramLine,
  RiFacebookFill,
  RiTwitterXLine,
} from "react-icons/ri";

const FooterSection = () => {
  const navigate = useNavigate();
  return (
    <div>
 <footer className="bizoop-footer">
      <div className="bizoop-footer-container">

        {/* Top footer */}
        <div className="bizoop-footer-main">

          {/* Brand */}
          <div className="bizoop-footer-brand">

            <a href="#top" className="bizoop-footer-logo">
              BIZOOP
            </a>

            <p className="bizoop-footer-description">
              Business Operating Systems for tyre, transport and
              tailoring businesses.
            </p>
            {/* Socials */}
            <div className="bizoop-footer-socials">
              <a href="#" aria-label="LinkedIn">
                <RiLinkedinFill />
              </a>

              <a href="#" aria-label="Instagram">
                <RiInstagramLine />
              </a>

              <a href="#" aria-label="Facebook">
                <RiFacebookFill />
              </a>

              <a href="#" aria-label="Twitter">
                <RiTwitterXLine />
              </a>
            </div>

          </div>


          {/* Navigation */}
          <div className="bizoop-footer-nav">

            <div className="bizoop-footer-column">
              <span className="bizoop-footer-column-title">
                PRODUCT
              </span>

              <a href="#products">All Products</a>
              <a href="#products">Tyre BOS</a>
              <a href="#products">Transport BOS</a>
              <a href="#products">Tailor BOS</a>
              <a href="#pricing">Pricing</a>
            </div>


            <div className="bizoop-footer-column">
              <span className="bizoop-footer-column-title">
                COMPANY
              </span>

              <a href="#how-it-works">How it works</a>
              <a href="#providers">For providers</a>
              <a href="#about">About us</a>
              <a href="#careers">Careers</a>
            </div>


            <div className="bizoop-footer-column">
              <span className="bizoop-footer-column-title">
                SUPPORT
              </span>

              <a href="#help">Help Center</a>
              <a href="#contact">Contact Us</a>
              <a href="#terms">Terms of Service</a>
              <a href="#privacy">Privacy Policy</a>
            </div>

          </div>

        </div>


        {/* Bottom */}
        <div className="bizoop-footer-bottom">

          <span>
            © 2026 BIZOOP. All rights reserved.
          </span>

          <div className="bizoop-footer-bottom-right">
            <span>BUILT FOR BUSINESS</span>

            <span className="bizoop-footer-status">
              <i />
              PLATFORM ONLINE
            </span>
          </div>

        </div>

      </div>

      {/* Decorative word */}
      <div className="bizoop-footer-watermark">
        BIZOOP
      </div>
    </footer>
    </div>
  );
};

export default FooterSection;
