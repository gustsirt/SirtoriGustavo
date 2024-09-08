import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../../config/axiosInstance';

// key es un []
export const useFetch = (key, url, options = {}) => {
  return useQuery({
    queryKey: key,
    queryFn: () => axiosInstance.get(url).then(res => res.data),
    ...options
  });
};
/*
  return --> status, (isPending, isError, isSuccess = corresponde ademas un stutus)
              isError --> error
              isSuccess --> data
*/
// { isPending, isError,isSuccess, error, data}

/* OPTIONS
* 1. queryKey
Tipo: Array | String
Descripción: Identificador único para la consulta. Es crucial para la gestión del caché. Generalmente es un array que puede incluir la URL y parámetros adicionales que identifiquen la consulta.

* 2. queryFn
Tipo: Function
Descripción: La función que se ejecuta para obtener los datos. Esta función puede devolver una promesa que resuelve los datos de la consulta.

* 3. initialData
Tipo: any
Descripción: Datos iniciales que se utilizarán hasta que la consulta real termine. Útil para proporcionar una experiencia de carga más suave.

* 4. staleTime
Tipo: number
Descripción: Tiempo en milisegundos durante el cual los datos se consideran "frescos" y no se volverán a obtener. Si estableces staleTime en un valor alto, la consulta no se volverá a ejecutar hasta que pase ese tiempo.
Ejemplo: staleTime: 10000 (10 segundos)

* 5. cacheTime
Tipo: number
Descripción: Tiempo en milisegundos durante el cual los datos en caché se mantendrán en la memoria después de que se vuelvan "obsoletos". Después de este tiempo, los datos se eliminan del caché.
Ejemplo: cacheTime: 300000 (5 minutos)

* 6. refetchOnWindowFocus
Tipo: boolean | 'always'
Descripción: Controla si la consulta debe volver a ejecutarse cuando la ventana del navegador recupera el foco. Establecerlo en false evita esta conducta, mientras que 'always' forzará la recarga cada vez que la ventana recupere el foco.
Valor por defecto: true
Ejemplo: refetchOnWindowFocus: false

* 7. enabled
Tipo: boolean
Descripción: Determina si la consulta debe ejecutarse automáticamente. Es útil para manejar consultas condicionales, por ejemplo, esperar a que se cumpla una condición antes de ejecutar la consulta.
Ejemplo: enabled: someCondition

* 8. onSuccess
Tipo: Function
Descripción: Función que se ejecuta cuando la consulta es exitosa. Puedes usarla para actualizar estados u otras operaciones basadas en el resultado de la consulta.
Ejemplo:
javascript
Copiar código
onSuccess: (data) => {
  console.log('Data fetched successfully:', data);
}

* 9. onError
Tipo: Function
Descripción: Función que se ejecuta cuando la consulta falla. Es útil para manejar errores de manera centralizada o para notificar al usuario.
Ejemplo:
javascript
Copiar código
onError: (error) => {
  console.error('Error fetching data:', error);
}

* 10. refetchInterval
Tipo: number | false
Descripción: Configura la consulta para que se vuelva a ejecutar automáticamente a intervalos regulares en milisegundos. Útil para datos que necesitan actualizarse constantemente.
Ejemplo: refetchInterval: 60000 (1 minuto)

* 11. retry
Tipo: number | boolean
Descripción: Número de veces que la consulta intentará volver a ejecutarse si falla. Si se establece en false, no habrá reintentos.
Valor por defecto: 3
Ejemplo: retry: 1 (reintentar una vez)

* 12. retryDelay
Tipo: Function | number
Descripción: Tiempo en milisegundos entre cada reintento en caso de fallo. Puede ser un número fijo o una función que devuelva un tiempo de espera.
Ejemplo: retryDelay: 1000 (1 segundo)

* 13. select
Tipo: Function
Descripción: Permite transformar los datos antes de que se almacenen en caché o se pasen al componente. Es útil para realizar cálculos o filtrados sobre los datos de la consulta.
Ejemplo:
javascript
Copiar código
select: (data) => data.filter(item => item.active)

* 14. placeholderData
Tipo: any | Function
Descripción: Proporciona datos temporales mientras la consulta está cargando, lo cual es diferente de initialData porque no se almacena en caché.
Ejemplo:
javascript
Copiar código
placeholderData: { id: 0, name: 'Loading...' }

* Ejemplo de Uso Completo
Aquí tienes un ejemplo de cómo usar varias de estas opciones en un hook useFetch:

javascript
Copiar código
import { useQuery } from '@tanstack/react-query';
import axiosInstance from './axiosInstance';

export const useFetch = (key, url, options = {}) => {
  return useQuery({
    queryKey: key,
    queryFn: () => axiosInstance.get(url).then(res => res.data),
    staleTime: 60000, // 1 minuto
    cacheTime: 300000, // 5 minutos
    refetchOnWindowFocus: false,
    enabled: !!url, // Ejecuta la consulta solo si la URL es válida
    retry: 2, // Reintenta 2 veces en caso de fallo
    onSuccess: (data) => console.log('Datos obtenidos exitosamente:', data),
    onError: (error) => console.error('Error al obtener los datos:', error),
    ...options,
  });
};

 */