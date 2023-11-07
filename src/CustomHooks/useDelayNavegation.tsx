import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function useDelayedNavigation(event:boolean, route:string, delay:number) {
  const navigate = useNavigate();

  useEffect(() => {
    if (event) {
      const timeout = setTimeout(() => {
        navigate(route);
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [event, route, delay, navigate]);
}

export default useDelayedNavigation;