import React from "react";
import { Link } from "react-router-dom";

export default function Purchase() {
  return (
    <section className="purchase">
      <div className="purchase__shape">
        {/* <img src="images/purchase.png" alt="shapes" /> */}
      </div>

      <div className="auto__container">
        <div className="purchase__inner">
             <div className="purchase__inner-card">
             <img
                style={{ width: "100%" }}
                src="images/icons/pep2.png"
                alt="bell"
              />
            </div>
          <div  className="purchase__inner-content">
            <div className="purchase__inner-content-bg">
              <img src="images/index/oval.svg" alt="" />
            </div>
            <h2 id="shop_amazon">Why we built Cyclos?</h2>
            <p>
            Our innovative idea is a result of a deep-seated problem for Africans - the lack of easy access to quality, affordable, and luxury items from across the world. While there are hundreds of eCommerce platforms dedicated to serving the needs of Africans, there is an absence of a trustworthy, safe, and reliable platform that connects African consumers to global brands in a cost-effective and  stress-free way. <br/><br/>
We have identified how to solve this problem utilizing the blockchain technology and Web3.
            </p>

          </div>
        </div>

        <div className="purchase__inner">
        <div className="purchase__inner-content">
            <div className="purchase__inner-content-bg">
              <img src="images/index/oval.svg" alt="" />
            </div>
            <h2 id="shop_amazon">What we do at Cyclos?
</h2>
            <p>
            Our model is composed to connect global brands to African consumers. While the e-commerce industry is enormous, with total revenue expected to increase to $46 billion by 2025, there is a need to establish a platform that rewards not only the creators but also the customers and this is achievable using Web3. <br /> <br />

At our core, we are focused on delivering the best shopping experience on the blockchain and this is why we are committed to offering a simple, hassle-free, and cost-effective method to pay for items on the blockchain and have your parcel delivered to your doorstep.<br /> <br />

We are starting with connecting American brands to our customers and aim to extend to UK, UAE, China to provide our customers access to a broader market.
            </p>
          </div>
             <div className="purchase__inner-card">
      
              <img
                style={{ width: "100%" }}
                src="images/icons/pep.png"
                alt="bell"
              />
          

           
            </div>
        </div>

        <h2 style={{textAlign: "center", marginTop:15, marginBottom: 65 }}id="shop_amazon">Meet Our Team</h2>
        <div className="purchase__inner">
             <div style={{}}className="purchase__inner-card">
          
              <img
                style={{ width: "100%", clipPath: "circle(50%)", position: "center" }}
                src="images/icons/harry.jpg"
                alt="bell"
              />
         
              <div style={{textAlign:"center", lineHeight:0, }}>
              <h2 style={{fontSize:"20px"}}>Oladipo Bello </h2>
              <h2 style={{fontSize:"15px"}}>CEO</h2>
              <a style={{cursor: "pointer"}} href="https://www.linkedin.com/in/oladipo-bello-09250866">
              <img
                style={{ width: "30%",}}
                src="images/icons/logo.png"
                alt="bell"
              />
              </a>
              </div>
            </div>

            <div className="purchase__inner-card">
              <img
               style={{ width: "100%", clipPath: "circle(50%)" }}
                src="images/icons/chris.png"
                alt="bell"
              />
            
              <div style={{textAlign:"center", lineHeight:0, }}>
              <h2 style={{fontSize:"20px"}}>Christian Okeke </h2>
              <h2 style={{fontSize:"15px"}}>CTO</h2>
              <a style={{cursor: "pointer"}} href="https://www.linkedin.com/in/okeke-christian">
              <img
                style={{ width: "30%",}}
                src="images/icons/logo.png"
                alt="bell"
              />
              </a>
              </div>
            </div>

            <div style={{ }} className="purchase__inner-card">
         
              <img
               style={{ width: "100%", clipPath: "circle(45%)" }}
                src="images/icons/tacha.png"
                alt="bell"
              />
           
              <div style={{textAlign:"center", lineHeight:0, }}>
              <h2 style={{fontSize:"20px"}}>Tacha Dumuje </h2>
              <h2 style={{fontSize:"15px"}}>Head of procurement</h2>
              <a style={{cursor: "pointer"}} href="https://www.linkedin.com/in/tacha-dumuje-835070155">
              <img
                style={{ width: "30%",}}
                src="images/icons/logo.png"
                alt="bell"
              />
              </a>
              </div>
            </div>

            <div style={{ }} className="purchase__inner-card">
         
              <img
               style={{ width: "100%", clipPath: "circle(43%)" }}
                src="images/icons/ogure.jpg"
                alt="bell"
              />
           
              <div style={{textAlign:"center", lineHeight:0, }}>
              <h2 style={{fontSize:"20px"}}>Lucky Ogure </h2>
              <h2 style={{fontSize:"15px"}}>Financial Analyst</h2>
              <a style={{cursor: "pointer"}} href="https://www.linkedin.com/in/lucky-ogure-7a0998147">
              <img
                style={{ width: "30%",}}
                src="images/icons/logo.png"
                alt="bell"
              />
              </a>
              </div>
            </div>

            <div className="purchase__inner-card">
         
              <img
               style={{ width: "100%",clipPath: "circle(50%)" }}
                src="images/icons/muazu.png"
                alt="bell"
              />
            
              <div style={{textAlign:"center", lineHeight:0, }}>
              <h2 style={{fontSize:"20px"}}>Muazu Abu </h2>
              <h2 style={{fontSize:"15px"}}>Senior Software Engineer</h2>
              <a style={{cursor: "pointer"}} href="https://www.linkedin.com/in/muazu">
              <img
                style={{ width: "30%",}}
                src="images/icons/logo.png"
                alt="bell"
              />
              </a>
              </div>
            </div>
        </div>

      </div>
    </section>
  );
}
