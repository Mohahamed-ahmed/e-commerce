import { Link } from "react-router-dom";
import classes from "./Footer.module.css";

const Footer = () => {
  return (
    <footer>
      <div className={classes.container}>
        <div className={classes.box}>
          <h1>Categories</h1>
          <ul className={classes.list}>
            <li>
              <Link to={"/shop?category=men"}>Men</Link>
            </li>
            <li>
              <Link to={"/shop?category=women"}>Women</Link>
            </li>
            <li>
              <Link to={"/shop?category=accessories"}>Accessories</Link>
            </li>
            <li>
              <Link to={"/shop"}>Others</Link>
            </li>
          </ul>
        </div>
        <div className={classes.box}>
          <h1>Help</h1>
          <ul className={classes.list}>
            <li>
              <Link to="">Track order</Link>
            </li>
            <li>
              <Link to="">Returns</Link>
            </li>
            <li>
              <Link to="">Shipping</Link>
            </li>
            <li>
              <Link to="">FAQs</Link>
            </li>
          </ul>
        </div>
        <div className={classes.box}>
          <h1>Get In Touch</h1>
          <div className={classes.list}>
            <p>
              Any questions? Let us know in store at 8th floor, 221b baker St,
              Cairo, or call us on (+20) 01007116415
            </p>
          </div>
          <div className={classes.links}>
            <Link
              to={"https://github.com/Mohahamed-ahmed"}
              target="_blank"
              className={classes.card1}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 30 30"
                width="30px"
                height="30px"
                className={classes.github}
              >
                {" "}
                <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"></path>
              </svg>
            </Link>
            <Link
              to={"https://www.linkedin.com/in/mohammed-ahmed-8924b4226"}
              target="_blank"
              className={classes.card2}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={classes.linkedin}
                height="1.6em"
                viewBox="0 0 448 512"
              >
                <path d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z"></path>
              </svg>
            </Link>
          </div>
        </div>
        <div className={classes.box}>
          <h1>Newsletter</h1>
          <div className="list">
            <form action="">
              <input type="email" placeholder="email@exmaple.com" />
              <button>Subscribe</button>
            </form>
          </div>
        </div>
      </div>
      <div className={classes.end}>
        Copyright &copy; 2024 All rights reserved | by{" "}
        <Link target="_blank" to={"https://www.linkedin.com/in/mohammed-ahmed-8924b4226"}>Mohammed Ahmed</Link>
      </div>
    </footer>
  );
};

export default Footer;



