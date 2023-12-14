import {React, useState} from 'react';
import { Button, Image, Avatar } from '@mantine/core';
import '../css/variables.css';
import '../css/footer.css';
import { Link } from 'react-router-dom';
import { IconBrandGithub, IconBrandLinkedin, IconBrandDiscord } from '@tabler/icons-react';

function Footer() {
  
  const github_url = 'https://github.com/Merrimack-Computer-Club';
  const linkedin_url = '';
  const discord_url = 'https://discord.gg/3pn8GH9BXP';

  return (
    <footer className='Footer'>
      <ul className='footer-ul'>

          <li><Avatar><a href={github_url}><IconBrandGithub size="1.5rem" /></a></Avatar></li>
          <li><Avatar><a href={linkedin_url}><IconBrandLinkedin size="1.5rem" /></a></Avatar></li>
          <li><Avatar><a href={discord_url}><IconBrandDiscord size="1.5rem" /></a></Avatar></li>

      </ul>
    </footer>
  );
}

export default Footer;
