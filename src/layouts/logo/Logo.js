import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import React from 'react';
import { ReactComponent as LogoDarkIcon } from '../../assets/images/logos/logo2.svg';
import LogoDarkText from '../../assets/images/logos/logo1.png';
import { ReactComponent as LogoWhiteIcon } from '../../assets/images/logos/logo22.svg';
import LogoWhiteText  from '../../assets/images/logos/logo.png';

const Logo = () => {
  const isDarkMode = useSelector((state) => state.customizer.isDark);
  const toggleMiniSidebar = useSelector((state) => state.customizer.isMiniSidebar);
  const activeSidebarBg = useSelector((state) => state.customizer.sidebarBg);
  return (
    <Link to="/" className="d-flex align-items-center gap-2">
      {isDarkMode || activeSidebarBg !== 'white' ? (
        <>
          <LogoWhiteIcon />
          {toggleMiniSidebar ? '' : <img src={LogoWhiteText} className="d-none d-lg-block" alt='logo-text' />}
        </>
      ) : (
        <>
          <LogoDarkIcon />
          {toggleMiniSidebar ? '' : <img src={LogoDarkText} className="d-none d-lg-block" alt='logo-text' />}
        </>
      )}
    </Link>
  );
};

export default Logo;
