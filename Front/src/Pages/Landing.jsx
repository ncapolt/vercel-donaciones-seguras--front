import './Landing.css'
import NavBar from '../Components/NavBar'
import Donadoresempacando from '../Images/Donadoresempacando.png'
import LOW from '../Images/LOW.png'
import DAN from '../Images/DAN.png'
import NICO from '../Images/NICO.png'
import Image2 from '../Images/image 2.png'
import Image3 from '../Images/image 3.png'
import Image4 from '../Images/image 4.png'

function Landing() {
  return (
    <>
      <header className="site-header" aria-label="Barra superior">
        <NavBar
          showAvatar={false}
          links={[
            { label: 'Sobre nosotros', href: '#sobre-nosotros' },
            { label: 'Contacto', href: '#contacto' },
            { label: 'Registrate', href: '/elija-opcion', cta: true }
          ]}
        />
      </header>

      <main>
        <section id="hero" className="hero" aria-label="Hero">
          <div className="hero-content">
            <h1 className="hero-title">
              <span className="hero-title-line1">TUS DONACIONES</span>
              <span className="hero-title-line2">LLEGAN.</span>
            </h1>
            <p className="hero-description">
              Descubrí una nueva manera de organizar campañas de donación.
            </p>
          </div>
        </section>

        <section id="sobre-nosotros" className="sobre-nosotros" aria-label="Sobre nosotros">
          <div className="sobre-content">
            <div className="sobre-left">
              <h2 className="sobre-title">
                <span className="sobre-title-line1">Sobre</span>
                <span className="sobre-title-line2">nosotros.</span>
              </h2>
              <div className="sobre-text">
                <p>Donaciones Seguras es la solución a la deshonestidad en campañas de donación y la mejor manera de asegurar que tendrás el producto que necesitas al momento de una emergencia. La tecnología nos ha permitido armar una página que ayuda tanto a las ONGs como a los afectados por distintos problemas que necesitan de una mano.</p>
                <p>Así nace Donaciones Seguras, tu espacio de confianza para la organización y reserva de donaciones.</p>
              </div>
            </div>
            <div className="sobre-right">
              <div className="sobre-image-container">
                <img src={Donadoresempacando} alt="Voluntarios empacando donaciones" className="sobre-image" />
              </div>
            </div>
          </div>
          <div className="sobre-chevron">▼</div>
        </section>
        <section id="quienes-somos" className="quienes-somos" aria-label="Quienes somos">
          <div className="quienes-content">
            <h2 className="quienes-title">
              <span className="quienes-title-line1">Quienes</span>
              <span className="quienes-title-line2">somos?</span>
            </h2>
            <div className="quienes-profiles">
              <div className="profile-card">
                <div className="profile-image-container">
                  <img src={LOW} alt="Nicolás Low Tanne" className="profile-image" />
                </div>
                <div className="profile-info">
                  <h3 className="profile-name">Nicolás Low Tanne</h3>
                  <p className="profile-role">Back-end developer</p>
                </div>
              </div>
              <div className="profile-card">
                <div className="profile-image-container">
                  <img src={DAN} alt="Dan Segal" className="profile-image" />
                </div>
                <div className="profile-info">
                  <h3 className="profile-name">Dan Segal</h3>
                  <p className="profile-role">UX-UI designer</p>
                </div>
              </div>
              <div className="profile-card">
                <div className="profile-image-container">
                  <img src={NICO} alt="Nicolás Fernandez" className="profile-image" />
                </div>
                <div className="profile-info">
                  <h3 className="profile-name">Nicolás Fernandez</h3>
                  <p className="profile-role">Front-end developer</p>
                </div>
              </div>
            </div>
          </div>
          <div className="quienes-chevron">▼</div>
        </section>
        <section id="mision" className="mision" aria-label="Misión">
          <div className="mision-content">
            <div className="mision-left">
              <h2 className="vision-title">VISIÓN</h2>
              <div className="vision-text">
                <p>En un mundo donde las necesidades básicas a veces parecen lujos, los actos de bondad como las donaciones son cruciales para un mundo mejor, aunque sea frecuente que, por motivos varios, haya gente que abuse de estas caridades y decidan fraudar y entorpecer la caridad.</p>
              </div>
            </div>
            <div className="mision-center">
              <div className="mision-line"></div>
            </div>
            <div className="mision-right">
              <h2 className="mision-title">MISIÓN</h2>
              <div className="mision-text">
                <p>En el marco de estas injusticias nace Donaciones Seguras, para borrar los entorpecimientos y fraudes durante el proceso de donación y dar una mano con la organización del mismo. A su vez, también busca darle respuesta a aquellos que necesitan la donación, proporcionando un sistema de reservas que les asegura que su necesidad llegará a la palma de sus manos.</p>
              </div>
            </div>
          </div>
          <div className="mision-chevron">▼</div>
        </section>
        <section id="ongs" className="ongs" aria-label="ONGs">
          <div className="ongs-content">
            <h2 className="ongs-title">
              <span className="ongs-title-line1">Apostamos a la</span>
              <span className="ongs-title-line2">confianza.</span>
            </h2>
            <div className="ongs-text">
              <p>Nuestro proyecto nos permite alcanzar ambas caras de la moneda. Por eso, muchas ONGs y comunidades eligen Donaciones Seguras como su sistema de confianza para la organización de sus campañas.</p>
            </div>
            <h3 className="ongs-subtitle">
              <span className="ongs-subtitle-line1">Confían en</span>
              <span className="ongs-subtitle-line2">nosotros:</span>
            </h3>
            <div className="ongs-carousel">
              <div className="carousel-content">
                <div className="partner-logo">
                  <img src={Image2} alt="Organización 1" className="partner-image" />
                </div>
                <div className="partner-logo">
                  <img src={Image3} alt="Organización 2" className="partner-image" />
                </div>
                <div className="partner-logo">
                  <img src={Image4} alt="Organización 3" className="partner-image" />
                </div>
              </div>
            </div>
          </div>
          <div className="ongs-chevron">▼</div>
        </section>
        <section id="faq" className="faq" aria-label="Preguntas frecuentes">
          <div className="faq-content">
            <h2 className="faq-title">
              <span className="faq-title-line1">Preguntas</span>
              <span className="faq-title-line2">frecuentes.</span>
            </h2>
            <div className="faq-questions">
              <div className="faq-item">
                <div className="faq-question-container">
                  <div className="faq-icon">?</div>
                  <div className="faq-question-text">
                    <h3 className="faq-question">Cómo funciona la auditoría de donaciones?</h3>
                    <div className="faq-underline"></div>
                    <p className="faq-answer">Nuestra plataforma verifica y organiza cada campaña, asegurando que las donaciones se registren correctamente y lleguen de forma transparente a su destino.</p>
                  </div>
                </div>
              </div>
              <div className="faq-item">
                <div className="faq-question-container">
                  <div className="faq-icon">?</div>
                  <div className="faq-question-text">
                    <h3 className="faq-question">Puedo elegir los productos que necesito?</h3>
                    <div className="faq-underline"></div>
                    <p className="faq-answer">Sí. Las personas que requieran ayuda pueden reservar los productos disponibles, lo que garantiza que recibirán exactamente lo que necesitan.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="faq-chevron">▼</div>
        </section>
        <section id="contacto" className="contacto" aria-label="Contacto">
          <div className="contacto-content">
            <div className="contacto-promo">
              <h2 className="contacto-promo-text">
                <span className="promo-line1">Por esto y mucho más, el cambio es hoy.</span>
                <span className="promo-line2">Es con</span>
                <span className="promo-line3">
                  <span className="promo-donaciones">DONACIONES </span>
                  <span className="promo-seguras">SEGURAS</span>
                </span>
              </h2>
            </div>
            <div className="contacto-form-container">
              <h3 className="contacto-form-title">
                <span className="form-title-line1">Contactate</span>
                <span className="form-title-line2">con nosotros!</span>
              </h3>
              <form className="contacto-form">
                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="nombre" className="form-label">Nombre:</label>
                    <input 
                      type="text" 
                      id="nombre" 
                      name="nombre" 
                      placeholder="Ingrese su nombre aquí..." 
                      className="form-input"
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="email" className="form-label">E-Mail:</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      placeholder="Ingrese su E-Mail aquí..." 
                      className="form-input"
                    />
                  </div>
                </div>
                <div className="form-field">
                  <label htmlFor="mensaje" className="form-label">Tu mensaje:</label>
                  <textarea 
                    id="mensaje" 
                    name="mensaje" 
                    placeholder="Escriba su mensaje aquí..." 
                    className="form-textarea"
                    rows="4"
                  ></textarea>
                </div>
                <div className="form-submit-container">
                  <button type="submit" className="form-submit">Enviar</button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default Landing
