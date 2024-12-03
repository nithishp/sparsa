"use client";
import { motion, SpringOptions, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import {cn} from '../../lib/utils'



 function AnimatedNumber({
  value,
  className,
  springOptions,
}) {
  const spring = useSpring(value, springOptions);
  const display = useTransform(spring, (current) =>
    Math.round(current).toLocaleString()
  );

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  return (
    <motion.span className={cn("tabular-nums", className)}>
      {display}
    </motion.span>
  );
}

const AnimateNumber = ({endValue}) =>{
  const [value, setValue] = useState(0);

   useEffect(() => {
     setValue(endValue);
   }, []);
 return(
     <AnimatedNumber
      className="inline-flex items-center text-3xl font-bold text-[#5b534e]"
      springOptions={{
        bounce: 0,
        duration: 2000,
      }}
      value={value}
    />
 );

}
export default AnimateNumber