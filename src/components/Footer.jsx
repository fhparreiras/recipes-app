import React from 'react';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../css/footer.css';

function Footer() {
  return (
    <div>
      <footer data-testid="footer" className="footer">

        <input
          type="image"
          data-testid="drinks-bottom-btn"
          alt="drinks-bottom-btn"
          src={ drinkIcon }
        />

        <input
          type="image"
          data-testid="explore-bottom-btn"
          alt="explore-bottom-btn"
          src={ exploreIcon }
        />

        <input
          type="image"
          data-testid="food-bottom-btn"
          alt="food-bottom-btn"
          src={ mealIcon }
        />

      </footer>
    </div>
  );
}

export default Footer;
