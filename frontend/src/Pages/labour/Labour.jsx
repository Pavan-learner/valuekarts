import React from "react";
import Service_Card from "./Service_Card";
import Backbutton from "../../Components/Backbutton";
import Labour_Card from "./Labour_Card";

const Labour = () => {
  const service = [
    {
      imgLink:
        "https://media.istockphoto.com/id/1457344433/photo/tired-painter-worker-while-painting-on-wall-by-holding-paint-bucket-at-workplace-concept-of.webp?b=1&s=170667a&w=0&k=20&c=lhLHvGBCn6j6z8cCTMquaaJVucbPGhtIP7NXi-c2lGo=",
      title: "Painter",
      descrption:
        "Transform your space with professional painting services for a fresh and beautiful look",
    },

    {
      imgLink:
        "https://media.istockphoto.com/id/157636360/photo/shower-leak.webp?b=1&s=170667a&w=0&k=20&c=uxS_HFBsQFXFLwW1u4pgofcUC_4HjsHFAR-Akm-4iCc=",
      title: "Plumber",
      descrption:
        "Expert plumbing services for leaks, clogs, and installations to keep your systems running smoothly",
    },
  ];

  const worksImg = [
    {
      id: 1003,
      imgSrc: "https://media.istockphoto.com/id/155368675/photo/portrait-of-cheerful-casual-indian-manual-worker-painter-adult-man.webp?b=1&s=170667a&w=0&k=20&c=MBfSt_ElVh6T8d9PkgJfF6aCo7K8HediLOKsJRxW8hk=",
      pname:"Plumber",
      rate:'1000/per day',
    },

    {
      id: 2003,
      imgSrc: "https://media.istockphoto.com/id/1365364856/photo/smiling-plumber-with-pipe-and-plumbing-tool-in-hand-showing-thumb-by-looking-at-camera.webp?b=1&s=170667a&w=0&k=20&c=JOJA4pzUt_blMG_C7mCw9vPaEaeX8jEMC1nVC2kzUuQ=",
      pname:"Painter",
      rate:'1000/per day',
    },

   
  ];


  return (
    <>
      <Backbutton path = "/"/>
      <section className="bg-light text-center py-5 mt-3">
        <div className="container">
          <h1 className="display-4">Find Local Services Easily</h1>
          <p className="lead">
            Connecting you with skilled local professionals for all your needs.
          </p>
         
        </div>
      </section>
      <section id="services" className="py-5">
        <div className="container">
          <h2 className="text-center mb-4">Our Services</h2>
          <div className="row">
            {service.map((item) => (
              <Service_Card
                key={item.imgLink}
                imgLink={item.imgLink}
                title={item.title}
                description={item.descrption}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="bg-light py-5">
        <div className="container">
          <h2 className="text-center mb-4">How It Works</h2>
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title text-primary">Step 1</h5>
                  <p className="card-text">Select the service you need.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title text-primary">Step 2</h5>
                  <p className="card-text">
                    Enter your location. and select your preferred time.
                  </p>
                </div>
              </div>
            </div>
            {/* Add more steps as needed */}

            <div className="col-md-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title text-primary">Step 3</h5>
                  <p className="card-text">Get your service.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mb-5">
        <h1 className="text-center mb-4">Book your service</h1>
            <div className="row justify-content-center">
             {
              worksImg.map((item) =>{
                return <Labour_Card key={item.id} item = {item}/>
              })
             }
            </div>
          </div>
    </>
  );
};

export default Labour;
