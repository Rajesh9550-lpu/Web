import React, { useState } from 'react';
import NavigationBar from './NavigationBar';
import Personal from './Personal';


function Home() {

 
  return (
    <div>
      <NavigationBar />
      <div>
        <Personal />
      </div>
    </div>
  );
}

export default Home;
