import { FcIdea } from "react-icons/fc";
import { motion } from "framer-motion";

function Card() {
  return (
    <motion.div
      className=" p-10 m-2 box-border rounded-xl border-2 dark:border-green-950 border-green-100"
      whileHover={{ borderColor: "#a3e635" }}
      transition={{ type: "spring" }}
    >
      <FcIdea className=" h-10 w-10 md:h-12 md:w-12 mb-2 md:mb-4 " />
      <h1 className=" text-xl md:text-2xl font-bold mb-2">
        Convenient Preorder System:
      </h1>
      <p>
        Say goodbye to long queues! With our intuitive prebooking system, you
        can effortlessly select your meals ahead of time, ensuring you have more
        time to enjoy your breaks.
      </p>
    </motion.div>
  );
}

export default Card;
