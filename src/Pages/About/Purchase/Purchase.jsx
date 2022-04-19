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
            <Link to="/shop?search_term=baby products">
              <img
                style={{ width: "100%" }}
                src="images/icons/pep.png"
                alt="bell"
              />
              </Link>
            </div>
          <div  className="purchase__inner-content">
            <div className="purchase__inner-content-bg">
              <img src="images/index/oval.svg" alt="" />
            </div>
            <h2 id="shop_amazon">What Do We Do?</h2>
            <p>
            Our model is composed to solve the problems prevalent in the African e-commerce industry. While this industry is enormous, with total revenue expected to increase to $46 billion by 2050, there is a need to establish a platform that customers can trust easily. The foundation of our business is reliance and affordability for our customers. Therefore, we are committed to offering a simple, hassle-free, and cost-effective method to make purchases virtually and have your parcel delivered to your doorstep. We will go out of our way to earn your trust, so you can buy what you want without any problems.
 We work day and night to provide more value to those who put their trust in us. We aim to expand cross-border shipping across Africa so its residents can wisely utilize their cryptocurrency savings according to their wishes. Additionally, we plan on incorporating shipments from the UK, USA, and UAE to provide our customers access to a broader market.
            </p>
            {/* <Link className="button primary" to="/shop">Place Order</Link> */}
          </div>
        </div>

        <div className="purchase__inner">
        <div className="purchase__inner-content">
            <div className="purchase__inner-content-bg">
              <img src="images/index/oval.svg" alt="" />
            </div>
            <h2 id="shop_amazon">Why Do We Do This?</h2>
            <p>
            Our innovative idea is a result of a deep-seated problem for Africans - the lack of easy access to quality, affordable, and luxury items from across the world. While there were hundreds of eCommerce platforms dedicated to serving the needs of Africans, there was an absence of a trustworthy, safe, and reliable platform designed to provide them with what they want in a stress-free way. This is why we adopted the idea of cryptocurrency for cross-border shopping purposes.
            </p>
            {/* <Link className="button primary" to="/shop">Place Order</Link> */}
          </div>
             <div className="purchase__inner-card">
            <Link to="/shop?search_term=baby products">
              <img
                style={{ width: "100%" }}
                src="images/icons/pep2.png"
                alt="bell"
              />
              </Link>
            </div>
        </div>

        <h2 style={{textAlign: "center", marginTop:15, marginBottom: 65 }}id="shop_amazon">Meet Our Team</h2>
        <div className="purchase__inner">
             <div style={{}}className="purchase__inner-card">
          
              <img
                style={{ width: "100%", clipPath: "circle(40%)", position: "center" }}
                src="images/icons/harry.png"
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
               style={{ width: "100%", clipPath: "circle(40%)" }}
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
               style={{ width: "100%", clipPath: "circle(40%)" }}
                src="images/icons/tacha.png"
                alt="bell"
              />
           
              <div style={{textAlign:"center", lineHeight:0, }}>
              <h2 style={{fontSize:"20px"}}>Tacha Dumuje </h2>
              <h2 style={{fontSize:"15px"}}>Head of procurement</h2>
              <a style={{cursor: "pointer"}} href="https://www.linkedin.com/in/okeke-christian">
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
               style={{ width: "100%",clipPath: "circle(40%)" }}
                src="images/icons/muazu.png"
                alt="bell"
              />
            
              <div style={{textAlign:"center", lineHeight:0, }}>
              <h2 style={{fontSize:"20px"}}>Muazu Abu </h2>
              <h2 style={{fontSize:"15px"}}>Senior Software Engineer</h2>
              <a style={{cursor: "pointer"}} href="https://www.linkedin.com/in/okeke-christian">
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
