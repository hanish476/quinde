import React from 'react'
import { Home, Zap, Users, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  // Define content for easy mapping
  const quickLinks = [
    { name: 'Home', href: '#home', icon: Home },
    { name: 'About Us', href: '#about', icon: Users },
    { name: 'Events Calendar', href: '#events', icon: Zap },
    { name: 'Get Involved', href: '#contact', icon: Mail },
  ];

  const programLinks = [
    { name: 'Academic Support', href: '#academic' },
    { name: 'Cultural Exchange', href: '#cultural' },
    { name: 'Sports & Wellness', href: '#sports' },
    { name: 'Leadership Training', href: '#leadership' },
  ];

  return (
    // Use the primary dark color (assuming 'brrown' is a dark tone) for high contrast text
    <div className='w-full overflow-hidden bg-cream relative z-20 text-brrown pt-16 pb-8 px-4 sm:px-8'>

      {/* Background/Watermark Image (Absolute Positioning) */}
      {/* Reduced size and opacity to ensure content is legible */}
      <img
        src="/QUIND J-cropped.svg"
        className='absolute inset-0 w-full h-full object-cover opacity-15 pointer-events-none p-4'
        alt="Quindecennial Background Watermark"
      />
      

      {/* Footer Content Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-12 relative z-30">

        {/* Column 1: Mission Statement & Logo */}
        <div className="col-span-2 lg:col-span-1">
          <div className="flex items-center mb-4">
            {/* Using a placeholder logo or text for the primary identity */}
     
              <img  src="/QUIND J-cropped.svg" alt="" className='h-10'/>
            
          </div>
          <p className="text-sm leading-relaxed mb-4">
            Uniting students from NRIC in celebration of community, excellence, and fifteen years of shared history.
          </p>
          <p className="text-xs opacity-75">&copy; 2025 HISAN Quindecennial. All rights reserved.</p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-6 border-b border-cream/50 pb-1">Quick Links</h4>
          <ul className="space-y-3">
            {quickLinks.map((link) => (
              <li key={link.name}>
                <a href={link.href} className="flex items-center text-sm hover:text-orange-300 transition-colors">
                  <link.icon className="w-4 h-4 mr-2" />
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Featured Programs */}
        <div>
          <h4 className="text-lg font-semibold mb-6 border-b border-cream/50 pb-1">Our Focus</h4>
          <ul className="space-y-3">
            {programLinks.map((link) => (
              <li key={link.name}>
                <a href={link.href} className="text-sm hover:text-orange-300 transition-colors">
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Contact Information */}
        <div className="col-span-2 lg:col-span-1">
          <h4 className="text-lg font-semibold mb-6 border-b border-cream/50 pb-1">Contact Us</h4>
          <address className="space-y-4 not-italic">
            <div className="flex items-start text-sm">
              <MapPin className="w-4 h-4 mr-3 mt-1 flex-shrink-0" />
              <p>NRIC Student Union Office, Block C-205, University Campus, City, 12345</p>
            </div>
            <div className="flex items-center text-sm">
              <Mail className="w-4 h-4 mr-3 flex-shrink-0" />
              <a href="mailto:info@hisan.org" className="hover:text-orange-300">info@hisan.org</a>
            </div>
            <div className="flex items-center text-sm">
              <Phone className="w-4 h-4 mr-3 flex-shrink-0" />
              <a href="tel:+1234567890" className="hover:text-orange-300">+1 (234) 567-890</a>
            </div>
          </address>
        </div>
      </div>
      
      {/* Bottom Legal/Social Bar */}
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-cream/20 text-center text-xs opacity-75">
        <p>A part of NRIC Student Governance. Privacy Policy | Terms of Use</p>
      </div>

    </div>
  )
}

export default Footer
