import React from 'react'
import {
  BiLogoLinkedin,
  BiLogoFacebook,
  BiLogoInstagram,
  BiLogoGmail,
  BiLogoWhatsapp,
} from 'react-icons/bi';

const LayoutFooter = () => {
  return (
    <div className="w-full bg-primary text-white py-8 flex flex-col items-center">
      <img className="h-20 p-2 filter drop-shadow-md" src="/img/logo.jpeg" alt="Logotipo" />
      <p className="text-3xl font-semibold my-4 font-sans">Insight</p>
      <p className="w-3/5 text-sm italic mb-10 text-center">
        Asociación IT
      </p>
      <div className="flex space-x-2 mb-10">
        <a
          href="https://wa.me/5493482410412?text=Hola.%20Me%20gustaría%20contactarme%20contigo"
          target="_blank"
          rel="noreferrer"
          className="flex justify-center items-center w-9 h-9 bg-gray-700 text-gray-300 rounded-full transition duration-300 hover:bg-gray-300 hover:text-gray-700"
        >
          <BiLogoWhatsapp size={18} />
        </a>
        <a
          href="https://www.facebook.com/"
          target="_blank"
          rel="noreferrer"
          className="flex justify-center items-center w-9 h-9 bg-gray-700 text-gray-300 rounded-full transition duration-300 hover:bg-gray-300 hover:text-gray-700">
          <BiLogoFacebook size={18} />
        </a>
        <a
          href="https://www.instagram.com/"
          target="_blank"
          rel="noreferrer"
          className="flex justify-center items-center w-9 h-9 bg-gray-700 text-gray-300 rounded-full transition duration-300 hover:bg-gray-300 hover:text-gray-700">
          <BiLogoInstagram size={18} />
        </a>
        <a
          href="https://www.linkedin.com/"
          target="_blank"
          rel="noreferrer"
          className="flex justify-center items-center w-9 h-9 bg-gray-700 text-gray-300 rounded-full transition duration-300 hover:bg-gray-300 hover:text-gray-700">
          <BiLogoLinkedin size={18} />
        </a>
        <a
          href="mailto:gustavo.sirtori@hotmail.com"
          target="_blank"
          rel="noreferrer"
          className="flex justify-center items-center w-9 h-9 bg-gray-700 text-gray-300 rounded-full transition duration-300 hover:bg-gray-300 hover:text-gray-700"
        >
          <BiLogoGmail size={18} />
        </a>
      </div>
      <div className="text-xs">
        &copy; Copyright {new Date().getFullYear() + ' - '}
        <strong> Insight</strong>. Todos los derechos reservados
      </div>
    </div>
  )
}

export default LayoutFooter