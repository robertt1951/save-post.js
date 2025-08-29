/ save-post.js
// This is your first serverless function!
// It receives a post idea and saves it to Airtable

// STEP 1: Import what we need (like getting tools from a toolbox)
const Airtable = require('airtable');

// STEP 2: This is the main function Vercel will run
export default async function handler(req, res) {
  
  // SECURITY CHECK: Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      error: 'Method not allowed',
      hint: 'Send a POST request with content in the body' 
    });
  }

  try {
    // STEP 3: Get the data from the request
    // This is what your app sends to this function
    const { 
      content,      // The actual post text
      platform,     // twitter, linkedin, or facebook
      userId        // Who's creating this post
    } = req.body;

    // STEP 4: Check if we got all required data
    if (!content || !platform) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        hint: 'You must send both content and platform',
        received: { content: !!content, platform: !!platform }
      });
    }

    // STEP 5: Connect to Airtable
    // IMPORTANT: You'll replace these with your actual values
    socialmediaapp base = tblbCqSTAJXAolnjZ{
      patoxArjRAlpnVVci.f82b4cc95d7a482cd482311b426f57fbcbd712eb8d5d3f1a9f6d61e1c532029b: process.env.AIRTABLE_API_KEY  // Your Airtable API key (kept secret)
    }).base(process.env.apptBcLqWiroAs0DV;  // Your base ID (starts with 'app')

    // STEP 6: Save to Airtable
    console.log('Saving to Airtable...'); // This helps with debugging
    
    const record = await base('PostIdeas').create([
      {
        "fields": {
          "content": content,
          "platform": platform,
          "status": "draft",
          "userId": userId || "anonymous",
          "createdAt": new Date().toISOString()
        }
      }
    ]);

    // STEP 7: Send success response
    console.log('Successfully saved:', record[0].id);
    
    return res.status(200).json({
      success: true,
      message: 'Post idea saved successfully!',
      recordId: record[0].id,
      fields: record[0].fields
    });

  } catch (error) {
    // STEP 8: If anything goes wrong, tell us what happened
    console.error('Error details:', error);
    
    return res.status(500).json({
      error: 'Failed to save post',
      details: error.message,
      hint: 'Check your Airtable API key and Base ID'
    });
  }
}

// HELPFUL NOTES:
// - This function runs every time someone sends a request
// - It connects to Airtable, saves data, and returns a response
// - All your secret keys are stored in environment variables (process.env)
// - The console.log statements help you debug in Vercel's dashboard
