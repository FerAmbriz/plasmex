import './App.css';
import { motion } from 'framer-motion';

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
        <h1 className="text-4xl font-bold text-blue-700 mb-2">Plasmex</h1>
        <p className="text-lg text-gray-600 max-w-xl text-center">
          Innovando en biotecnología para un futuro más saludable. 
          Descubre nuestras soluciones avanzadas en terapias y diagnósticos.
        </p>
      </motion.header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center my-10 px-4 md:px-20 w-full">
        
        <motion.section 
          className="bg-white rounded-xl shadow-lg p-8 m-4 max-w-3xl hover:shadow-2xl transition-shadow duration-300"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">Nuestros Servicios</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Investigación avanzada en terapias celulares</li>
            <li>Desarrollo de soluciones diagnósticas innovadoras</li>
            <li>Consultoría en biotecnología y salud</li>
          </ul>
        </motion.section>

        <motion.section 
          className="bg-white rounded-xl shadow-lg p-8 m-4 max-w-3xl hover:shadow-2xl transition-shadow duration-300"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">Nuestra Misión</h2>
          <p className="text-gray-700">
            Plasmex busca transformar la medicina mediante innovación y tecnología de vanguardia, 
            ofreciendo soluciones confiables y efectivas para mejorar la salud humana.
          </p>
        </motion.section>

        <motion.section 
          className="mt-8 text-center"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <a 
            href="https://plasmex.com" 
            className="bg-blue-600 text-white px-8 py-3 rounded-lg shadow hover:bg-blue-700 transition-colors duration-300"
          >
            Conócenos
          </a>
        </motion.section>
      </main>

      {/* Footer */}
      <motion.footer 
        className="w-full p-6 text-center text-gray-500 text-sm"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        &copy; {new Date().getFullYear()} Plasmex. Todos los derechos reservados.
      </motion.footer>
    </div>
  );
}

export default App;
