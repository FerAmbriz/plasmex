// App.js
import './App.css';
import { motion } from 'framer-motion';
import Spline from '@splinetool/react-spline';

function App() {
  // Animaciones para los contenedores
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start font-sans text-gray-800">
      
      {/* Header */}
      <motion.header 
        className="w-full p-6 flex flex-col items-center bg-white shadow-md"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <h1 className="text-4xl font-bold text-blue-700 mb-2">Plasmex 3D</h1>
        <p className="text-lg text-gray-600 max-w-xl text-center">
          Ejemplo de plásmido 3D interactivo usando Spline
        </p>
      </motion.header>

      {/* Sección de Spline con proteína animada */}
      <motion.section
        className="relative w-full h-[500px] my-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        {/* Plásmido 3D */}
        <Spline scene="https://prod.spline.design/2fzdsSVagfszNxsd/scene.splinecode" />

        {/* Proteína que aparece al scroll */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-400 text-white px-4 py-2 rounded-full shadow-lg"
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
        >
          Proteína Recombinante
        </motion.div>
      </motion.section>

      {/* Contenido adicional debajo para scroll */}
      <main className="flex flex-col items-center justify-center my-10 px-4 md:px-20 w-full space-y-8">
        <motion.div 
          className="bg-white rounded-xl shadow-lg p-8 max-w-3xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">Visualización 3D</h2>
          <p className="text-gray-700">
            Aquí estamos mostrando un modelo 3D de ejemplo. En tu caso, podrías exportar tu plásmido (o plasmido + proteína) desde Spline y usar tu propia URL de escena.
          </p>
        </motion.div>

        <motion.div 
          className="bg-white rounded-xl shadow-lg p-8 max-w-3xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">Animaciones al hacer scroll</h2>
          <p className="text-gray-700">
            Puedes combinar la escena 3D con animaciones de Framer Motion, o incluso utilizar la API de código de Spline para manipular objetos dentro de la escena según eventos de tu aplicación.
          </p>
        </motion.div>
      </main>

      {/* Footer */}
      <motion.footer 
        className="w-full p-6 text-center text-gray-500 text-sm"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        &copy; {new Date().getFullYear()} Plasmex. Ejemplo con Spline.
      </motion.footer>
    </div>
  );
}

export default App;

