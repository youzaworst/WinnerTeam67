// Install: npm install airtable
const Airtable = require('airtable');
const readline = require('readline');

// Configure your Airtable connection
const base = new Airtable({ apiKey: 'patb3fPXQKPUBoVH6.be7485ea834ba7c14cb1e67a8a47b213b1479f22b0df3b5becb9200689213e21' }).base('app7NxnIqWJMvX63L');

/**
 * Retrieves user data including password, checkbox values, and integer stats
 * @param {string} userName - The name of the user to search for
 * @returns {Promise<Object>} - Object containing password, checkbox values, and stats
 */
async function getUserData(userName) {
  try {
    const records = await base('tblvfB4S5vxFVyGAV')
      .select({
        filterByFormula: `{Username} = '${userName}'`,
        maxRecords: 1
      })
      .firstPage();

    if (records.length === 0) {
      console.log(`User "${userName}" not found`);
      return null;
    }

    const record = records[0];
    
    return {
      password: record.get('Password'),
      autism: record.get('Autism') === true,
      adhd: record.get('adhd') === true,
      dyslexia: record.get('dyslexia') === true,
      epilepsy: record.get('epilepsy') === true,
      streak: record.get('streak') || 0,
      hours: record.get('hours') || 0,
      tasksDone: record.get('tasks done') || 0,
      Level: record.get('Level') || 0
    };
  } catch (error) {
    console.error('Error retrieving data:', error);
    return null;
  }
}

/**
 * Creates a new user in Airtable
 * @param {string} userName - The username for the new user
 * @param {string} password - The password for the new user
 * @param {boolean} autism - Autism checkbox value
 * @param {boolean} adhd - ADHD checkbox value
 * @param {boolean} dyslexia - Dyslexia checkbox value
 * @param {boolean} epilepsy - Epilepsy checkbox value
 * @returns {Promise<boolean>} - True if signup successful, false otherwise
 */
async function signupUser(userName, password, autism, adhd, dyslexia, epilepsy) {
  try {
    console.log('\nAttempting to create user...');
    console.log('Username:', userName);
    console.log('Password:', password);
    console.log('Autism:', autism);
    console.log('ADHD:', adhd);
    console.log('Dyslexia:', dyslexia);
    console.log('Epilepsy:', epilepsy);
    
    // First check if username already exists
    const existingRecords = await base('tblvfB4S5vxFVyGAV')
      .select({
        filterByFormula: `{Username} = '${userName}'`,
        maxRecords: 1
      })
      .firstPage();

    if (existingRecords.length > 0) {
      console.log('Username already exists. Please choose a different username.');
      return false;
    }

    console.log('Creating record in Airtable...');
    
    // Create new user record with checkboxes
    const createdRecords = await base('tblvfB4S5vxFVyGAV').create([
      {
        fields: {
          'Username': userName,
          'Password': password,
          'Autism': autism,
          'adhd': adhd,
          'dyslexia': dyslexia,
          'epilepsy': epilepsy,
          'streak': 0,
          'hours': 0,
          'tasks done': 0,
          'Level': 0
        }
      }
    ]);

    console.log('Record created successfully!');
    console.log('Record ID:', createdRecords[0].id);
    console.log(`\n✓ Signup successful! Welcome, ${userName}!`);
    return true;
  } catch (error) {
    console.error('Error during signup:');
    console.error('Error message:', error.message);
    console.error('Error details:', error);
    return false;
  }
}

/**
 * Handles the signup process with user prompts
 * @param {Object} rl - readline interface
 */
async function handleSignup(rl) {
  return new Promise((resolve) => {
    rl.question('Enter a username: ', (userName) => {
      rl.question('Enter a password: ', (password) => {
        console.log('\nPlease answer true or false for the following:');
        
        rl.question('Autism (true/false): ', (autismInput) => {
          const autism = autismInput.toLowerCase() === 'true';
          
          rl.question('ADHD (true/false): ', (adhdInput) => {
            const adhd = adhdInput.toLowerCase() === 'true';
            
            rl.question('Dyslexia (true/false): ', (dyslexiaInput) => {
              const dyslexia = dyslexiaInput.toLowerCase() === 'true';
              
              rl.question('Epilepsy (true/false): ', async (epilepsyInput) => {
                const epilepsy = epilepsyInput.toLowerCase() === 'true';
                
                // Create the user in Airtable
                const success = await signupUser(userName, password, autism, adhd, dyslexia, epilepsy);
                resolve(success);
              });
            });
          });
        });
      });
    });
  });
}

/**
 * Handles the login process with user prompts
 * @param {Object} rl - readline interface
 */
async function handleLogin(rl) {
  return new Promise((resolve) => {
    rl.question('Enter student name: ', async (userName) => {
      console.log(`\nSearching for: ${userName}...`);
      
      const userData = await getUserData(userName);
      
      if (!userData) {
        console.log('User not found.');
        resolve(false);
        return;
      }
      
      rl.question('Enter password: ', (password) => {
        if (password === userData.password) {
          console.log(`\n===== Results for ${userName} =====`);
          console.log(`\n--- Health Conditions ---`);
          console.log(`Autism: ${userData.autism}`);
          console.log(`ADHD: ${userData.adhd}`);
          console.log(`Dyslexia: ${userData.dyslexia}`);
          console.log(`Epilepsy: ${userData.epilepsy}`);
          console.log(`\n--- Stats ---`);
          console.log(`Streak: ${userData.streak}`);
          console.log(`Hours: ${userData.hours}`);
          console.log(`Tasks Done: ${userData.tasksDone}`);
          console.log(`Level: ${userData.Level}`);
          resolve(true);
        } else {
          console.log('\nWrong password, sorry!');
          resolve(false);
        }
      });
    });
  });
}

// Main function that asks for signup or login
async function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('Do you want to (1) Signup or (2) Login? Enter 1 or 2: ', async (choice) => {
    if (choice === '1') {
      // Signup flow - creates new record in Airtable
      await handleSignup(rl);
    } else if (choice === '2') {
      // Login flow - retrieves existing record from Airtable
      await handleLogin(rl);
    } else {
      console.log('Invalid choice. Please enter 1 or 2.');
    }
    
    rl.close();
  });
}

main();