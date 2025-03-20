
import { Shield } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-[80vh] animate-fadeIn py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <Shield className="h-16 w-16 text-primary mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-4">About Secudeliv</h1>
            <p className="text-xl text-gray-600">Transforming community living through secure technology</p>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
              <p className="text-gray-700">
                Secudeliv was founded with a clear mission: to revolutionize how residential communities manage security, 
                communications, and daily operations. We believe that technology should simplify community living while 
                enhancing security and fostering better connections between residents.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">What We Do</h2>
              <p className="text-gray-700 mb-4">
                Our comprehensive platform integrates all aspects of community management:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Advanced security control for visitor and delivery management</li>
                <li>Streamlined resident communication channels</li>
                <li>Efficient maintenance request handling</li>
                <li>Community event organization and notifications</li>
                <li>Transparent administration and billing systems</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Our Technology</h2>
              <p className="text-gray-700">
                Built on modern, secure cloud infrastructure, Secudeliv ensures data privacy while 
                providing seamless access across all devices. Our team of security experts constantly 
                monitors and updates our systems to protect community information and maintain the 
                highest standards of digital safety.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Join Us</h2>
              <p className="text-gray-700">
                Whether you're a resident looking for a better community living experience or an administrator 
                seeking to streamline operations, Secudeliv is designed with you in mind. Join the thousands 
                of communities already benefiting from our innovative approach to residential management.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
