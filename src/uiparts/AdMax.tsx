import React, { useEffect } from 'react';

const AdMax = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://adm.shinobi.jp/s/ea492f162cbda4ac8d8bf88a20cb6eb4";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    }
  }, []);

  return (
    <div>
    </div>
  );
}

export default AdMax;
