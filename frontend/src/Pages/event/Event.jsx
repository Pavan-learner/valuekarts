import React, { useState } from "react";
import EventCard from "./EventCard";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../../Components/Loading/Loader";
import Backbutton from "../../Components/Backbutton";
import EventProduct from "./EventProduct";


const Event = () => {
 

  // connt events useSelector((state.))

  const products = [
    {
      id: 1,
      name: "Ballon Decoration",
      description:
        "Elevate your event with stunning, custom balloon decorations that add a touch of magic",
      image:
        "https://media.istockphoto.com/id/1432655308/photo/birthday-decorations-balloons-garland-and-decor-for-little-baby-party-on-a-wall-background.webp?b=1&s=170667a&w=0&k=20&c=IP3ERbF4FSwLS3DyxaFW7A1AsbDWUmJZ_-2AVpepG4Q=",
    },

    {
      id: 2,
      name: "Flower Decoration",
      description:
        "Enchant your event with breathtaking flower decorations tailored to perfection!",
      image:
        "https://media.istockphoto.com/id/1178984568/photo/indian-couple-making-flower-rangoli-on-diwali-or-onam-festival-taking-selfie-or-holding-sweets.webp?b=1&s=170667a&w=0&k=20&c=-vaBOVaRnjUzS_LF6kY01yYBH7fycZ2kxBpwX0vt4a8=",
    },
    // Add more products as needed
  ];

  const worksImg = [
    {
      id: 1,
      imgSrc: "https://media.istockphoto.com/id/1355181189/photo/wedding-detail-decoration-flowers-background.webp?b=1&s=170667a&w=0&k=20&c=aC_JeWBU7kc2Z9TsvKTqp-N_hsN427YZaO2lnY_Y6Kc=",
      pname:"Best Flower Decoration",
      rate:2999,
      period:null
    },

    {
      id: 2,
      imgSrc: "https://media.istockphoto.com/id/1405876768/photo/decoration-for-a-childrens-party.webp?b=1&s=170667a&w=0&k=20&c=KBH2D_l_9oUHA1NkKvUlgx2Se9qqvaYgHkdzbVXNAbk=",
      pname:"Best Flower Decoration",
      rate:2999   
    },

    {
      id: 3,
      imgSrc: "https://media.istockphoto.com/id/1280479844/photo/marigold-flower-rangoli-design-for-diwali-festival-indian-festival-flower-decoration.webp?b=1&s=170667a&w=0&k=20&c=reowSmq5yqLBJhuXxN2EUscwMxsMVWz4258T7aTDbxQ=",
      pname:"Best Flower Decoration",
      rate:2999   
    },

    {
      id: 5,
      imgSrc: "https://media.istockphoto.com/id/1163718652/photo/delicious-wedding-reception-birthday-cake-on-a-background-balloons-party-decor-copy-space.webp?b=1&s=170667a&w=0&k=20&c=g9JbMT9lYn9KbVmTnCBC3LEGz6cLVpQe3LXuJceVe5o=",
      pname:"Best Flower Decoration",
      rate:2999   
    },

    {
      id: 6,
      imgSrc: "https://media.istockphoto.com/id/1355181189/photo/wedding-detail-decoration-flowers-background.webp?b=1&s=170667a&w=0&k=20&c=aC_JeWBU7kc2Z9TsvKTqp-N_hsN427YZaO2lnY_Y6Kc=",
      pname:"Best Flower Decoration",
      rate:2999   
    },

    {
      id: 7,
      imgSrc: "https://media.istockphoto.com/id/1405876768/photo/decoration-for-a-childrens-party.webp?b=1&s=170667a&w=0&k=20&c=KBH2D_l_9oUHA1NkKvUlgx2Se9qqvaYgHkdzbVXNAbk=",
      pname:"Best Flower Decoration",
      rate:2999   
    },
    {
      id: 7,
      imgSrc: "https://media.istockphoto.com/id/1405876768/photo/decoration-for-a-childrens-party.webp?b=1&s=170667a&w=0&k=20&c=KBH2D_l_9oUHA1NkKvUlgx2Se9qqvaYgHkdzbVXNAbk=",
      pname:"Best Flower Decoration",
      rate:2999   
    },    {
      id: 7,
      imgSrc: "https://media.istockphoto.com/id/1405876768/photo/decoration-for-a-childrens-party.webp?b=1&s=170667a&w=0&k=20&c=KBH2D_l_9oUHA1NkKvUlgx2Se9qqvaYgHkdzbVXNAbk=",
      pname:"Best Flower Decoration",
      rate:2999   
    }
  ];

  const [loading, setloading] = useState(false);
  const [Book, setBook] = useState(false);

  const handelBook = (e) => {
    e.preventDefault();

    setloading(true);
    setTimeout(() => {
      toast.success("Booked Successfully");
      setBook(true);
      setloading(false);
    }, 1000);
  };

  return (
    <>
      <div>
        <Backbutton path={"/"} />
        <Toaster />
        <header
          className="text-center text-gray-700 font-bold font-weight-bold text-5xl mb-4"
          style={{
            marginTop: "2vh",
            marginBottom: "2vh",
            width: "100%",
            height: "50vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "50px",
            fontWeight: "bold",
            color: "white",
            backgroundImage:
              "url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            overflow: "hidden",
          }}
        >
          <h3 className="text-center text-gray-700 font-bold font-weight-bold mb-4">
            {" "}
            Welcome to our Event Page
          </h3>
          <h4 className="text-center">Transforming Dreams into Reality</h4>
          <h5 className="text-center">
            Creating Unforgettable Moments with Exceptional Event Planning and
            Decoration Services
          </h5>
        </header>

        <main>
          <h2 className=" text-center text-gray-700 font-bold font-weight-bold mb-4">
            Our Services
          </h2>


            {/* Event Category Card */}
          <EventCard products={products} />

          <div>
            <h2 className="text-center text-gray-700 font-bold font-weight-bold mb-4">
              Design solutions for your event
            </h2>
            <p className="text-center text-gray-700 font-weight-bold mb-4">
              Take a look at some of the beautiful events we've created. From
              stunning flower arrangements to vibrant balloon decorations, our
              portfolio showcases our commitment to excellence and creativity
            </p>
          </div>

          <div className="container mb-5">
            <div className="row justify-content-center">
             {
              worksImg.map((item) =>{
                return <EventProduct item = {item} key = {item.id}/>
              })
             }
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Event;
