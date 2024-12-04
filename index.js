const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(cors());

app.post('/submit', async (req, res) => {
    try {
        const googleFormUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSd48KCoiSv31RziAj-70ysxjukuGxDLxjvdzPH1vRBW3oS-IA/formResponse';

        console.log("req: ", req.body)

        // Map your form's fields to Google Form's `entry.ID` fields
        const formData = new URLSearchParams();
        formData.append('entry.1654597618', req.body.name);    // Replace with your Google Form's `entry.ID`
        formData.append('entry.1202764186', req.body.email);   // Replace with your Google Form's `entry.ID`
        formData.append('entry.533236206', req.body.subject); // Replace with your Google Form's `entry.ID`
        formData.append('entry.572287573', req.body.message); // Replace with your Google Form's `entry.ID`

        // Submit the form data to Google Forms
        await axios.post(googleFormUrl, formData.toString(), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        console.log("Form submitted successfully");
        res.status(200).send({message: 'Form submitted successfully'});
    } catch (error) {
        console.error('Error submitting form:', error);
        res.status(500).send('Failed to submit the form');
    }
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
