import Card from "../../Customs/Card";
import { FaHistory } from "react-icons/fa";
import { MdOutlineMenuBook } from "react-icons/md";
import { MdSendToMobile } from "react-icons/md";



function Features() {
  const cardContent = [{
    featureName:"Convenient Preorder System:",
    description:"Say goodbye to long queues! With our intuitive prebooking system, you can effortlessly select your meals ahead of time, ensuring you have more time to enjoy your breaks.",
    iconName:<MdSendToMobile className=" h-10 w-10 md:h-12 md:w-12 mb-2 md:mb-4 "/>,
  },
{
    featureName:"Order History and Reordering:",
    description:"Simplify your pre-ordering process! With our order history feature, you can quickly reorder your favorite meals with just a few clicks, saving you time and effort for your next meal.",
    iconName:<FaHistory className=" h-10 w-10 md:h-12 md:w-12 mb-2 md:mb-4 "/>
},
{
  featureName:"Real-Time Menu Updates:",
  description:"Stay updated with the latest offerings! Our real-time menu ensures you have access to the freshest and most current meal options, allowing you to make informed choices every time.",
  iconName:<MdOutlineMenuBook className=" h-10 w-10 md:h-12 md:w-12 mb-2 md:mb-4 "/>
}]



  return (
    <section id="features" className=" cust-text md:pt-4 p-2">
      <h1 className=" text-4xl md:text-5xl font-semibold p-2 md:p-16 md:pb-0 ">
        Features
      </h1>
      <div className="flex flex-col md:flex-row items-center justify-center gap-2">
        {cardContent.map((cardInfo,index) => {
          return(
            <Card key ={index} content ={cardInfo}/>
          )
        })}
      </div>
    </section>
  );
}

export default Features;
