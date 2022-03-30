import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../css/footer.css';

function Footer() {
  return (
    <div>
      <footer data-testid="footer" className="footer">

        <Link to="/drinks">
          <input
            type="image"
            data-testid="drinks-bottom-btn"
            alt="drinks-bottom-btn"
            src={ drinkIcon }
          />
        </Link>

        <Link to="/explore">
          <input
            type="image"
            data-testid="explore-bottom-btn"
            alt="explore-bottom-btn"
            src={ exploreIcon }
          />
        </Link>

        <Link to="/foods">
          <input
            type="image"
            data-testid="food-bottom-btn"
            alt="food-bottom-btn"
            src={ mealIcon }
          />
        </Link>

      </footer>
    </div>
  );
}

export default Footer;
