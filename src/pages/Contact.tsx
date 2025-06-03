import { ContactForm } from "@/components/ContactForm";
import { Toaster } from "@/components/ui/toaster";

export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto pt-10 pb-20">
        <h1 className="text-3xl font-bold text-center mb-2">Contact Us</h1>
        <p className="text-gray-400 text-center mb-10">
          Have a question or want to get in touch? Send us a message below.
        </p>
        
        <div className="grid md:grid-cols-2 gap-10">
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Get in Touch</h3>
              <p className="text-gray-400">
                Fill out the form and our team will get back to you within 24 hours.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-1">Email</h4>
              <p className="text-blue-400">support@example.com</p>
            </div>
            
            <div>
              <h4 className="font-medium mb-1">Phone</h4>
              <p className="text-blue-400">+1 (555) 123-4567</p>
            </div>
            
            <div>
              <h4 className="font-medium mb-1">Address</h4>
              <p className="text-gray-400">
                123 Innovation Drive<br />
                San Francisco, CA 94107
              </p>
            </div>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <ContactForm />
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}