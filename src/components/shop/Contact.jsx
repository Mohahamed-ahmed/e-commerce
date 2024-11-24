import contact from "../../assets/13105774_5143151.jpg";
import classes from './Contact.module.css'
// import Loader from "./ui/Loader";

function ContactUs() {

  return (
    <div className={classes.container}>
      <div className={classes.left}>
        <img src={contact} alt="Cover Image" />
      </div>
      <div className={classes.right}>
        <div className={classes["form-container"]}>
          <form method="post" className={classes.form}>
            <h1>Contact Us</h1>
            <div className={classes.input}>
                    <label htmlFor='name'>Name</label>
                    <input 
                        className={classes['input-field']}
                        type='name' 
                        id='name'
                        >
                    </input>
            </div>
            <div className={classes.input}>
                    <label htmlFor='email'>Email</label>
                    <input 
                        className={classes['input-field']}
                        type='email' 
                        id='email'
                        >
                    </input>
            </div>
            <div className={classes.description}>
              <textarea
                id="description"
                rows="4"
                placeholder="Enter a description..."
              ></textarea>
              <label htmlFor="description">Description</label>
            </div>
            <div className={classes.button}>
                    <button type='submit'>Submit</button>
                </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
