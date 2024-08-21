import express from 'express';
import nodemailer from 'nodemailer';
import axios from 'axios';

const router = express.Router();

// * This route is for sending the order confirmation email

router.post('/send-mail', async (req,res) =>{
    const {name,email,phone,address,products} = req.body;

    const transporter = nodemailer.createTransport({
      service: 'gmail', // You can use other services like 'hotmail', 'yahoo', etc.
      secure: true,
      port : 465,
      auth: {
          user: 'monoking.in@gmail.com', // Your email address
          pass: 'yrmyaqrjzonmqbhw' // Your email password
      }
    });
    
    const productDetails = products.map(product => 
      `<li>${product.id} - ${product.name} - Quantity: ${product.qty}, Price: Rs.${product.price} , Variety: ${product.selectedVariety}</li>`
    ).join('');
    
    // Set up email data
    let mailOptions = {
      from: 'monoking.in@gmail.com', // Sender address
      to: [email,'monoking.inceo@gmail.com'], // List of recipients
      subject: 'Order Confirmation from monoking.in <notreplay>', // Subject line
      text: 'Order Confirmation', // Plain text body
      html: `
      <h2>Order Confirmation</h2>
      <p>Thank you for your order, ${name}!</p>
      <p>${phone}</p>
      <p>Your order will be shipped to the following address:</p>
      <p>${address}</p>
      <h3>Ordered Products:</h3>
      <ul>${productDetails}</ul>
    `
    };
    
    // Send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error occurred:', error);
        return res.status(500).send('Error sending email');
      }
      console.log('Message sent:', info.response);
        res.status(200).send({
          success:true,
          message:'Email sent successfully' 
        });
      });
})


router.post('/book-mail', async (req,res) =>{

    const {name,email,address,phone,date} = req.body;

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail', // You can use other services like 'hotmail', 'yahoo', etc.
            secure: true,
            port : 465,
            auth: {
                user: process.env.MAIL_USER, // Your email address
                pass: process.env.MAIL_PASS // Your email password
            }
          });
        
          let mailOptions = {
            from: process.env.MAIL_USER, // Sender address
            to: [email], // List of recipients
            subject: 'Booking Confirmation from monoking.in <notreplay>', // Subject line
            text: 'Your booking has been confirmed', // Plain text body
            html: `
            <h2>Booking Confirmation</h2>
            <p>Thank you for booking, ${name}!</p>
            <p>Address: ${address}</p>
            <p>Phone: +91 ${phone}</p>
            <p>Date: ${date}</p>
            
            <p> Our team will get back to you soon. Have a good day !!!</p>
          `
          };

          let adminMailOptions = {
            from: process.env.MAIL_USER, // Sender address
            to: [process.env.ADMIN_MAIL], // List of recipients
            subject: 'You have new booking from monoking.in <notreplay>', // Subject line
            text: 'Booking Details', // Plain text body
            html: `
            <h2>Booking Information</h2>
            <p>Customer Name:  ${name}</p>
            <p>Customer Address: ${address}</p>
            <p>Customer Phone: +91 ${phone}</p>
            <p>Customer Email: ${email}</p>
            <p>Order Date: ${date}</p>
            Have Good day !!!
          `
          };

          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log('Error occurred:', error);
              return res.status(500).send('Error sending email');
            }
            console.log('Message sent:', info.response);
              res.status(200).send({
                success:true,
                message:'Email sent successfully' 
              });
            });


            // * This is sending mail to the admin
          transporter.sendMail(adminMailOptions, (error, info) => {
            if (error) {
              console.log('Error occurred:', error);
              return res.status(500).send('Error sending email');
            }
            });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Something went wrong while sending booking'
        })
    }
})


router.post('/enquiry-mail', async (req,res) =>{
    const {name,phone,email} = req.body;

    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail', // You can use other services like 'hotmail', 'yahoo', etc.
        secure: true,
        port : 465,
        auth: {
          user: process.env.MAIL_USER, // Your email address
          pass: process.env.MAIL_PASS // Your email password
        }
      });

      let mailOptions = {
        from: process.env.MAIL_USER, // Sender address
        to: [process.env.ADMIN_MAIL], // List of recipients
        subject: 'New Enquiry from monoking.in <notreplay>', // Subject line
        text: 'We have given the contact details', // Plain text body
        html: `
        <h2>New Vehicle Enquiry</h2>
        <p>User Name: ${name}</p>
        <p>User Phone: +91 ${phone}</p>
      
        Have a Good day !!!
      `
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log('Error occurred:', error);
          return res.status(500).send('Error sending email');
        }
        return res.status(200).send({
          success:true,
          message:'Email sent successfully' 
        });
      });

    } catch (error) {
      console.log(error);
      return res.status(500).send({
        success:false,
        message:'Internal server error'
      })
    }
});


export default router;