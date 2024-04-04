import React from 'react';
import { useSelector } from 'react-redux';

import { ReactComponent as LogoDarkIcon } from '../../assets/images/logos/logo2.svg';
import LogoDarkText from '../../assets/images/logos/logo1.png';
import { ReactComponent as LogoWhiteIcon } from '../../assets/images/logos/logo22.svg';
import LogoWhiteText from '../../assets/images/logos/logo2.png';

const AuthLogo = () => {
  const isDarkMode = useSelector((state) => state.customizer.isDark);

  return (
    <div className="p-4 d-flex justify-content-center gap-2">
      {isDarkMode !== false ? (
        <>
          <LogoWhiteIcon />
          <img src={LogoWhiteText} className="d-none d-lg-block" alt='logo-text' />
        </>
      ) : (
        <>
          <LogoDarkIcon />
          <img src={LogoDarkText} className="d-none d-lg-block" alt='logo-text' />
        </>
      )}
    </div>
  );
};

export default AuthLogo;
