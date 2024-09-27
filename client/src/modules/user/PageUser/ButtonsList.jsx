import CVButton from "./CVButton"

const ButtonsList = () => {
  return (
    <div className="flex gap-4 justify-center">
      <CVButton text='Imprimir CV' action={() => console.log('Funciona')}/>
      <CVButton text='Descargar CV' action={() => console.log('Funciona 2')}/>
    </div>
  )
}

export default ButtonsList
