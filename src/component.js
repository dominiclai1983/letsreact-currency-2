export const ScaledRate = (props) => {
  const { scaledRate } = props;
  return (<p className="text-center inline-block">
  {Object.values(scaledRate)[0]} {Object.keys(scaledRate)[0]} = {Object.values(scaledRate)[1]} {Object.keys(scaledRate)[1]} 
  </p>)
}

export const DifferentRate = (props) => {
  const { differentRate } = props;
  return (
  <p className="text-center inline-block">
    {differentRate[0]} = {differentRate[1]} 
  </p>
  )
}

export const ShowError = () => {
  return (<p className="text-warning">Please choose two different value of currency!</p>)
}