import express from 'express';
import Component from '../models/Component.js';

const router = express.Router();


router.get('/', async (req, res) => {
  try {
    
    const component = await Component.findOne().sort({ updatedAt: -1 });

    if (!component) {
      
      return res.json({
        header: { title: 'My Site', imageUrl: '' },
        navbar: [
          { label: 'Home', url: '/' },
          { label: 'About', url: '/about' },
          { label: 'Contact', url: '/contact' },
        ],
        footer: {
          email: 'hello@example.com',
          phone: '000-000-0000',
          address: '123 Example St',
        },
      });
    }

    res.json({
      header: component.header,
      navbar: component.navbar,
      footer: component.footer,
    });
  } catch (error) {
    console.error('❌ Error fetching components:', error);
    res.status(500).json({
      message: 'Error fetching component data',
      error: error.message,
    });
  }
});


router.post('/', async (req, res) => {
  try {
    const { header, navbar, footer } = req.body;

    
    
    if (!header || !navbar || !footer) {
      return res.status(400).json({
        message: 'Missing required fields: header, navbar, and footer are required',
      });
    }

    
    
    if (!Array.isArray(navbar) || navbar.length !== 3) {
      return res.status(400).json({
        message: 'Navbar must contain exactly 3 links',
      });
    }

   
    
    for (const link of navbar) {
      if (!link.label || !link.url) {
        return res.status(400).json({
          message: 'Each navbar link must have a label and url',
        });
      }
    }

    
    
    let component = await Component.findOne().sort({ updatedAt: -1 });

    if (component) {
      
      
      component.header = header;
      component.navbar = navbar;
      component.footer = footer;
      await component.save();
    } else {
      
      component = await Component.create({
        header,
        navbar,
        footer,
      });
    }

    res.status(200).json({
      message: 'Component data saved successfully',
      data: {
        header: component.header,
        navbar: component.navbar,
        footer: component.footer,
      },
    });
  } catch (error) {
    console.error('❌ Error saving components:', error);
    res.status(500).json({
      message: 'Error saving component data',
      error: error.message,
    });
  }
});



router.delete('/', async (req, res) => {
  try {
    await Component.deleteMany({});
    res.json({ message: 'All component data reset to defaults' });
  } catch (error) {
    console.error('❌ Error resetting components:', error);
    res.status(500).json({
      message: 'Error resetting component data',
      error: error.message,
    });
  }
});

export default router;
