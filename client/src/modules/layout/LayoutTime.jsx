import dayjs from 'dayjs';
import 'dayjs/locale/es';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

const getUTCOffset = () => {
    const offsetMinutes = new Date().getTimezoneOffset() * -1;
    const sign = offsetMinutes >= 0 ? "+" : "-";
    const hours = Math.abs(offsetMinutes) / 60;
    const minutes = Math.abs(offsetMinutes) % 60;
    return `UTC${sign}${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
};

const LayoutTime = ({ daytime }) => {
    // Configurar dayjs en español
    dayjs.locale('es');

    // Convertir daytime a la hora local utilizando la zona horaria del usuario
    const classDate = dayjs(daytime).tz(dayjs.tz.guess());

    // Formatear la fecha a un formato local con la hora
    const formattedDate = classDate.format('dddd D [de] MMMM, YYYY - HH:mm');
    
    // Capitalizar el día y el mes de manera adecuada
    const adaptedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1) + ' hs'; // {adaptedDate} --> Domingo 8 de septiembre, 2024 - 21:08 hs

    const timeZone = dayjs.tz.guess(); // Obtener la zona horaria local del usuario
    const country = timeZone.split('/')[1].replace('_', ' '); // {country} --> Buenos Aires
    const utcOffset = getUTCOffset(); // ({utcOffset}) --> (UTC-03:00)

    return (
        <div className='flex font-normal text-[14px] justify-end py-5'>
            {adaptedDate} / {country} {/*({utcOffset})*/}
        </div>
    );
}

export default LayoutTime;