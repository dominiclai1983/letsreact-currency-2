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

export const BaseValueComp = () => {
  return (
    <>
      <option value="USD">πΊπΈ USD - US Dollar</option>
      <option value="GBP">π¬π§ GBP - British Pound</option>
      <option value="EUR">πͺπΊ EUR - Euro</option>
      <option value="CNY">π¨π³ CNY - Chinese Yuan</option>
      <option value="HKD">π­π° HKD - HK Dollar</option>
      <option value="AUD">π¦πΊ AUD - Australia Dollar</option>
      <option value="THB">πΉπ­ THB - Thai Baht</option>
      <option value="JPY">π―π΅ JPY - Japanese Yan</option>
    </>
  )
}

export const TargetValueComp = () => {
  return (
    <>
      <option value="GBP">π¬π§ GBP - British Pound</option>
      <option value="USD">πΊπΈ USD - US Dollar</option>
      <option value="EUR">πͺπΊ EUR - Euro</option>
      <option value="CNY">π¨π³ CNY - Chinese Yuan</option>
      <option value="HKD">π­π° HKD - HK Dollar</option>
      <option value="AUD">π¦πΊ AUD - Australia Dollar</option>
      <option value="THB">πΉπ­ THB - Thai Baht</option>
      <option value="JPY">π―π΅ JPY - Japanese Yan</option>
    </>
  )
}
