const fs = require('fs')
const csv = require('csv-parser');

const inputFile = 'input_countries.csv'
const countriesToFilter = ['Canada', 'United States']

const columns = 'country,year,population'


// Delete files if they exist
for(let country of countriesToFilter) {
    file = country + '.csv'
    try {
        fs.unlinkSync(file)
        console.log(file, 'REMOVED')
    } catch(err) {
        console.log(file, 'DOESN\'T EXISTS')
    }

    fs.appendFileSync(file, columns + '\n')
}

fs.createReadStream(inputFile)
  .pipe(csv())
  .on('data', (row) => {
    if(countriesToFilter.includes(row.country)) {
        file = row.country + '.csv'
        fs.appendFileSync(file, Object.values(row).join(",") + '\n')
    }
  })
  .on('end', () => {
    console.log('CSVs files successfully processed');
});