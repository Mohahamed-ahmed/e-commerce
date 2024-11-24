import React from 'react';
import { Heart, Shield, Star, Users, Package, Truck } from 'lucide-react';
import classes from './About.module.css'

function About() {
  const values = [
    {
      icon: <Heart className={`${classes["value-icon"]} ${classes["value-icon-rose"]}`} />,
      title: "Customer First",
      description: "Your satisfaction is our top priority. We go above and beyond to ensure an exceptional shopping experience."
    },
    {
      icon: <Shield className={`${classes["value-icon"]} ${classes["value-icon-blue"]}`} />,
      title: "Quality Guaranteed",
      description: "Every product in our store meets the highest standards of quality and craftsmanship."
    },
    {
      icon: <Star className={`${classes["value-icon"]} ${classes["value-icon-yellow"]}`} />,
      title: "Innovation",
      description: "We constantly evolve and adapt to bring you the latest trends and technologies."
    }
  ];


  return (
    <div className={classes["about-page"]}>
      {/* Hero Section */}
      <div className={classes["about-hero"]} style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1920")'
      }}>
        <div className={classes["hero-overlay"]}>
          <div className={classes["about-container"]}>
            <div className={classes["hero-content"]}>
              <h1>Crafting Quality Since 1970</h1>
              <p>Delivering exceptional products and unforgettable shopping experiences to customers worldwide.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <section className={classes["mission"]}>
        <div className={classes["about-container"]}>
          <div className={classes["mission-content"]}>
            <h2>Our Mission</h2>
            <p>We believe in making quality products accessible to everyone. Our commitment to excellence, sustainability, and customer satisfaction drives everything we do.</p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className={classes["values"]}>
        <div className={classes["about-container"]}>
          <h2>Our Core Values</h2>
          <div className={classes["values-grid"]}>
            {values.map((value, index) => (
              <div key={index} className={classes["value-card"]}>
                <div className={classes["value-icon-container"]}>
                  {value.icon}
                </div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;