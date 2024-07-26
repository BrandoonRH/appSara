

export const Contact = () => {
    return (
        <div className="mx-auto w-4/6">
                <h1 className="text-center text-3xl font-bold text-gray-500">Información de Contacto</h1>
            <div className="mt-16 flex justify-center">
                <div>
                    <p className=""><span className="font-bold">Teléfono: </span> 33-3999-5234</p>
                    <p className=""><span className="font-bold">Correo: </span> universidad@edu.mx.com</p>
                    <p className=""><span className="font-bold">Domicilio: </span> C. Independencia 55Zona Centro, 44100
                        Guadalajara, Jal</p>
                    <div className="mt-5">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3732.789287237956!2d-103.3421024!3d20.678149899999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8428b1ee1b51c3bf%3A0x6e1f77323b5bec3c!2sC.%20Independencia%2055%2C%20Zona%20Centro%2C%2044100%20Guadalajara%2C%20Jal.!5e0!3m2!1ses!2smx!4v1721947088922!5m2!1ses!2smx"
                            width="400"
                            height="300"
                            style={{border: 0}}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>
                <div>
                    <img className="w-52" src="/img/logo.webp"/>
                </div>
            </div>
        </div>
    )
}
