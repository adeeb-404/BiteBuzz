import { FcIdea } from "react-icons/fc";

function Card() {
  return (
    <div className=" p-12 ">
      <FcIdea className="h-12 w-12 mb-4" />
      <h1 className="text-2xl font-bold mb-2">Convenient Preorder System: </h1>
      <p>
        Say goodbye to long queues! With our intuitive prebooking system, you
        can effortlessly select your meals ahead of time, ensuring you have more
        time to enjoy your breaks.
      </p>
    </div>
  );
}

export default Card;
