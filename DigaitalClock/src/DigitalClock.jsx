import React, {useEffect, useState} from 'react'

const DigitalClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timeId = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timeId);
  }, []);

  const formativeTime = (date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${hours}: ${minutes}: ${seconds}`
  }
  return (
    <div>
      <h1>Digital Clock</h1>
      <div>{formativeTime(time)}</div>
    </div>
  )
}

export default DigitalClock
