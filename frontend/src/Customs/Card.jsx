import { motion } from "framer-motion";

function Card({content}) {
  return (
    <motion.div
      className=" p-10 m-2 box-border rounded-xl border-2 dark:border-green-950 border-green-100"
      whileHover={{ borderColor: "#a3e635" }}
      transition={{ type: "spring" }}
    >
      {content.iconName}  
      <h1 className=" text-xl md:text-2xl font-bold mb-2">
        {content.featureName}
      </h1>
      <p>
        {content.description}
      </p>
    </motion.div>
  );
}

export default Card;
