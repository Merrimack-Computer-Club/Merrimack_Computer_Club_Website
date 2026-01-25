import {React, useState, useEffect} from 'react';
import { Button, Image, Avatar } from '@mantine/core';
import '../css/variables.css';
import '../css/footer.css';
import { Link } from 'react-router-dom';
import { IconBrandGithub, IconBrandLinkedin, IconBrandDiscord } from '@tabler/icons-react';

function Footer() {
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [selectedProfessor, setSelectedProfessor] = useState(null);

  // Array of professors for the Easter egg
  const professors = [
    { image: "/images/Christopher-Stuetzle-removebg-preview.png", alt: "Stuetzle" },
    { image: "/images/Kissel-preview.png", alt: "Kissel" }
  ];
  
  const github_url = 'https://github.com/Merrimack-Computer-Club';
  const linkedin_url = 'https://www.linkedin.com/showcase/mc-school-engineering-and-computational-sciences/';
  const discord_url = 'https://discord.gg/3pn8GH9BXP';

  useEffect(() => {
    const handleScroll = () => {
      // Check if user has scrolled to the bottom of the page
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      
      // Trigger when user is near the bottom (within 100px)
      if (scrollTop + clientHeight >= scrollHeight - 100 && !hasTriggered) {
        setHasTriggered(true);

        // 1 in 13 random chance to show Easter egg
        const randomChance = Math.floor(Math.random() * 13) + 1;
        if (randomChance === 1) {
          // Pick a random professor
          const randomProfessor = professors[Math.floor(Math.random() * professors.length)];
          setSelectedProfessor(randomProfessor);
          setShowEasterEgg(true);
          
          // Hide after animation completes (8 seconds)
          setTimeout(() => {
            setShowEasterEgg(false);
          }, 8000);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasTriggered]);

  return (
    <footer className='Footer'>
      {/* Easter Egg Animation */}
      {showEasterEgg && selectedProfessor && (
        <div className="easter-egg-container">
          <img 
            src={selectedProfessor.image} 
            alt={selectedProfessor.alt} 
            className="rolling-friend"
          />
        </div>
      )}
      
      <ul className='footer-ul'>

          <li><Avatar><a href={github_url}><IconBrandGithub size="1.5rem" /></a></Avatar></li>
          <li><Avatar><a href={linkedin_url}><IconBrandLinkedin size="1.5rem" /></a></Avatar></li>
          <li><Avatar><a href={discord_url}><IconBrandDiscord size="1.5rem" /></a></Avatar></li>

      </ul>
    </footer>
  );
}

export default Footer;
