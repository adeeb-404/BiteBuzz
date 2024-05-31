import Card from "../../Customs/Card";
import { motion } from "framer-motion";

function Features() {
  return (
    <motion.section
      id="features"
      className=" cust-text md:pt-4 p-2"
      animate={{ y: [500, 0], opacity: [0, 1] }}
      transition={{ duration: 2, type: "spring" }}
    >
      <h1 className="text-5xl font-semibold p-2 md:p-16 md:pb-0 ">Features</h1>
      <div className="flex flex-col md:flex-row items-center justify-center">
        <Card />
        <Card />
        <Card />
      </div>
    </motion.section>
  );
}

export default Features;
