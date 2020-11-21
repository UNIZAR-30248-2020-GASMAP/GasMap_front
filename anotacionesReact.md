# Anotaciones:
Para evitar las lineas rojas que indican que no se ha especificado el tipo en el state
type MyProps = {};
type MyState = { idGasolinera: number, datosGasolinera: any };
export default class GasStation extends React.Component<MyProps,MyState>{
  
}

# Funciones en proceso (no enguarrar codigo)
EDU
This function return an icon to be rendered

    const nameIcons : string[] = ['silla','tarjeta'];
  getIcons = (name:string[]) => {
    //nombre de iconos de bd, asociado con nombre de icono en <Icon />
    const referenceIcons : any= {'silla':'wheelchair','tarjeta':'cc-mastercard'};
    let found = name.find( function (element) {
      if(element=='silla') return 'wheelchair';
      // (element=='silla'? {return 'wheelchair'}:{return 'wheelchair'});
    });
    console.log(found)
    if(found){
      return(
        <Icon
        reverse
        style={styles.servicesIcon}
        name={found}
        type='font-awesome'
        color='black'
        size={15}
        onPress={() => Alert.alert('Service:' + {name})}
      />
      )
    }else{
      console.log('no hay elemetno ' + found )
    }
  }
