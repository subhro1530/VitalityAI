const puppeteer = require('puppeteer');

(async () => {
    // Launch the browser
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    // Navigate to the form page
    await page.goto('https://sample-form-e2b82.web.app/');
    const url = 'https://sample-form-e2b82.web.app/';
    console.log(request.get(url))

    // Wait for the form to load and fill in the fields automatically
    await page.waitForSelector('input[placeholder="Enter your name"]');
    await page.type('input[placeholder="Enter your name"]', 'John Doe');

    await page.waitForSelector('input[placeholder="Enter your email"]');
    await page.type('input[placeholder="Enter your email"]', 'johndoe@example.com');

    await page.waitForSelector('input[placeholder="Enter your phone number"]');
    await page.type('input[placeholder="Enter your phone number"]', '123-456-7890');

    await page.waitForSelector('textarea[placeholder="Enter your message"]');
    await page.type('textarea[placeholder="Enter your message"]', 'This is a sample message.');

    // Select the gender option
     console.log(page.text);

    // Inject JavaScript into the page to display the filled data
    await page.evaluate(() => {
        // Get the values from the form fields
        const name = document.querySelector('input[placeholder="Enter your name"]').value;
        const email = document.querySelector('input[placeholder="Enter your email"]').value;
        const phone = document.querySelector('input[placeholder="Enter your phone number"]').value;
        const message = document.querySelector('textarea[placeholder="Enter your message"]').value;
        const gender = document.querySelector('select[name="gender"]').value; // Get selected gender

        // Create a new div to display the data
        const displayDiv = document.createElement('div');
        displayDiv.style.marginTop = '20px';
        displayDiv.style.padding = '10px';
        displayDiv.style.border = '1px solid #ccc';
        displayDiv.style.backgroundColor = '#f9f9f9';

        // Populate the div with the data
        displayDiv.innerHTML = `
            <h3>Form Data:</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Message:</strong> ${message}</p>
            <p><strong>Gender:</strong> ${gender}</p> <!-- Display the selected gender -->
        `;

        // Append the div to the body
        document.body.appendChild(displayDiv);
    });

    // The browser remains open for you to inspect the page
})();
