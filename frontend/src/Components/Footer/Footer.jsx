import { useState } from "react";
import { Link } from "react-router-dom";
import css from "./Footer.module.css";
import logo from "../Assets/logo.png";

const Footer = () => {
  const [showLanguageSettingsModal, setShowLanguageSettingsModal] =
    useState(false);

  return (
    <div className={css.outerDiv}>
      <div className={css.innerDiv}>
        <div className={css.clmns}>
          <div className={css.clmn}>
            <ul className={css.cul}>
              <li className={css.cli}>
                <Link to="/">Indiana University</Link>
              </li>
              <li className={css.cli}>
                <Link to="/">Join Edubridge</Link>
              </li>
              <li className={css.cli}>
                <Link to="/">Get the app</Link>
              </li>
              <li className={css.cli}>
                <Link to="/">About us</Link>
              </li>
              <li className={css.cli}>
                <Link to="/">Contact us</Link>
              </li>
            </ul>
          </div>
          <div className={css.clmn}>
            <ul className={css.cul}>
              <li className={css.cli}>
                <Link to="/">Carrers</Link>
              </li>
              <li className={css.cli}>
                <Link to="/">Blog</Link>
              </li>
              <li className={css.cli}>
                <Link to="/">Help and Support</Link>
              </li>
              <li className={css.cli}>
                <Link to="/">Affiliate</Link>
              </li>
              <li className={css.cli}>
                <Link to="/">Investors</Link>
              </li>
            </ul>
          </div>
          <div className={css.clmn}>
            <ul className={css.cul}>
              <li className={css.cli}>
                <Link to="/">Terms</Link>
              </li>
              <li className={css.cli}>
                <Link to="/">Privacy policy</Link>
              </li>
              <li className={css.cli}>
                <Link to="/">Cookie settings</Link>
              </li>
              <li className={css.cli}>
                <Link to="/">Sitemap</Link>
              </li>
              <li className={css.cli}>
                <Link to="/">Accessibility statement</Link>
              </li>
            </ul>
          </div>
          <div className={[css.lastChild, css.clmn].join(" ")}>

          </div>
        </div>
        <div className={css.creds}>
          <div className={css.cred1}>
            <img className={css.img}  src={logo} alt="logo" />
          </div>
          <div className={css.cred2}>
            © {new Date().getFullYear()} Edubridge.
          </div>
        </div>
      </div>

    </div>
  );
};

export default Footer;
