# spotify-assignment-DeltaX

<h3>Tech Stacks Used</h3>

 - HTML, EJS, CSS : for frontend
 - NodeJS : for backend
 - MongoDB : for database
 - Heroku for hosting website (not working currently, have to use locally)
 - MongoDB Atlas for hosting database

### Database Schemas
`const songSchema = new mongoose.Schema ({`\
&nbsp;&nbsp;&nbsp;&nbsp; `name: String,`\
&nbsp;&nbsp;&nbsp;&nbsp; `dateOfRelease: String,`\
&nbsp;&nbsp;&nbsp;&nbsp; `cover: String,`\
&nbsp;&nbsp;&nbsp;&nbsp; `artistName: {type: [String], sparse: true},`\
&nbsp;&nbsp;&nbsp;&nbsp; `rate: String`\
`})`

`const artistSchema = new mongoose.Schema({`\
&nbsp;&nbsp;&nbsp;&nbsp; `name: String,`\
&nbsp;&nbsp;&nbsp;&nbsp; `dateOfBirth: String,`\
&nbsp;&nbsp;&nbsp;&nbsp; `bio: String,`\
&nbsp;&nbsp;&nbsp;&nbsp; `songsSung: {type: [String], sparse: true},`\
&nbsp;&nbsp;&nbsp;&nbsp; `rate: Number`\
`})`

### Installation Process

##### Requirement : You must have NodeJS installed in your system to use this locally. Click <a href="https://nodejs.org/en/download/package-manager/">here</a> to install.

Step 1: Fork and Clone this repository\
Step 2: Go into the cloned folder using terminal/cmd and write `npm install`\
Step 3: Write `node app.js`\
Step 4: Open any browser and go to `http://localhost:3000/` 

### Some images
Home Page :

<img src="/images/home.png" width="70%" height="50%" />

Add New Songs Page :

<img src="/images/addnewsongs.png" width="70%" height="50%" />

Add New Artists Page :

<img src="/images/addnewartists.png" width="70%" height="50%" />

