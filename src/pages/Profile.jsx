import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile() {
  return (
    <div>
      <Header title="Profile" renderSearchBar={ false } />
      <Footer />
    </div>
  );
}

export default Profile;
