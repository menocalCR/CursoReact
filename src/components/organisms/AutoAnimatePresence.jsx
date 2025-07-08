import { motion, AnimatePresence } from "framer-motion";
import  AutoCard from "../AutoCard";
function AutoAnimatePresence({first,slideVariants,autosPaginados}){

    return (
         <div className="flex flex-wrap justify-center gap-6">
                  <AnimatePresence mode="wait">
                    <motion.div
                        key={first} // cambia en cada página
                        variants={slideVariants}//animacion
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="flex flex-wrap justify-center gap-6"
                      >
                        {autosPaginados.map((auto) => (<AutoCard key={auto.id} auto={auto} /> ))}
                    </motion.div>
                  </AnimatePresence>
               </div>
    )
}



export default AutoAnimatePresence;