import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'utils/constants';

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(ROUTES.CLIENT_INFORMATION_SYSTEM.ROOT, { replace: true });
  }, [navigate]);
  return <div>Hello World</div>;
}

export default Home;
