import React from 'react';

function Footer() {
  return (
    <div>
      <footer data-testid="footer">

        <input
          type="image"
          data-testid="drinks-bottom-btn"
          alt="drinks-bottom-btn"
        />

        <input
          type="image"
          data-testid="explore-bottom-btn"
          alt="explore-bottom-btn"
        />

        <input
          type="image"
          data-testid="food-bottom-btn"
          alt="food-bottom-btn"
        />

      </footer>
    </div>
  );
}

export default Footer;
