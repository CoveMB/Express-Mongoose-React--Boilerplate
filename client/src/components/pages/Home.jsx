import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Layout from '../shared/Layout';

const Home = () => {

  const [ users, setUsers ] = useState([]);

  useEffect(() => {

    (async () => {

      const response = await fetch('http://localhost:8000/tasks');

      console.log(response);

    })();

  }, []);

  // console.log(users);

  return (
    <Layout>

      <Link to="/dynamic">Navigate to Dynamic Page</Link>


    </Layout>
  );

};

export default Home;
