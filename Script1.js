// Install: npm install airtable

const Airtable = require('airtable');
const readline = require('readline');

// Configure your Airtable connection
const base = new Airtable({ apiKey: 'patb3fPXQKPUBoVH6.be7485ea834ba7c14cb1e67a8a47b213b1479f22b0df3b5becb9200689213e21' }).base('app7NxnIqWJMvX63L');

/**
 * Retrieves user data including password and checkbox values
 * @param {string} userName - The name of the user to search for
 * @returns {Promise<Object>} - Object containing password and checkbox values
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
      epilepsy: record.get('epilepsy') === true
    };

  } catch (error) {
    console.error('Error retrieving data:', error);
    return null;
  }
}

// Main function with password verification
async function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('Enter student name: ', async (userName) => {
    console.log(`\nSearching for: ${userName}...`);
    
    const userData = await getUserData(userName);
    
    if (!userData) {
      console.log('User not found.');
      rl.close();
      return;
    }
    
    rl.question('Enter password: ', async (password) => {
      if (password === userData.password) {
        console.log(`\n===== Results for ${userName} =====`);
        console.log(`Autism: ${userData.autism}`);
        console.log(`ADHD: ${userData.adhd}`);
        console.log(`Dyslexia: ${userData.dyslexia}`);
        console.log(`Epilepsy: ${userData.epilepsy}`);
      } else {
        console.log('\nWrong password, sorry!');
      }
      
      rl.close();
    });
  });
}

main();


// ===== Alternative: Get multiple checkbox columns =====

/**
 * Retrieves multiple checkbox values for a user
 * @param {string} userName - The name of the user
 * @param {string[]} checkboxColumns - Array of checkbox column names
 * @returns {Promise<Object>} - Object with column names as keys and boolean values
 */
async function getMultipleCheckboxValues(userName, checkboxColumns) {
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
    const result = {};
    
    checkboxColumns.forEach(column => {
      result[column] = record.get(column) === true;
    });
    
    return result;

  } catch (error) {
    console.error('Error retrieving data:', error);
    return null;
  }
}

// Example usage for multiple columns
async function exampleMultiple() {
  const userName = 'alice123';
  const columns = ['Autism', 'adhd', 'dyslexia', 'epilepsy'];
  
  const results = await getMultipleCheckboxValues(userName, columns);
  console.log(results);
  // Output: { Autism: true, adhd: false, dyslexia: true, epilepsy: false }
}