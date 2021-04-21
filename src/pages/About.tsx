import React from 'react'

import "../sass/pages/about.scss";

const About:React.FC = () => {
    return (
        <section className="about">
            <h2 className="about__title">About</h2>
            <section className="about-descripcion">
                <p className="about-descripcion__paragraph">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Temporibus at dicta iste nobis ex voluptatem illum, ratione omnis labore hic eius rerum soluta atque nemo eligendi nulla sed doloremque fugit magni, magnam voluptates quidem! Voluptate dicta recusandae rerum dolore et excepturi optio, ratione perferendis unde nemo quam blanditiis at quisquam, nam rem repudiandae, necessitatibus consequatur? Eveniet iste distinctio quod deleniti cum laboriosam deserunt obcaecati in, quaerat molestias eos, ipsum esse odio assumenda repellendus reiciendis laudantium nisi exercitationem aperiam? Rem hic error repellendus soluta sed quod totam non aliquid dicta sunt nesciunt vel molestias mollitia reiciendis nihil eius eaque, tempore necessitatibus!</p>
                <div className="about-descripcion__image">
                    <img src="https://firebasestorage.googleapis.com/v0/b/rentcarts.appspot.com/o/static%2F1%20(1).jpg?alt=media&token=32819fb8-45c6-44d6-b1f8-af75600447de" alt="image"/>
                </div>
            </section>
            <section className="about-howItWords">
                <h3 className="about-howItWords__title">¿How It Works?</h3>
                <p className="about-howItWords__information">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat molestiae, ad provident delectus enim, incidunt soluta optio earum repudiandae placeat, consequuntur quibusdam ipsa error amet maiores tempore officia atque facilis consectetur? Nesciunt ab voluptatibus ratione nostrum expedita natus reiciendis qui sit magni? Ad, quos voluptates? Quos nisi et rerum obcaecati!</p>
                <div className="about-howItWords__images">
                    <picture className="about-howItWords__images--image">
                        <img src="https://firebasestorage.googleapis.com/v0/b/rentcarts.appspot.com/o/static%2F1%20(2).jpg?alt=media&token=9ac342da-94ae-4e2d-8ae7-5a77a5207a55" alt="image 1"/>
                    </picture>
                    <picture className="about-howItWords__images--image">
                        <img src="https://firebasestorage.googleapis.com/v0/b/rentcarts.appspot.com/o/static%2F1%20(3).jpg?alt=media&token=5a979266-bd6e-4d10-aabc-077eee168a35" alt="image 2"/>
                    </picture>
                </div>
            </section>
        </section>
    )
}

export default About
