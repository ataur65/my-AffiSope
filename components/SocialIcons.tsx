
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin, faYoutube, faPinterest, faSnapchat, faTiktok, faWhatsapp, faReddit } from '@fortawesome/free-brands-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';

const socialIcons = {
  facebook: faFacebook,
  twitter: faTwitter,
  instagram: faInstagram,
  linkedin: faLinkedin,
  youtube: faYoutube,
  pinterest: faPinterest,
  snapchat: faSnapchat,
  tiktok: faTiktok,
  whatsapp: faWhatsapp,
  reddit: faReddit,
};

const SocialIcons = ({ socialLinks }) => {
  return (
    <div className="flex items-center space-x-4">
      {socialLinks.map((link) => (
        <a key={link._id} href={link.url} target="_blank" rel="noopener noreferrer" className={`social-icon ${link.platform.toLowerCase()}`}>
          <FontAwesomeIcon icon={socialIcons[link.platform.toLowerCase()] || faGlobe} className="text-2xl" />
        </a>
      ))}
    </div>
  );
};

export default SocialIcons;
