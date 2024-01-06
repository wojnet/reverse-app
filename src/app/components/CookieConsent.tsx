"use client"
import { FC } from 'react';

interface CookieConsentProps {
  
}

const CookieConsentComponent: FC<CookieConsentProps> = ({}) => {
  return (
    <div className="max-w-[250px] text-center text-xs text-blue-500 opacity-90 z-[1000]">
      BY CLICKING BUTTON ABOVE YOU ACCEPT THAT REVERSE APP USES COOKIES FOR AUTHENTICATION PURPOSE.
    </div>
  );
}

export default CookieConsentComponent;