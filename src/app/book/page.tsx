import BookingForm from '@/components/forms/BookingForm';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function BookPage() {
    return (
        <div className="bg-[#0f0f0f] min-h-screen text-white relative">
            <Navbar />

            <div className="relative pt-32 pb-20 px-4 z-10">
                <div className="max-w-2xl mx-auto text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-playfair font-bold gold-text mb-4">
                        Secure Your Spot
                    </h1>
                    <p className="text-gray-400">
                        Experience the pinnacle of beauty services. Book your appointment now and let us take care of the rest.
                    </p>
                </div>

                <BookingForm />
            </div>

            <Footer />
        </div>
    );
}
