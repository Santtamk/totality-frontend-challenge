
const Footer = () => {

    return (
    
            <footer class="bg-white text-black py-8">
    <div class="container mx-auto px-4">
      <div class="flex flex-wrap justify-between">
        <div class="w-full md:w-1/3 mb-6 md:mb-0">
          <h2 class="text-lg font-semibold">About Us</h2>
        </div>
        <div class="w-full md:w-1/3 mb-6 md:mb-0">
          <h2 class="text-lg font-semibold mb-4">Quick Links</h2>
          <ul>
            <li><a href="#home" class="hover:underline">Home</a></li>
            <li><a href="#services" class="hover:underline">Services</a></li>
            <li><a href="#contact" class="hover:underline">Contact</a></li>
            <li><a href="#about" class="hover:underline">About</a></li>
          </ul>
        </div>
        <div class="w-full md:w-1/3">
          <h2 class="text-lg font-semibold mb-4">Contact Us</h2>
          <p>Email: <a href="mailto:info@example.com" class="hover:underline">info@example.com</a></p>
          <p>Phone: <a href="tel:+1234567890" class="hover:underline">+123 456 7890</a></p>
        </div>
      </div>
      <div class="mt-8 text-center text-sm">
        <p>&copy; 2024 Company. All Rights Reserved.</p>
      </div>
    </div>
  </footer>
  
    )
}

export default Footer